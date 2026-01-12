
import React, { useState, useEffect, useRef } from 'react';
import { User, Message as MessageType } from '../types';
import { getQuickReplies, getChatInsight } from '../services/gemini';

interface Chat {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

const Messages: React.FC<{ user: User }> = ({ user }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // AI Assistant Sheet State
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    { 
      id: '1', 
      name: 'Amit Sir', 
      lastMsg: "Don't forget to solve chapter 5", 
      time: '10:32 AM', 
      unread: 2, 
      avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'online'
    },
    { 
      id: '2', 
      name: 'Physics Doubt Hub', 
      lastMsg: 'Shreya posted a new doubt', 
      time: 'Yesterday', 
      unread: 0, 
      avatar: 'https://images.unsplash.com/photo-1594136973333-cd5566f80993?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'offline',
      lastSeen: '15m ago'
    },
    { 
      id: '3', 
      name: 'Anjali Gupta', 
      lastMsg: 'The notes have been uploaded', 
      time: 'Monday', 
      unread: 0, 
      avatar: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'away'
    },
  ];

  const [messagesList, setMessagesList] = useState<MessageType[]>([
    { id: '1', sender: 'Amit Sir', text: 'Hello! Namaste 🙏 How can I help you with your mathematics studies today?', timestamp: '10:30 AM', isMe: false },
    { id: '2', sender: user.name, text: 'I am looking for help with Algebra chapter 4.', timestamp: '10:32 AM', isMe: true },
    { id: '3', sender: 'Amit Sir', text: 'Sure! I have 5 years experience teaching Class 10. We can start tomorrow.', timestamp: '10:33 AM', isMe: false },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messagesList]);

  // Logic to fetch suggestions when entering a chat or receiving a new message
  useEffect(() => {
    if (activeChat) {
      const lastMsg = messagesList[messagesList.length - 1];
      if (lastMsg && !lastMsg.isMe) {
        handleFetchSuggestions(lastMsg.text);
      } else {
        setSuggestions([]);
      }
    }
  }, [activeChat, messagesList]);

  const handleFetchSuggestions = async (text: string) => {
    setIsSuggesting(true);
    const replies = await getQuickReplies(text);
    setSuggestions(replies);
    setIsSuggesting(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleAIService = async (action: 'summarize' | 'explain' | 'draft') => {
    setIsAILoading(true);
    setAiInsight(null);
    const history = messagesList.map(m => `${m.sender}: ${m.text}`).join('\n');
    const result = await getChatInsight(history, action);
    setAiInsight(result);
    setIsAILoading(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg: MessageType = {
      id: Date.now().toString(),
      sender: user.name,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessagesList(prev => [...prev, newMsg]);
    setInputValue('');
  };

  if (activeChat) {
    const currentChat = chats.find(c => c.id === activeChat);
    
    const getStatusDisplay = () => {
      if (!currentChat) return null;
      switch (currentChat.status) {
        case 'online':
          return <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1"><span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</p>;
        case 'away':
          return <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1">Away</p>;
        case 'offline':
          return <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last seen {currentChat.lastSeen || 'recently'}</p>;
        default:
          return null;
      }
    };

    return (
      <div className="flex flex-col flex-1 bg-white dark:bg-[#101922] h-screen transition-colors relative overflow-hidden">
        {/* Chat Header */}
        <header className="px-6 pt-12 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md z-30 transition-all">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveChat(null)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center dark:text-white transition-transform active:scale-90">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <img src={currentChat?.avatar} className="size-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" alt={currentChat?.name} />
                {currentChat?.status === 'online' && (
                  <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#1a2632] animate-pulse"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold dark:text-white leading-tight tracking-tight">{currentChat?.name}</h3>
                {getStatusDisplay()}
              </div>
            </div>
          </div>
          
          {/* Integrated AI Trigger */}
          <button 
            onClick={() => setIsAISheetOpen(true)}
            className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-all shadow-sm animate-pulse-soft"
          >
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </button>
        </header>

        {/* AI Assistant Overlay Sheet */}
        {isAISheetOpen && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end">
            <div className="w-full bg-white dark:bg-[#1a2632] rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[70vh]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-3d">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Smart Insight</h3>
                </div>
                <button onClick={() => { setIsAISheetOpen(false); setAiInsight(null); }} className="size-10 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <button 
                  onClick={() => handleAIService('summarize')}
                  className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 card-3d"
                >
                  <span className="material-symbols-outlined text-blue-600 depth-layer">summarize</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Summary</span>
                </button>
                <button 
                  onClick={() => handleAIService('explain')}
                  className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 card-3d"
                >
                  <span className="material-symbols-outlined text-amber-600 depth-layer">lightbulb</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Explain</span>
                </button>
                <button 
                  onClick={() => handleAIService('draft')}
                  className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 card-3d"
                >
                  <span className="material-symbols-outlined text-emerald-600 depth-layer">edit_square</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Draft</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 min-h-[120px] relative border border-slate-100 dark:border-slate-800 shadow-inner">
                {isAILoading ? (
                  <div className="flex items-center justify-center h-full gap-2">
                    <span className="size-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="size-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                ) : aiInsight ? (
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic animate-in fade-in zoom-in-95 duration-500">
                    "{aiInsight}"
                  </p>
                ) : (
                  <p className="text-xs font-bold text-slate-400 text-center mt-8 uppercase tracking-widest">
                    Choose an action above to get started
                  </p>
                )}
              </div>

              {aiInsight && (
                <button 
                  onClick={() => { setInputValue(aiInsight); setIsAISheetOpen(false); setAiInsight(null); }}
                  className="mt-6 w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-3d hover:shadow-3d-hover active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                  Use this text
                </button>
              )}
            </div>
          </div>
        )}

        {/* Message List */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50 dark:bg-[#101922] transition-colors">
          {messagesList.map((msg, idx) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={`max-w-[80%] p-4 rounded-3xl shadow-3d card-3d transition-all ${
                msg.isMe 
                  ? 'bg-blue-600 text-white rounded-br-none shadow-blue-500/10' 
                  : 'bg-white dark:bg-[#1a2632] text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-800 shadow-slate-200/50'
              }`}>
                <p className="text-sm font-medium leading-relaxed depth-layer">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-2 ${msg.isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest">{msg.timestamp}</p>
                  {msg.isMe && <span className="material-symbols-outlined text-[12px]">done_all</span>}
                </div>
              </div>
            </div>
          ))}
        </main>
        
        {/* Footer with AI Suggestions & Input */}
        <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1a2632] flex flex-col z-20 shadow-[0_-1px_10px_rgba(0,0,0,0.02)] transition-all">
          {/* Quick Reply Suggestions */}
          {(suggestions.length > 0 || isSuggesting) && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-6 py-3 border-b border-slate-50 dark:border-slate-800/50 animate-in fade-in slide-in-from-bottom-2">
              {isSuggesting ? (
                <div className="flex gap-2 py-1">
                  {[1,2,3].map(i => <div key={i} className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"></div>)}
                </div>
              ) : (
                suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="shrink-0 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 hover:shadow-sm active:scale-95 transition-all"
                  >
                    {suggestion}
                  </button>
                ))
              )}
            </div>
          )}
          
          <div className="p-4 pb-8 flex gap-3 items-center">
            <button className="size-10 flex items-center justify-center text-slate-400 shrink-0 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] px-4 shadow-inner group focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..." 
                className="w-full bg-transparent border-none py-4 text-sm font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-0" 
              />
              <button className="size-8 flex items-center justify-center text-slate-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
              </button>
            </div>
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`size-12 rounded-2xl flex items-center justify-center shadow-3d transition-all shrink-0 active:scale-90 ${
                inputValue.trim() 
                  ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-500 hover:shadow-3d-hover' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-gray-600 shadow-none'
              }`}
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#101922] transition-colors">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-12 pb-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20 shadow-sm transition-all">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Messages</h1>
      </header>
      <main className="p-6 space-y-4 animate-slide-up">
        {chats.map((chat, idx) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="w-full bg-white dark:bg-[#1a2632] p-4 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-3d transition-all text-left animate-in fade-in slide-in-from-bottom-4 group card-3d"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="relative shrink-0 depth-layer">
              <img src={chat.avatar} className="size-14 rounded-[1.25rem] object-cover shadow-sm group-hover:scale-105 transition-transform" alt={chat.name} />
              {chat.status === 'online' ? (
                <span className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-4 border-white dark:border-[#1a2632] shadow-sm"></span>
              ) : chat.status === 'away' ? (
                <span className="absolute -bottom-1 -right-1 size-4 bg-amber-500 rounded-full border-4 border-white dark:border-[#1a2632] shadow-sm"></span>
              ) : null}
              {chat.unread > 0 && (
                <span className="absolute -top-2 -right-2 size-6 bg-red-500 text-white text-[10px] font-black rounded-full border-4 border-white dark:border-[#1a2632] flex items-center justify-center shadow-lg animate-bounce">
                  {chat.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0 depth-layer">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-extrabold text-slate-900 dark:text-white truncate tracking-tight">{chat.name}</h3>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{chat.time}</span>
              </div>
              <p className={`text-xs truncate transition-colors ${chat.unread > 0 ? 'text-slate-900 dark:text-slate-100 font-black' : 'text-slate-500 dark:text-gray-500 font-medium'}`}>
                {chat.lastMsg}
              </p>
            </div>
          </button>
        ))}
        
        {/* Placeholder for "No more messages" or "Archived" */}
        <div className="pt-10 flex flex-col items-center justify-center text-slate-300 dark:text-gray-700 opacity-50 animate-pulse">
           <span className="material-symbols-outlined text-4xl mb-2">lock</span>
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-end encrypted</p>
        </div>
      </main>
    </div>
  );
};

export default Messages;
