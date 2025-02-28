import React, { useState } from 'react';
import { Menu, ChevronRight, BarChart2, TrendingUp, ThumbsUp, PieChart } from 'lucide-react';
import PredictiveAnalytics from './sub_service/PredictiveAnalytics';
import Recommendations from './sub_service/Recommendations';
import Analysis from './sub_service/Analysis';

const servicesContent = {
    "analytics-automation": {
      title: "Analytics and Automation",
      icon: <BarChart2 className="text-white" size={28} />,
      logo: "/api/placeholder/120/40",
      route: "/services/analytics-automation",
      description: "Intelligent analytics and automation solutions",
      color: "from-cyan-500 to-blue-500",
      subServices: [
        {
          name: "Predictive Analytics",
          icon: <TrendingUp size={20} />,
          id: "predictive-analytics",
          component: <PredictiveAnalytics />,
        },
        {
          name: "Recommendations",
          icon: <ThumbsUp size={20} />,
          id: "recommendations",
          component: <Recommendations />,
        },
        {
          name: "Analysis",
          icon: <PieChart size={20} />,
          id: "analysis",
          component: <Analysis />,
        },
      ],
    },
  };
  
  

const AnalyticsAutomation = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSubService, setSelectedSubService] = useState(null);

  const serviceData = servicesContent["analytics-automation"]; // Hardcoded for now

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
          <div className="text-gray-200">
            <h1 className="text-3xl font-bold mb-4">{selectedSubService.name}</h1>
            <div>{selectedSubService.component}</div>
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

export default AnalyticsAutomation;
