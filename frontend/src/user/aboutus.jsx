// src/user/aboutus.jsx

import React from 'react';
import DashboardLayout from './DashboardLayout';
import { useTheme } from '../ThemeContext'; 
import { Zap, Wrench, ShieldCheck, Award, Users, TrendingUp, Flag, MapPin, Linkedin, Twitter, Link, Star, Lightbulb, CheckCircle, Clock, Phone, Heart, Home, ThumbsUp } from 'lucide-react';

const StatCard = ({ icon, value, label, description }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500">
            {icon}
        </div>
        <p className="text-4xl font-bold text-gray-800 dark:text-white">{value}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{description}</p>
    </div>
);

const TimelineItem = ({ year, title, description, icon, isLast = false }) => (
    <div className="relative pl-8 pb-8 group">
        {!isLast && <div className="absolute left-3 top-3 w-0.5 h-full bg-gray-300 dark:bg-gray-700 group-hover:bg-orange-500 transition-colors duration-300"></div>}
        <div className="absolute left-0 top-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300 z-10">
            {icon}
        </div>
        <p className="text-sm font-semibold text-orange-500 mb-1">{year}</p>
        <h4 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{title}</h4>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

const TeamMemberCard = ({ name, role, avatar, social, bio }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all duration-300">
        <div className="relative mx-auto w-24 h-24 rounded-full shadow-lg overflow-hidden transform group-hover:scale-110 transition-transform duration-500">
            <img className="w-full h-full object-cover" src={avatar} alt={name} />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{name}</h3>
        <p className="text-orange-500 font-medium">{role}</p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{bio}</p>
        <div className="mt-4 flex justify-center space-x-3">
            <a href={social.linkedin} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" aria-label={`${name}'s LinkedIn`}>
                <Linkedin size={20} />
            </a>
            <a href={social.twitter} className="p-2 text-gray-500 hover:text-sky-500 transition-colors" aria-label={`${name}'s Twitter`}>
                <Twitter size={20} />
            </a>
        </div>
    </div>
);

const ValueCard = ({ icon, title, description }) => (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors duration-500">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{description}</p>
    </div>
);

const AboutUsPage = () => {
    return (
        <DashboardLayout>
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-gray-800/50 py-24 px-6 sm:px-10 lg:px-16 rounded-2xl shadow-lg overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" alt="Technician working" className="w-full h-full object-cover opacity-10 dark:opacity-5"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-gray-900 dark:via-gray-900/80 to-transparent"></div>
                </div>
                <div className="relative text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Empowering Homes <span className="text-orange-500">Across Bangladesh</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        ELECTROMBER was founded in 2022 with a mission to transform home services in Bangladesh. 
                        We combine certified expertise with cutting-edge technology to deliver reliable electrical 
                        and plumbing solutions to your doorstep.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                            <CheckCircle className="text-green-500 mr-2" size={18} />
                            <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                            <Clock className="text-orange-500 mr-2" size={18} />
                            <span className="text-sm font-medium">24/7 Emergency Services</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                            <ShieldCheck className="text-blue-500 mr-2" size={18} />
                            <span className="text-sm font-medium">Verified Professionals</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        icon={<Users size={32} className="text-orange-500"/>} 
                        value="150+" 
                        label="Verified Professionals" 
                        description="Rigorous background checks and skills verification" 
                    />
                    <StatCard 
                        icon={<CheckCircle size={32} className="text-green-500"/>} 
                        value="25,000+" 
                        label="Services Completed" 
                        description="With a 98% customer satisfaction rate" 
                    />
                    <StatCard 
                        icon={<MapPin size={32} className="text-blue-500"/>} 
                        value="8 Cities" 
                        label="Across Bangladesh" 
                        description="Dhaka, Chittagong, Sylhet, Khulna and more" 
                    />
                    <StatCard 
                        icon={<ThumbsUp size={32} className="text-purple-500"/>} 
                        value="4.9/5" 
                        label="Customer Rating" 
                        description="Based on 5,000+ reviews" 
                    />
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 grid lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                        Our <span className="text-orange-500">Journey</span> So Far
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        From a simple idea to becoming Bangladesh's most trusted home service provider, 
                        our journey has been fueled by innovation and customer trust.
                    </p>
                    <div className="space-y-10">
                        <TimelineItem 
                            year="2024" 
                            title="The Idea Was Born" 
                            description="Our founders recognized the challenges homeowners faced in finding reliable technicians and envisioned a tech-enabled solution." 
                            icon={<Lightbulb size={14}/>} 
                        />
                        <TimelineItem 
                            year="2025" 
                            title="ELECTROMBER Launched" 
                            description="Officially launched in Dhaka with 10 certified professionals and our first 100 customers." 
                            icon={<Flag size={14}/>} 
                        />
                        <TimelineItem 
                            year="2026" 
                            title="Rapid Expansion" 
                            description="Expanded to 5 cities, served 10,000+ customers, and introduced our mobile app for seamless booking." 
                            icon={<TrendingUp size={14}/>} 
                        />
                        <TimelineItem 
                            year="2027" 
                            title="Future Vision" 
                            description="Aiming to cover all major cities and introduce smart home installation services." 
                            icon={<Star size={14}/>} 
                            isLast={true} 
                        />
                    </div>
                </div>
                <div className="lg:col-span-3 relative">
                    <div className="relative rounded-2xl shadow-xl overflow-hidden aspect-video">
                        <img 
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                            alt="Company meeting" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <h3 className="text-xl font-bold">Our Team in 2024</h3>
                                <p className="text-sm opacity-90">Celebrating our first 10,000 services milestone</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 dark:text-white">Our Mission</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                To make home maintenance effortless through technology and trusted professionals.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 dark:text-white">Our Vision</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                To be Bangladesh's most trusted home services platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/50 rounded-2xl">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Our <span className="text-orange-500">Core Values</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            These principles guide every decision we make and every service we provide.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        <ValueCard 
                            icon={<ShieldCheck className="text-orange-500" size={32}/>} 
                            title="Safety First" 
                            description="All our technicians undergo rigorous safety training and use only certified equipment." 
                        />
                        <ValueCard 
                            icon={<Award className="text-orange-500" size={32}/>} 
                            title="Quality Guaranteed" 
                            description="We offer a 90-day service warranty on all our work with no questions asked." 
                        />
                        <ValueCard 
                            icon={<Heart className="text-orange-500" size={32}/>} 
                            title="Customer Focused" 
                            description="Your satisfaction is our top priority, backed by 24/7 customer support." 
                        />
                        <ValueCard 
                            icon={<Zap className="text-orange-500" size={32}/>} 
                            title="Always Innovating" 
                            description="We continuously improve our services through technology and training." 
                        />
                    </div>
                </div>
            </section>
            
            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Meet Our <span className="text-orange-500">Leadership</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            The passionate team driving ELECTROMBER's vision forward with expertise and dedication.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        <TeamMemberCard 
                            name="Sindid Arafat" 
                            role="Founder & CEO" 
                            avatar="https://www.bracucc.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSindid-Arafat-Creative.7ab51af8.png&w=1920&q=75" 
                            social={{linkedin: "#", twitter: "#"}} 
                            bio="Computer engineer with 5+ years experience in residential and commercial projects."
                        />
                        <TeamMemberCard 
                            name="Nowrin Afrin" 
                            role="Head of Operations" 
                            avatar="https://media.licdn.com/dms/image/v2/D4E03AQHAgO_GmDgqGw/profile-displayphoto-shrink_200_200/B4EZaXhI1TH4AY-/0/1746298770992?e=2147483647&v=beta&t=b1eeYuI5v2g8iLWEMX8FumjvPkFmr4g948VjykZVt70" 
                            social={{linkedin: "#", twitter: "#"}} 
                            bio="Operations specialist with expertise in service delivery and quality control."
                        />
                        <TeamMemberCard 
                            name="Md. Sabbir Akon" 
                            role="Chief Technology Officer" 
                            avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8wTwpZwR67ivgwRmb6DIPTa0Ry-CPmjA7w&s" 
                            social={{linkedin: "#", twitter: "#"}} 
                            bio="Tech entrepreneur focused on building seamless digital experiences for customers."
                        />
                        <TeamMemberCard 
                            name="Basit Ibrahim" 
                            role="Chief Finance Officer" 
                            avatar="https://scontent.fjsr13-1.fna.fbcdn.net/v/t39.30808-1/251066429_1570065436668051_2563879864103268332_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=SlpNyhKNuuQQ7kNvwEKnL0q&_nc_oc=AdlIUrntRsqB_d2B9CSwExfzAaMu3a86-H0_WM9lFEgLASa8FRepYuKAX2ZNioavKzs&_nc_zt=24&_nc_ht=scontent.fjsr13-1.fna&_nc_gid=99mYG4rPpudlljDKGcpjNw&oh=00_AfM44gJRDk2P_Ja82884qUqSRlOPR_kdOJWAiQkENBUdGg&oe=6860C47E" 
                            social={{linkedin: "#", twitter: "#"}} 
                            bio="Customer service expert passionate about creating delightful service experiences."
                        />
                    </div>
                </div>
            </section>

            {/* Service Coverage Section */}
            <section className="py-16 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Our <span className="text-orange-500">Service</span> Coverage
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Currently serving major cities across Bangladesh with plans to expand nationwide.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal', 'Rangpur', 'Mymensingh'].map((city, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg text-center group hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors duration-300">
                                <Home className="mx-auto text-orange-500 mb-2" size={24} />
                                <h3 className="font-medium text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{city}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {index < 4 ? 'Available Now' : 'Coming Soon'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-12 rounded-2xl text-center shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Team</h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Are you a skilled electrician or plumber looking for rewarding opportunities? 
                            We offer competitive pay, continuous training, and the latest tools.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/careers" className="inline-flex items-center bg-white text-orange-500 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                                View Open Positions
                            </Link>
                            <Link to="/contact" className="inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105">
                                Contact Our HR Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default AboutUsPage;
