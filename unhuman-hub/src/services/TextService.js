import React, { useState } from 'react';
import { Menu, ChevronRight, MessageSquare, FileText, Clipboard } from 'lucide-react';
import Chatbot from './sub_service/Chatbot';
import TextGeneration from './sub_service/TextGeneration';
import TextSummarization from './sub_service/TextSummarization';

const servicesContent = {
  "text-based-services": {
    title: "Text-Based Services",
    icon: <FileText size={28} className="text-white" />,
    logo: "/api/placeholder/120/40",
    description: "Advanced natural language processing solutions powered by cutting-edge AI models.",
    subServices: [
      {
        name: "Chatbot",
        icon: <MessageSquare size={20} />,
        id: "chatbot",
        component: <Chatbot />,
      },
      {
        name: "Text Generation",
        icon: <FileText size={20} />,
        id: "text-generation",
        component: <TextGeneration />,
      },
      {
        name: "Text Summarization",
        icon: <Clipboard size={20} />,
        id: "text-summarization",
        component: <TextSummarization />,
      },
    ],
  },
};

const TextService = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSubService, setSelectedSubService] = useState(null);

  const serviceData = servicesContent["text-based-services"];

  if (!serviceData) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 transition-all duration-300 border-r mt-16`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          {serviceData.logo && !isSidebarOpen ? (
            <span className="mr-2">{serviceData.icon}</span>
          ) : (
            <div className="flex items-center">
              <span className="text-2x font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                {serviceData.title}
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="m-2">
          {serviceData.subServices.map((subService, index) => (
            <button
              key={index}
              onClick={() => setSelectedSubService(subService)}
              className={`w-full text-left mb-2 p-3 rounded-lg flex items-center text-gray-400 hover:bg-gray-700 ${
                selectedSubService?.id === subService.id ? "bg-gray-700" : ""
              }`}
            >
              <span className="text-xl mr-3">{subService.icon}</span>
              {isSidebarOpen && (
                <>
                  <span className="flex-1">{subService.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full p-8 pt-0 pb-0">
        {selectedSubService ? (
          <div className="text-gray-200 w-full mt-24">
            <div className="w-full flex">{selectedSubService.component}</div>
          </div>
        ) : (
          <div className="text-gray-500 text-2xl flex items-center justify-center h-full">
            Select a sub-service to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default TextService;
