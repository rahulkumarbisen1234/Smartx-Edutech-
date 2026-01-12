
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { ICONS } from '../constants';

const Home: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const isStudent = user.role === UserRole.STUDENT;
  const isParent = user.role === UserRole.PARENT;
  const isTutor = user.role === UserRole.TUTOR;
  const isInstitute = user.role === UserRole.INSTITUTE;

  const testimonials = [
    {
      name: "Aarav Sharma",
      quote: "SMARTX helped me clear my JEE doubts instantly. The AI assistant is a lifesaver!",
      avatar: "https://i.pravatar.cc/150?u=aarav",
      role: "Student"
    },
    {
      name: "Isha Patel",
      quote: "Finding the best Physics tutor in my area was so easy. Highly recommend for every student.",
      avatar: "https://i.pravatar.cc/150?u=isha",
      role: "Class 12 Student"
    }
  ];

  return (
    <div className="flex flex-col flex-1 pb-10 bg-[#f6f7f8] dark:bg-[#101922]">
      {/* Header Section */}
      <header className="px-6 pt-14 pb-8 bg-white dark:bg-[#1a2632] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150&h=150" className="relative size-12 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-800" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white dark:border-[#1a2632] shadow-sm"></div>
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-0.5">{user.role} Dashboard</p>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Hi, {user.name.split(' ')[0]} 👋</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-3d transition-all">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="relative size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-3d transition-all">
              <ICONS.Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
            </button>
          </div>
        </div>
        
        {/* Quick Stats Banner */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {isStudent && (
            <>
              <QuickStat value="12" label="Hours Learned" icon="schedule" color="blue" delay="0.1s" />
              <QuickStat value="85%" label="Avg Score" icon="star" color="amber" delay="0.2s" />
              <QuickStat value="4" label="Assignments" icon="task" color="emerald" delay="0.3s" />
            </>
          )}
          {isParent && (
            <>
              <QuickStat value="92%" label="Attendance" icon="person_check" color="emerald" delay="0.1s" />
              <QuickStat value="A-" label="Latest Grade" icon="grade" color="blue" delay="0.2s" />
              <QuickStat value="₹2.5k" label="Pending Fees" icon="payments" color="red" delay="0.3s" />
            </>
          )}
          {isTutor && (
            <>
              <QuickStat value="₹42k" label="Earnings" icon="payments" color="emerald" delay="0.1s" />
              <QuickStat value="128" label="Students" icon="groups" color="blue" delay="0.2s" />
              <QuickStat value="4.9" label="Rating" icon="star" color="amber" delay="0.3s" />
            </>
          )}
          {isInstitute && (
            <>
              <QuickStat value="₹3.2L" label="Revenue" icon="trending_up" color="emerald" delay="0.1s" />
              <QuickStat value="24" label="Tutors" icon="school" color="indigo" delay="0.2s" />
              <QuickStat value="840" label="Enrollments" icon="group_add" color="blue" delay="0.3s" />
            </>
          )}
        </div>
      </header>

      <main className="px-6 pt-6 space-y-10">
        {/* Primary Action Section */}
        <section className="animate-slide-up [animation-delay:0.4s]">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              {isStudent ? "Happening Now" : isParent ? "Child's Schedule" : isTutor ? "Your Next Class" : "Institute Overview"}
            </h2>
            {(isStudent || isTutor) && (
              <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full animate-pulse-soft">
                <span className="size-1.5 bg-red-600 dark:bg-red-400 rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
              </div>
            )}
          </div>
          
          <div className="relative group overflow-hidden bg-slate-900 dark:bg-[#1a2632] rounded-[2rem] p-6 shadow-3d hover:shadow-3d-hover card-3d">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white depth-layer">
                  <span className="material-symbols-outlined text-2xl animate-float">
                    {isStudent || isTutor ? "functions" : isParent ? "child_care" : "analytics"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">
                    {isInstitute ? "Weekly Growth" : "Mathematics"}
                  </p>
                  <p className="text-white font-bold">{isInstitute ? "+12% Revenue" : "10:00 - 11:30"}</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight leading-tight depth-layer">
                {isStudent ? "Complex Algebra & Matrices" : 
                 isParent ? "Arjun's Physics Demo Class" :
                 isTutor ? "Morning Batch - Calculus" :
                 "Monthly Performance Report"}
              </h3>
              <p className="text-slate-400 text-sm font-medium mb-6 flex items-center gap-2">
                {!isInstitute && (
                  <>
                    <img src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=150&h=150" className="size-6 rounded-full border border-white/20" alt="Teacher" />
                    {isTutor ? "32 Students Joined" : "With Prof. Amit Sharma"}
                  </>
                )}
                {isInstitute && "8 New Tutors Onboarded"}
              </p>
              <button 
                onClick={() => navigate('/classes')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-xl depth-layer"
              >
                {isStudent ? "Join Classroom" : isTutor ? "Start Teaching" : isParent ? "Monitor Progress" : "Detailed Analytics"}
              </button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="animate-slide-up [animation-delay:0.5s]">
          <div className="grid grid-cols-4 gap-4">
            {isStudent && (
              <>
                <NavCategory onClick={() => navigate('/study-materials')} icon="menu_book" label="Library" color="indigo" delay="0.1s" />
                <NavCategory onClick={() => navigate('/tests')} icon="edit_note" label="Tests" color="amber" delay="0.2s" />
                <NavCategory onClick={() => navigate('/messages')} icon="forum" label="Doubts" color="emerald" delay="0.3s" />
                <NavCategory onClick={() => navigate('/profile')} icon="workspace_premium" label="Awards" color="purple" delay="0.4s" />
              </>
            )}
            {isParent && (
              <>
                <NavCategory onClick={() => navigate('/tests')} icon="visibility" label="Grades" color="blue" delay="0.1s" />
                <NavCategory onClick={() => navigate('/classes')} icon="calendar_today" label="Events" color="amber" delay="0.2s" />
                <NavCategory onClick={() => navigate('/messages')} icon="chat" label="Teacher" color="emerald" delay="0.3s" />
                <NavCategory onClick={() => navigate('/payments')} icon="credit_card" label="Fees" color="purple" delay="0.4s" />
              </>
            )}
            {isTutor && (
              <>
                <NavCategory onClick={() => navigate('/classes')} icon="add_box" label="Create" color="blue" delay="0.1s" />
                <NavCategory onClick={() => navigate('/study-materials')} icon="upload_file" label="Upload" color="amber" delay="0.2s" />
                <NavCategory onClick={() => navigate('/tests')} icon="grading" label="Grading" color="emerald" delay="0.3s" />
                <NavCategory onClick={() => navigate('/profile')} icon="bar_chart" label="Stats" color="purple" delay="0.4s" />
              </>
            )}
            {isInstitute && (
              <>
                <NavCategory onClick={() => navigate('/browse')} icon="person_add" label="Hiring" color="blue" delay="0.1s" />
                <NavCategory onClick={() => navigate('/payments')} icon="payments" label="Payroll" color="emerald" delay="0.2s" />
                <NavCategory onClick={() => navigate('/classes')} icon="hub" label="Batches" color="amber" delay="0.3s" />
                <NavCategory onClick={() => navigate('/messages')} icon="campaign" label="Notice" color="purple" delay="0.4s" />
              </>
            )}
          </div>
        </section>

        {/* Dynamic List Section */}
        <section className="animate-slide-up [animation-delay:0.6s]">
          <div className="flex justify-between items-center mb-5 px-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              {isStudent ? "Your Courses" : isParent ? "Child's Instructors" : isTutor ? "Recent Assignments" : "Tutor Performance"}
            </h2>
            <button onClick={() => navigate(isStudent ? '/classes' : '/browse')} className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {isStudent && (
              <>
                <ModernCourseCard onClick={() => navigate('/classes')} title="Physics: Quantum Mechanics" detail="Dr. Vikram Sarabhai" progress={68} image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80" />
                <ModernCourseCard onClick={() => navigate('/classes')} title="History: Ancient Civilizations" detail="Prof. Meera Nair" progress={32} image="https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&w=400&q=80" />
              </>
            )}
            {isTutor && (
              <>
                <ModernCourseCard onClick={() => navigate('/tests')} title="Algebra Quiz #4" detail="Class 10-B • 45/50 Submitted" progress={90} image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80" />
                <ModernCourseCard onClick={() => navigate('/tests')} title="Force & Laws Review" detail="Class 9-A • 22/30 Submitted" progress={73} image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80" />
              </>
            )}
            {(isParent || isInstitute) && (
              <>
                <ModernCourseCard onClick={() => navigate('/tutor/1')} title="Rajesh Kumar" detail="Mathematics • 4.8 Rating" progress={95} image="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=150&h=150" showProgressLabel={false} />
                <ModernCourseCard onClick={() => navigate('/tutor/2')} title="Priya Singh" detail="English • 4.9 Rating" progress={100} image="https://images.unsplash.com/photo-1594136973333-cd5566f80993?auto=format&fit=crop&q=80&w=150&h=150" showProgressLabel={false} />
              </>
            )}
          </div>
        </section>

        {/* Student Testimonials Section */}
        <section className="animate-slide-up [animation-delay:0.7s]">
          <div className="flex justify-between items-center mb-5 px-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">Voices of Success</h2>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Verified Students</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#1a2632] p-6 rounded-[2rem] shadow-sm hover:shadow-3d transition-all border border-slate-100 dark:border-slate-800 relative group card-3d"
              >
                <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl">format_quote</span>
                </div>
                <div className="flex items-center gap-4 mb-4 depth-layer">
                  <div className="relative">
                    <img src={t.avatar} className="size-12 rounded-2xl object-cover shadow-md" alt={t.name} />
                    <div className="absolute -bottom-1 -right-1 size-4 bg-blue-600 rounded-full border-2 border-white dark:border-[#1a2632] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[8px] text-white font-black">check</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-none">{t.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm italic font-medium text-slate-600 dark:text-gray-400 leading-relaxed depth-layer">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const QuickStat: React.FC<{ value: string; label: string; icon: string; color: string; delay?: string }> = ({ value, label, icon, color, delay }) => (
  <div 
    className="shrink-0 flex items-center gap-3 bg-white dark:bg-[#1a2632] border border-slate-100 dark:border-slate-800 rounded-2xl p-3 pr-6 shadow-sm hover:shadow-3d transition-all animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className={`size-10 rounded-xl flex items-center justify-center bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 animate-float`} style={{ animationDelay: delay }}>
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{value}</p>
      <p className="text-[9px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">{label}</p>
    </div>
  </div>
);

const NavCategory: React.FC<{ icon: string; label: string; color: string; onClick?: () => void; delay?: string }> = ({ icon, label, color, onClick, delay }) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center gap-2 group animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className={`size-14 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400 transition-all duration-300 group-hover:scale-110 group-active:scale-95 shadow-sm group-hover:shadow-3d card-3d`}>
      <span className="material-symbols-outlined text-2xl font-medium depth-layer">{icon}</span>
    </div>
    <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-tight">{label}</span>
  </button>
);

const ModernCourseCard: React.FC<{ title: string; detail: string; progress: number; image: string; showProgressLabel?: boolean; onClick?: () => void }> = ({ title, detail, progress, image, showProgressLabel = true, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-4 bg-white dark:bg-[#1a2632] p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-3d transition-all group cursor-pointer card-3d">
    <div className="size-20 rounded-xl overflow-hidden shrink-0">
      <img src={image} className="size-full object-cover transition-transform group-hover:scale-110 duration-500" alt={title} />
    </div>
    <div className="flex-1 min-w-0 pr-2">
      <h4 className="font-bold text-slate-900 dark:text-white truncate tracking-tight depth-layer">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mb-3">{detail}</p>
      {showProgressLabel && (
        <div className="flex flex-col gap-1.5 depth-layer">
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500">{progress}% {progress === 100 ? 'Active' : 'Progress'}</span>
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Home;
