import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing/landingpage';
import LoginPage from './auth/LoginPage';
import RegistrationPage from './auth/RegistrationPage';
import DashboardPage from './user/DashboardPage';
import MyOrdersPage from './user/MyOrdersPage'; // New Import
import AboutUsPage from './user/aboutus';   // New Import
import ContactPage from './user/contact';   // New Import
import BookingPage from './user/BookingPage'; 
import ThemeProvider from './ThemeContext'; 
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 font-sans">
          <style>{`
            :root { scroll-behavior: smooth; }
            body { font-family: 'Poppins', sans-serif; }
            .animation-delay-300 { animation-delay: 300ms; }
            .animation-delay-500 { animation-delay: 500ms; }
            .animation-delay-700 { animation-delay: 700ms; }
            @keyframes a-fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-down { animation: a-fade-in-down 0.3s ease-out forwards; }
            @keyframes a-fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-up { opacity: 0; animation: a-fade-in-up 0.8s ease-out forwards; }
            .scroll-animate { opacity: 0; transition: opacity 0.8s, transform 0.8s; }
          `}</style>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            
            {/* Authenticated Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />

             {/* Placeholder routes for future development */}
             <Route path="/profile" element={<div className="h-screen flex items-center justify-center text-3xl dark:text-white">Profile Page</div>} />
             <Route path="/settings" element={<div className="h-screen flex items-center justify-center text-3xl dark:text-white">Settings Page</div>} />
             <Route path="/book-service" element={<BookingPage/>} />
             <Route path="/privacy-policy" element={<div className="h-screen flex items-center justify-center text-3xl dark:text-white">Privacy Policy Page</div>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
