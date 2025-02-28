import React, { useState } from "react";
import axios from "axios";
import { Wand2 } from "lucide-react";

const TextGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {
        prompt,
      });
      setGeneratedText(response.data.generated_text);
    } catch (err) {
      setError("Error generating text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] max-w-7xl flex items-flexstart justify-center p-0 w-full">
      <div className="w-full h-[70vh] max-h-screen max-w-8xl bg-transparent rounded-lg flex flex-col">
        <div className="h-full w-full border border-gray-700 shadow-lg bg-[#1a1f2e] p-6 rounded-lg mb-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">Text Generation Service</h2>
            <p className="text-gray-300">
              This service enables human-like text creation for your needs.
            </p>
          </div>

          {/* Generated Text Section - Now Above Input */}
          <div className="flex-1 mb-6 overflow-auto">
            {generatedText && (
              <div className="p-4 rounded-lg bg-[#252d3d] border border-gray-700 shadow-inner">
                <h3 className="font-semibold text-white mb-3">Generated Text:</h3>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {generatedText}
                </div>
              </div>
            )}
          </div>

          {/* Input Section - Now at Bottom */}
          <div className="mt-auto">
            <textarea
              className="w-full p-4 rounded-lg bg-[#252d3d] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 resize-none mb-4 shadow-inner"
              rows="4"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-200 ${
                  loading 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-[#3b4252] hover:bg-[#4c566a] border border-gray-600 shadow-lg hover:shadow-xl"
                }`}
                onClick={handleGenerate}
                disabled={loading}
              >
                <Wand2 size={20} className="text-gray-300" />
                <span className="font-medium">{loading ? "Generating..." : "Generate Text"}</span>
              </button>
              
              {error && (
                <p className="text-red-400 animate-fade-in">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGeneration;