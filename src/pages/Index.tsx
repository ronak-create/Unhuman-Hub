import { motion } from "framer-motion";
import { LucideIcon, Brain, Image, MessageSquare, Mic, Code, Video, Languages, ChartBar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: "AI Models",
    description: "Access state-of-the-art AI models for various tasks",
    path: "/services/models"
  },
  {
    icon: Image,
    title: "Image Recognition",
    description: "Identify objects and extract text from images",
    path: "/services/image"
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Engage with our advanced conversational AI",
    path: "/services/chat"
  },
  {
    icon: Mic,
    title: "Voice AI",
    description: "Convert speech to text and text to speech",
    path: "/services/voice"
  },
  {
    icon: Code,
    title: "Code Assistant",
    description: "Get intelligent coding suggestions and help",
    path: "/services/code"
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "Extract insights from video content",
    path: "/services/video"
  },
  {
    icon: Languages,
    title: "Translation",
    description: "Translate text between multiple languages",
    path: "/services/translate"
  },
  {
    icon: ChartBar,
    title: "Data Insights",
    description: "Visualize and analyze data with AI",
    path: "/services/data"
  },
  {
    icon: Sparkles,
    title: "Content Generation",
    description: "Create engaging content with AI assistance",
    path: "/services/content"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  
  return (
    <motion.div variants={item}>
      <Link to={service.path}>
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="group-hover:bg-primary/10 transition-colors">
              Learn more
              <span className="sr-only">Learn more about {service.title}</span>
            </Button>
          </CardContent>
        </Card>
      </Link>
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

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;