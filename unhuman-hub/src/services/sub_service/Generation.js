import React, { useState } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";

const ImageGenerator = () => {
  const [prompts, setPrompts] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const userPrompt = { 
      type: "prompt", 
      content: input 
    };
    setPrompts(prev => [...prev, userPrompt]);
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-image", {
        prompt: input,
      });

      const generatedImage = { 
        type: "image", 
        content: response.data.image // Assuming the API returns an image URL or base64 string
      };
      setPrompts(prev => [...prev, generatedImage]);
    } catch (error) {
      const errorMessage = {
        type: "error",
        content: "Failed to generate image. Please try again."
      };
      setPrompts(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="min-h-[80vh] max-w-7xl flex items-flexstart justify-center p-0 w-full">
      <div className="w-full h-[70vh] max-h-screen max-w-8xl bg-transparent rounded-lg">
        {/* Image Generation History */}
        <div className="h-full w-full overflow-y-auto border-3 border-gray-800 shadow-lg bg-gray-900 p-4 rounded-lg mb-4 flex flex-col gap-4">
          {prompts.map((item, index) => (
            <div key={index} className="w-full">
              {item.type === "prompt" && (
                <div className="mb-2 p-2 rounded-full bg-slate-700 px-4 text-white self-end text-right ml-auto max-w-[70%]">
                  {item.content}
                </div>
              )}
              {item.type === "image" && (
                <div className="mb-2 p-2 rounded-lg bg-slate-800 self-start mr-auto max-w-[512px]">
                  <img 
                    src={item.content} 
                    alt="Generated" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              {item.type === "error" && (
                <div className="mb-2 p-2 rounded-full bg-red-600 px-4 text-white self-start mr-auto max-w-[70%]">
                  {item.content}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin text-white" size={32} />
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex w-full gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full bg-transparent border border-gray-300 text-white focus:outline-none text-lg"
            placeholder="Describe the image you want to generate..."
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center border border-gray-300 rounded-full justify-center bg-transparent text-white p-3 pl-0 hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;