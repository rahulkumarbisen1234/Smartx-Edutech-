
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mathematics', 'Physics', 'IIT-JEE', 'NEET'];

  const tests = [
    { id: '1', title: 'Calculus Mock Test 1', category: 'Mathematics', duration: '60 mins', questions: 25, difficulty: 'High' },
    { id: '2', title: 'Newtonian Physics Quiz', category: 'Physics', duration: '30 mins', questions: 15, difficulty: 'Medium' },
    { id: '3', title: 'Chapter-wise: Algebra', category: 'Mathematics', duration: '45 mins', questions: 20, difficulty: 'Easy' },
    { id: '4', title: 'JEE Advanced Paper-1', category: 'IIT-JEE', duration: '180 mins', questions: 60, difficulty: 'Extreme' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#F9FBFE] dark:bg-[#101922]">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-14 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Test Center</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2.5rem] p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-extrabold text-lg mb-1">Upcoming Milestone Test</h3>
            <p className="text-blue-100 text-xs font-bold mb-4 opacity-80 uppercase tracking-widest">Sunday, 15th Sep • 10:00 AM</p>
            <button className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all">Set Reminder</button>
          </div>
          <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-white/10 text-[140px] rotate-12">assignment_turned_in</span>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Available Practice Tests</p>
        
        <div className="space-y-4">
          {tests.filter(t => activeCategory === 'All' || t.category === activeCategory).map((test) => (
            <div key={test.id} className="bg-white dark:bg-[#1a2632] p-5 rounded-3xl border border-slate-50 dark:border-slate-800 shadow-sm flex justify-between items-center group active:scale-[0.98] transition-all">
              <div>
                <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 block">{test.category}</span>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight mb-2">{test.title}</h4>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> {test.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <span className="material-symbols-outlined text-[14px]">quiz</span> {test.questions} Qs
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    test.difficulty === 'High' || test.difficulty === 'Extreme' ? 'text-red-500' : 
                    test.difficulty === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => alert("Starting Test...")}
                className="size-12 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TestCenter;
