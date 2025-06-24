import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronsRight, Star, ShieldCheck, Zap, Wrench, Clock, Award, Moon, Sun, Facebook, Twitter, Instagram, ArrowLeft, User, Lock, Mail } from 'lucide-react';

// --- CONTEXT AND HOOKS ---

// 1. THEME CONTEXT & PROVIDER
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// 2. SCROLL ANIMATION HOOK
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};


// --- LANDING PAGE COMPONENTS ---

const Header = ({ navigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('landing')}>
           <div className="w-8 h-8 bg-orange-500/20 rounded-md"></div>
           <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wider">ELECTROMBER</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B]">Home</a>
          <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B]">Services</a>
          <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B]">About Us</a>
          <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-[#F4743B]">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => navigate('login')} className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Login
            </button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
    <section id="home" className="relative h-screen flex items-center justify-center text-white bg-gray-900">
      <div className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-30" style={{ backgroundImage: "url('https://www.danwoodservices.com/wp-content/uploads/2025/06/plumber-vs-electrician.jpg')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-fade-in-down">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4E00] to-[#F4743B]">ELECTROMBER</span>
        </h1>
        <p className="text-2xl md:text-4xl font-light mb-8 animate-fade-in-up animation-delay-300">আপনার বিশ্বস্ত ইলেক্ট্রিশিয়ান ও প্লাম্বার, এখন এক ক্লিকে।</p>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-12 animate-fade-in-up animation-delay-500">Fast, reliable, and professional home services in Bangladesh. We connect you with certified experts.</p>
        <a href="#services" className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-4 px-10 rounded-lg text-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center animate-fade-in-up animation-delay-700">
          Book a Service Now <ChevronsRight className="ml-2 h-6 w-6" />
        </a>
      </div>
    </section>
);

const ServiceCard = ({ icon, title, description, items, imageUrl }) => (
    <div className="relative group overflow-hidden rounded-xl shadow-lg dark:shadow-2xl bg-white dark:bg-gray-800 scroll-animate">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${imageUrl})`, opacity: 0.1 }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent"></div>
        <div className="relative p-8 flex flex-col h-full text-gray-800 dark:text-white">
            <div className="mb-6 flex items-center space-x-4"><div className="bg-gradient-to-r from-[#FF4E00] to-[#F4743B] p-4 rounded-full text-white">{icon}</div><h3 className="text-3xl font-bold">{title}</h3></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{description}</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-8">{items.map((item, index) => (<li key={index} className="flex items-center"><Zap className="h-5 w-5 mr-3 text-[#F4743B]" /><span>{item}</span></li>))}</ul>
            <button className="mt-auto w-full bg-transparent border-2 border-[#FF4E00] text-[#FF4E00] font-bold py-3 px-6 rounded-lg hover:bg-[#FF4E00] hover:text-white">View Details</button>
        </div>
    </div>
);

const Services = () => (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate"><h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Core Services</h2><p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">From fixing a switch to a complete pipeline overhaul, our certified professionals are ready to help.</p></div>
        <div className="grid md:grid-cols-2 gap-12">
            <ServiceCard icon={<Zap className="h-8 w-8 text-white" />} title="Electrician Services" description="Certified electricians for all your electrical needs, ensuring safety and quality." items={['Wiring & Re-wiring', 'Fan & Light Installation', 'Circuit Breaker Repair', 'Appliance Installation']} imageUrl="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop" />
            <ServiceCard icon={<Wrench className="h-8 w-8 text-white" />} title="Plumber Services" description="Expert plumbers to tackle leaks, installations, and all your plumbing challenges." items={['Water Leak Repair', 'Faucet & Sink Installation', 'Drain Cleaning', 'Water Heater Service']} imageUrl="https://urbansease.com/wp-content/uploads/2024/10/Plumber-service-near-you.jpg" />
        </div>
      </div>
    </section>
);

const HowItWorks = () => {
  const steps = [{icon: <span className="text-4xl">1</span>, title: 'Book Online', description: 'Select the service you need and schedule a time that works for you.'}, {icon: <span className="text-4xl">2</span>, title: 'We Connect', description: 'We match you with a skilled and verified professional from your local area.'}, {icon: <span className="text-4xl">3</span>, title: 'Job Done', description: 'Your expert arrives on time, completes the job to your satisfaction.'}];
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate"><h2 className="text-4xl font-bold text-gray-800 dark:text-white">How It Works</h2><p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Get service in 3 simple steps.</p></div>
        <div className="relative grid md:grid-cols-3 gap-10">
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -mt-8"><svg width="100%" height="100%"><line x1="15%" y1="50%" x2="85%" y2="50%" strokeDasharray="10, 10" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" /></svg></div>
          {steps.map((step, index) => (<div key={index} className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg scroll-animate" style={{animationDelay: `${index * 200}ms`}}><div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#FF4E00] to-[#F4743B] text-white font-extrabold text-4xl transform group-hover:scale-110 transition-transform duration-300">{step.icon}</div><h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{step.title}</h3><p className="text-gray-600 dark:text-gray-400">{step.description}</p></div>))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
    const features = [{ icon: <ShieldCheck className="w-10 h-10" />, title: 'Verified Experts', description: 'All our professionals are background-checked and highly trained.' }, { icon: <Clock className="w-10 h-10" />, title: '24/7 Availability', description: 'We are here to help you anytime, day or night, for emergency services.' }, { icon: <Award className="w-10 h-10" />, title: 'Quality Guarantee', description: 'We stand by our work with a satisfaction guarantee on all services.' }, { icon: <Star className="w-10 h-10" />, title: 'Upfront Pricing', description: 'No hidden fees. Get a clear and fair price before the work begins.' }];
    return (<section id="about" className="py-20 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-6"><div className="text-center mb-16 scroll-animate"><h2 className="text-4xl font-bold text-gray-800 dark:text-white">Why Choose ELECTROMBER?</h2><p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-3xl mx-auto">We are committed to providing a seamless, reliable, and high-quality service experience.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{features.map((feature, index) => (<div key={index} className="p-8 bg-white dark:bg-gray-800 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg scroll-animate" style={{animationDelay: `${index * 150}ms`}}><div className="inline-block text-[#FF4E00] p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">{feature.icon}</div><h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3><p className="text-gray-600 dark:text-gray-400">{feature.description}</p></div>))}</div></div></section>);
};

const Testimonials = () => {
    const reviews = [{quote: "The electrician from ELECTROMBER was incredibly professional and fixed my issue in no time!", name: "Anisur Rahman", location: "Gulshan, Dhaka", avatar: "https://placehold.co/100x100/313131/F4743B?text=AR"}, {quote: "I had a major plumbing leak, and their 24/7 service was a lifesaver. Fantastic service!", name: "Fatima Akhter", location: "Dhanmondi, Dhaka", avatar: "https://placehold.co/100x100/313131/F4743B?text=FA"}, {quote: "Booking was so easy on their website. The pricing was transparent, and the quality of work was excellent.", name: "Kamal Hossain", location: "Uttara, Dhaka", avatar: "https://placehold.co/100x100/313131/F4743B?text=KH"}];
    return (<section className="py-20 bg-white dark:bg-gray-800"><div className="container mx-auto px-6"><div className="text-center mb-16 scroll-animate"><h2 className="text-4xl font-bold text-gray-800 dark:text-white">What Our Customers Say</h2><p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Real stories from satisfied clients.</p></div><div className="grid md:grid-cols-3 gap-8">{reviews.map((review, index) => (<div key={index} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col scroll-animate" style={{animationDelay: `${index * 200}ms`}}><div className="flex-grow text-gray-600 dark:text-gray-300 mb-6">" {review.quote} "</div><div className="flex items-center"><img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mr-4 border-2 border-[#FF4E00]" /><div><p className="font-bold text-gray-800 dark:text-white text-lg">{review.name}</p><p className="text-gray-500 dark:text-gray-400">{review.location}</p><div className="flex mt-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}</div></div></div></div>))}</div></div></section>);
}

const Footer = () => (
    <footer id="contact" className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 pt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8"><div className="col-span-1 md:col-span-2 lg:col-span-1"><h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">ELECTROMBER</h3><p>Your one-stop solution for reliable electrician and plumber services in Bangladesh.</p></div><div><h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Quick Links</h3><ul><li className="mb-2"><a href="#home" className="hover:text-[#F4743B]">Home</a></li><li className="mb-2"><a href="#services" className="hover:text-[#F4743B]">Services</a></li><li className="mb-2"><a href="#about" className="hover:text-[#F4743B]">About Us</a></li><li className="mb-2"><a href="/privacy-policy" className="hover:text-[#F4743B]">Privacy Policy</a></li></ul></div><div><h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Contact Us</h3><p>123 Service Lane, Dhaka</p><p>Bangladesh</p><p className="mt-2">Email: contact@electromber.com</p><p>Phone: +880 123 456 7890</p></div><div><h3 className="text-gray-800 dark:text-white text-lg font-bold mb-4">Follow Us</h3><div className="flex space-x-4"><a href="/facebook" className="hover:text-[#F4743B]"><Facebook/></a><a href="/twitter" className="hover:text-[#F4743B]"><Twitter/></a><a href="/instagram" className="hover:text-[#F4743B]"><Instagram/></a></div></div></div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm"><p>&copy; {new Date().getFullYear()} ELECTROMBER. All Rights Reserved.</p></div>
      </div>
    </footer>
);


const LandingPage = ({ navigate }) => {
    useScrollAnimation();
    return (
        <>
            <Header navigate={navigate} />
            <main>
                <Hero />
                <Services />
                <HowItWorks />
                <WhyChooseUs />
                <Testimonials />
            </main>
            <Footer />
        </>
    );
};


// --- AUTHENTICATION PAGES ---

const AuthPage = ({ children, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="absolute top-5 left-5">
             <button onClick={() => navigate('landing')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-[#F4743B] transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
            </button>
        </div>
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block w-16 h-16 bg-orange-500/20 rounded-lg"></div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wider mt-2">ELECTROMBER</h1>
            </div>
            {children}
        </div>
    </div>
);

const LoginPage = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy login logic
        if (email === 'user@electromber.com' && password === 'password123') {
            setError('');
            alert('Login successful!'); // Replace with actual navigation later
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <AuthPage navigate={navigate}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>
                {error && <p className="bg-red-500/20 text-red-500 text-center p-3 rounded-lg mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative"><Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <div className="relative"><Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <div className="text-right"><a href="#" className="text-sm text-[#F4743B] hover:underline">Forgot Password?</a></div>
                    <button type="submit" className="w-full bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-3 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 transform hover:scale-105 shadow-lg">Login</button>
                </form>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                    Don't have an account? <span onClick={() => navigate('register')} className="font-bold text-[#F4743B] hover:underline cursor-pointer">Register now</span>
                </p>
            </div>
        </AuthPage>
    );
};

const RegistrationPage = ({ navigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        // Dummy registration logic
        setSuccess('Registration successful! Please log in.');
        // Clear form
        setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
    };

    return (
        <AuthPage navigate={navigate}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Create Your Account</h2>
                {error && <p className="bg-red-500/20 text-red-500 text-center p-3 rounded-lg mb-4">{error}</p>}
                {success && <p className="bg-green-500/20 text-green-500 text-center p-3 rounded-lg mb-4">{success}</p>}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="relative"><User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <div className="relative"><Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <div className="relative"><Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <div className="relative"><Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20}/><input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-[#F4743B] rounded-lg outline-none transition-all" /></div>
                    <button type="submit" className="w-full bg-gradient-to-r from-[#FF4E00] to-[#F4743B] text-white font-bold py-3 rounded-lg hover:from-[#F4743B] hover:to-[#FF4E00] transition-all duration-300 transform hover:scale-105 shadow-lg">Create Account</button>
                </form>
                 <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                    Already have an account? <span onClick={() => navigate('login')} className="font-bold text-[#F4743B] hover:underline cursor-pointer">Login here</span>
                </p>
            </div>
        </AuthPage>
    );
};

// --- MAIN APP COMPONENT (ROUTER) ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigate = (page) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
        case 'login':
            return <LoginPage navigate={navigate} />;
        case 'register':
            return <RegistrationPage navigate={navigate} />;
        default:
            return <LandingPage navigate={navigate} />;
    }
  }

  return (
    <ThemeProvider>
        <div className="bg-white dark:bg-gray-900 font-sans">
          <style>{`
            :root { scroll-behavior: smooth; }
            body { font-family: 'Poppins', sans-serif; }
            .animation-delay-300 { animation-delay: 300ms; }
            .animation-delay-500 { animation-delay: 500ms; }
            .animation-delay-700 { animation-delay: 700ms; }
            @keyframes a-fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-down { animation: a-fade-in-down 0.8s ease-out forwards; }
            @keyframes a-fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-up { opacity: 0; animation: a-fade-in-up 0.8s ease-out forwards; }
            .scroll-animate { opacity: 0; transition: opacity 0.8s, transform 0.8s; }
          `}</style>
          
          {renderPage()}
        </div>
    </ThemeProvider>
  );
}
