// src/user/DashboardPage.jsx
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { 
  Zap, Wrench, Clock, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, 
  Star, MessageSquare, Phone, User as UserIcon, X as CloseIcon, Send,
  Gift, Users, Award, Home, AirVent, Refrigerator, Plug, Droplets, 
  Calendar, ThumbsUp, HeartHandshake, MapPin, Clipboard, Smile,
  Ticket, Percent, Shield
} from 'lucide-react';



const PromoCarousel = () => {
    const promos = [
        { 
            title: "Summer AC Special", 
            description: "Get 30% off on AC servicing", 
            code: "COOL30", 
            bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
            icon: <AirVent size={80} className="text-white/20 rotate-12" />
        },
        { 
            title: "First Time User", 
            description: "25% discount on your first service", 
            code: "NEW25", 
            bg: "bg-gradient-to-r from-purple-500 to-pink-500",
            icon: <Gift size={80} className="text-white/20 rotate-12" />
        },
        { 
            title: "Refer & Earn", 
            description: "Get ৳100 credits for each friend", 
            code: "REFER100", 
            bg: "bg-gradient-to-r from-green-500 to-emerald-500",
            icon: <Users size={80} className="text-white/20 rotate-12" />
        }
    ];

    const [current, setCurrent] = useState(0);
    useEffect(() => {
            const timer = setTimeout(() => {
                setCurrent(current === promos.length - 1 ? 0 : current + 1);
            }, 3000);
            return () => clearTimeout(timer);
        }, [current, promos.length]);

    return (
        <div className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden my-6">
            {promos.map((promo, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`w-full h-full flex items-center justify-between p-8 ${promo.bg}`}>
                        <div className="text-white">
                            <h2 className="text-3xl font-bold">{promo.title}</h2>
                            <p className="mt-1">{promo.description}</p>
                            <div className="mt-4 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                                Use Code: <strong className="ml-2">{promo.code}</strong>
                            </div>
                        </div>
                        {promo.icon}
                    </div>
                </div>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {promos.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrent(index)} 
                        className={`w-2 h-2 rounded-full transition-all ${index === current ? 'w-6 bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const BookingOptions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
                <div className="flex items-center space-x-3">
                    <Zap size={24} className="text-white" />
                    <h3 className="text-xl font-bold">Electrician Services</h3>
                </div>
            </div>
            <div className="p-5">
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">Fast & Reliable Service</span>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">Professional Technicians</span>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">24/7 Customer Support</span>
                    </li>
                </ul>
                <Link 
                    to="/book-service?type=electrician"
                    className="mt-6 w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Book Electrician
                </Link>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                <div className="flex items-center space-x-3">
                    <Wrench size={24} className="text-white" />
                    <h3 className="text-xl font-bold">Plumbing Services</h3>
                </div>
            </div>
            <div className="p-5">
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">Transparent Pricing</span>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">Satisfaction Guarantee</span>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">Certified & Insured Team</span>
                    </li>
                </ul>
                <Link 
                    to="/book-service?type=plumber"
                    className="mt-6 w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Book Plumber
                </Link>
            </div>
        </div>
    </div>
);
const ServicePackageCard = ({ title, services, price, originalPrice, icon, popular, image }) => {
    return (
        <div className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full ${popular ? 'border-2 border-orange-500' : 'border-2 border-transparent'}`}>
            {image && (
                <div className="relative" style={{ paddingTop: '66.66%' }}> {/* 3:2 Aspect Ratio (1024/1536) */}
                    <img src={image} alt={title} className="absolute top-0 left-0 object-cover w-full h-full" />
                </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 text-orange-500">
                            {icon}
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
                    </div>
                    {popular && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">POPULAR</span>
                    )}
                </div>
                
                <ul className="mt-4 space-y-2 flex-grow">
                    {services.map((service, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{service}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">৳{price}</span>
                        {originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">৳{originalPrice}</span>
                        )}
                    </div>
                    <Link 
                        to={`/book-service?package=${encodeURIComponent(title)}`}
                        className="mt-4 w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ServicePackagesSlider = () => {
    const packages = [
        {
            title: "AC + Fridge Combo",
            services: ["1.5 ton AC full servicing", "Refrigerator deep cleaning", "Gas top-up if needed", "6 months service warranty"],
            price: "3,499",
            originalPrice: "4,500",
            icon: <AirVent size={20} />,
            popular: true,
            image: "https://content.jdmagicbox.com/v2/comp/mahabubnagar/e6/9999p8542.8542.230530154518.l2e6/catalogue/ma-cool-zone-ac-fridge-repair-clock-tower-mahabubnagar-refrigerator-repair-and-services-i9wlces3yq.jpg"
        },
        {
            title: "Full Home Checkup",
            services: ["Electrical safety inspection", "Plumbing system check", "5 switch/socket repairs", "Detailed report"],
            price: "2,199",
            originalPrice: "3,200",
            icon: <Home size={20} />,
            image: "https://github.com/akonBRO/Electromber/blob/main/frontend/src/landing/assets/ChatGPT%20Image%20Jun%2030,%202025,%2012_09_52%20AM.png?raw=true"
        },
        {
            title: "Kitchen Appliance Package",
            services: ["Refrigerator servicing", "Microwave deep cleaning", "Chimney maintenance", "1 month warranty"],
            price: "2,899",
            originalPrice: "3,800",
            icon: <Wrench size={20} />,
            image: "https://localpintu.com/uploads/SystemSetting/1701086243images_home.jpg"
        },
        {
            title: "Monsoon Plumbing Care",
            services: ["2 faucet repairs", "Drain pipe cleaning", "Waterproofing check", "Leak detection"],
            price: "1,599",
            originalPrice: "2,300",
            icon: <Droplets size={20} />,
            image: "https://marketplace.canva.com/EAFErg_nwpE/3/0/1600w/canva-blue-business-services-youtube-thumbnail-BQQxm_3qVCE.jpg"
        },
        {
            title: "Office Maintenance",
            services: ["5 AC servicing", "Electrical panel check", "Restroom plumbing", "Priority support"],
            price: "8,999",
            originalPrice: "12,000",
            icon: <Clipboard size={20} />,
            image: "https://www.handysquad.com/wp-content/uploads/2024/07/office-maintenance.jpg"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const totalSlides = packages.length;
    const maxSlideIndex = totalSlides > slidesToShow ? totalSlides - slidesToShow : 0;

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlideIndex));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="my-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Popular Service Packages</h2>
                {/* Desktop slider controls */}
                <div className="hidden md:flex space-x-3">
                    <button 
                        onClick={prevSlide} 
                        className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={currentSlide === maxSlideIndex}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            
            <div className="relative">
                 {/* Mobile slider controls */}
                <div className="md:hidden">
                    <button 
                        onClick={prevSlide} 
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white disabled:opacity-30"
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white disabled:opacity-30"
                        disabled={currentSlide === maxSlideIndex}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
                    >
                        {packages.map((pkg, index) => (
                            <div key={index} className="flex-shrink-0 px-2" style={{ width: `${100 / slidesToShow}%` }}>
                                <ServicePackageCard {...pkg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickActionButton = ({ icon, label, color, link }) => (
    <Link 
        to={link}
        className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm hover:shadow-md transition-all ${color} hover:-translate-y-1`}
    >
        <div className="p-3 rounded-lg bg-white/20 mb-2">
            {icon}
        </div>
        <span className="text-sm font-medium text-center">{label}</span>
    </Link>
);
const ActiveServiceItem = ({ service }) => {
    const statusInfo = {
        scheduled: { color: 'text-blue-500', icon: <Clock size={16} /> },
        in_progress: { color: 'text-orange-500', icon: <Wrench size={16} /> },
        completed: { color: 'text-green-500', icon: <CheckCircle size={16} /> }
    };

    const status = statusInfo[service.status] || statusInfo.scheduled;

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${service.type === 'electrician' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500'}`}>
                    {service.type === 'electrician' ? <Zap size={18} /> : <Droplets size={18} />}
                </div>
                <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{service.title}</h4>
                    <div className="flex items-center mt-1 space-x-2">
                        <span className={`text-xs flex items-center ${status.color}`}>
                            {status.icon}
                            <span className="ml-1 capitalize">{service.status.replace('_', ' ')}</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {service.date}
                        </span>
                    </div>
                </div>
            </div>
            <Link 
                to={`/my-orders/${service.id}`} 
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
                View
            </Link>
        </div>
    );
};

const TechnicianItem = ({ technician, onChat, onProfile, onCall }) => {
    return (
        <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <img src={technician.avatar} alt={technician.name} className="w-12 h-12 rounded-full" />
            <div className="flex-grow">
                <h4 className="font-medium text-gray-800 dark:text-white">{technician.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{technician.specialty}</p>
                <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold ml-1">{technician.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">({technician.reviews} reviews)</span>
                </div>
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={onChat}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Chat"
                >
                    <MessageSquare size={18} />
                </button>
                <button 
                    onClick={onProfile}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Profile"
                >
                    <UserIcon size={18} />
                </button>
                <button 
                    onClick={onCall}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Call"
                >
                    <Phone size={18} />
                </button>
            </div>
        </div>
    );
};

const ChatPopup = ({ technician, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm assigned to your service request.", sender: 'tech' },
        { id: 2, text: "Can you confirm your address?", sender: 'tech' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <img src={technician.avatar} alt={technician.name} className="w-8 h-8 rounded-full" />
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{technician.name}</h4>
                        <div className="flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                                Online
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <CloseIcon size={18} className="text-gray-500" />
                </button>
            </header>
            <main className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </main>
            <footer className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 pl-4 pr-10 outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

const ProfilePopup = ({ technician, onClose }) => {
    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
            <div className="h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl relative">
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 bg-white/30 text-white rounded-full hover:bg-white/50"
                >
                    <CloseIcon size={18} />
                </button>
            </div>
            <div className="p-4 -mt-12">
                <div className="flex flex-col items-center">
                    <img src={technician.avatar} alt={technician.name} className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800" />
                    <h3 className="mt-3 text-xl font-bold text-gray-800 dark:text-white">{technician.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{technician.specialty}</p>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center text-yellow-500">
                            <Star size={16} fill="currentColor" />
                            <span className="font-bold ml-1">{technician.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">({technician.reviews} reviews)</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
                        <p className="font-medium text-gray-800 dark:text-white">{technician.experience}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Services Done</p>
                        <p className="font-medium text-gray-800 dark:text-white">{technician.servicesDone}+</p>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">About</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {technician.bio || "Professional technician with extensive experience in residential and commercial services."}
                    </p>
                </div>

                <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg">
                    View Full Profile
                </button>
            </div>
        </div>
    );
};

const ReferralSection = () => (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 my-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                    <Gift size={24} />
                    <h2 className="text-2xl font-bold">Refer & Earn</h2>
                </div>
                <p className="mt-2">Get ৳100 credits for each friend who signs up and books a service</p>
            </div>
            <div className="w-full md:w-auto">
                <div className="bg-white/20 p-3 rounded-lg mb-3">
                    <p className="text-sm font-semibold">Your Referral Code</p>
                    <p className="text-xl font-bold tracking-wider">ELECTRO100</p>
                </div>
                <button className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                    Share Referral Link
                </button>
            </div>
        </div>
    </div>
);


const RecommendedForYou = () => {
    // Data for the recommendations
    const recommendations = [
        {
            id: 1,
            title: "AC Jet Wash",
            description: "Deep cleaning for your AC unit to ensure cool air and energy efficiency this summer.",
            price: "899",
            icon: <AirVent className="w-6 h-6 text-sky-500" />,
            image: "https://mumbaiacrepair.in/wp-content/uploads/2023/09/ac-bnr.jpg",
            link: "/book-service?type=ac-jet-wash",
        },
        {
            id: 2,
            title: "Roof Waterproofing",
            description: "Protect your home from leaks and water damage with our professional-grade sealing.",
            price: "2,500",
            icon: <Droplets className="w-6 h-6 text-blue-500" />,
            image: "https://urbansolutionsbd.com/wp-content/uploads/2020/11/bitumen-waterproofing-membrane.jpg",
            link: "/book-service?type=waterproofing",
        },
        {
            id: 3,
            title: "Electrical Inspection",
            description: "Ensure the safety of your home with a comprehensive electrical wiring and systems check.",
            price: "1,200",
            icon: <Zap className="w-6 h-6 text-amber-500" />,
            image: "https://media.istockphoto.com/id/1340404454/photo/electrician-engineer-tests-electrical-installations-and-wires-on-relay-protection-system.jpg?s=612x612&w=0&k=20&c=Uc7MB9mwrzyeeElhTxjZHqRbqAULO8n4uE2fyK9Alp8=",
            link: "/book-service?type=electrical-inspection",
        }
    ];

    // State to track the currently hovered/active service
    const [activeServiceId, setActiveServiceId] = useState(recommendations[0].id);

    return (
        <div className="my-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recommended For You</h2>
                <Link to="/services" className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                    View All <ArrowRight size={16} className="inline ml-1" />
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl p-4 flex flex-col lg:flex-row gap-8 min-h-[480px]">
                {/* Left Column: Interactive List */}
                <div className="lg:w-1/2 flex flex-col justify-center space-y-4">
                    {recommendations.map((service) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => setActiveServiceId(service.id)}
                            className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                                activeServiceId === service.id 
                                ? 'bg-orange-50 dark:bg-gray-700/60 ring-2 ring-orange-400' 
                                : 'bg-transparent dark:bg-transparent'
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                {service.icon}
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{service.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 ml-10">
                                {service.description}
                            </p>
                            {/* Show details only for the active item */}
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeServiceId === service.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                               <div className="flex items-center justify-between mt-4 ml-10">
                                    <p className="text-gray-700 dark:text-gray-200">
                                        <span className="text-sm">Starts from </span>
                                        <strong className="text-lg font-bold">৳{service.price}</strong>
                                    </p>
                                    <Link 
                                      to={service.link} 
                                      className="bg-orange-500 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:bg-orange-600 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Image Spotlight */}
                <div className="lg:w-1/2 h-80 lg:h-auto rounded-2xl overflow-hidden relative">
                    {recommendations.map((service) => (
                        <img
                            key={service.id}
                            src={service.image}
                            alt={service.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
                                ${activeServiceId === service.id ? 'opacity-100' : 'opacity-0'}
                                ${activeServiceId === service.id ? 'transform scale-100' : 'scale-110'}
                            `}
                            style={{
                                animation: activeServiceId === service.id ? '' : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* CSS Animation for Ken Burns Effect */}
            <style>
                {`
                    @keyframes kenburns {
                        0% {
                            transform: scale(1) translate(0, 0);
                        }
                        50% {
                            transform: scale(1.15) translate(-5%, 5%);
                        }
                        100% {
                            transform: scale(1) translate(0, 0);
                        }
                    }
                `}
            </style>
        </div>
    );
};
const DashboardPage = () => {
    const [activeTechnician, setActiveTechnician] = useState(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);

    const activeServices = [
        { id: 1, title: "Living Room Wiring Check", type: "electrician", status: "scheduled", date: "Tomorrow, 10 AM" },
        { id: 2, title: "Kitchen Sink Installation", type: "plumber", status: "in_progress", date: "Today, 2 PM" },
        { id: 3, title: "AC Servicing", type: "electrician", status: "completed", date: "Jun 25, 2025" }
    ];
    
    const technicians = [ 
        { 
            id: 1, 
            name: 'Jamil Ahmed', 
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg', 
            specialty: 'Superhero Service', 
            rating: 4.9, 
            reviews: 89, 
            experience: '8 years', 
            servicesDone: 420,
            bio: "Specialized in leak detection and pipe repairs with 8 years of field experience."
        }, 
        { 
            id: 2, 
            name: 'Robiul Islam', 
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg', 
            specialty: 'Hero Plus Service', 
            rating: 4.8, 
            reviews: 124, 
            experience: '10 years', 
            servicesDone: 580,
            bio: "Expert in residential electrical systems and safety inspections."
        }
    ];

    return (
        <DashboardLayout>
            <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Kamrul!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Need Electrician or Plumber? Book now and get instant discounts!</p>
            </div>

            <PromoCarousel />

            <BookingOptions />

             <ServicePackagesSlider />
{/* Service Packages Section */}
            <RecommendedForYou/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Services</h2>
                    <div className="space-y-3">
                        {activeServices.map(service => (
                            <ActiveServiceItem key={service.id} service={service} />
                        ))}
                    </div>
                    <Link 
                        to="/my-orders" 
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
                    >
                        View all service history <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Assigned Technicians</h2>
                    <div className="space-y-3">
                        {technicians.map(tech => (
                            <TechnicianItem 
                                key={tech.id} 
                                technician={tech}
                                onChat={() => {
                                    setProfileOpen(false);
                                    setActiveTechnician(tech);
                                    setChatOpen(true);
                                }}
                                onProfile={() => {
                                    setChatOpen(false);
                                    setActiveTechnician(tech);
                                    setProfileOpen(true);
                                }}
                                onCall={() => console.log(`Calling ${tech.name}`)}
                            />
                        ))}
                    </div>
                    <Link 
                        to="/technicians" 
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
                    >
                        Browse all technicians <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>

            {/* Emergency Services Banner */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 my-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <Shield size={24} />
                            <h2 className="text-2xl font-bold">24/7 Emergency Services</h2>
                        </div>
                        <p className="mt-1">Immediate assistance for urgent electrical or plumbing issues</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Link 
                            to="/emergency?type=electrician" 
                            className="bg-white text-red-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 text-center transition-colors"
                        >
                            Call Electrician
                        </Link>
                        <Link 
                            to="/emergency?type=plumber" 
                            className="bg-white/10 border border-white/30 font-bold py-3 px-6 rounded-lg hover:bg-white/20 text-center transition-colors"
                        >
                            Call Plumber
                        </Link>
                    </div>
                </div>
            </div>

            <ReferralSection />

            

            {isChatOpen && <ChatPopup technician={activeTechnician} onClose={() => setChatOpen(false)} />}
            {isProfileOpen && <ProfilePopup technician={activeTechnician} onClose={() => setProfileOpen(false)} />}
        </DashboardLayout>
    );
};

export default DashboardPage;