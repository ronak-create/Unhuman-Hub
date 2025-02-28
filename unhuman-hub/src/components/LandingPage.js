import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Github, Twitter, Mail, Sparkles, Brain, Globe, Shield } from 'lucide-react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`z-10 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Unhuman Hub
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Empowering humanity with free AI-powered services
          </p>
          <div className="space-x-4">
            <Link to="/login" className="no-underline px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105">Login</Link>
            {/* <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Login
            </button> */}
            <Link to="/register" className="no-underline px-6 py-3 rounded-lg bg-transparent border-2 border-purple-600 hover:bg-purple-600/20 text-purple-600 transition-all duration-300 transform hover:scale-105">Register</Link>
            {/* <button className="bg-transparent border-2 border-purple-600 hover:bg-purple-600/20 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Register
            </button> */}
          </div>
        </div>
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <ChevronDown className="absolute bottom-8 animate-bounce w-8 h-8 text-gray-400" />
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Sparkles, title: "AI-Powered", description: "Advanced artificial intelligence solutions accessible to everyone" },
            { icon: Brain, title: "Smart Processing", description: "Intelligent data processing and analysis capabilities" },
            { icon: Shield, title: "Secure & Free", description: "Enterprise-grade security with absolutely no cost" }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
              <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 px-4 md:px-8 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Unhuman Hub is on a mission to democratize artificial intelligence by providing free, powerful AI services to everyone. We believe in creating a future where advanced technology is accessible to all, regardless of their resources.
          </p>
          <div className="flex justify-center space-x-6">
            <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Mail className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Your message"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 Unhuman Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;