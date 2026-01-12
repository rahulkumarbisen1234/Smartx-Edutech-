
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';
import { getAIResponse } from '../services/gemini';

const AIChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Namaste! I am your SMARTX Learning Assistant. Need help with a topic, a tutor, or your schedule?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response || "I'm having a small connection issue. Could you repeat that?" }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 size-16 rounded-[1.5rem] bg-slate-900 dark:bg-blue-600 text-white shadow-3d flex items-center justify-center z-50 hover:shadow-3d-hover active:scale-90 transition-all ring-4 ring-white dark:ring-slate-800 animate-float"
      >
        <div className="relative depth-layer">
          <ICONS.Brain className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 size-3 bg-blue-500 dark:bg-white rounded-full border-2 border-slate-900 dark:border-blue-600 animate-pulse-soft"></span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end justify-center p-4">
          <div className="bg-white dark:bg-[#1a2632] w-full max-w-md h-[85vh] rounded-[2.5rem] flex flex-col shadow-3d relative overflow-hidden animate-in slide-in-from-bottom duration-500 ease-out card-3d">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 dark:bg-blue-400/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            {/* AI Header */}
            <div className="p-6 bg-white dark:bg-[#1a2632] border-b border-slate-50 dark:border-slate-800 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm animate-pulse-soft">
                  <ICONS.Brain className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-none">SmartX Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-black">AI Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="size-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl transition-all hover:bg-red-50 hover:text-red-500"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Chat Content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FBFCFE] dark:bg-[#101922] no-scrollbar relative z-10">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  <div className={`max-w-[85%] p-4 px-5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm card-3d ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-3d' 
                      : 'bg-white dark:bg-[#1a2632] text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-800 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1a2632] p-4 px-6 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-800 flex gap-1.5">
                    <span className="size-1.5 bg-blue-300 dark:bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-blue-300 dark:bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="size-1.5 bg-blue-300 dark:bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-[#1a2632] border-t border-slate-50 dark:border-slate-800 relative z-10">
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-2 pl-6 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all border border-slate-100 dark:border-slate-800 shadow-sm">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent border-none focus:ring-0 font-semibold py-3 px-0 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="size-12 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all disabled:opacity-50 shadow-3d active:scale-90"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatButton;
