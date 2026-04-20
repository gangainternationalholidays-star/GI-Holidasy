import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Headphones, 
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  Mic
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import VoiceAssistant from "./VoiceAssistant";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  options?: string[];
  type?: "text" | "lead-form" | "success";
};

const FAQ_RESPONSES: Record<string, { text: string; links?: { label: string; url: string }[] }> = {
  "B2B Rates": {
    text: "We offer the most competitive B2B net rates for agents. Recently, we've updated our Char Dham and Kashmir rates for the 2026 season. Please log in to the portal to view full details.",
    links: [{ label: "View B2B Portal", url: "/b2b-portal" }]
  },
  "Visa Services": {
    text: "GI Holidays provides dedicated visa assistance for UAE, Schengen, Singapore, and Thailand. Our success rate is 98%.",
    links: [{ label: "Visa Info", url: "/services" }]
  },
  "Flight Inventory": {
    text: "We have GDS and LCC integrations providing real-time flight inventory with zero markup for our premium partners.",
    links: [{ label: "Check Flights", url: "/services" }]
  },
  "Partner Benefits": {
    text: "Benefits include priority support, custom white-label itineraries, referral bonuses, and FAM trips.",
    links: [{ label: "Become a Partner", url: "/contact" }]
  },
  "Kashmir": {
    text: "Kashmir is currently our #1 trending sector! We offer the best B2B net rates for 6 Days Srinagar & Pahalgam for our registered agents.",
    links: [{ label: "Kashmir Packages", url: "/service-packages" }]
  },
  "Dubai": {
    text: "Our Dubai B2B special includes 4 nights with desert safari and dhow cruise at the most competitive net rates for agents.",
    links: [{ label: "Dubai Special", url: "/services" }]
  },
  "Char Dham": {
    text: "The Char Dham 2026 bookings are open. Early bird B2B rates for 12 days are now available for registered partners.",
    links: [{ label: "Char Dham Dates", url: "/#packages" }]
  }
};

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! 🙏 Welcome to GI Holidays B2B Support. I am your Travel Assistant. How can I help you scale your business today?",
      sender: "bot",
      timestamp: new Date(),
      options: ["B2B Rates", "Visa Services", "Partner Benefits", "Connect to Agent"]
    }
  ]);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", agency: "" });
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleOptionClick = (option: string) => {
    addMessage({
      id: Date.now().toString(),
      text: option,
      sender: "user",
      timestamp: new Date()
    });

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      if (option === "Connect to Agent") {
        addMessage({
          id: (Date.now() + 1).toString(),
          text: "I'll connect you with a live B2B specialist. Please provide your details so we can assist you better.",
          sender: "bot",
          timestamp: new Date(),
          type: "lead-form"
        });
      } else {
        const response = FAQ_RESPONSES[option];
        addMessage({
          id: (Date.now() + 1).toString(),
          text: response?.text || "That's a great question! Let me check that for you.",
          sender: "bot",
          timestamp: new Date(),
          options: ["Connect to Agent", "Main Menu"],
          links: response?.links
        } as Message & { links?: any });
      }
    }, 1000);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    addMessage({
      id: Date.now().toString(),
      text: userMsg,
      sender: "user",
      timestamp: new Date()
    });
    setInputText("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Dynamic keyword matching
      const lowerMsg = userMsg.toLowerCase();
      let matchedResponse = null;

      if (lowerMsg.includes("kashmir")) matchedResponse = FAQ_RESPONSES["Kashmir"];
      else if (lowerMsg.includes("dubai")) matchedResponse = FAQ_RESPONSES["Dubai"];
      else if (lowerMsg.includes("char dham") || lowerMsg.includes("chardham")) matchedResponse = FAQ_RESPONSES["Char Dham"];
      else if (lowerMsg.includes("visa")) matchedResponse = FAQ_RESPONSES["Visa Services"];
      else if (lowerMsg.includes("rate") || lowerMsg.includes("price")) matchedResponse = FAQ_RESPONSES["B2B Rates"];
      else if (lowerMsg.includes("agent") || lowerMsg.includes("partner")) matchedResponse = FAQ_RESPONSES["Partner Benefits"];

      if (matchedResponse) {
        addMessage({
          id: (Date.now() + 1).toString(),
          text: matchedResponse.text,
          sender: "bot",
          timestamp: new Date(),
          options: ["Connect to Agent", "Main Menu"],
          links: matchedResponse.links
        } as any);
      } else {
        addMessage({
          id: (Date.now() + 1).toString(),
          text: "I'm your GI Holidays assistant. I can help with B2B rates for Kashmir, Dubai, Char Dham, or Visa services. What would you like to know?",
          sender: "bot",
          timestamp: new Date(),
          options: ["B2B Rates", "Kashmir", "Connect to Agent"]
        });
      }
    }, 1200);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: Date.now().toString(),
        text: `Thank you ${leadForm.name}! A B2B manager from GI Holidays will call you on ${leadForm.phone} within 15 minutes. You can also reach us at +91 93548 10841.`,
        sender: "bot",
        timestamp: new Date(),
        type: "success"
      });
      // Reset form
      setLeadForm({ name: "", phone: "", agency: "" });
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-500",
          isOpen ? "bg-red-500 rotate-90" : "bg-[#25D366]"
        )}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#002366] text-white p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-[#002366] font-bold text-lg">GI</div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#002366] rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">GI Holidays Support</h3>
                  <p className="text-xs text-[#D4AF37] font-medium uppercase tracking-widest">B2B Automation Active</p>
                </div>
                <button 
                  onClick={() => setIsVoiceOpen(true)}
                  className="ml-auto w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all group"
                  title="Voice Assistance"
                >
                  <Mic size={20} className="group-hover:animate-pulse" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow p-4 space-y-4 max-h-[400px] overflow-y-auto bg-slate-50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn(
                  "flex flex-col",
                  msg.sender === "user" ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm shadow-sm",
                    msg.sender === "user" 
                      ? "bg-[#002366] text-white rounded-tr-none" 
                      : "bg-white text-slate-800 rounded-tl-none border border-gray-100"
                  )}>
                    {msg.type === "lead-form" ? (
                      <form onSubmit={handleLeadSubmit} className="space-y-3">
                        <p className="font-medium mb-2">{msg.text}</p>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          required
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:border-[#D4AF37] text-slate-800"
                          value={leadForm.name}
                          onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                        />
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          required
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:border-[#D4AF37] text-slate-800"
                          value={leadForm.phone}
                          onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                        />
                        <button className="w-full bg-[#D4AF37] text-[#002366] font-bold py-2 rounded-lg hover:brightness-110 flex items-center justify-center gap-2">
                          <PhoneCall size={16} /> Request Callback
                        </button>
                      </form>
                    ) : msg.type === "success" ? (
                      <div className="flex flex-col items-center text-center py-2">
                        <CheckCircle2 className="text-green-500 mb-2" size={32} />
                        <p>{msg.text}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="leading-relaxed">{msg.text}</p>
                        {(msg as any).links && (
                          <div className="flex flex-col gap-2 mt-2">
                            {(msg as any).links.map((link: any, i: number) => (
                              <Link 
                                key={i}
                                to={link.url}
                                className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-[#D4AF37] transition-all group/link"
                              >
                                <span className="text-xs font-bold text-[#002366]">{link.label}</span>
                                <ChevronRight size={14} className="text-[#D4AF37] group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2 justify-start max-w-[90%]">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt === "Main Menu" ? "B2B Rates" : opt)}
                          className="px-4 py-2 bg-white border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-bold hover:bg-[#D4AF37] hover:text-[#002366] transition-all shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about Rates, Kashmir, Dubai..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-sm"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#002366] text-white rounded-xl flex items-center justify-center hover:bg-[#D4AF37] transition-all"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="mt-2 italic text-[9px] text-slate-400 text-center">
                Powered by GI Holidays Smart B2B AI • 24/7 Priority Support
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVoiceOpen && (
          <VoiceAssistant 
            isOpen={isVoiceOpen} 
            onClose={() => setIsVoiceOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
