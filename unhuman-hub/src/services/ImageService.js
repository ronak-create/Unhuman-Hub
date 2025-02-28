import React, { useState } from 'react';
import { ImageIcon, Brush, Search, Eye, PenTool, Menu, ChevronRight } from 'lucide-react';
import Generation from './sub_service/Generation';
import Recognition from './sub_service/Recognition';
import Detection from './sub_service/Detection';
import Captioning from './sub_service/Captioning';

const servicesContent = {
    "image-based-services": {
      title: "Image-Based Services",
      icon: <ImageIcon className="text-white" size={28} />,
      logo: "/api/placeholder/120/40",
      route: "/services/image-based-services",
      description: "State-of-the-art computer vision and image processing",
      color: "from-purple-500 to-pink-500",
      subServices: [
        {
          name: "Generation",
          icon: <Brush size={20} />,
          id: "generation",
          component: <Generation />,
        },
        {
          name: "Recognition",
          icon: <Search size={20} />,
          id: "recognition",
          component: <Recognition />,
        },
        {
          name: "Detection",
          icon: <Eye size={20} />,
          id: "detection",
          component: <Detection />,
        },
        {
          name: "Captioning",
          icon: <PenTool size={20} />,
          id: "captioning",
          component: <Captioning />,
        },
      ],
    },
  };

const ImageService = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSubService, setSelectedSubService] = useState(null);

  const serviceData = servicesContent["image-based-services"]; // Hardcoded for now

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
      <div className="flex-1 p-8 mt-16">
        {selectedSubService ? (
          <div className="w-full h-full text-gray-200">
            <div className='w-full'>{selectedSubService.component}</div>
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

export default ImageService;
