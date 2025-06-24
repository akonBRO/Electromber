// --- FILE: src/auth/LoginPage.js ---
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // if used
import { Mail, Lock, User } from 'lucide-react'; // or your icon library
import AuthLayout from '../AuthLayout'; // update path if different
import { useTheme } from '../ThemeContext'; 


const LoginPage = () => {
    const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const navigate = useNavigate();
    const handleLogin = (e) => { e.preventDefault(); if(email==='user@electromber.com'&&password==='password123'){setError('');alert('Login successful!');navigate('/dashboard');}else{setError('Invalid email or password.');}};
    return ( <AuthLayout><div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl"><h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>{error&&<p className="bg-red-500/20 text-red-500 text-center p-3 rounded-lg mb-4">{error}</p>}<form onSubmit={handleLogin} className="space-y-6"><div className="relative"><Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/><input type="email" placeholder="Email (user@electromber.com)" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none"/></div><div className="relative"><Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/><input type="password" placeholder="Password (password123)" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none"/></div><div className="text-right"><Link to="/forgot-password" className="text-sm text-[#F4743B] hover:underline">Forgot Password?</Link></div><button type="submit" className="w-full bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-3 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00]">Login</button></form><p className="text-center text-gray-600 dark:text-gray-400 mt-6">Don't have an account? <Link to="/register" className="font-bold text-[#F4743B] hover:underline">Register now</Link></p></div></AuthLayout> );
};
export default LoginPage;