import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useTheme } from '../ThemeContext';
import { ChevronsRight, Star, ShieldCheck, Zap, Wrench, Clock, Award, Moon, Sun, Facebook, Twitter, Instagram, ArrowLeft, User, Lock, Mail, Lightbulb, Pipette, Search, ChevronDown, LogOut, MessageSquare, Edit, Phone, Check, MapPin, Calendar, ThumbsUp } from 'lucide-react';

// --- FILE: src/landing/LandingPage.js ---
const Header = () => {
  const { theme, toggleTheme } = useTheme(); 
  const [scrolled, setScrolled] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 10); 
    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []); 

  const headerClasses = scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'; 

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 flex items-center justify-center">
  <img
    src="https://i.postimg.cc/8zzHFdzg/Screenshot-2025-06-08-205137-removebg-preview.png"
    alt="logo"
    className="w-14 h-14 object-contain"
  />
</div>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wider">ELECTROMBER</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors duration-200">Home</a>
          <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors duration-200">Services</a>
          <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors duration-200">About Us</a>
          <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors duration-200">Testimonials</a>
          <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors duration-200">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/login" className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
            Login
          </Link>
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] py-2" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] py-2" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B] py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <Link to="/login" className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-semibold px-5 py-2 rounded-lg text-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    "আপনার বিশ্বস্ত ইলেক্ট্রিশিয়ান ও প্লাম্বার, এখন এক ক্লিকে।",
    "24/7 ইমার্জেন্সি সার্ভিস",
    "সার্টিফাইড এবং অভিজ্ঞ টেকনিশিয়ান"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://www.capitalccg.ac.uk/wp-content/smush-webp/2024/02/How-to-become-a-plumber-in-the-UK-4.jpg.webp')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-6xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-down">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4E00] to-[#F4743B]">ELECTROMBER</span>
        </h1>
        
        <div className="h-24 md:h-32 flex items-center justify-center mb-6">
          <p className="text-2xl md:text-4xl font-medium animate-fade-in-up animation-delay-300 transition-opacity duration-1000">
            {texts[currentTextIndex]}
          </p>
        </div>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-12 animate-fade-in-up animation-delay-500">
          Fast, reliable, and professional home services in Bangladesh. Serving Dhaka, Chittagong, Sylhet and all major cities.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-700">
          <a 
            href="#services" 
            className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-orange-500/30"
          >
            Book a Service Now <ChevronsRight className="ml-2 h-6 w-6" />
          </a>
          <a 
            href="tel:+8801234567890" 
            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center"
          >
            <Phone className="mr-2 h-5 w-5" /> Emergency Call
          </a>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up animation-delay-900">
          {[
            { icon: <Check className="h-6 w-6" />, text: "100% Satisfaction" },
            { icon: <ShieldCheck className="h-6 w-6" />, text: "Verified Experts" },
            { icon: <Clock className="h-6 w-6" />, text: "24/7 Service" },
            { icon: <ThumbsUp className="h-6 w-6" />, text: "5,000+ Happy Clients" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <div className="text-[#F4743B]">{item.icon}</div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const serviceCategories = [
    {
      title: "Electrician Services",
      icon: <Zap className="h-8 w-8 text-white" />,
      description: "Certified electricians for all your electrical needs.",
      popular: true,
      items: [
        'Wiring & Re-wiring',
        'Fan & Light Installation',
        'Circuit Breaker Repair',
        'Appliance Installation',
        'Switch/Socket Repair',
        'Electrical Safety Inspection'
      ],
      imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Plumber Services",
      icon: <Wrench className="h-8 w-8 text-white" />,
      description: "Expert plumbers to tackle leaks, installations, and all your plumbing challenges.",
      popular: true,
      items: [
        'Water Leak Repair',
        'Faucet & Sink Installation',
        'Drain Cleaning',
        'Water Heater Service',
        'Pipe Installation',
        'Bathroom Plumbing'
      ],
      imageUrl: "https://urbansease.com/wp-content/uploads/2024/10/Plumber-service-near-you.jpg"
    },
    {
      title: "AC Repair & Maintenance",
      icon: <Wrench className="h-8 w-8 text-white" />,
      description: "Keep your cool with our professional AC services.",
      items: [
        'AC Installation',
        'Gas Refill',
        'Regular Maintenance',
        'AC Repair',
        'Duct Cleaning'
      ],
      imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Home Maintenance",
      icon: <Wrench className="h-8 w-8 text-white" />,
      description: "Comprehensive solutions for all your home maintenance needs.",
      items: [
        'Carpentry Work',
        'Painting Services',
        'Tile Repair',
        'Handyman Services',
        'General Repairs'
      ],
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Professional Services</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            From fixing a switch to a complete pipeline overhaul, our certified professionals are ready to help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-[#F4743B]/30"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] p-3 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{category.title}</h3>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{category.description}</p>
              {category.popular && (
                <div className="mt-4 inline-block bg-[#F4743B]/10 text-[#F4743B] text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {serviceCategories.slice(0, 2).map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              items={service.items} 
              imageUrl={service.imageUrl} 
              popular={service.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description, items, imageUrl, popular }) => (
  <div className="relative group overflow-hidden rounded-xl shadow-xl dark:shadow-2xl bg-white dark:bg-gray-800 scroll-animate hover:shadow-2xl transition-shadow duration-300">
    {popular && (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
        POPULAR
      </div>
    )}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105" 
      style={{ backgroundImage: `url(${imageUrl})`, opacity: 0.1 }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent"></div>
    
    <div className="relative p-8 flex flex-col h-full text-gray-800 dark:text-white">
      <div className="mb-6 flex items-center space-x-4">
        <div className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] p-4 rounded-full text-white">
          {icon}
        </div>
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{description}</p>
      
      <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="bg-[#F4743B]/10 p-1 rounded-full mr-3">
              <Check className="h-4 w-4 text-[#F4743B]" />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex space-x-4 mt-auto">
        <button className="flex-grow bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-3 px-6 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 shadow-md hover:shadow-orange-500/30">
          Book Now
        </button>
        <button className="bg-transparent border-2 border-[#FF4E00] text-[#FF4E00] font-bold py-3 px-6 rounded-lg hover:bg-[#FF4E00] hover:text-white transition-all duration-300">
          Details
        </button>
      </div>
    </div>
  </div>
);

const StatsSection = () => {
  const stats = [
    { value: "5,000+", label: "Happy Customers" },
    { value: "24/7", label: "Service Availability" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50+", label: "Certified Experts" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center scroll-animate">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => { 
  const steps = [
    {
      icon: <Search className="w-8 h-8" />, 
      title: 'Book Online', 
      description: 'Select the service you need and schedule a time that works for you.',
      details: 'Use our easy online booking system or mobile app to select your service and preferred time slot.'
    }, 
    {
      icon: <User className="w-8 h-8" />, 
      title: 'We Connect', 
      description: 'We match you with a skilled and verified professional from your local area.',
      details: 'Our smart matching system finds the best available technician based on your location and service needs.'
    }, 
    {
      icon: <Check className="w-8 h-8" />, 
      title: 'Job Done', 
      description: 'Your expert arrives on time, completes the job to your satisfaction.',
      details: 'The technician will arrive with all necessary tools, complete the job professionally, and ensure your satisfaction.'
    }
  ]; 

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">How ELECTROMBER Works</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
            Get quality service in just 3 simple steps.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -mt-8">
            <svg width="100%" height="100%">
              <line 
                x1="5%" 
                y1="50%" 
                x2="95%" 
                y2="50%" 
                strokeDasharray="10, 10" 
                className="stroke-gray-300 dark:stroke-gray-700" 
                strokeWidth="2" 
              />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 scroll-animate" 
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FF4E00] to-[#F4743B] text-white p-5 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
                  <span className="text-[#F4743B]">Step {index + 1}: </span>
                  {step.title}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/register" 
            className="inline-flex items-center bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-4 px-10 rounded-lg text-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 shadow-lg hover:shadow-orange-500/30"
          >
            Get Started Now <ChevronsRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => { 
  const features = [
    { 
      icon: <ShieldCheck className="w-10 h-10" />, 
      title: 'Verified Experts', 
      description: 'All our professionals are background-checked, certified, and highly trained with years of experience.' 
    }, 
    { 
      icon: <Clock className="w-10 h-10" />, 
      title: '24/7 Availability', 
      description: 'Emergency services available round the clock. We are here when you need us most.' 
    }, 
    { 
      icon: <Award className="w-10 h-10" />, 
      title: 'Quality Guarantee', 
      description: 'We stand by our work with a 100% satisfaction guarantee on all services provided.' 
    }, 
    { 
      icon: <Star className="w-10 h-10" />, 
      title: 'Upfront Pricing', 
      description: 'No hidden fees. Get a clear, fair price estimate before any work begins.' 
    },
    { 
      icon: <Zap className="w-10 h-10" />, 
      title: 'Fast Response', 
      description: 'Average response time of under 60 minutes for emergency services in urban areas.' 
    },
    { 
      icon: <MapPin className="w-10 h-10" />, 
      title: 'Nationwide Coverage', 
      description: 'Services available across all major cities and towns in Bangladesh.' 
    },
    { 
      icon: <Calendar className="w-10 h-10" />, 
      title: 'Flexible Scheduling', 
      description: 'Book services at your convenience, including evenings and weekends.' 
    },
    { 
      icon: <Wrench className="w-10 h-10" />, 
      title: 'All-in-One Solution', 
      description: 'From electrical to plumbing to AC services - we handle all your home needs.' 
    }
  ]; 

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Why Choose ELECTROMBER?</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
            We are committed to providing a seamless, reliable, and high-quality service experience that sets us apart.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-white dark:bg-gray-800 rounded-xl text-center transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl scroll-animate" 
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-[#FF4E00]/10 to-[#F4743B]/10 text-[#F4743B] p-4 rounded-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-[#FF4E00] to-[#F4743B] rounded-xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">Ready to experience the ELECTROMBER difference?</h3>
              <p className="text-white/90">
                Join thousands of satisfied customers who trust us for their home service needs.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col sm:flex-row gap-4">
              <a 
                href="#services" 
                className="bg-white text-[#FF4E00] font-bold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-300"
              >
                Book a Service
              </a>
              <a 
                href="tel:+8801234567890" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => { 
  const reviews = [
    {
      quote: "The electrician from ELECTROMBER was incredibly professional and fixed my issue in no time! I was amazed by their expertise and polite behavior.", 
      name: "Anisur Rahman", 
      location: "Gulshan, Dhaka", 
      avatar: "https://placehold.co/100x100/313131/F4743B?text=AR",
      rating: 5
    }, 
    {
      quote: "I had a major plumbing leak at midnight, and their 24/7 service was a lifesaver. The plumber arrived within 45 minutes and fixed everything professionally.", 
      name: "Fatima Akhter", 
      location: "Dhanmondi, Dhaka", 
      avatar: "https://placehold.co/100x100/313131/F4743B?text=FA",
      rating: 5
    }, 
    {
      quote: "Booking was so easy on their website. The pricing was transparent, and the quality of work was excellent. Will definitely use again!", 
      name: "Kamal Hossain", 
      location: "Uttara, Dhaka", 
      avatar: "https://placehold.co/100x100/313131/F4743B?text=KH",
      rating: 4
    },
    {
      quote: "Their AC repair service saved me during the heatwave. The technician was knowledgeable and even gave me maintenance tips.", 
      name: "Rahim Khan", 
      location: "Mirpur, Dhaka", 
      avatar: "https://placehold.co/100x100/313131/F4743B?text=RK",
      rating: 5
    }
  ]; 

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">What Our Customers Say</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
            Real stories from our satisfied clients across Bangladesh.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col scroll-animate" 
              style={{animationDelay: `${index * 150}ms`}}
            >
              <div className="flex-grow">
                <div className="text-gray-600 dark:text-gray-300 mb-6 italic">"{review.quote}"</div>
              </div>
              
              <div className="flex items-center mt-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full mr-4 border-2 border-[#FF4E00]" 
                />
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{review.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{review.location}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center bg-transparent border-2 border-[#FF4E00] text-[#FF4E00] font-bold py-3 px-8 rounded-lg hover:bg-[#FF4E00] hover:text-white transition-all duration-300">
            View More Reviews <ChevronsRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How quickly can I get service?",
      answer: "For emergency services, we aim to reach you within 60 minutes in urban areas. Standard bookings are available at your preferred time slot, including evenings and weekends."
    },
    {
      question: "Are your technicians certified?",
      answer: "Yes, all our technicians are certified professionals with proper training and background checks. We verify their qualifications before onboarding."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve all major cities in Bangladesh including Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Our coverage is expanding to more areas."
    },
    {
      question: "How are your prices determined?",
      answer: "Our pricing is transparent and based on the service type, materials needed, and time required. You'll get an upfront estimate before any work begins."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, mobile payments (bKash, Nagad), credit/debit cards, and bank transfers for your convenience."
    },
    {
      question: "Do you offer warranties on your services?",
      answer: "Yes, we provide warranties on most services. The warranty period depends on the specific service provided and will be clearly communicated to you."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
            Find answers to common questions about our services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm scroll-animate"
            >
              <button
                className={`w-full px-6 py-4 text-left font-medium flex justify-between items-center transition-colors duration-200 ${activeIndex === index ? 'bg-gray-100 dark:bg-gray-800 text-[#FF4E00]' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180 text-[#FF4E00]' : ''}`} />
              </button>
              
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Still have questions? We're here to help!
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-3 px-8 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300"
          >
            Contact Us <MessageSquare className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  const cities = [
    "Dhaka", "Chittagong", "Sylhet", "Khulna", 
    "Rajshahi", "Barishal", "Rangpur", "Mymensingh",
    "Comilla", "Narayanganj", "Gazipur", "Savar"
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">We Serve Across Bangladesh</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Currently available in these cities and expanding to more areas soon.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {cities.map((city, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300 scroll-animate"
            >
              <MapPin className="h-6 w-6 text-[#F4743B] mx-auto mb-2" />
              <span className="font-medium text-gray-800 dark:text-white">{city}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Don't see your area? <button className="text-[#F4743B] font-medium hover:underline">Request service in your city</button>
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 pt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-gray-800 dark:text-white text-xl font-bold mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF4E00] to-[#F4743B] rounded-md flex items-center justify-center mr-2">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              ELECTROMBER
            </h3>
            <p className="mb-6">Your one-stop solution for reliable electrician and plumber services in Bangladesh.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-[#F4743B] hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-[#F4743B] hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-[#F4743B] hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-[#F4743B] transition-colors duration-200">Home</a></li>
              <li><a href="#services" className="hover:text-[#F4743B] transition-colors duration-200">Services</a></li>
              <li><a href="#about" className="hover:text-[#F4743B] transition-colors duration-200">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-[#F4743B] transition-colors duration-200">Testimonials</a></li>
              <li><Link to="/privacy-policy" className="hover:text-[#F4743B] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#F4743B] transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#F4743B] mr-3 mt-0.5" />
                <span>123 Service Lane, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#F4743B] mr-3" />
                <span>contact@electromber.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#F4743B] mr-3" />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-[#F4743B] mr-3" />
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get updates on special offers and home maintenance tips.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F4743B] dark:bg-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white px-4 py-2 rounded-r-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ELECTROMBER. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-[#F4743B] transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#F4743B] transition-colors duration-200">Terms of Service</Link>
            <Link to="/careers" className="hover:text-[#F4743B] transition-colors duration-200">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  useScrollAnimation();
  
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <StatsSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ServiceAreas />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
