
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Tutor } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, theme, toggleTheme, language, toggleLanguage }) => {
  const navigate = useNavigate();
  const isHindi = language === 'hi';
  const [favoriteTutors, setFavoriteTutors] = useState<Tutor[]>([]);

  // Mock data for reference (should ideally come from a central store/service)
  const allTutors: Tutor[] = [
    { id: '1', name: 'Rajesh Kumar', subject: ['Mathematics', 'Physics'], rating: 4.8, reviewsCount: 128, hourlyRate: 500, experience: '8 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '2', name: 'Priya Singh', subject: ['English', 'Literature'], rating: 4.9, reviewsCount: 85, hourlyRate: 400, experience: '5 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1594136973333-cd5566f80993?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '3', name: 'Amit Patel', subject: ['Chemistry', 'Biology'], rating: 5.0, reviewsCount: 42, hourlyRate: 600, experience: '12 Yrs', verified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
  ];

  useEffect(() => {
    const savedFavs = localStorage.getItem('smartx_favorites');
    if (savedFavs) {
      const favIds = JSON.parse(savedFavs);
      const filtered = allTutors.filter(t => favIds.includes(t.id));
      setFavoriteTutors(filtered);
    }
  }, []);
  
  return (
    <div className="flex flex-col flex-1 bg-[#F9FBFE] dark:bg-[#101922] transition-colors duration-300">
      <header className="bg-white dark:bg-[#1a2632] px-8 pt-16 pb-12 border-b border-slate-50 dark:border-slate-800 text-center flex flex-col items-center shadow-sm">
        <div className="relative mb-6">
          <div className="size-28 rounded-[2.5rem] p-1 bg-gradient-to-tr from-blue-600 to-indigo-400 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200" 
              className="size-full rounded-[2.25rem] object-cover border-4 border-white dark:border-slate-700" 
              alt="Profile"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 size-10 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-700 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg uppercase tracking-[0.2em]">{user.role}</span>
          <span className="size-1 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
          <p className="text-slate-400 dark:text-gray-500 text-[11px] font-bold uppercase tracking-widest">UID: SM-92831</p>
        </div>
      </header>

      <main className="p-6 space-y-8 animate-slide-up pb-10">
        <div className="grid grid-cols-2 gap-4">
          <ProfileTile onClick={() => navigate('/profile')} icon="person" label={isHindi ? "प्रोफ़ाइल" : "Profile"} color="blue" />
          <ProfileTile onClick={() => navigate('/payments')} icon="payments" label={isHindi ? "बिलिंग" : "Billing"} color="emerald" />
          <ProfileTile onClick={() => navigate('/tests')} icon="emoji_events" label={isHindi ? "सांख्यिकी" : "Stats"} color="amber" />
          <ProfileTile onClick={() => navigate('/profile')} icon="lock" label={isHindi ? "सुरक्षा" : "Safety"} color="purple" />
        </div>

        {/* Favorites Section */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2 mb-4">
            {isHindi ? "पसंदीदा शिक्षक" : "Favorite Tutors"}
          </h3>
          <div className="space-y-3">
            {favoriteTutors.length > 0 ? (
              favoriteTutors.map(tutor => (
                <div 
                  key={tutor.id} 
                  onClick={() => navigate(`/tutor/${tutor.id}`)}
                  className="bg-white dark:bg-[#1a2632] p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
                >
                  <img src={tutor.avatar} className="size-12 rounded-xl object-cover" alt={tutor.name} />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm dark:text-white">{tutor.name}</h4>
                    <p className="text-[10px] text-slate-400">{tutor.subject.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                    <span className="text-xs font-bold">{tutor.rating}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-[#1a2632] p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
                <p className="text-xs font-medium text-slate-400">
                  {isHindi ? "अभी तक कोई पसंदीदा नहीं" : "No favorites yet. Explore mentors!"}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2 mb-4">{isHindi ? "सेटिंग्स और सहायता" : "Settings & Support"}</h3>
          <div className="bg-white dark:bg-[#1a2632] rounded-[2rem] border border-slate-50 dark:border-slate-800 shadow-sm overflow-hidden p-2">
            <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{theme === 'dark' ? (isHindi ? 'लाइट मोड' : 'Light Mode') : (isHindi ? 'डार्क मोड' : 'Dark Mode')}</span>
              </div>
            </button>

            <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-xl">translate</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{isHindi ? 'English (En)' : 'Hindi (हिं)'}</span>
              </div>
            </button>

            <MenuLink icon="help_center" label={isHindi ? "सहायता केंद्र" : "Help Center"} />
            <MenuLink icon="settings" label={isHindi ? "ऐप सेटिंग्स" : "App Settings"} />
          </div>
        </section>

        <button 
          onClick={onLogout}
          className="w-full h-16 bg-white dark:bg-[#1a2632] text-red-500 font-extrabold rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all flex items-center justify-center gap-3 border border-red-50 dark:border-red-900/20 active:scale-[0.98] shadow-sm"
        >
          <span className="material-symbols-outlined">logout</span> 
          <span className="uppercase tracking-widest text-xs">{isHindi ? "लॉग आउट" : "Sign Out"}</span>
        </button>

        <div className="text-center space-y-2 py-4">
          <p className="text-[10px] text-slate-300 dark:text-gray-600 font-black uppercase tracking-[0.3em]">Version 2.4.0 Stable</p>
          <p className="text-slate-300 dark:text-gray-600 text-xs font-medium">© 2025 SMARTX Pvt Ltd.</p>
        </div>
      </main>
    </div>
  );
};

const ProfileTile: React.FC<{ icon: string; label: string; color: string; onClick?: () => void }> = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-[2rem] border border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-50 dark:hover:border-blue-900/50 transition-all group active:scale-95">
    <div className={`size-12 rounded-2xl mb-3 flex items-center justify-center bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{label}</span>
  </button>
);

const MenuLink: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group">
    <div className="flex items-center gap-4">
      <div className="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{label}</span>
    </div>
    <span className="material-symbols-outlined text-slate-200 dark:text-gray-700 text-sm group-hover:text-slate-400 translate-x-0 group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
  </button>
);

export default Profile;
