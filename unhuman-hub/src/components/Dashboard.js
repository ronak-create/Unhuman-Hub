import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Image,
  Film,
  Music,
  BarChart2,
  Shield,
  Cpu,
  Palette,
} from "lucide-react";

const servicesData = [
  {
    category: "Text-Based Services",
    icon: <FileText className="text-white" size={28} />,
    route: "/services/text-based-services",
    description: "Advanced NLP solutions for text processing and generation",
    services: ["Chatbot", "Text Generation", "Translation", "Summarization"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    category: "Image-Based Services",
    icon: <Image className="text-white" size={28} />,
    route: "/services/image-based-services",
    description: "State-of-the-art computer vision and image processing",
    services: ["Generation", "Recognition", "Detection", "Captioning"],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "Video-Based Services",
    icon: <Film className="text-white" size={28} />,
    route: "/services/video-based-services",
    description: "Powerful video analysis and processing solutions",
    services: ["Generation", "Summarization", "Detection", "Tracking"],
    color: "from-red-500 to-orange-500",
  },
  {
    category: "Audio-Based Services",
    icon: <Music className="text-white" size={28} />,
    route: "/services/audio-based-services",
    description: "Advanced audio processing and analysis tools",
    services: ["Voice Cloning", "Classification", "Enhancement"],
    color: "from-green-500 to-teal-500",
  },
  {
    category: "Analytics & Automation",
    icon: <BarChart2 className="text-white" size={28} />,
    route: "/services/analytics-automation",
    description: "Intelligent analytics and automation solutions",
    services: ["Predictive Analytics", "Recommendations", "Analysis"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    category: "Security & Biometric",
    icon: <Shield className="text-white" size={28} />,
    route: "/services/security-biometric",
    description: "Advanced security and biometric authentication",
    services: ["Face Detection", "Recognition", "Authentication"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    category: "Robotics & Automation",
    icon: <Cpu className="text-white" size={28} />,
    route: "/services/robotics-automation",
    description: "Cutting-edge robotics and automation solutions",
    services: ["Pathfinding", "Object Avoidance", "Recognition"],
    color: "from-violet-500 to-purple-500",
  },
  {
    category: "Creative & Artistic",
    icon: <Palette className="text-white" size={28} />,
    route: "/services/creative-artistic",
    description: "AI-powered creative and artistic tools",
    services: ["Art Generation", "Music", "Content Writing"],
    color: "from-pink-500 to-rose-500",
  },
];

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(service.route)}
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
    >
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${service.color} p-1`}>
        <div className="relative bg-gray-900 rounded-lg p-6 h-full">
          <div className="flex items-center space-x-4 mb-4">
            <div>{service.icon}</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {service.category}
            </h2>
          </div>
          
          <p className="text-gray-400 mb-4">
            {service.description}
          </p>

          <div className="space-y-2">
            {service.services.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm inline-block mr-2 mb-2"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Services Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive suite of AI-powered services designed to transform your business with cutting-edge technology solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
