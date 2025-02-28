import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="min-h-[80vh] max-w-7xl flex items-flexstart justify-center p-0 w-full">
      <div className="w-full h-[70vh] max-h-screen max-w-8xl bg-transparent rounded-lg">
        {/* Conversation History */}
        <div className="h-full w-full overflow-y-auto border-3 border-gray-800 shadow-lg bg-gray-900 p-4 rounded-lg mb-4 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 w-auto rounded-full text-base font-sans max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-slate-700 px-3 text-white self-end text-right ml-auto"
                  : "bg-slate-800 px-3 text-gray-300 self-start text-left mr-auto"
              }`}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex w-full gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full bg-transparent border border-gray-300 text-gray-800 focus:outline-none text-lg text-white"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="flex items-center border border-gray-300 rounded-full justify-center bg-transparent text-white p-3 pl-0 rounded-full hover:bg-slate-600"
          >
            {/* Send Icon from Lucide React */}
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
