import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Cpu className="w-8 h-8 text-blue-400 " />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Services
        </h1>
      </div>
      <p className="text-gray-400 text-lg">
        Explore our comprehensive suite of AI-powered solutions
      </p>
    </motion.div>
  );
};

export default Header;