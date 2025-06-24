// src/user/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line ,Legend } from 'recharts';
import DashboardLayout from './DashboardLayout';
import { 
    ListOrdered, CheckCircle, Clock, DollarSign, ArrowRight, Zap, Wrench, Star, PlusCircle, 
    ChevronLeft, ChevronRight, Ticket, Users, MessageSquare, Phone, User as UserIcon, Send, X as CloseIcon, Award
} from 'lucide-react';

// --- Reusable Sub-Components for the Dashboard ---

const PromoCarousel = () => {
    const promos = [
        { title: "Get 20% Off", description: "On your next electrical service.", code: "ELEC20", bg: "bg-gradient-to-r from-orange-500 to-amber-500" },
        { title: "Monsoon Plumbing Offer", description: "Waterproofing at a 15% discount.", code: "MONSOON15", bg: "bg-gradient-to-r from-blue-500 to-cyan-500" },
        { title: "Refer a Friend", description: "And get ৳100 credits on your next booking.", code: "REFER100", bg: "bg-gradient-to-r from-green-500 to-emerald-500" }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(current === promos.length - 1 ? 0 : current + 1);
        }, 7000);
        return () => clearTimeout(timer);
    }, [current, promos.length]);

    return (
        <div className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden my-8 group">
            {promos.map((promo, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`w-full h-full flex items-center justify-between p-8 ${promo.bg}`}>
                        <div className="text-white">
                            <h2 className="text-3xl font-bold">{promo.title}</h2>
                            <p className="mt-1">{promo.description}</p>
                            <div className="mt-4 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:bg-white/30">
                                Use Code: <strong className="ml-2">{promo.code}</strong>
                            </div>
                        </div>
                        <Ticket size={80} className="text-white/20 rotate-12 transform-gpu transition-transform group-hover:scale-110" />
                    </div>
                </div>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {promos.map((_, index) => (
                    <button key={index} onClick={() => setCurrent(index)} className={`w-2 h-2 rounded-full transition-all ${index === current ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white'}`}></button>
                ))}
            </div>
        </div>
    );
};

// THIS IS THE MISSING COMPONENT THAT IS NOW FIXED
const BookNowSection = () => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
        <div className="grid md:grid-cols-3 items-center gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Need a Professional?</h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">Book our top-rated electricians and plumbers right away.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-service?type=electrician" className="flex-1 flex items-center justify-center space-x-2 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105">
                    <Zap size={20} />
                    <span>Book Electrician</span>
                </Link>
                <Link to="/book-service?type=plumber" className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105">
                    <Wrench size={20} />
                    <span>Book Plumber</span>
                </Link>
            </div>
        </div>
    </div>
);

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg flex items-center space-x-4 transform hover:-translate-y-1.5 transition-transform duration-300">
        <div className={`p-4 rounded-xl ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);

const TechnicianChatPopup = ({ technician, onClose }) => (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col animate-fade-in-up" style={{animationDuration: '0.5s'}}>
        <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
                <img src={technician.avatar} alt={technician.name} className="w-8 h-8 rounded-full" />
                <span className="font-bold text-gray-800 dark:text-white">{technician.name}</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><CloseIcon size={18} className="text-gray-500" /></button>
        </header>
        <main className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-start"><div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg max-w-xs text-sm">Hi there! How can I help with your service today?</div></div>
            <div className="flex justify-end"><div className="bg-orange-500 text-white p-2 rounded-lg max-w-xs text-sm">Hello! Just wanted to confirm the time.</div></div>
        </main>
        <footer className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
                <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 pl-4 pr-10 outline-none"/>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-full"><Send size={16} /></button>
            </div>
        </footer>
    </div>
);

const TechnicianProfilePopup = ({ technician, onClose }) => (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col animate-fade-in-up" style={{animationDuration: '0.5s'}}>
         <header className="h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl relative">
             <button onClick={onClose} className="absolute top-2 right-2 p-1 bg-white/30 text-white rounded-full hover:bg-white/50"><CloseIcon size={18} /></button>
         </header>
         <main className="flex-1 p-4 -mt-10">
            <div className="flex flex-col items-center">
                <img src={technician.avatar} alt={technician.name} className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800" />
                <h3 className="mt-2 text-xl font-bold text-gray-800 dark:text-white">{technician.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{technician.specialty}</p>
                <div className="flex items-center space-x-1 mt-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{technician.rating}</span>
                    <span className="text-xs text-gray-400">({technician.reviews} reviews)</span>
                </div>
            </div>
            <div className="mt-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Details</h4>
                <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong className="font-medium">Experience:</strong> {technician.experience}</p>
                    <p><strong className="font-medium">Joined:</strong> {technician.joined}</p>
                </div>
            </div>
         </main>
    </div>
);

const DashboardPage = () => {
    const [activeTechnician, setActiveTechnician] = useState(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);

    const serviceData = [
        { name: 'Jan', Electrician: 4, Plumber: 2, Spending: 7700 },
        { name: 'Feb', Electrician: 3, Plumber: 5, Spending: 9300 },
        { name: 'Mar', Electrician: 6, Plumber: 3, Spending: 11200 },
        { name: 'Apr', Electrician: 5, Plumber: 6, Spending: 13500 },
        { name: 'May', Electrician: 8, Plumber: 4, Spending: 14000 },
        { name: 'Jun', Electrician: 7, Plumber: 7, Spending: 18500 },
    ];
    
    const technicians = [ 
        { id: 1, name: 'Jamil Ahmed', service: 'Bathroom Leak Fix', avatar: 'https://placehold.co/40x40/3b82f6/white?text=J', specialty: 'Master Plumber', rating: 4.9, reviews: 89, experience: '8 years', joined: 'Jan 2020' }, 
        { id: 2, name: 'Robiul Islam', service: 'Ceiling Fan Repair', avatar: 'https://placehold.co/40x40/22c55e/white?text=R', specialty: 'Senior Electrician', rating: 4.8, reviews: 124, experience: '10 years', joined: 'Mar 2018' },
        { id: 3, name: 'Al-Amin Hossain', service: 'Kitchen Sink Installation', avatar: 'https://placehold.co/40x40/eab308/white?text=A', specialty: 'Plumbing Specialist', rating: 4.7, reviews: 65, experience: '5 years', joined: 'Feb 2021' }
    ];
    
    const handleOpenChat = (tech) => { setProfileOpen(false); setActiveTechnician(tech); setChatOpen(true); };
    const handleOpenProfile = (tech) => { setChatOpen(false); setActiveTechnician(tech); setProfileOpen(true); };
    const handleClosePopups = () => { setChatOpen(false); setProfileOpen(false); };

    return (
        <DashboardLayout>
            <div className="mt-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, Kamrul!</h1>
                <p className="text-gray-500 dark:text-gray-400">Let's get your day sorted. Here's a look at your service history.</p>
            </div>

            <PromoCarousel />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
                <StatCard title="Active Orders" value="4" icon={<Clock className="text-white" />} color="bg-blue-500" />
                <StatCard title="Completed Jobs" value="8" icon={<CheckCircle className="text-white" />} color="bg-green-500" />
                <StatCard title="Open Tickets" value="1" icon={<MessageSquare className="text-white" />} color="bg-purple-500" />
                <StatCard title="Total Spent" value="৳12,500" icon={<DollarSign className="text-white" />} color="bg-orange-500" />
            </div>

            <div className="my-8">
                <BookNowSection />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Services vs. Spending</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                             <ComposedChart data={serviceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                                <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }} />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fill: 'rgb(156 163 175)' }} label={{ value: 'Services', angle: -90, position: 'insideLeft', fill: 'rgb(156 163 175)' }}/>
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={(value) => `৳${value/1000}k`} tick={{ fill: 'rgb(156 163 175)' }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', border: 'none', borderRadius: '0.5rem' }}/>
                                <Legend />
                                <Bar yAxisId="left" dataKey="Electrician" barSize={20} fill="#f97316" name="Electrician" />
                                <Bar yAxisId="left" dataKey="Plumber" barSize={20} fill="#3b82f6" name="Plumber" />
                                <Line yAxisId="right" type="monotone" dataKey="Spending" stroke="#10b981" strokeWidth={2} name="Spending (BDT)" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recently Assigned Technicians</h3>
                    <ul className="space-y-4 flex-grow">
                        {technicians.map(tech => (
                           <li key={tech.id} className="flex items-center space-x-4">
                               <img src={tech.avatar} alt={tech.name} className="w-10 h-10 rounded-full" />
                               <div className="flex-grow">
                                   <p className="font-semibold text-gray-700 dark:text-gray-200">{tech.name}</p>
                                   <p className="text-sm text-gray-500 dark:text-gray-400">{tech.service}</p>
                               </div>
                               <div className="flex items-center space-x-1">
                                    <button onClick={() => handleOpenChat(tech)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50"><MessageSquare size={18} className="text-gray-500" /></button>
                                    <button onClick={() => handleOpenProfile(tech)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50"><UserIcon size={18} className="text-gray-500" /></button>
                                    <a href="tel:+8801234567890" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50"><Phone size={18} className="text-gray-500" /></a>
                               </div>
                           </li>
                       ))}
                    </ul>
                    <Link to="/my-orders" className="mt-4 flex items-center justify-center text-orange-500 font-semibold hover:text-orange-600">
                       <span>View All Orders</span><ArrowRight size={16} className="ml-2"/>
                    </Link>
                </div>
            </div>

            {isChatOpen && <TechnicianChatPopup technician={activeTechnician} onClose={handleClosePopups} />}
            {isProfileOpen && <TechnicianProfilePopup technician={activeTechnician} onClose={handleClosePopups} />}

        </DashboardLayout>
    );
};

export default DashboardPage;