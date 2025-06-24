import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useTheme } from '../ThemeContext';
import {
    Zap, Wrench, ArrowRight, ArrowLeft, Star, Clock, Shield, MapPin, CheckCircle,
    CreditCard, Smartphone, Truck, ChevronDown, Check, User as UserIcon, Award, Diamond, Crown,
    Calendar, Sun, Moon, Sparkles, Home, Building,  Store
} from 'lucide-react';

// --- Data for the Booking Flow (Expanded) ---
const serviceData = {
    Electrician: {
        icon: <Zap size={48} className="text-amber-500" />,
        color: "bg-amber-100 dark:bg-amber-900/30",
        categories: {
            'AC': {
                problems: [
                    { name: 'AC General Servicing', price: [1000, 1500], desc: "Full cleaning of indoor & outdoor units." },
                    { name: 'Cooling Problem', price: [1200, 2500], desc: "Diagnosis and repair of cooling issues." },
                    { name: 'Water Leakage', price: [800, 1600], desc: "Fixing water dripping from the indoor unit." },
                    { name: 'Noise Problem', price: [700, 1400], desc: "Identifying and fixing unusual noises." },
                    { name: 'AC Installation', price: [2000, 3000], desc: "Complete installation of a new AC unit." },
                    { name: 'AC Uninstallation', price: [800, 1200], desc: "Safe removal of an existing AC unit." },
                ]
            },
            'Refrigerator': {
                problems: [
                    { name: 'Not Cooling', price: [1500, 2500], desc: "Complete diagnosis of cooling failure." },
                    { name: 'Gas Refill', price: [2000, 3500], desc: "Refilling refrigerant gas." },
                    { name: 'Deep Cleaning', price: [800, 1200], desc: "Full interior and exterior cleaning." },
                ]
            },
            'Television': {
                problems: [
                    { name: 'No Picture / No Sound', price: [800, 1500], desc: "Diagnosing display or audio output issues." },
                    { name: 'Wall Mounting Installation', price: [1000, 1800], desc: "Securely mounting your TV to the wall." },
                    { name: 'Smart TV Setup', price: [700, 1200], desc: "Connecting to Wi-Fi and setting up apps." },
                ]
            },
            'IPS/UPS': {
                 problems: [
                    { name: 'Battery Problem', price: [1000, 1800], desc: "Diagnosis and replacement of battery." },
                    { name: 'No Backup Power', price: [1200, 2000], desc: "Circuit and inverter check-up." },
                    { name: 'New Installation', price: [1500, 2500], desc: "Complete setup and wiring." },
                ]
            }
        }
    },
    Plumber: {
        icon: <Wrench size={48} className="text-blue-500" />,
        color: "bg-blue-100 dark:bg-blue-900/30",
        categories: {
            'Bathroom': {
                problems: [
                    { name: 'Faucet/Tap Repair or Replace', price: [500, 800], desc: "Fixing leaks or installing a new faucet." },
                    { name: 'Shower Installation', price: [1000, 1500], desc: "Installation of a new shower head or system." },
                    { name: 'Commode Repair / Installation', price: [1200, 2500], desc: "Fixing flush issues or installing a new commode." },
                ]
            },
            'Kitchen': {
                problems: [
                    { name: 'Sink Blockage Cleaning', price: [700, 1500], desc: "Clearing out clogged kitchen sink pipes." },
                    { name: 'New Sink Installation', price: [1500, 2200], desc: "Fitting a new kitchen sink." },
                ]
            },
            'Water Line & Tank': {
                problems: [
                    { name: 'Main Line Leakage Repair', price: [1500, 3000], desc: "Identifying and fixing leaks in the main water line." },
                    { name: 'Water Tank Cleaning', price: [1000, 1800], desc: "Full cleaning and sanitization of your water tank." },
                    { name: 'Motor Installation / Repair', price: [1200, 2500], desc: "Setup or repair of water pump motor." },
                ]
            }
        }
    }
};

const techniciansData = {
    Hero: [
        { id: 1, name: 'Robiul Islam', rating: 4.5, jobs: 89, eta: 45, serviceFee: 500, avatar: 'https://placehold.co/48x48/7c3aed/white?text=R' },
        { id: 4, name: 'Suman Barua', rating: 4.6, jobs: 72, eta: 50, serviceFee: 500, avatar: 'https://placehold.co/48x48/f59e0b/white?text=S' }
    ],
    'Hero Plus': [
        { id: 2, name: 'Jamil Ahmed', rating: 4.8, jobs: 154, eta: 30, serviceFee: 700, avatar: 'https://placehold.co/48x48/db2777/white?text=J' },
        { id: 5, name: 'Fahim Chowdhury', rating: 4.7, jobs: 130, eta: 35, serviceFee: 700, avatar: 'https://placehold.co/48x48/1d4ed8/white?text=F' }
    ],
    Superhero: [
        { id: 3, name: 'Al-Amin Hossain', rating: 5.0, jobs: 210, eta: 20, serviceFee: 1000, avatar: 'https://placehold.co/48x48/16a34a/white?text=A' }
    ]
};

const availableAreas = ['Uttara', 'Malibagh', 'Badda'];
const otherAreas = ['Gulshan', 'Dhanmondi', 'Mirpur', 'Mohammadpur', 'Banani'];
const propertyTypes = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'House', icon: <Home size={20} /> },
    { name: 'Office', icon: <Building size={20} /> },
    { name: 'Shop', icon: <Store size={20} /> },
    { name: 'Commercial', icon: <Building size={20} /> }
];

// --- Reusable Components ---
const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex items-center justify-center space-x-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
            <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 relative
                    ${i + 1 <= currentStep ? 
                        'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30' : 
                        'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                    {i + 1}
                    {i + 1 === currentStep && (
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                </div>
                {i < totalSteps - 1 && (
                    <div className={`w-16 h-1 rounded-full transition-colors duration-300 
                        ${i + 1 < currentStep ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gray-200 dark:bg-gray-600'}`}></div>
                )}
            </React.Fragment>
        ))}
    </div>
);

const SectionWrapper = ({ title, subtitle, children, stepNumber }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8 animate-fade-in-up" style={{animationDuration: '0.4s'}}>
        <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider text-orange-500 uppercase">Step {stepNumber}</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{title}</h2>
            {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {children}
    </div>
);

const TechnicianCard = ({ tech, tier, onSelect, isSelected }) => {
    const tierStyles = {
        Hero: { 
            badge: 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200',
            icon: <UserIcon size={16} className="text-gray-600 dark:text-gray-300"/>,
            border: 'border-gray-300 dark:border-gray-600'
        },
        'Hero Plus': { 
            badge: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
            icon: <Award size={16} className="text-white"/>,
            border: 'border-purple-300 dark:border-purple-700'
        },
        Superhero: { 
            badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
            icon: <Crown size={16} className="text-white"/>,
            border: 'border-amber-300 dark:border-amber-700'
        },
    };
    
    return (
        <button 
            onClick={() => onSelect(tech)} 
            className={`p-5 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group
    ${isSelected ? 
        'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md' : 
        `${tierStyles[tier].border} bg-white dark:bg-gray-700/50 hover:border-orange-400 hover:shadow-sm`}`}

        >
            {isSelected && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white p-1 rounded-bl-lg">
                    <Check size={16} />
                </div>
            )}
            
            <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-xl ${tierStyles[tier].badge} flex items-center space-x-1`}>
                {tierStyles[tier].icon}
                <span>{tier}</span>
            </div>
            
            <div className="flex items-center space-x-4">
                <img src={tech.avatar} alt={tech.name} className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"/>
                <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{tech.name}</p>
                    <div className="flex items-center text-sm">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={16} 
                                    fill={i < Math.floor(tech.rating) ? "currentColor" : "none"} 
                                    className={i < Math.floor(tech.rating) ? "text-amber-400" : "text-gray-300 dark:text-gray-500"}
                                />
                            ))}
                        </div>
                        <span className="ml-1 text-gray-600 dark:text-gray-300">{tech.rating}</span>
                        <span className="text-xs text-gray-400 ml-2">({tech.jobs} jobs)</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm pt-3 border-t border-gray-100 dark:border-gray-600">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1"/>
                    <span>Arrives in</span>
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">~ {tech.eta} min</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>Service Fee:</span>
                <span className={`font-semibold ${tech.serviceFee > 500 ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    ৳{tech.serviceFee}
                </span>
            </div>
        </button>
    )
};

const ProblemCard = ({ problem, isSelected, onClick }) => (
    <div 
        onClick={onClick}
        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border
            ${isSelected ? 
                'border-orange-500 bg-orange-50 dark:bg-orange-900/20 ring-1 ring-orange-200 dark:ring-orange-900' : 
                'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-orange-300'}`}
    >
        <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-white">{problem.name}</span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">৳{problem.price[0]} - ৳{problem.price[1]}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{problem.desc}</p>
        {isSelected && (
            <div className="mt-2 pt-2 border-t border-orange-100 dark:border-orange-900/50 flex items-center">
                <CheckCircle size={16} className="text-orange-500 mr-1"/>
                <span className="text-xs text-orange-600 dark:text-orange-400">Selected</span>
            </div>
        )}
    </div>
);

// --- Main Booking Page Component ---
const BookServicePage = () => {
    const [step, setStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
        serviceType: null,
        category: null,
        problem: null,
        description: '',
        location: { 
            city: 'Dhaka', 
            area: '', 
            address: '',
            propertyType: '',
            floor: ''
        },
        technician: null,
        schedule: { type: 'Now', date: new Date().toISOString().slice(0, 10), timeSlot: null },
        paymentMethod: null
    });
    const [totalPrice, setTotalPrice] = useState([0,0]);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);

    useEffect(() => {
        const basePrice = bookingDetails.problem?.price || [0,0];
        const serviceFee = bookingDetails.technician?.serviceFee || 0;
        const transportFee = 0;
        setTotalPrice([
            Math.round(basePrice[0] + serviceFee + transportFee), 
            Math.round(basePrice[1] + serviceFee + transportFee)
        ]);
    }, [bookingDetails.problem, bookingDetails.technician]);

    const handleSelect = (field, value) => {
        setBookingDetails(prev => ({ ...prev, [field]: value }));
        if (field === 'serviceType') setBookingDetails(prev => ({ ...prev, category: null, problem: null, technician: null }));
        if (field === 'category') setBookingDetails(prev => ({ ...prev, problem: null, technician: null }));
    };
    
    const isStepComplete = (stepNum) => {
        switch (stepNum) {
            case 1: return !!bookingDetails.serviceType;
            case 2: return !!bookingDetails.problem;
            case 3: return !!bookingDetails.location.area && !!bookingDetails.location.address;
            case 4: return !!bookingDetails.technician;
            case 5: return !!bookingDetails.schedule.type && (bookingDetails.schedule.type === 'Now' || !!bookingDetails.schedule.timeSlot);
            case 6: return !!bookingDetails.paymentMethod && termsAgreed;
            default: return false;
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 1: // Choose Service
                return (
                    <SectionWrapper 
                        title="What service do you need?" 
                        subtitle="Select the type of service you're looking for"
                        stepNumber="1"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(serviceData).map(([key, service]) => (
                                <button 
                                    key={key} 
                                    onClick={() => { handleSelect('serviceType', key); setStep(2); }} 
                                    className={`p-6 rounded-xl text-left transition-all duration-300 border-2 flex items-center
                                        ${bookingDetails.serviceType === key ? 
                                            'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 
                                            'border-transparent bg-gray-50 dark:bg-gray-700 hover:border-orange-400'}`}
                                >
                                    <div className={`p-3 rounded-lg ${service.color} mr-4`}>
                                        {service.icon}
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">{key}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {Object.keys(service.categories).length} categories available
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </SectionWrapper>
                );
            case 2: // Choose Problem
                const categories = serviceData[bookingDetails.serviceType]?.categories || {};
                return (
                    <SectionWrapper 
                        title={`Select ${bookingDetails.serviceType} Service`}
                        subtitle="Choose the specific problem you're facing"
                        stepNumber="2"
                    >
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">SELECT CATEGORY</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(categories).map(cat => (
                                        <button 
                                            key={cat} 
                                            onClick={() => handleSelect('category', cat)} 
                                            className={`px-4 py-2 rounded-full font-medium transition-all text-sm
                                                ${bookingDetails.category === cat ? 
                                                    'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 
                                                    'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {bookingDetails.category && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">SELECT PROBLEM</h3>
                                    <div className="space-y-3">
                                        {categories[bookingDetails.category].problems.map(prob => (
                                            <ProblemCard 
                                                key={prob.name}
                                                problem={prob}
                                                isSelected={bookingDetails.problem?.name === prob.name}
                                                onClick={() => handleSelect('problem', prob)}
                                            />
                                        ))}
                                        <ProblemCard 
                                            problem={{name: "Unknown Problem", price: [500, 500], desc: "Technician will inspect and provide a quote on-site."}}
                                            isSelected={bookingDetails.problem?.name === "Unknown Problem"}
                                            onClick={() => handleSelect('problem', {name: "Unknown Problem", price: [500, 500], desc: "Technician will inspect and provide a quote on-site."})}
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {bookingDetails.problem && (
                                <div className="pt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Additional Details (Optional)
                                    </label>
                                    <textarea 
                                        value={bookingDetails.description} 
                                        onChange={e => handleSelect('description', e.target.value)} 
                                        rows="3" 
                                        placeholder="Describe your problem in more detail..."
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            )}
                        </div>
                    </SectionWrapper>
                );
            case 3: // Choose Location
                return (
                    <SectionWrapper 
                        title="Service Location" 
                        subtitle="Where do you need the service performed?"
                        stepNumber="3"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">PROPERTY TYPE</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {propertyTypes.map(type => (
                                            <button
                                                key={type.name}
                                                onClick={() => setBookingDetails(p => ({...p, location: {...p.location, propertyType: type.name}}))}
                                                className={`p-3 rounded-lg border text-center transition-all
                                                    ${bookingDetails.location.propertyType === type.name ?
                                                        'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                                                        'border-gray-200 dark:border-gray-600 hover:border-orange-400'}`}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="text-gray-700 dark:text-gray-300">{type.icon}</div>
                                                    <span className="text-xs mt-1">{type.name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CITY</label>
                                    <input 
                                        type="text" 
                                        value="Dhaka" 
                                        readOnly
                                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none cursor-not-allowed"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AREA</label>
                                    <select 
                                        value={bookingDetails.location.area} 
                                        onChange={e => setBookingDetails(p => ({...p, location: {...p.location, area: e.target.value, address: ''}, technician: null}))} 
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="">Select your area</option>
                                        {availableAreas.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                        {otherAreas.map(area => (
                                            <option key={area} value={area} disabled>{area} (Coming Soon)</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {bookingDetails.location.area && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">FLOOR/LEVEL (OPTIONAL)</label>
                                        <input 
                                            type="text" 
                                            value={bookingDetails.location.floor} 
                                            onChange={e => setBookingDetails(p => ({...p, location: {...p.location, floor: e.target.value}}))}
                                            placeholder="e.g. 5th floor, Lift available"
                                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                {availableAreas.includes(bookingDetails.location.area) ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">FULL ADDRESS</label>
                                        <textarea 
                                            value={bookingDetails.location.address} 
                                            onChange={e => setBookingDetails(p => ({ ...p, location: {...p.location, address: e.target.value}}))} 
                                            rows="5" 
                                            placeholder="House #, Road #, Block #, Home #\nLandmarks near your location"
                                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Please provide as much detail as possible to help the technician find you easily.
                                        </p>
                                    </div>
                                ) : bookingDetails.location.area ? (
                                    <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900 text-center">
                                        <Shield size={32} className="mx-auto mb-3" />
                                        <p className="font-semibold">Service Not Available in This Area Yet</p>
                                        <p className="text-sm mt-1">We're expanding our service areas. Please check back soon!</p>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900 text-center flex items-center justify-center h-full">
                                        <div>
                                            <MapPin size={32} className="mx-auto mb-3" />
                                            <p className="font-semibold">Select Your Area</p>
                                            <p className="text-sm mt-1">Choose your area to see address options</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionWrapper>
                );
            case 4: // Choose Technician
                const tierIcons = { 
                    Superhero: <Crown size={18} className="text-amber-400"/>, 
                    'Hero Plus': <Award size={18} className="text-purple-500"/>, 
                    Hero: <UserIcon size={18} className="text-gray-500"/> 
                };
                
                // Only show technicians if area is available
                const showTechnicians = availableAreas.includes(bookingDetails.location.area);
                
                return (
                    <SectionWrapper 
                        title="Select Your Technician" 
                        subtitle={showTechnicians ? "Choose from our verified professionals" : "No technicians available in this area"}
                        stepNumber="4"
                    >
                        {showTechnicians ? (
                            <div className="space-y-8">
                                {Object.keys(techniciansData).reverse().map(tier => (
                                    <div key={tier} className="border-b dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                                {tierIcons[tier]} {tier}
                                            </h3>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                                {techniciansData[tier].length} {techniciansData[tier].length > 1 ? 'technicians' : 'technician'}
                                            </span>
                                        </div>
                                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                                            {techniciansData[tier].map(tech => (
                                                <TechnicianCard 
                                                    key={tech.id} 
                                                    tech={tech} 
                                                    tier={tier} 
                                                    onSelect={() => handleSelect('technician', tech)} 
                                                    isSelected={bookingDetails.technician?.id === tech.id} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                <Shield size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Technicians Available</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    We don't have any technicians available in {bookingDetails.location.area} right now.
                                    Please try one of our available areas: {availableAreas.join(', ')}.
                                </p>
                                <button 
                                    onClick={() => setStep(3)} 
                                    className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all"
                                >
                                    Change Location
                                </button>
                            </div>
                        )}
                    </SectionWrapper>
                );
            case 5: // Schedule Service
                const scheduleType = bookingDetails.schedule.type;
                const setSchedule = (val) => setBookingDetails(p => ({...p, schedule: {...p.schedule, ...val}}));
                
                return (
                    <SectionWrapper 
                        title="Schedule Your Service" 
                        subtitle="When would you like the technician to arrive?"
                        stepNumber="5"
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setSchedule({type: 'Now', timeSlot: null})}
                                className={`p-6 rounded-xl border-2 text-center transition-all duration-300
                                    ${scheduleType === 'Now' ? 
                                        'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 
                                        'border-gray-200 dark:border-gray-600 hover:border-orange-400'}`}
                            >
                                <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles size={32} className="text-orange-500"/>
                                </div>
                                <p className="font-bold text-lg">Book Now</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technician will arrive as soon as possible</p>
                                {scheduleType === 'Now' && (
                                    <div className="mt-3 text-xs text-orange-500 font-medium flex items-center justify-center">
                                        <CheckCircle size={14} className="mr-1"/>
                                        Selected
                                    </div>
                                )}
                            </button>
                            
                            <button 
                                onClick={() => setSchedule({type: 'Later'})}
                                className={`p-6 rounded-xl border-2 text-center transition-all duration-300
                                    ${scheduleType === 'Later' ? 
                                        'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 
                                        'border-gray-200 dark:border-gray-600 hover:border-orange-400'}`}
                            >
                                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar size={32} className="text-blue-500"/>
                                </div>
                                <p className="font-bold text-lg">Schedule Later</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pick a convenient date and time</p>
                                {scheduleType === 'Later' && (
                                    <div className="mt-3 text-xs text-orange-500 font-medium flex items-center justify-center">
                                        <CheckCircle size={14} className="mr-1"/>
                                        Selected
                                    </div>
                                )}
                            </button>
                        </div>
                        
                        {scheduleType === 'Later' && (
                            <div className="mt-8 pt-6 border-t dark:border-gray-700 grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{animationDuration: '0.4s'}}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SELECT DATE</label>
                                    <input 
                                        type="date" 
                                        value={bookingDetails.schedule.date} 
                                        onChange={e => setSchedule({date: e.target.value})} 
                                        min={new Date().toISOString().slice(0, 10)}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">TIME SLOT</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Morning', 'Afternoon', 'Evening'].map(slot => (
                                            <button 
                                                key={slot}
                                                onClick={() => setSchedule({timeSlot: slot})}
                                                className={`p-3 rounded-lg text-sm font-semibold transition-all duration-200 flex flex-col items-center
                                                    ${bookingDetails.schedule.timeSlot === slot ? 
                                                        'bg-orange-500 text-white' : 
                                                        'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                            >
                                                {slot === 'Morning' && <Sun size={16} className="mb-1"/>}
                                                {slot === 'Afternoon' && <Clock size={16} className="mb-1"/>}
                                                {slot === 'Evening' && <Moon size={16} className="mb-1"/>}
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </SectionWrapper>
                );
            case 6: // Confirm & Pay
                const paymentMethods = [
                    { name: "Cash on Delivery", icon: <Truck size={20}/>, desc: "Pay the technician after service completion" },
                    { name: "Card", icon: <CreditCard size={20}/>, desc: "Visa, Mastercard, Amex" },
                    { name: "Mobile Payment", icon: <Smartphone size={20}/>, desc: "bKash, Nagad, Rocket" }
                ];
                
                return (
                    <SectionWrapper 
                        title="Payment Method" 
                        subtitle="Choose how you'd like to pay"
                        stepNumber="6"
                    >
                        <div className="space-y-3">
                            {paymentMethods.map(method => (
                                <button 
                                    key={method.name}
                                    onClick={() => handleSelect('paymentMethod', method.name)}
                                    className={`w-full flex items-start p-4 rounded-xl border-2 transition-all duration-200
                                        ${bookingDetails.paymentMethod === method.name ? 
                                            'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 
                                            'border-gray-200 dark:border-gray-600 hover:border-orange-400'}`}
                                >
                                    <div className={`p-2 rounded-lg mr-4 ${bookingDetails.paymentMethod === method.name ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>
                                        {method.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-gray-800 dark:text-white">{method.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{method.desc}</p>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center
                                        ${bookingDetails.paymentMethod === method.name ? 
                                            'border-orange-500 bg-orange-500' : 
                                            'border-gray-300 dark:border-gray-500'}`}
                                    >
                                        {bookingDetails.paymentMethod === method.name && <Check size={14} className="text-white"/>}
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="relative mb-4">
                                <input 
                                    type="text" 
                                    value={promoCode} 
                                    onChange={e => { setPromoCode(e.target.value); setPromoApplied(false); }} 
                                    placeholder="Enter promo code"
                                    className="w-full p-3 pr-24 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <button 
                                    onClick={() => setPromoApplied(true)} 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50"
                                    disabled={!promoCode || promoApplied}
                                >
                                    {promoApplied ? 'Applied' : 'Apply'}
                                </button>
                            </div>
                            
                            {promoApplied && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-lg flex items-center">
                                    <CheckCircle size={18} className="mr-2 flex-shrink-0"/>
                                    <span className="text-sm">Promo code applied successfully! You've saved ৳200.</span>
                                </div>
                            )}
                            
                            <div className="flex items-start space-x-3 mt-6">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    checked={termsAgreed} 
                                    onChange={() => setTermsAgreed(!termsAgreed)} 
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-gray-600"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                                    I agree to the <Link to="/terms" className="text-orange-500 hover:underline">Terms of Service</Link> and acknowledge that the final price may vary based on the technician's assessment. A ৳100 transportation fee may apply for remote locations.
                                </label>
                            </div>
                        </div>
                    </SectionWrapper>
                );
            default: return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StepIndicator currentStep={step} totalSteps={6} />
                
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        {renderStepContent()}
                    </div>

                    <div className="lg:sticky lg:top-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                    Booking Summary
                                </span>
                            </h2>
                            
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between pb-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">Service:</span>
                                    <span className="font-semibold text-gray-800 dark:text-white text-right">
                                        {bookingDetails.serviceType || 'Not selected'}
                                    </span>
                                </div>
                                
                                {bookingDetails.category && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {bookingDetails.category}
                                        </span>
                                    </div>
                                )}
                                
                                {bookingDetails.problem && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Problem:</span>
                                        <span className="font-semibold text-gray-800 dark:text-white text-right">
                                            {bookingDetails.problem.name}
                                        </span>
                                    </div>
                                )}
                                
                                {bookingDetails.location.area && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Location:</span>
                                        <span className="font-semibold text-gray-800 dark:text-white text-right">
                                            {bookingDetails.location.area}
                                            {bookingDetails.location.propertyType && ` • ${bookingDetails.location.propertyType}`}
                                        </span>
                                    </div>
                                )}
                                
                                {bookingDetails.technician && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Technician:</span>
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {bookingDetails.technician.name}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Schedule:</span>
                                    <span className="font-semibold text-gray-800 dark:text-white">
                                        {bookingDetails.schedule.type === 'Now' ? 
                                            'ASAP' : 
                                            `${bookingDetails.schedule.date} • ${bookingDetails.schedule.timeSlot || 'Any time'}`}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Estimated Price:</span>
                                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                                        ৳{totalPrice[0]} - ৳{totalPrice[1]}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Final price will be confirmed by the technician after inspection.
                                </p>
                                
                                {bookingDetails.technician?.priceModifier > 1 && (
                                    <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300 rounded text-xs">
                                        <div className="flex items-center">
                                            <Diamond size={14} className="mr-2"/>
                                            Premium technician selected (+{((bookingDetails.technician.priceModifier-1)*100).toFixed(0)}% service fee)
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={() => setStep(step - 1)} 
                                disabled={step === 1} 
                                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ArrowLeft size={18}/>
                                <span>Back</span>
                            </button>
                            
                            {step < 6 ? (
                                <button 
                                    onClick={() => setStep(step + 1)} 
                                    disabled={!isStepComplete(step)} 
                                    className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg shadow-orange-500/20"
                                >
                                    <span>Continue</span>
                                    <ArrowRight size={18}/>
                                </button>
                            ) : (
                                <button 
                                    disabled={!isStepComplete(6)} 
                                    className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg shadow-green-500/20"
                                >
                                    <span>Confirm Booking</span>
                                    <Check size={18}/>
                                </button>
                            )}
                        </div>
                        
                        {step === 6 && (
                            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                By confirming, you agree to our cancellation policy
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BookServicePage;