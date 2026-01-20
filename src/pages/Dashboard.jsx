import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Send, Thermometer } from 'lucide-react';

const Dashboard = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Hello! I am your AI stress companion. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setIsSpeaking(true);
      const systemMsg = { role: 'system', text: "I've analyzed your facial micro-expressions and thermal profile. It seems you're carrying some tension. Let's try a quick breathing exercise." };
      setMessages(prev => [...prev, systemMsg]);
      
      setTimeout(() => setIsSpeaking(false), 3000);
    }, 1000);
  };

  const endSession = () => {
    const session = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      duration: '12:45',
      stressLevel: Math.floor(Math.random() * 60) + 20,
    };
    const history = JSON.parse(localStorage.getItem('session_history') || '[]');
    localStorage.setItem('session_history', JSON.stringify([session, ...history]));
    window.location.href = '/history';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-160px)]">
      {/* Left Panel: Visuals */}
      <div className="flex flex-col gap-6 h-full">
        <div className="relative flex-1 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
          {/* Mock Webcam */}
          <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
             <div className="text-neutral-500 text-center">
               <div className="w-16 h-16 rounded-full border-4 border-neutral-700 border-t-indigo-500 animate-spin mx-auto mb-4"></div>
               <p className="font-medium">Connecting Camera...</p>
             </div>
          </div>
          
          {/* Thermal Overlay Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-orange-500/30 to-red-500/20 mix-blend-color-burn opacity-60 animate-pulse pointer-events-none"></div>
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
            <Thermometer size={16} className="text-red-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Live Thermal Analysis</span>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
             {/* AI Orb Animation */}
             <div className="relative">
                <motion.div
                  animate={isSpeaking ? { 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  } : { scale: 1, opacity: 0.3 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-16 h-16 bg-indigo-500 rounded-full blur-xl absolute -inset-2"
                />
                <motion.div
                  animate={isSpeaking ? { 
                    scale: [1, 1.1, 1],
                  } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full relative z-10 shadow-lg border-2 border-white/20"
                />
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isMicOn ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}
              >
                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>
              <div className="text-sm">
                 <p className="font-bold">{isMicOn ? 'Mic Active' : 'Mic Muted'}</p>
                 <p className="text-neutral-500">System listening for voice prompts</p>
              </div>
           </div>
           <button 
             onClick={endSession}
             className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-500/20"
           >
             <X size={20} /> End Session
           </button>
        </div>
      </div>

      {/* Right Panel: Chat */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
           <h2 className="text-xl font-bold">Session Transcript</h2>
           <p className="text-sm text-neutral-500">Real-time emotional analysis log</p>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
           <AnimatePresence>
             {messages.map((m, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className={`max-w-[80%] p-4 rounded-2xl ${
                   m.role === 'user' 
                     ? 'bg-indigo-600 text-white rounded-tr-none' 
                     : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-none'
                 }`}>
                   <p className="text-sm leading-relaxed">{m.text}</p>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        <form onSubmit={handleSend} className="p-4 bg-neutral-50 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Type your message..."
             className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
           />
           <button 
             type="submit"
             className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
           >
             <Send size={20} />
           </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
