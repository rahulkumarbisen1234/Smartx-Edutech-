
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TutorProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for the specific tutor
  const tutor = {
    id: id || '1',
    name: 'Rajesh Kumar',
    subject: ['Mathematics', 'Physics'],
    rating: 4.8,
    reviewsCount: 128,
    hourlyRate: 500,
    experience: '8 Yrs',
    avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Dedicated educator with a passion for simplifying complex mathematical concepts. I help students achieve their academic goals through personalized attention and innovative teaching methods.',
    qualifications: ['M.Sc. Mathematics, IIT Bombay', 'B.Ed, Delhi University'],
  };

  useEffect(() => {
    const savedFavs = localStorage.getItem('smartx_favorites');
    if (savedFavs) {
      const favs = JSON.parse(savedFavs);
      setIsFavorite(favs.includes(tutor.id));
    }
  }, [tutor.id]);

  const toggleFavorite = () => {
    const savedFavs = localStorage.getItem('smartx_favorites');
    let favs = savedFavs ? JSON.parse(savedFavs) : [];
    
    if (favs.includes(tutor.id)) {
      favs = favs.filter((favId: string) => favId !== tutor.id);
      setIsFavorite(false);
    } else {
      favs.push(tutor.id);
      setIsFavorite(true);
    }
    localStorage.setItem('smartx_favorites', JSON.stringify(favs));
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-[#101922]">
      <div className="relative h-60 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800" 
          className="w-full h-full object-cover" 
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 size-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button 
          onClick={toggleFavorite}
          className={`absolute top-12 right-6 size-10 backdrop-blur-md rounded-full flex items-center justify-center border-2 transition-all ${
            isFavorite ? 'bg-red-500 border-red-500 text-white' : 'bg-white/20 border-white/40 text-white'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
        </button>
      </div>

      <div className="px-6 -mt-16 relative z-10 pb-10">
        <div className="bg-white dark:bg-[#1a2632] rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center text-center">
            <img src={tutor.avatar} className="size-28 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-xl mb-4" alt={tutor.name} />
            <h1 className="text-2xl font-extrabold dark:text-white tracking-tight">{tutor.name}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="material-symbols-outlined text-amber-500 fill-1 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-slate-900 dark:text-white">{tutor.rating}</span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">({tutor.reviewsCount} Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 my-8">
            <ProfileStat label="Exp." value={tutor.experience} />
            <ProfileStat label="Rate" value={`₹${tutor.hourlyRate}`} />
            <ProfileStat label="Students" value="500+" />
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">About Mentor</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                {tutor.bio}
              </p>
            </section>

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Specialization</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subject.map(s => (
                  <span key={s} className="bg-slate-50 dark:bg-slate-800 px-4 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Education</h3>
              <ul className="space-y-2">
                {tutor.qualifications.map((q, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <span className="material-symbols-outlined text-slate-400 text-lg">school</span>
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              onClick={() => navigate('/messages')}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl active:scale-95 transition-all"
            >
              Message
            </button>
            <button 
              onClick={() => alert("Demo Class Booked Successfully!")}
              className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
            >
              Book Demo Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100/50 dark:border-slate-800">
    <span className="text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
  </div>
);

export default TutorProfile;
