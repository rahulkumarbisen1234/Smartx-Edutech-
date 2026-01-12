
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudyMaterials: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Mathematics', items: 124, icon: 'functions', color: 'blue' },
    { name: 'Physics', items: 85, icon: 'science', color: 'indigo' },
    { name: 'Chemistry', items: 62, icon: 'biotech', color: 'emerald' },
    { name: 'English', items: 45, icon: 'translate', color: 'amber' },
    { name: 'Biology', items: 38, icon: 'biology', color: 'rose' },
    { name: 'Social Studies', items: 55, icon: 'public', color: 'orange' },
  ];

  const recent = [
    { title: 'Algebra Formula Sheet', type: 'PDF', size: '1.2 MB', date: 'Today' },
    { title: 'Optics Chapter Notes', type: 'PDF', size: '4.5 MB', date: 'Yesterday' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#F9FBFE] dark:bg-[#101922]">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-14 pb-6 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Study Library</h1>
        </div>
      </header>

      <main className="p-6 space-y-8 animate-slide-up">
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Subject Folders</h2>
            <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Manage</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {subjects.map((sub) => (
              <button key={sub.name} className="bg-white dark:bg-[#1a2632] p-5 rounded-[2rem] border border-slate-50 dark:border-slate-800 shadow-sm text-left group active:scale-95 transition-all">
                <div className={`size-12 rounded-2xl bg-${sub.color}-50 dark:bg-${sub.color}-900/20 text-${sub.color}-600 dark:text-${sub.color}-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined">{sub.icon}</span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white tracking-tight">{sub.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sub.items} Files</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Recently Accessed</h2>
            <span className="material-symbols-outlined text-slate-300">history</span>
          </div>
          <div className="space-y-3">
            {recent.map((file, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-[#1a2632] p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm">
                <div className="size-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined font-black">picture_as_pdf</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate tracking-tight">{file.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{file.size} • {file.date}</p>
                </div>
                <button className="size-10 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-xl">download</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudyMaterials;
