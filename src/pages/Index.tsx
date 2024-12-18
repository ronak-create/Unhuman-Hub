import { motion } from "framer-motion";
import { LucideIcon, Brain, Image, MessageSquare, Mic, Code, Video, Languages, ChartBar, Sparkles } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: "AI Models",
    description: "Access state-of-the-art AI models for various tasks",
  },
  {
    icon: Image,
    title: "Image Recognition",
    description: "Identify objects and extract text from images",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Engage with our advanced conversational AI",
  },
  {
    icon: Mic,
    title: "Voice AI",
    description: "Convert speech to text and text to speech",
  },
  {
    icon: Code,
    title: "Code Assistant",
    description: "Get intelligent coding suggestions and help",
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "Extract insights from video content",
  },
  {
    icon: Languages,
    title: "Translation",
    description: "Translate text between multiple languages",
  },
  {
    icon: ChartBar,
    title: "Data Insights",
    description: "Visualize and analyze data with AI",
  },
  {
    icon: Sparkles,
    title: "Content Generation",
    description: "Create engaging content with AI assistance",
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground">{service.description}</p>
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Unhuman Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access powerful AI services in one place. Transform your workflow with cutting-edge artificial intelligence tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;