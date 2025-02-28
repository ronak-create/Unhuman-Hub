from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer, BartForConditionalGeneration, BartTokenizer
from flask_cors import CORS
import torch
from diffusers import DiffusionPipeline
import os
from torch.cuda.amp import autocast
from diffusers import AutoPipelineForText2Image
from diffusers.pipelines.wuerstchen import DEFAULT_STAGE_C_TIMESTEPS
os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'


# Initialize Flask app
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load pre-trained model and tokenizer
model_name = "microsoft/DialoGPT-medium"  # Pre-trained conversational model
gen_model_name = "distilgpt2"
summ_model_name = "facebook/bart-large-cnn"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
summ_model = BartForConditionalGeneration.from_pretrained(summ_model_name)
summ_tokenizer = BartTokenizer.from_pretrained(summ_model_name)
image_pipeline = AutoPipelineForText2Image.from_pretrained("warp-ai/wuerstchen", torch_dtype=torch.float16).to("cuda")


gen_tokenizer = AutoTokenizer.from_pretrained(gen_model_name)
gen_model = AutoModelForCausalLM.from_pretrained(gen_model_name)


# Directory to save generated images
IMAGE_SAVE_DIR = "generated_images"
if not os.path.exists(IMAGE_SAVE_DIR):
    os.makedirs(IMAGE_SAVE_DIR)

# Chat history storage (basic)
chat_history = []

@app.route("/chat", methods=["POST"])
def chat():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight request allowed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    global chat_history
    
    # Get user input from request
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # Tokenize user input and add chat history
    new_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
    if len(chat_history) > 0:  # Check if there are any elements in chat_history
        bot_input_ids = torch.cat([torch.tensor(chat_history)] + [new_input_ids], dim=-1)
    else:
        bot_input_ids = new_input_ids


    # Generate response
    chat_history = model.generate(
        bot_input_ids,
        max_length=1000,
        pad_token_id=tokenizer.eos_token_id,
        temperature=0.7,
        top_k=50,
        top_p=0.95,
        do_sample=True
    )

    # Decode response and append to chat history
    response = tokenizer.decode(chat_history[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({"response": response})

@app.route("/generate", methods=["POST"])
def generate_text():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight request allowed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    # Get prompt text from request
    prompt_text = request.json.get("prompt")
    if not prompt_text:
        return jsonify({"error": "Prompt text is required"}), 400

    # Encode input prompt and generate text
    input_ids = gen_tokenizer.encode(prompt_text, return_tensors="pt")

    # Generate text continuation based on prompt
    output_ids = gen_model.generate(
        input_ids,
        max_length=200,  # You can adjust this value for longer or shorter text
        num_return_sequences=1,  # Number of sequences to generate
        temperature=0.7,  # Controls randomness
        top_k=50,  # Top-k sampling
        top_p=0.95,  # Nucleus sampling
        do_sample=True,  # Enable sampling
        pad_token_id=gen_tokenizer.eos_token_id,  # Use EOS token as padding token
    )

    # Decode the generated text
    generated_text = gen_tokenizer.decode(output_ids[0], skip_special_tokens=True)

    # Return the generated text as a response
    return jsonify({"generated_text": generated_text})

@app.route("/summarize", methods=["POST"])
def summarize():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight request allowed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    # Get text to summarize from the request
    input_text = request.json.get("text")
    if not input_text:
        return jsonify({"error": "Text is required"}), 400

    # Tokenize input text
    input_ids = summ_tokenizer.encode(input_text, return_tensors="pt", max_length=1024, truncation=True)

    # Generate summary
    summary_ids = summ_model.generate(
        input_ids,
        max_length=150,  # Maximum length of the summary
        min_length=40,   # Minimum length of the summary
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True
    )

    # Decode and return the summary
    summary = summ_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return jsonify({"summary": summary})

@app.route("/generate-image", methods=["POST"])
def generate_image():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight request allowed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    # Get prompt text from the request
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"error": "Prompt text is required"}), 400

    # Generate image based on the prompt
    with autocast():
        image = image_pipeline(prompt=prompt, height=1024, width=1536, prior_timesteps=DEFAULT_STAGE_C_TIMESTEPS, prior_guidance_scale=4.0, num_images_per_prompt=1).images[0]

    # Save the image to disk
    image_filename = f"{IMAGE_SAVE_DIR}/generated_image.png"
    image.save(image_filename)

    # Return the path to the saved image in the response
    return jsonify({"image_url": f"/static/{image_filename}"})


@app.route('/static/<filename>')
def serve_image(filename):
    # Serve the image from the static directory
    return send_from_directory(IMAGE_SAVE_DIR, filename)

if __name__ == "__main__":
    app.run(debug=True)
