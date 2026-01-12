
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface OnboardingProps {
  onLogin: (user: User) => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onLogin, language, toggleLanguage }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
  const [phone, setPhone] = useState('');
  const isHindi = language === 'hi';

  const roles = [
    { role: UserRole.STUDENT, icon: 'backpack', label: isHindi ? 'छात्र' : 'Student', color: 'blue' },
    { role: UserRole.PARENT, icon: 'family_restroom', label: isHindi ? 'अभिभावक' : 'Parent', color: 'emerald' },
    { role: UserRole.TUTOR, icon: 'cast_for_education', label: isHindi ? 'शिक्षक' : 'Teacher', color: 'amber' },
    { role: UserRole.INSTITUTE, icon: 'apartment', label: isHindi ? 'संस्थान' : 'Institute', color: 'indigo' },
  ];

  const getPlaceholder = () => {
    if (isHindi) {
      switch (selectedRole) {
        case UserRole.STUDENT: return 'छात्र आईडी दर्ज करें';
        case UserRole.PARENT: return 'अभिभावक आईडी दर्ज करें';
        case UserRole.TUTOR: return 'शिक्षक आईडी दर्ज करें';
        case UserRole.INSTITUTE: return 'संस्थान आईडी दर्ज करें';
        default: return '98765 XXXXX';
      }
    } else {
      switch (selectedRole) {
        case UserRole.STUDENT: return 'Enter Student ID';
        case UserRole.PARENT: return 'Enter Parent ID';
        case UserRole.TUTOR: return 'Enter Teacher ID';
        case UserRole.INSTITUTE: return 'Enter Institute ID';
        default: return '98765 XXXXX';
      }
    }
  };

  const handleStart = () => {
    if (phone.length < 10) return alert(isHindi ? 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
    onLogin({
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: isHindi ? 'अर्जुन गुप्ता' : 'Arjun Gupta',
      role: selectedRole,
      email: 'arjun@example.com',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-display text-[#111418] dark:text-white transition-colors duration-300">
      {/* Top App Bar */}
      <div className="flex items-center justify-between p-4 pb-2 sticky top-0 z-50 bg-[#f6f7f8]/80 dark:bg-[#101922]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 animate-pulse-soft">
            <span className="material-symbols-outlined text-2xl font-medium">school</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">SMARTX</h2>
        </div>
        
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-slate-500 dark:text-gray-400 text-lg">translate</span>
          <p className="text-xs font-bold">{isHindi ? 'Eng / Hin' : 'Hin / Eng'}</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-10 max-w-lg mx-auto w-full">
        {/* 3D Hero Illustration placeholder */}
        <div className="relative h-48 mb-6 flex items-center justify-center animate-float">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 size-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-3d flex items-center justify-center transform rotate-12">
            <span className="material-symbols-outlined text-white text-6xl">rocket_launch</span>
          </div>
          <div className="absolute -bottom-4 -right-2 size-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-3d flex items-center justify-center transform -rotate-6">
            <span className="material-symbols-outlined text-white text-2xl">auto_stories</span>
          </div>
          <div className="absolute top-4 -left-2 size-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-3d flex items-center justify-center transform rotate-6">
            <span className="material-symbols-outlined text-white text-2xl">grade</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-[32px] font-bold leading-tight mb-2 animate-slide-up">
            {isHindi ? 'नमस्ते!' : 'Namaste!'} <br/> 
            <span className="text-blue-600">
              {isHindi ? 'आज ही सीखना शुरू करें' : 'Start Learning Today'}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm font-medium animate-slide-up [animation-delay:0.1s]">
            {isHindi ? 'जारी रखने के लिए अपनी भूमिका चुनें:' : 'Select who you are to continue:'}
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {roles.map((item, idx) => (
            <button
              key={item.role}
              onClick={() => setSelectedRole(item.role)}
              className={`group relative flex flex-col items-center justify-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 shadow-sm card-3d animate-slide-up [animation-delay:${0.2 + idx*0.05}s] ${
                selectedRole === item.role
                  ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/20 shadow-blue-500/10'
                  : 'border-white dark:border-gray-700 bg-white dark:bg-[#1a2632] hover:border-blue-200'
              }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 depth-layer group-hover:scale-110 ${
                selectedRole === item.role 
                  ? 'bg-blue-600 text-white shadow-3d-hover translate-y-[-4px]' 
                  : 'bg-slate-50 dark:bg-gray-700 text-slate-600 dark:text-gray-300'
              }`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <p className={`text-base font-bold transition-all ${selectedRole === item.role ? 'text-blue-600 scale-105' : 'text-slate-700 dark:text-slate-200'}`}>
                {item.label}
              </p>
              
              {selectedRole === item.role && (
                <div className="absolute top-3 right-3 text-blue-600 animate-in zoom-in duration-300">
                  <span className="material-symbols-outlined fill-1 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Input */}
        <div className="space-y-3 mb-8 animate-slide-up [animation-delay:0.4s]">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
          </label>
          <div className="flex w-full items-stretch rounded-2xl overflow-hidden shadow-sm border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-[#1a2632] focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-3d transition-all">
            <div className="flex items-center justify-center px-5 bg-slate-50 dark:bg-gray-800 border-r border-[#dbe0e6] dark:border-gray-700">
              <span className="text-lg font-bold">+91</span>
            </div>
            <input 
              className="flex-1 bg-transparent border-none h-16 px-5 text-lg font-bold tracking-widest focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-gray-600"
              placeholder={getPlaceholder()}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
            <div className="flex items-center justify-center pr-5 text-slate-300 dark:text-gray-500">
              <span className="material-symbols-outlined">smartphone</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 flex flex-col gap-4 animate-slide-up [animation-delay:0.5s]">
          <button 
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 rounded-2xl text-lg shadow-3d hover:shadow-3d-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            {isHindi ? 'ओटीपी प्राप्त करें' : 'Get OTP'}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          
          <div className="text-center mt-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              By logging in, you agree to our <br/>
              <span className="text-blue-500 underline underline-offset-2">Terms of Service</span> & <span className="text-blue-500 underline underline-offset-2">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
