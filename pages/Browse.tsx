
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { Tutor, UserRole } from '../types';

interface BrowseProps {
  userRole?: UserRole;
}

const Browse: React.FC<BrowseProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const isEduProvider = userRole === UserRole.TUTOR || userRole === UserRole.INSTITUTE;
  const subjects = ['All', 'Mathematics', 'Physics', 'English', 'Chemistry', 'Biology'];

  const tutors: Tutor[] = [
    { id: '1', name: 'Rajesh Kumar', subject: ['Mathematics', 'Physics'], rating: 4.8, reviewsCount: 128, hourlyRate: 500, experience: '8 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '2', name: 'Priya Singh', subject: ['English', 'Literature'], rating: 4.9, reviewsCount: 85, hourlyRate: 400, experience: '5 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1594136973333-cd5566f80993?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '3', name: 'Amit Patel', subject: ['Chemistry', 'Biology'], rating: 5.0, reviewsCount: 42, hourlyRate: 600, experience: '12 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
  ];

  useEffect(() => {
    const savedFavs = localStorage.getItem('smartx_favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('smartx_favorites', JSON.stringify(newFavs));
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F9FBFE] dark:bg-[#101922] transition-colors">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-14 pb-4 sticky top-0 z-20 shadow-sm transition-colors">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-slide-up">
          {isEduProvider ? "Market" : "Explore"} <br/>
          <span className="text-blue-600 dark:text-blue-400">
            {isEduProvider ? "Opportunities" : "Top Mentors"}
          </span>
        </h1>
        
        <div className="relative mb-6 group animate-slide-up [animation-delay:0.1s]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">search</span>
          </div>
          <input
            type="text"
            placeholder={isEduProvider ? "Search student requests..." : "Search courses, tutors..."}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-4 h-14 font-medium text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-600 shadow-sm focus:shadow-3d"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 animate-slide-up [animation-delay:0.2s]">
          {subjects.map((subject, i) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                selectedSubject === subject 
                  ? 'bg-blue-600 text-white shadow-3d-hover' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-5">
        {isEduProvider ? (
          <div className="space-y-6">
            <div className="bg-blue-600 text-white p-6 rounded-[2rem] shadow-3d hover:shadow-3d-hover relative overflow-hidden card-3d animate-slide-up [animation-delay:0.3s]">
               <div className="relative z-10 depth-layer">
                 <h3 className="font-bold text-lg mb-1">Trending Subjects</h3>
                 <p className="text-blue-100 text-xs mb-4">Mathematics is in high demand this week!</p>
                 <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all">See Analytics</button>
               </div>
               <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-[120px] animate-float">trending_up</span>
            </div>
            
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 animate-slide-up [animation-delay:0.4s]">Open Student Requests</p>
            <div className="space-y-4">
              <RequestCard name="Karan Sharma" subject="JEE Physics" detail="Looking for a 1-month crash course." delay="0.5s" />
              <RequestCard name="Sneha Reddy" subject="Class 10 Math" detail="Need help with Trigonometry specifically." delay="0.6s" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center px-1 mb-2 animate-slide-up [animation-delay:0.3s]">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400">Available experts ({tutors.length})</p>
              <button className="size-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 shadow-sm hover:shadow-3d transition-all">
                <ICONS.Filter className="w-4 h-4" />
              </button>
            </div>

            {tutors.map((tutor, idx) => (
              <ModernTutorCard 
                key={tutor.id} 
                tutor={tutor} 
                isFavorite={favorites.includes(tutor.id)}
                onToggleFavorite={(e) => toggleFavorite(tutor.id, e)}
                onClick={() => navigate(`/tutor/${tutor.id}`)} 
                delay={`${0.4 + idx * 0.1}s`}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

const RequestCard: React.FC<{ name: string; subject: string; detail: string; delay?: string }> = ({ name, subject, detail, delay }) => (
  <div 
    className="bg-white dark:bg-[#1a2632] p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-3d transition-all card-3d animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex justify-between items-start mb-2 depth-layer">
      <h4 className="font-bold dark:text-white">{name}</h4>
      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded uppercase">{subject}</span>
    </div>
    <p className="text-sm text-slate-500 dark:text-gray-400 mb-4 depth-layer">{detail}</p>
    <button className="w-full py-3 bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-transform shadow-md depth-layer">Send Proposal</button>
  </div>
);

const ModernTutorCard: React.FC<{ tutor: Tutor; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void; onClick: () => void; delay?: string }> = ({ tutor, isFavorite, onToggleFavorite, onClick, delay }) => (
  <div 
    onClick={onClick} 
    className="bg-white dark:bg-[#1a2632] rounded-[2rem] p-5 shadow-sm border border-slate-50 dark:border-slate-800 group hover:border-blue-100 transition-all hover:shadow-3d-hover cursor-pointer card-3d animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex gap-5 mb-5">
      <div className="relative shrink-0 depth-layer">
        <img src={tutor.avatar} className="size-20 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-blue-50 transition-all shadow-md" alt={tutor.name} />
        {tutor.verified && (
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-lg p-1 border-2 border-white dark:border-[#1a2632] shadow-3d animate-pulse-soft">
            <span className="material-symbols-outlined text-xs font-bold">verified</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 depth-layer">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white truncate leading-tight tracking-tight">{tutor.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase shadow-sm">
              <span className="material-symbols-outlined text-[12px] fill-current">star</span>
              {tutor.rating}
            </div>
            <button 
              onClick={onToggleFavorite}
              className={`size-7 rounded-lg flex items-center justify-center transition-all ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-300 dark:bg-slate-800'}`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
            </button>
          </div>
        </div>
        <p className="text-xs font-medium text-slate-400 dark:text-gray-500 mb-3">{tutor.experience} Teaching Exp.</p>
        <div className="flex flex-wrap gap-1.5">
          {tutor.subject.map(s => (
            <span key={s} className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-gray-400 text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">{s}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800 depth-layer">
      <div>
        <p className="text-[9px] font-black text-slate-300 dark:text-gray-600 uppercase tracking-widest leading-none mb-1">Fee Starts at</p>
        <p className="text-xl font-black text-slate-900 dark:text-white leading-none">₹{tutor.hourlyRate}<span className="text-xs font-bold text-slate-400 dark:text-gray-500">/hr</span></p>
      </div>
      <button className="bg-slate-900 dark:bg-blue-600 text-white font-bold px-7 py-3 rounded-2xl transition-all shadow-3d active:scale-95 text-xs group-hover:shadow-3d-hover">
        Book Trial
      </button>
    </div>
  </div>
);

export default Browse;
