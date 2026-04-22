import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  LogOut,
  RefreshCw,
  Bell,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { db, handleFirestoreError } from "../lib/firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

interface Booking {
  id: string;
  packageId: string;
  status: string;
  totalAmount: number;
  travelDate: string;
  vendorId?: string;
  vendorStatus: 'None' | 'Pending' | 'Accepted' | 'Declined';
  packageName?: string;
  clientName?: string;
}

export default function VendorPortal() {
  const { profile, loading, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (!profile || profile.role !== 'Vendor') return;

    // Listen to bookings assigned to this vendor
    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", profile.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bData);
    }, (error) => {
      console.error("Vendor Bookings Sync Error:", error);
    });

    return () => unsubscribe();
  }, [profile]);

  const handleBookingAction = async (bookingId: string, action: 'Accepted' | 'Declined') => {
    setIsProcessing(bookingId);
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        vendorStatus: action,
        status: action === 'Accepted' ? 'In-Progress' : 'Confirmed' // If declined, go back to confirmed (needs re-assignment)
      });

      // Create notification for Admin
      await addDoc(collection(db, "notifications"), {
        recipientId: "SYSTEM_ADMIN", // Or a specific admin UID
        title: `Vendor ${action}`,
        message: `Vendor ${profile?.displayName} has ${action.toLowerCase()} booking ${bookingId}.`,
        bookingId,
        type: 'vendor_action',
        read: false,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error(`Error ${action} booking:`, error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    setIsProcessing(bookingId);
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        status: 'Completed'
      });
    } catch (error) {
      console.error("Error completing booking:", error);
    } finally {
      setIsProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center gap-6">
        <RefreshCw className="animate-spin text-[#D4AF37]" size={40} />
        <p className="font-bold text-[#002366] uppercase tracking-widest">Verifying Vendor Access...</p>
      </div>
    );
  }

  if (!profile || profile.role !== 'Vendor') {
    return (
      <div className="pt-40 flex flex-col items-center justify-center text-center px-6">
        <ShieldCheck className="text-red-500 mb-6" size={60} />
        <h2 className="text-3xl font-bold text-[#002366] serif mb-4">Vendor Access Required</h2>
        <p className="text-slate-500 max-w-md mb-10 text-lg">
          This portal is restricted to registered service providers. Please login with your vendor account.
        </p>
        <button 
          onClick={login}
          className="px-10 py-4 bg-[#002366] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-xl"
        >
          Vendor Log In
        </button>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20}/> },
    { id: "bookings", label: "Assigned Bookings", icon: <Briefcase size={20}/> },
    { id: "payments", label: "Payments", icon: <Clock size={20}/> }
  ];

  const pendingBookings = bookings.filter(b => b.vendorStatus === 'Pending');
  const activeBookings = bookings.filter(b => b.vendorStatus === 'Accepted' && b.status !== 'Completed');

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#002366] text-white transition-all duration-300 flex flex-col fixed h-full z-40 lg:relative",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          {isSidebarOpen && <span className="font-serif font-bold text-xl tracking-tight text-[#D4AF37]">Vendor Hub</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all font-medium text-sm",
                activeTab === item.id 
                  ? "bg-[#D4AF37] text-[#002366] shadow-lg shadow-[#D4AF37]/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-4 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <LogOut size={18}/>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#002366] serif capitalize mb-2">{activeTab}</h1>
              <p className="text-slate-500 font-medium tracking-tight">Service Provider Dashboard • {profile.displayName}</p>
            </div>
            <div className="flex gap-4">
               <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#002366] transition-all relative">
                 <Bell size={20}/>
                {pendingBookings.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-white"></span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">New Assignments</p>
                    <h4 className="text-3xl font-bold text-[#002366] font-serif">{pendingBookings.length}</h4>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Trips</p>
                    <h4 className="text-3xl font-bold text-[#002366] font-serif">{activeBookings.length}</h4>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Completed</p>
                    <h4 className="text-3xl font-bold text-[#002366] font-serif">{bookings.filter(b => b.status === 'Completed').length}</h4>
                  </div>
                </div>

                {/* Priority Actions */}
                {pendingBookings.length > 0 && (
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-bold text-[#002366] serif mb-6 flex items-center gap-3">
                      <Clock className="text-[#D4AF37]" /> Response Required
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pendingBookings.map(booking => (
                        <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Booking ID: {booking.id}</p>
                              <h4 className="font-bold text-[#002366] text-lg">{booking.packageName || "Custom Tour"}</h4>
                            </div>
                            <span className="text-xs font-bold text-[#D4AF37]">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><Calendar size={14}/> {booking.travelDate}</span>
                            <span className="flex items-center gap-1"><MapPin size={14}/> Guest: {booking.clientName || "Direct Client"}</span>
                          </div>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleBookingAction(booking.id, 'Accepted')}
                              disabled={isProcessing === booking.id}
                              className="flex-grow bg-[#002366] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                            >
                              {isProcessing === booking.id ? <RefreshCw className="animate-spin" size={14}/> : <CheckCircle size={14}/>}
                              Accept
                            </button>
                            <button 
                              onClick={() => handleBookingAction(booking.id, 'Declined')}
                              disabled={isProcessing === booking.id}
                              className="px-6 border border-red-200 text-red-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center"
                            >
                              <XCircle size={14}/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Assignments List */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                   <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-[#002366] serif">Current Operations</h3>
                      <button className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:underline">Download Schedule</button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left font-sans">
                         <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                               <th className="px-10 py-5">Travel Date</th>
                               <th className="px-10 py-5">Booking / Client</th>
                               <th className="px-10 py-5">Status</th>
                               <th className="px-10 py-5">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {activeBookings.length === 0 ? (
                              <tr>
                                <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-medium italic">
                                  No active assignments currently.
                                </td>
                              </tr>
                            ) : (
                              activeBookings.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                                   <td className="px-10 py-5">
                                      <p className="font-bold text-[#002366]">{b.travelDate}</p>
                                   </td>
                                   <td className="px-10 py-5">
                                      <p className="font-bold text-slate-700">{b.packageName || "Package"}</p>
                                      <p className="text-[10px] text-slate-400 uppercase font-black">{b.id} • {b.clientName || "Direct"}</p>
                                   </td>
                                   <td className="px-10 py-5">
                                      <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        b.status === "In-Progress" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                      )}>
                                         {b.status}
                                      </span>
                                   </td>
                                   <td className="px-10 py-5">
                                      {b.status === 'In-Progress' ? (
                                        <button 
                                          onClick={() => handleCompleteBooking(b.id)}
                                          disabled={isProcessing === b.id}
                                          className="text-xs font-bold text-[#002366] bg-slate-100 px-4 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all flex items-center gap-2"
                                        >
                                          Mark Completed
                                        </button>
                                      ) : (
                                        <button className="text-xs font-bold text-slate-400 cursor-not-allowed">
                                          Operational
                                        </button>
                                      )}
                                   </td>
                                </tr>
                              ))
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-[#002366] serif mb-10">Full Assignment History</h2>
                <div className="space-y-6">
                  {bookings.map(b => (
                    <div key={b.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#D4AF37]/30 transition-all">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            b.status === 'Completed' ? "bg-green-500" : "bg-[#D4AF37]"
                          )}></span>
                          <h4 className="font-bold text-[#002366]">{b.packageName || "Tour Booking"}</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{b.id} • Date: {b.travelDate}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end gap-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          b.vendorStatus === 'Accepted' ? "bg-green-100 text-green-700" :
                          b.vendorStatus === 'Declined' ? "bg-red-100 text-red-700" :
                          "bg-blue-100 text-blue-700"
                        )}>
                          {b.vendorStatus}
                        </span>
                        <p className="text-xs font-black text-[#002366]">₹{b.totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Calendar({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
}
