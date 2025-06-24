// src/user/contact.jsx

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { useTheme } from '../ThemeContext'; 
import { 
  Phone, Mail, MapPin, ChevronDown, Send, Building, Clock as ClockIcon, 
  LifeBuoy, MessageSquare, Headphones, AlertTriangle, CheckCircle 
} from 'lucide-react';

const ContactInfoCard = ({ icon, title, description, contact, linkText, linkHref }) => (
  <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{description}</p>
        <div className="mt-3">
          <p className="font-medium text-gray-800 dark:text-white">{contact}</p>
          <a 
            href={linkHref} 
            className="inline-flex items-center text-orange-500 font-semibold hover:underline mt-1 group-hover:text-orange-600 transition-colors duration-300"
          >
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left group"
        aria-expanded={isOpen}
      >
        <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
          {question}
        </h4>
        <ChevronDown 
          size={20} 
          className={`text-orange-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div 
          className="mt-3 text-gray-600 dark:text-gray-400 animate-fade-in-down" 
          style={{animationDuration: '0.3s'}}
          aria-hidden={!isOpen}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    serviceType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert("Thank you for your message! We will get back to you within 24 hours.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      serviceType: ''
    });
  };

  const faqs = [
    { 
      q: "How do I book a service?", 
      a: "You can book a service in three ways: 1) Through our mobile app, 2) Via our website dashboard, or 3) By calling our 24/7 customer support line. All methods provide real-time technician availability and upfront pricing." 
    },
    { 
      q: "What are your service hours?", 
      a: "Regular service hours are from 8:00 AM to 10:00 PM daily. For emergencies (water leaks, electrical hazards, etc.), we offer 24/7 support with a guaranteed response time of under 30 minutes in urban areas." 
    },
    { 
      q: "How is the pricing determined?", 
      a: "Our pricing is transparent and based on: 1) Service type, 2) Time required, 3) Materials needed, and 4) Urgency level. You'll receive a detailed estimate before work begins, with no hidden charges. We also offer fixed-price packages for common services." 
    },
    { 
      q: "Are the technicians verified?", 
      a: "Yes, all ELECTROMBER technicians undergo a 5-step verification process: 1) Background check, 2) Skill assessment, 3) Safety training, 4) Customer service training, and 5) Ongoing performance reviews. Each carries a company ID you can verify upon arrival." 
    },
    { 
      q: "What payment methods do you accept?", 
      a: "We accept all major credit/debit cards, mobile payments (bKash, Nagad), bank transfers, and cash. Corporate accounts can be set up with monthly billing. All digital payments are securely processed through SSL encryption." 
    }
  ];

  const serviceTypes = [
    "Electrical Installation",
    "Electrical Repair",
    "Plumbing Installation",
    "Plumbing Repair",
    "Emergency Service",
    "Maintenance Check",
    "Other"
  ];

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative bg-white dark:bg-gray-800/50 py-24 px-6 sm:px-10 lg:px-16 rounded-2xl shadow-lg overflow-hidden text-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-gray-900 dark:via-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            We're Here to <span className="text-orange-500">Help You</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you have questions about our services, need technical support, or want to provide feedback, 
            our team is ready to assist you 24/7. Reach out through any channel that's convenient for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <Headphones className="text-orange-500 mr-2" size={18} />
              <span className="text-sm font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <MessageSquare className="text-blue-500 mr-2" size={18} />
              <span className="text-sm font-medium">Average Response: 15 mins</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="text-green-500 mr-2" size={18} />
              <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Options Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-16">
        <ContactInfoCard 
          icon={<Phone size={24} className="text-orange-500"/>} 
          title="Call Us" 
          description="For immediate support or emergency services"
          contact="+880 123 456 7890"
          linkText="View all contact numbers"
          linkHref="#"
        />
        <ContactInfoCard 
          icon={<Mail size={24} className="text-orange-500"/>} 
          title="Email Us" 
          description="For general inquiries and feedback"
          contact="contact@electromber.com"
          linkText="Email our support team"
          linkHref="mailto:contact@electromber.com"
        />
        <ContactInfoCard 
          icon={<Building size={24} className="text-orange-500"/>} 
          title="Visit Us" 
          description="Our headquarters in Dhaka"
          contact="123 Service Lane, Gulshan-1, Dhaka-1212"
          linkText="Get directions"
          linkHref="#"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <MessageSquare className="text-orange-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Send us a Message</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-orange-300 transition-all duration-300" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-orange-300 transition-all duration-300" 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-orange-300 transition-all duration-300" 
              />
            </div>
            
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-orange-300 transition-all duration-300 appearance-none"
              >
                <option value="">Select a service type</option>
                {serviceTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5" 
                required 
                placeholder="Please describe your inquiry in detail..."
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-orange-300 transition-all duration-300"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Send size={18} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* FAQ and Support Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <div className="p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <LifeBuoy className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
          
          {/* Emergency Notice */}
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="text-red-500 dark:text-red-400" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-red-800 dark:text-red-200">Emergency Support</h4>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  For electrical hazards, gas leaks, or water flooding, call our emergency line immediately:
                </p>
                <a 
                  href="tel:+8801711123456" 
                  className="inline-flex items-center mt-2 text-red-700 dark:text-red-200 font-bold hover:underline"
                >
                  <Phone className="mr-2" size={16} />
                  +880 1711 123 456 (24/7)
                </a>
              </div>
            </div>
          </div>
          
          {/* Business Hours */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <ClockIcon className="text-blue-500 dark:text-blue-400" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 dark:text-blue-200">Business Hours</h4>
                <ul className="text-sm text-blue-600 dark:text-blue-300 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">8:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between pt-2 mt-2 border-t border-blue-200 dark:border-blue-900/20">
                    <span>Emergency Services:</span>
                    <span className="font-medium">24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Headquarters</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Visit our main office in Dhaka to discuss business opportunities, partnerships, 
              or career prospects with our team.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    123 Service Lane, Gulshan-1<br />
                    Dhaka-1212, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ClockIcon className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Visiting Hours</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Sunday - Thursday: 9:00 AM - 5:00 PM<br />
                    (By appointment only)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-64 md:h-auto">
            {/* Replace with your actual map embed */}
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Map of our location</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactPage;