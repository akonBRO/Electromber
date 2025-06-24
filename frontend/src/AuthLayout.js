
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // if used
import { useTheme } from './ThemeContext'; 


import { Mail, Lock, User } from 'lucide-react'; // or your icon library
import {
  Lightbulb,
  Wrench,
  Zap,
  Pipette,
  ArrowLeft,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Search,
  Edit,
  MessageSquare
} from 'lucide-react'; // or another icon lib you're using





// --- FILE: src/auth/AuthLayout.js ---
const BackgroundAnimation = () => {
    const icons = [ { icon: <Lightbulb size={30} />, p: 'top-1/4 left-1/4', d: 12 }, { icon: <Wrench size={40} />, p: 'top-1/2 right-1/4', d: 10 }, { icon: <Zap size={25} />, p: 'bottom-1/4 left-1/3', d: 8 }, { icon: <Pipette size={35} />, p: 'top-1/3 right-1/2', d: 11 }, { icon: <Wrench size={20} />, p: 'bottom-1/2 left-1/5', d: 9 }, { icon: <Lightbulb size={45} />, p: 'top-3/4 right-1/3', d: 13 }, { icon: <Zap size={30} />, p: 'top-1/5 right-1/6', d: 7 }, { icon: <Pipette size={25} />, p: 'bottom-1/4 right-3/4', d: 9.5 }, ];
    return ( <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true"> <style>{`@keyframes drift{0%{transform:translate(0,0) rotate(0deg);opacity:0}20%{opacity:.2}50%{transform:translate(20px,-30px) rotate(25deg)}80%{opacity:.2}100%{transform:translate(-10px,10px) rotate(-5deg);opacity:0}}.floating-icon{animation:drift ease-in-out infinite}`}</style> {icons.map((i,x)=>(<div key={x} className={`absolute text-gray-400/20 dark:text-gray-600/20 floating-icon ${i.p}`} style={{animationDuration:`${i.d}s`,animationDelay:`${x*1.5}s`}}>{i.icon}</div>))}</div> );
};

const AuthLayout = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
            <BackgroundAnimation />
            <div className="absolute top-5 left-5 z-10"> <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-[#F4743B] p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-700/50"><ArrowLeft size={20}/><span>Back to Home</span></Link></div>
            <div className="absolute top-5 right-5 z-10"><button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/50" aria-label="Toggle theme">{theme==='light'?<Moon size={20}/>:<Sun size={20}/>}</button></div>
            <div className="w-full max-w-md z-10"><div className="text-center mb-8"><div className="inline-block w-16 h-16 bg-orange-500/20 rounded-lg"></div><h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">ELECTROMBER</h1></div>{children}</div>
        </div>
    );
};
export default AuthLayout;