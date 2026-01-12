
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Browse from './pages/Browse';
import TutorProfile from './pages/TutorProfile';
import Classes from './pages/Classes';
import TestCenter from './pages/TestCenter';
import StudyMaterials from './pages/StudyMaterials';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Payments from './pages/Payments';
import Onboarding from './pages/Onboarding';
import AIChatButton from './components/AIChatButton';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smartx_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('smartx_theme') as 'light' | 'dark') || 'light';
  });

  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('smartx_lang') as 'en' | 'hi') || 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('smartx_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('smartx_lang', language);
  }, [language]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('smartx_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smartx_user');
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f6f7f8] dark:bg-[#101922] pb-20 max-w-lg mx-auto shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 transition-colors duration-300">
        <Routes>
          {!user ? (
            <Route path="*" element={<Onboarding onLogin={handleLogin} language={language} toggleLanguage={toggleLanguage} />} />
          ) : (
            <>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/browse" element={<Browse userRole={user.role} />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/classes" element={<Classes userRole={user.role} />} />
              <Route path="/tests" element={<TestCenter />} />
              <Route path="/study-materials" element={<StudyMaterials />} />
              <Route path="/messages" element={<Messages user={user} />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} language={language} toggleLanguage={toggleLanguage} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        
        {user && <Navigation />}
        {user && <AIChatButton />}
      </div>
    </Router>
  );
};

export default App;
