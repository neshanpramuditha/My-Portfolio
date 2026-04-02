import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Neshan's AI assistant. Ask me about his projects or skills!" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔑 Replace with your actual API Key from Google AI Studio
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const currentInput = input;
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are Neshan's Portfolio Assistant. Be professional and friendly. Answer questions about his MERN stack, PHP, and JavaScript skills. Mention his 'ReadCycle' project if asked about work samples." 
      });

      const result = await model.generateContent(currentInput);
      const botMessage: Message = { role: "bot", text: result.response.text() };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
    
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white bg-primary ">
            <div className="flex items-center gap-2">
              <Bot size={30} />
              <span className="font-semibold text-sm">Neshan's AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary/80  p-1 rounded">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 text-black">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary  text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none text-sm text-gray-500 italic">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              className="flex-1 bg-gray-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 🔘 Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary  rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;