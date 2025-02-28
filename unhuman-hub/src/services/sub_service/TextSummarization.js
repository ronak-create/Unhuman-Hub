import React, { useState } from "react";
import axios from "axios";
import { FileText, Loader } from "lucide-react";

const TextSummarization = () => {
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!originalText.trim()) return;
    
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/summarize", {
        text: originalText,
      });
      setSummary(response.data.summary);
    } catch (err) {
      setError("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] max-w-7xl flex items-flexstart justify-center p-0 w-full">
      <div className="w-full h-[70vh] max-h-screen max-w-8xl bg-transparent rounded-lg flex flex-col">
        <div className="h-full w-full border border-gray-700 shadow-lg bg-[#1a1f2e] p-6 rounded-lg mb-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">Text Summarization Service</h2>
            <p className="text-gray-300">
              Efficiently condense your text while retaining key information.
            </p>
          </div>

          {/* Summary Output Section */}
          <div className="flex-1 mb-6 overflow-auto">
            {summary && (
              <div className="p-4 rounded-lg bg-[#252d3d] border border-gray-700 shadow-inner">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText size={20} className="text-gray-300" />
                  Summary:
                </h3>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {summary}
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="mt-auto">
            <textarea
              className="w-full p-4 rounded-lg bg-[#252d3d] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 resize-none mb-4 shadow-inner"
              rows="6"
              placeholder="Enter your text to summarize..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
            
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-200 ${
                  loading 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-[#3b4252] hover:bg-[#4c566a] border border-gray-600 shadow-lg hover:shadow-xl"
                }`}
                onClick={handleSummarize}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin text-gray-300" />
                    <span className="font-medium">Summarizing...</span>
                  </>
                ) : (
                  <>
                    <FileText size={20} className="text-gray-300" />
                    <span className="font-medium">Summarize Text</span>
                  </>
                )}
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

export default TextSummarization;