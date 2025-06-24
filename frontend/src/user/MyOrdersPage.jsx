// src/user/MyOrdersPage.jsx

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { useTheme } from '../ThemeContext'; 
import { Search, SlidersHorizontal, FileText, Star, X as CloseIcon, Send, MessageSquare, Phone, User as UserIcon, Zap, Wrench, ChevronDown, Repeat, AlertTriangle,XCircle,Clock,CheckCircle } from 'lucide-react';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in-up" style={{animationDuration: '0.3s'}}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg m-4 relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon size={20} className="text-gray-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

// --- Order Action Modals ---
const ReviewModal = ({ order, onClose }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); alert(`Review Submitted!\nRating: ${rating} stars`); onClose(); };
    return (
        <Modal isOpen={true} onClose={onClose} title="Write a Review">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">For order: <span className="font-semibold text-orange-500">{order.id}</span></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 text-center">
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">How was your experience?</p>
                    <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} type="button" onClick={() => setRating(star)}>
                                <Star size={32} className={`transition-all duration-150 transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'}`} fill={rating >= star ? 'currentColor' : 'none'}/>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="reviewText" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Your Comments</label>
                    <textarea id="reviewText" rows="4" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder={`Tell us more about the service from ${order.technician}...`} className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all">Submit Review</button>
            </form>
        </Modal>
    );
};

const ReceiptModal = ({ order, onClose }) => (
    <Modal isOpen={true} onClose={onClose} title="Invoice">
        <div className="text-center mb-6"><p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p></div>
        <div className="my-6 border-t border-b border-gray-200 dark:border-gray-700 py-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Service:</span> <span className="font-medium text-right">{order.service}</span></div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Date:</span> <span className="font-medium">{order.date}</span></div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Technician:</span> <span className="font-medium">{order.technician}</span></div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Status:</span> <span className={`font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}`}>{order.status}</span></div>
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Service Cost:</span> <span>{order.cost}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>VAT (5%):</span> <span>৳{parseInt(order.cost.replace('৳','').replace(',','')) * 0.05}</span></div>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span>Total Paid</span>
            <span>৳{parseInt(order.cost.replace('৳','').replace(',','')) * 1.05}</span>
        </div>
    </Modal>
);

const ComplainModal = ({ order, onClose }) => {
    const handleSubmit = (e) => { e.preventDefault(); alert(`Complaint for order ${order.id} has been submitted.`); onClose(); };
    return (
        <Modal isOpen={true} onClose={onClose} title="File a Complaint">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Order ID: <span className="font-semibold text-orange-500">{order.id}</span></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="complainText" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Please describe your issue</label>
                    <textarea id="complainText" rows="5" placeholder="Provide as much detail as possible..." required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-red-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all">Submit Complaint</button>
            </form>
        </Modal>
    );
};

// --- Order Card Component ---
const OrderCard = ({ order, onReview, onReceipt, onComplain }) => {
    const [isExpanded, setExpanded] = useState(false);
    const statusInfo = {
        Completed: { color: 'green-500', icon: <CheckCircle /> },
        'In Progress': { color: 'yellow-500', icon: <Clock /> },
        Scheduled: { color: 'blue-500', icon: <Wrench /> },
        Cancelled: { color: 'red-500', icon: <XCircle /> }
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
            <div className="p-6 cursor-pointer" onClick={() => setExpanded(!isExpanded)}>
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${statusInfo[order.status].color}/10`}>
                            {React.cloneElement(statusInfo[order.status].icon, { className: `text-${statusInfo[order.status].color}`, size: 24 })}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white">{order.service}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.id} &bull; {order.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-semibold text-lg text-gray-800 dark:text-white">{order.cost}</p>
                            <p className={`text-xs font-bold text-${statusInfo[order.status].color}`}>{order.status}</p>
                        </div>
                        <ChevronDown size={24} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 animate-fade-in-down" style={{animationDuration: '0.5s'}}>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Technician</h4>
                            <div className="flex items-center space-x-3">
                                <img src={order.technicianAvatar} alt={order.technician} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-700 dark:text-gray-200">{order.technician}</p>
                                    <div className="flex items-center text-xs text-yellow-500"><Star size={14} fill="currentColor" className="mr-1"/> 4.8</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Actions</h4>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => onReceipt(order)} className="flex-1 text-sm flex items-center space-x-2 justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-md transition-colors"><FileText size={16}/><span>Invoice</span></button>
                                {order.status === 'Completed' && (
                                    <button onClick={() => onReview(order)} disabled={order.reviewed} className="flex-1 text-sm flex items-center space-x-2 justify-center bg-yellow-400/20 text-yellow-600 hover:bg-yellow-400/30 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"><Star size={16}/><span>{order.reviewed ? 'Reviewed' : 'Review'}</span></button>
                                )}
                                <button onClick={() => onComplain(order)} className="flex-1 text-sm flex items-center space-x-2 justify-center bg-red-500/10 text-red-500 hover:bg-red-500/20 p-2 rounded-md"><AlertTriangle size={16}/><span>Complain</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MyOrdersPage = () => {
    const allOrders = [
        { id: 'ELEC-2025-001', service: 'Full House Wiring', type: 'Electrician', date: '2025-06-15', technician: 'Robiul Islam', technicianAvatar: 'https://placehold.co/32x32/22c55e/white?text=R', cost: '৳5,500', status: 'Completed', reviewed: false },
        { id: 'PLUM-2025-002', service: 'Kitchen Sink Installation', type: 'Plumber', date: '2025-06-20', technician: 'Al-Amin Hossain', technicianAvatar: 'https://placehold.co/32x32/eab308/white?text=A', cost: '৳1,200', status: 'In Progress', reviewed: false },
        { id: 'ELEC-2025-003', service: 'Ceiling Fan Repair', type: 'Electrician', date: '2025-06-22', technician: 'Robiul Islam', technicianAvatar: 'https://placehold.co/32x32/22c55e/white?text=R', cost: '৳800', status: 'Completed', reviewed: true },
        { id: 'PLUM-2025-004', service: 'Bathroom Leak Fix', type: 'Plumber', date: '2025-06-23', technician: 'Jamil Ahmed', technicianAvatar: 'https://placehold.co/32x32/3b82f6/white?text=J', cost: '৳1,500', status: 'Scheduled', reviewed: false },
        { id: 'ELEC-2025-005', service: 'Appliance Setup', type: 'Electrician', date: '2025-05-30', technician: 'Suman Barua', technicianAvatar: 'https://placehold.co/32x32/9333ea/white?text=S', cost: '৳1,000', status: 'Cancelled', reviewed: false },
        { id: 'PLUM-2025-006', service: 'Water Heater Service', type: 'Plumber', date: '2025-06-10', technician: 'Al-Amin Hossain', technicianAvatar: 'https://placehold.co/32x32/eab308/white?text=A', cost: '৳2,500', status: 'Completed', reviewed: false },
    ];

    const [activeStatus, setActiveStatus] = useState('All');
    const [activeType, setActiveType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
    const [isComplainModalOpen, setComplainModalOpen] = useState(false);

    const openModal = (modalSetter, order) => { setSelectedOrder(order); modalSetter(true); };
    const closeModal = (modalSetter) => { setSelectedOrder(null); modalSetter(false); };
    
    const filteredOrders = allOrders.filter(order => {
        const matchesStatus = activeStatus === 'All' || order.status === activeStatus;
        const matchesType = activeType === 'All' || order.type === activeType;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              order.technician.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
    });

    const statusTabs = ['All', 'In Progress', 'Completed', 'Cancelled'];
    const typeTabs = ['All', 'Electrician', 'Plumber'];

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Orders History</h1>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text" placeholder="Search by Order ID, service, or technician..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {typeTabs.map(tab => (
                            <button key={tab} onClick={() => setActiveType(tab)} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeType === tab ? 'bg-orange-500 text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex items-center space-x-2 border-b-2 border-gray-200 dark:border-gray-700 mb-6">
                    {statusTabs.map(tab => (
                        <button key={tab} onClick={() => setActiveStatus(tab)} className={`px-4 py-2 font-semibold transition-colors duration-300 ${activeStatus === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'border-b-2 border-transparent text-gray-500 hover:text-orange-500'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderCard key={order.id} order={order} onReview={openModal.bind(null, setReviewModalOpen)} onReceipt={openModal.bind(null, setReceiptModalOpen)} onComplain={openModal.bind(null, setComplainModalOpen)} />
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 dark:text-gray-400">No orders found for this filter.</p>
                        </div>
                    )}
                </div>
            </div>

            {isReviewModalOpen && <ReviewModal order={selectedOrder} onClose={() => closeModal(setReviewModalOpen)} />}
            {isReceiptModalOpen && <ReceiptModal order={selectedOrder} onClose={() => closeModal(setReceiptModalOpen)} />}
            {isComplainModalOpen && <ComplainModal order={selectedOrder} onClose={() => closeModal(setComplainModalOpen)} />}
        </DashboardLayout>
    );
};

export default MyOrdersPage;