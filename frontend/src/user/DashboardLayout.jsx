// src/user/DashboardLayout.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext.js';
import { 
    Moon, Sun, ChevronDown, LogOut, User, LayoutDashboard, ListOrdered, Info, MessageSquare, Menu, X, 
    PlusCircle, Bell, Settings, Zap, Wrench, Search 
} from 'lucide-react';

const DashboardSidebar = ({ isMobileMenuOpen, setMobileMenuOpen }) => {
    const location = useLocation();
    const { theme } = useTheme();

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Book a Service', path: '/book-service', icon: <PlusCircle size={20} /> },
        { name: 'My Orders', path: '/my-orders', icon: <ListOrdered size={20} /> },
        { name: 'About Us', path: '/about', icon: <Info size={20} /> },
        { name: 'Contact', path: '/contact', icon: <MessageSquare size={20} /> },
    ];
    
    const sidebarContent = (
        <>
            <div className="flex items-center justify-between mb-6 md:mb-10">
                <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="text-orange-500" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-wider">ELECTROMBER</span>
                </Link>
                <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                    <X />
                </button>
            </div>
            <nav className="flex-grow overflow-y-auto">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
                <ul className="space-y-1 md:space-y-2">
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 p-2 md:p-3 rounded-lg font-medium transition-colors ${
                                    location.pathname === link.path 
                                        ? 'bg-orange-500 text-white shadow-md' 
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-6 md:mt-10 p-3 md:p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-center">
                <Wrench className="mx-auto text-orange-500 mb-2" size={28}/>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Emergency Support</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 md:mb-3">Available 24/7</p>
                <button className="w-full bg-orange-500 text-white font-bold py-1.5 md:py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">
                    Call Now
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64.5 bg-white dark:bg-gray-800 p-4 md:p-6 flex-col hidden lg:flex fixed h-full shadow-lg z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
            
            {/* Mobile Sidebar */}
            <aside 
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4 md:p-6 flex flex-col shadow-xl z-50 transition-transform duration-300 lg:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
};

const DashboardHeader = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useTheme();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const navigate = useNavigate();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setProfileOpen(false);
            }
            if (isNotificationOpen && !event.target.closest('.notification-dropdown')) {
                setNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen, isNotificationOpen]);

    const handleLogout = () => {
        alert("Logged out successfully!");
        navigate('/');
    };
    
    const dummyNotifications = [
        { icon: <Zap className="text-green-500" />, title: "Service Completed", description: "Your 'Ceiling Fan Repair' service is complete.", time: "5 mins ago", read: false },
        { icon: <Wrench className="text-blue-500" />, title: "Technician Assigned", description: "Jamil Ahmed has been assigned to your 'Bathroom Leak Fix'.", time: "1 hour ago", read: false },
        { icon: <Info className="text-yellow-500" />, title: "Payment Reminder", description: "Your payment for order #ELEC-2025-001 is due.", time: "1 day ago", read: true },
        { icon: <PlusCircle className="text-orange-500" />, title: "New Offer Unlocked", description: "Get 15% off on your next plumbing service!", time: "2 days ago", read: true },
    ];

    const unreadCount = dummyNotifications.filter(n => !n.read).length;

    return (
        <header className="flex items-center justify-between">
            {/* Left side: Hamburger for mobile */}
            <button 
                onClick={onMenuClick} 
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <Menu />
            </button>
            
            {/* Right side: Search bar and icons */}
            <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-4">
                <div className="relative w-full max-w-xs hidden sm:block">
                    <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-11 pr-4 py-2 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 rounded-full outline-none transition-all text-sm shadow-sm"
                    />
                </div>
                
                <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" 
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                <div className="relative notification-dropdown">
                    <button 
                        onClick={() => setNotificationOpen(!isNotificationOpen)} 
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 relative"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
                        )}
                    </button>
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-fade-in-down border border-gray-200 dark:border-gray-700">
                            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 dark:text-white">Notifications</h3>
                                <button className="text-xs text-orange-500 font-semibold hover:underline">
                                    Mark all as read
                                </button>
                            </div>
                            <div className="py-2 max-h-80 overflow-y-auto">
                                {dummyNotifications.map((notif, index) => (
                                    <div 
                                        key={index} 
                                        className={`flex items-start space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 ${
                                            !notif.read && 'bg-orange-500/5 dark:bg-orange-500/10'
                                        }`}
                                    >
                                        <div className="mt-1">{notif.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                                {notif.description}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                {notif.time}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                                <Link 
                                    to="/notifications" 
                                    className="block text-center text-sm font-semibold text-orange-500 hover:underline py-2"
                                    onClick={() => setNotificationOpen(false)}
                                >
                                    View all notifications
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative profile-dropdown">
                    <button 
                        onClick={() => setProfileOpen(!isProfileOpen)}
                        className="focus:outline-none"
                    >
                        <img 
                            src="https://placehold.co/40x40/F4743B/white?text=K" 
                            alt="User" 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-400" 
                        />
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-fade-in-down border border-gray-200 dark:border-gray-700">
                            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                                <img 
                                    src="https://placehold.co/48x48/F4743B/white?text=K" 
                                    alt="User" 
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full" 
                                />
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm md:text-base">
                                        Kamrul Hasan
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        user@electromber.com
                                    </p>
                                </div>
                            </div>
                            <div className="p-1">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm"
                                    onClick={() => setProfileOpen(false)}
                                >
                                    <User size={16} className="mr-2"/>
                                    My Profile
                                </Link>
                                <Link 
                                    to="/settings" 
                                    className="flex items-center w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm"
                                    onClick={() => setProfileOpen(false)}
                                >
                                    <Settings size={16} className="mr-2"/>
                                    Settings
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-md text-sm"
                                >
                                    <LogOut size={16} className="mr-2"/>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const DashboardLayout = ({ children }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900/95">
            <DashboardSidebar 
                isMobileMenuOpen={isMobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen} 
            />
            <div className="flex-1 flex flex-col lg:ml-64 overflow-x-hidden">
                <div className="p-4 md:p-6 lg:p-8">
                    <DashboardHeader onMenuClick={() => setMobileMenuOpen(!isMobileMenuOpen)}/>
                    <main className="flex-1 mt-4 md:mt-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;