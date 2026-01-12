
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { ClassSession, UserRole } from '../types';

interface ClassesProps {
  userRole?: UserRole;
}

const Classes: React.FC<ClassesProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'live' | 'recorded'>('live');
  const isEduProvider = userRole === UserRole.TUTOR || userRole === UserRole.INSTITUTE;

  const classes: ClassSession[] = [
    { id: '1', title: 'Quadratic Equations Deep Dive', tutorName: 'Prof. Rajesh Sharma', time: '10:00 AM', type: 'live', subject: 'Mathematics', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'Modern Physics - Atomic Structure', tutorName: 'Dr. Anita Verma', time: 'Yesterday', type: 'recorded', subject: 'Physics', thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: 'Organic Chemistry Basics', tutorName: 'Prof. S. Gupta', time: '2:00 PM', type: 'live', subject: 'Chemistry', thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf51ad990c5?auto=format&fit=crop&q=80&w=400' },
    { id: '4', title: 'Grammar 101: Parts of Speech', tutorName: 'Smt. Meenakshi Iyer', time: '2 Days ago', type: 'recorded', subject: 'English', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400' },
  ];

  const filtered = classes.filter(c => c.type === activeTab);

  const handleJoinClass = (id: string) => {
    alert(`Joining Class: ${id}. Integrating Agora.io for real-time video...`);
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#101922] transition-colors">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-12 pb-2 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-2xl font-bold dark:text-white">
              {isEduProvider ? "Manage Sessions" : "Your Classes"}
            </h1>
          </div>
          <div className="flex gap-2">
            {isEduProvider && (
              <button className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                <span className="material-symbols-outlined">add</span>
              </button>
            )}
            <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ICONS.Bell className="w-5 h-5 text-slate-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
          <button 
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'live' ? 'bg-white dark:bg-[#1a2632] text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-gray-500'}`}
          >
            {isEduProvider ? "Upcoming" : "Live Sessions"}
          </button>
          <button 
            onClick={() => setActiveTab('recorded')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'recorded' ? 'bg-white dark:bg-[#1a2632] text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-gray-500'}`}
          >
            {isEduProvider ? "Library" : "Recorded Videos"}
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleJoinClass(item.id)}
              className="bg-white dark:bg-[#1a2632] rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="relative aspect-video">
                <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="size-14 rounded-full bg-white/90 backdrop-blur-sm text-blue-700 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <ICONS.Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                </div>
                {item.type === 'live' && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                    <span className="size-1.5 bg-white rounded-full animate-pulse"></span> {isEduProvider ? 'Scheduled' : 'Live Now'}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">{item.subject}</p>
                    <h3 className="font-bold text-lg leading-tight dark:text-white">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 font-medium mt-1">{isEduProvider ? 'Batch 2025' : item.tutorName} • {item.time}</p>
                  </div>
                  {isEduProvider && (
                    <button className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">settings</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-20">upcoming</span>
             <p className="font-bold text-lg">No sessions scheduled</p>
             <p className="text-sm font-medium">Check back later for updates</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Classes;
