import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const VoiceAI = () => {
  return (
    <div className="container px-4 py-16 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <Mic className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Voice AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Convert speech to text and text to speech with our advanced voice recognition system.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Speech to Text</CardTitle>
            <CardDescription>Convert your voice into written text</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" className="rounded-full h-24 w-24">
              <Mic className="h-12 w-12" />
            </Button>
            <p className="mt-4 text-muted-foreground">Press to start recording</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Text to Speech</CardTitle>
            <CardDescription>Convert written text into natural speech</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-32 p-2 border rounded-lg resize-none"
              placeholder="Enter text to convert to speech..."
            />
            <Button className="w-full mt-4">Convert to Speech</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VoiceAI;