
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../constants';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: ICONS.Home },
    { path: '/browse', label: 'Browse', icon: ICONS.Search },
    { path: '/classes', label: 'Classes', icon: ICONS.Play },
    { path: '/messages', label: 'Messages', icon: ICONS.Message },
    { path: '/profile', label: 'Profile', icon: ICONS.User },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-lg bg-white dark:bg-[#1a2632] border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-40 transition-colors duration-300">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-gray-500'
            }`
          }
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
