import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Briefcase, 
  FileText, 
  Settings, 
  Search, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Globe,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  MapPin,
  Clock
} from "lucide-react";
import { cn } from "../lib/utils";
import { packages as centralPackages } from "../lib/data";
import { db, handleFirestoreError } from "../lib/firebase";
import { 
  collection, 
  setDoc, 
  doc, 
  writeBatch, 
  onSnapshot, 
  query, 
  updateDoc, 
  addDoc, 
  serverTimestamp,
  where 
} from "firebase/firestore";
import { Database, RefreshCw, CheckCircle, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Types
interface FirebaseBooking {
  id: string;
  packageId: string;
  userId: string;
  agentId?: string;
  status: string;
  vendorId?: string;
  vendorStatus?: string;
  totalAmount: number;
  travelDate: string;
  createdAt: any;
}

interface FirebaseVendor {
  uid: string;
  businessName: string;
  type: string;
  email: string;
  isVerified: boolean;
  regions: string[];
}

// Mock Data for Admin - Moved to component level for dynamic updates
const recentBookings = [
  { id: "GI-9901", client: "Vikram Singh", package: "Dubai Luxury 4N", agent: "TravelDesk Delhi", status: "Confirmed", amount: "₹85,000" },
  { id: "GI-9902", client: "Priya Sharma", package: "Char Dham Yatra", agent: "Direct", status: "Processing", amount: "₹45,500" },
  { id: "GI-9903", client: "Rahul Verma", package: "Bali Couples Pack", agent: "Global Tours", status: "Pending", amount: "₹1,20,000" }
];

export default function AdminPortal() {
  const { profile, loading, login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [syncStatus, setSyncStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  
  // Dynamic Data States
  const [dbBookings, setDbBookings] = React.useState<FirebaseBooking[]>([]);
  const [dbVendors, setDbVendors] = React.useState<FirebaseVendor[]>([]);
  const [dbLeads, setDbLeads] = React.useState<any[]>([]);
  const [agentCount, setAgentCount] = React.useState(0);
  const [selectedBooking, setSelectedBooking] = React.useState<FirebaseBooking | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!profile || profile.role !== 'Admin') return;

    // Listen to Bookings
    const unsubscribeBookings = onSnapshot(collection(db, "bookings"), (snapshot) => {
      setDbBookings(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as FirebaseBooking[]);
    });

    // Listen to Vendors
    const unsubscribeVendors = onSnapshot(collection(db, "vendors"), (snapshot) => {
      setDbVendors(snapshot.docs.map(d => ({ uid: d.id, ...d.data() })) as FirebaseVendor[]);
    });

    // Listen to Leads
    const unsubscribeLeads = onSnapshot(collection(db, "leads"), (snapshot) => {
      setDbLeads(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Agents (Users with role 'Agent')
    const qAgents = query(collection(db, "users"), where("role", "==", "Agent"));
    const unsubscribeAgents = onSnapshot(qAgents, (snapshot) => {
      setAgentCount(snapshot.size);
    });

    return () => {
      unsubscribeBookings();
      unsubscribeVendors();
      unsubscribeLeads();
      unsubscribeAgents();
    };
  }, [profile]);

  const stats = React.useMemo(() => {
    const totalRevenue = dbBookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    
    return [
      { label: "Total Revenue", value: `₹${(totalRevenue / 100000).toFixed(1)}L`, trend: "+12%", up: true, icon: <TrendingUp size={24}/> },
      { label: "Active Bookings", value: dbBookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').length.toString(), trend: "+5%", up: true, icon: <Package size={24}/> },
      { label: "Partner Agents", value: agentCount.toString(), trend: "+18%", up: true, icon: <Users size={24}/> },
      { label: "Pending Leads", value: dbLeads.filter(l => l.status === 'New').length.toString(), trend: "-2%", up: false, icon: <BarChart3 size={24}/> }
    ];
  }, [dbBookings, agentCount, dbLeads]);

  const assignVendor = async (bookingId: string, vendorId: string) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        vendorId: vendorId,
        vendorStatus: 'Pending',
        status: 'Vendor-Assigned'
      });
      
      // Create notification for Vendor
      await addDoc(collection(db, "notifications"), {
        recipientId: vendorId,
        title: "New Booking Assignment",
        message: `You have been assigned a new booking (ID: ${bookingId}). Please review and accept.`,
        bookingId: bookingId,
        type: 'assignment',
        read: false,
        createdAt: serverTimestamp()
      });

      setIsAssignModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Assignment Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center gap-6">
        <RefreshCw className="animate-spin text-[#D4AF37]" size={40} />
        <p className="font-bold text-[#002366] uppercase tracking-widest">Verifying Admin Access...</p>
      </div>
    );
  }

  if (!profile || profile.role !== 'Admin') {
    return (
      <div className="pt-40 flex flex-col items-center justify-center text-center px-6">
        <ShieldCheck className="text-red-500 mb-6" size={60} />
        <h2 className="text-3xl font-bold text-[#002366] serif mb-4">Unauthorized Access</h2>
        <p className="text-slate-500 max-w-md mb-10 text-lg">
          This portal is restricted to authorized personnel. Please login with an administrator account to continue.
        </p>
        <button 
          onClick={login}
          className="px-10 py-4 bg-[#002366] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-xl"
        >
          Administrator Log In
        </button>
      </div>
    );
  }

  const syncDataToFirebase = async () => {
    setIsSyncing(true);
    try {
      const batch = writeBatch(db);
      
      centralPackages.forEach((pkg) => {
        const pkgRef = doc(db, "packages", pkg.id);
        batch.set(pkgRef, {
          ...pkg,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });

      await batch.commit();
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error("Sync Error:", error);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20}/> },
    { id: "packages", label: "Manage Packages", icon: <Package size={20}/> },
    { id: "bookings", label: "Bookings & Ops", icon: <Briefcase size={20}/> },
    { id: "leads", label: "CRM / Leads", icon: <FileText size={20}/> },
    { id: "agents", label: "B2B Agents", icon: <Users size={20}/> },
    { id: "vendors", label: "Vendors", icon: <ShieldAlert size={20}/> },
    { id: "finances", label: "Accounts", icon: <CreditCard size={20}/> },
    { id: "hr", label: "HR & Employees", icon: <Users size={20}/> },
    { id: "visas", label: "Visa Requests", icon: <Globe size={20}/> }
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#002366] text-white transition-all duration-300 flex flex-col fixed h-full z-40 lg:relative",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          {isSidebarOpen && <span className="font-serif font-bold text-xl tracking-tight text-[#D4AF37]">Admin Console</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1 mt-6">
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
          <button className="flex items-center gap-4 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest">
            <LogOut size={18}/>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#002366] serif capitalize mb-2">{activeTab.replace("-", " ")}</h1>
              <p className="text-slate-500 font-medium">Internal Management System • Ganga International Holidays</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={syncDataToFirebase}
                disabled={isSyncing}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                  syncStatus === 'success' ? "bg-green-600 text-white" : "bg-white text-[#002366] border border-slate-200 hover:bg-slate-50"
                )}
               >
                 {isSyncing ? (
                   <RefreshCw className="animate-spin" size={16} />
                 ) : syncStatus === 'success' ? (
                   <CheckCircle size={16} />
                 ) : (
                   <Database size={16} />
                 )}
                 {isSyncing ? "Syncing..." : syncStatus === 'success' ? "Synced" : "Sync Data"}
               </button>
               <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#002366] transition-all relative">
                 <Bell size={20}/>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-white"></span>
              </button>
              <button className="bg-[#002366] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:brightness-110 transition-all shadow-xl shadow-[#002366]/20">
                <Plus size={20}/> Create {activeTab === "packages" ? "Package" : "Lead"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-14 h-14 bg-slate-50 text-[#002366] rounded-2xl flex items-center justify-center transition-all group-hover:bg-[#D4AF37]/10">
                              {stat.icon}
                           </div>
                           <div className={cn(
                             "flex items-center gap-1 font-bold text-xs uppercase tracking-tighter",
                             stat.up ? "text-green-500" : "text-red-500"
                           )}>
                             {stat.up ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                             {stat.trend}
                           </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-bold text-[#002366] font-serif">{stat.value}</h4>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Recent Activity Table */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-[#002366] serif">Recent Bookings</h3>
                      <button className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                             <tr>
                                <th className="px-10 py-5">Order ID</th>
                                <th className="px-10 py-5">Client/Pack</th>
                                <th className="px-10 py-5">Partner</th>
                                <th className="px-10 py-5">Status</th>
                                <th className="px-10 py-5">Value</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {recentBookings.map((b) => (
                               <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                                  <td className="px-10 py-5 font-bold text-[#002366] text-sm">{b.id}</td>
                                  <td className="px-10 py-5">
                                     <div className="max-w-[200px]">
                                        <p className="font-bold text-slate-700 truncate">{b.client}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-tight">{b.package}</p>
                                     </div>
                                  </td>
                                  <td className="px-10 py-5">
                                     <span className="text-xs font-medium text-slate-500">{b.agent}</span>
                                  </td>
                                  <td className="px-10 py-5">
                                     <span className={cn(
                                       "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                                       b.status === "Confirmed" ? "bg-green-100 text-green-700" :
                                       b.status === "Processing" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                                     )}>
                                        {b.status}
                                     </span>
                                  </td>
                                  <td className="px-10 py-5 font-black text-[#002366]">{b.amount}</td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  </div>

                  {/* Operational Summary */}
                  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                     <h3 className="text-xl font-bold text-[#002366] serif mb-8">System Health</h3>
                     <div className="space-y-8">
                        {[
                          { label: "Visa Pipeline", task: "4 Pending Approval", proc: 75, color: "bg-blue-500" },
                          { label: "Accounts Reconciliation", task: "₹1.4L Outstanding", proc: 40, color: "bg-orange-500" },
                          { label: "Lead Response Time", task: "Avg 14 Minutes", proc: 90, color: "bg-green-500" },
                          { label: "Vendor Payments", task: "12 Transfers Scheduled", proc: 20, color: "bg-red-500" }
                        ].map((item, i) => (
                          <div key={i}>
                             <div className="flex justify-between items-end mb-2">
                                <div>
                                   <p className="text-xs font-bold text-[#002366] mb-1">{item.label}</p>
                                   <p className="text-[10px] text-slate-400 font-medium">{item.task}</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{item.proc}%</span>
                             </div>
                             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.proc}%` }}
                                  className={cn("h-full", item.color)}
                                />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "packages" && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">Active Package Inventory</h2>
                      <button className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                        <Plus size={20}/> Bulk Import CSV
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {centralPackages.slice(0, 8).map((pkg, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group">
                           <div className="h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
                              <img src={pkg.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest">{pkg.category}</div>
                           </div>
                           <h4 className="font-bold text-[#002366] mb-2 truncate">{pkg.name}</h4>
                           <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-[#D4AF37]">₹{pkg.priceB2B.toLocaleString('en-IN')}</span>
                              <button className="text-[10px] font-bold text-[#002366] hover:underline uppercase tracking-widest">Edit Details</button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "leads" && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">CRM / Lead Pipeline</h2>
                      <div className="flex gap-4">
                         <select className="bg-slate-50 px-4 py-3 rounded-xl border-none text-sm font-bold text-[#002366]">
                            <option>All Sources</option>
                            <option>Website</option>
                            <option>WhatsApp</option>
                            <option>Agent Refer</option>
                         </select>
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                               <th className="px-10 py-5">Source</th>
                               <th className="px-10 py-5">Customer Info</th>
                               <th className="px-10 py-5">Assignment</th>
                               <th className="px-10 py-5">Status</th>
                               <th className="px-10 py-5">Last Activity</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {[
                              { source: "Website", name: "Anil Kapoor", email: "anil@example.com", assigned: "Rahul V.", status: "New", date: "10 mins ago" },
                              { source: "WhatsApp", name: "Sunita Reddy", email: "sunita@wa.me", assigned: "Priya S.", status: "Contacted", date: "1h ago" },
                              { source: "B2B Partner", name: "Global Tours", email: "b2b@global.com", assigned: "Manager", status: "Hot Lead", date: "4h ago" }
                            ].map((l, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-10 py-5">
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">{l.source}</span>
                                 </td>
                                 <td className="px-10 py-5">
                                    <p className="font-bold text-[#002366]">{l.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{l.email}</p>
                                 </td>
                                 <td className="px-10 py-5">
                                    <div className="flex items-center gap-2">
                                       <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold text-[10px] font-bold">RV</div>
                                       <span className="text-xs font-medium text-slate-600">{l.assigned}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-5">
                                    <span className={cn(
                                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                      l.status === "New" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>{l.status}</span>
                                 </td>
                                 <td className="px-10 py-5 text-xs text-slate-400 font-medium">
                                    {l.date}
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "hr" && (
              <motion.div
                key="hr"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">Staff & HR Management</h2>
                      <div className="flex gap-4">
                         <button className="bg-[#002366] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">Add Employee</button>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { name: "Rahul Verma", role: "Sales Manager", active: 12, performance: "High" },
                        { name: "Priya Sharma", role: "Operations Lead", active: 8, performance: "Stable" },
                        { name: "Amit Bisht", role: "Accounts Head", active: 45, performance: "High" }
                      ].map((emp, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                           <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[#002366] text-xl">
                                 {emp.name[0]}
                              </div>
                              <div>
                                 <h4 className="font-bold text-[#002366]">{emp.name}</h4>
                                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{emp.role}</p>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-slate-50">
                              <div>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Files</p>
                                 <p className="font-bold text-[#002366]">{emp.active}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Review</p>
                                 <span className="text-xs font-black text-green-500 uppercase">{emp.performance}</span>
                              </div>
                           </div>
                           <button className="w-full py-3 bg-slate-50 text-[#002366] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#002366] hover:text-white transition-all">View Full Profile</button>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                   <div className="flex justify-between items-center mb-10">
                      <div>
                        <h2 className="text-2xl font-bold text-[#002366] serif">Operations & Bookings</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Live Database Feed</p>
                      </div>
                      <button 
                        onClick={async () => {
                          await addDoc(collection(db, "bookings"), {
                            packageId: "KASH-001",
                            packageName: "Kashmir Paradise Tour",
                            status: "Pending",
                            totalAmount: 45000,
                            travelDate: "2026-05-15",
                            userId: profile?.uid,
                            clientName: "Test Customer",
                            createdAt: serverTimestamp()
                          });
                        }}
                        className="bg-[#D4AF37] text-white px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#D4AF37]/20"
                      >
                        Generate Test Booking
                      </button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                               <th className="px-10 py-5">Booking ID</th>
                               <th className="px-10 py-5">Travel Date</th>
                               <th className="px-10 py-5">Status</th>
                               <th className="px-10 py-5">Assigned Vendor</th>
                               <th className="px-10 py-5">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {dbBookings.map((b) => (
                              <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-10 py-5 font-bold text-[#002366] text-sm">{b.id}</td>
                                 <td className="px-10 py-5 text-sm font-medium text-slate-600">{b.travelDate}</td>
                                 <td className="px-10 py-5">
                                    <span className={cn(
                                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                      b.status === "Confirmed" ? "bg-green-100 text-green-700" :
                                      b.status === "Vendor-Assigned" ? "bg-blue-100 text-blue-700" :
                                      "bg-yellow-100 text-yellow-700"
                                    )}>
                                       {b.status}
                                    </span>
                                 </td>
                                 <td className="px-10 py-5">
                                    {b.vendorId ? (
                                      <div className="flex flex-col">
                                        <span className="text-xs font-bold text-[#002366]">
                                          {dbVendors.find(v => v.uid === b.vendorId)?.businessName || "Unknown Vendor"}
                                        </span>
                                        <span className="text-[10px] text-slate-400 uppercase font-black">{b.vendorStatus}</span>
                                      </div>
                                    ) : (
                                      <span className="text-xs text-slate-400 italic">Not Assigned</span>
                                    )}
                                 </td>
                                 <td className="px-10 py-5">
                                    <button 
                                      onClick={() => {
                                        setSelectedBooking(b);
                                        setIsAssignModalOpen(true);
                                      }}
                                      className="text-xs font-black text-[#D4AF37] uppercase tracking-widest hover:underline"
                                    >
                                      {b.vendorId ? "Re-assign" : "Assign Vendor"}
                                    </button>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "vendors" && (
              <motion.div
                key="vendors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">Vendor Management</h2>
                      <button 
                        onClick={async () => {
                          const uid = prompt("Enter Vendor UID to register:");
                          if (uid) {
                            await setDoc(doc(db, "vendors", uid), {
                              businessName: "New Vendor",
                              type: "All-In-One",
                              email: "vendor@example.com",
                              isVerified: true,
                              regions: ["Domestic"],
                              createdAt: new Date().toISOString()
                            });
                          }
                        }}
                        className="bg-[#002366] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
                      >
                        Register New Vendor
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {dbVendors.map((v) => (
                        <div key={v.uid} className="p-8 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-xl transition-all">
                           <div className="flex justify-between items-start mb-6">
                              <Briefcase size={32} className="text-[#D4AF37]"/>
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                v.isVerified ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                              )}>{v.isVerified ? "Verified" : "Pending"}</span>
                           </div>
                           <h4 className="text-lg font-bold text-[#002366] mb-2">{v.businessName}</h4>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{v.type}</p>
                           <p className="text-[10px] text-slate-400 font-medium mb-4 truncate">{v.uid}</p>
                           <div className="flex flex-wrap gap-2">
                              {v.regions.map((loc, j) => (
                                <span key={j} className="text-[9px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-100">{loc}</span>
                              ))}
                           </div>
                        </div>
                      ))}
                      {dbVendors.length === 0 && (
                        <div className="col-span-3 text-center py-20 text-slate-400 font-medium italic">
                          No vendors registered in Firestore yet.
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "agents" && (
              <motion.div
                key="agents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">Agent Network</h2>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                               <th className="px-10 py-5">Agency</th>
                               <th className="px-10 py-5">Wallet</th>
                               <th className="px-10 py-5">Bookings</th>
                               <th className="px-10 py-5">Commission</th>
                               <th className="px-10 py-5">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {[
                              { agency: "JD Travels", wallet: "₹12,450", bookings: 42, commission: "₹8,500" },
                              { agency: "Global Voyages", wallet: "₹0", bookings: 12, commission: "₹2,100" },
                              { agency: "Delhi Holidays", wallet: "₹45,000", bookings: 156, commission: "₹34,000" }
                            ].map((a, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-10 py-5 font-bold text-[#002366]">{a.agency}</td>
                                 <td className="px-10 py-5 font-medium text-slate-600">{a.wallet}</td>
                                 <td className="px-10 py-5 text-[#D4AF37] font-black">{a.bookings}</td>
                                 <td className="px-10 py-5 font-bold text-green-600">{a.commission}</td>
                                 <td className="px-10 py-5">
                                    <button className="text-xs font-bold text-[#002366] hover:underline uppercase tracking-widest">Manage</button>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "finances" && (
              <motion.div
                key="finances"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Account Balance</p>
                      <h4 className="text-3xl font-black text-[#002366] font-serif">₹12.8M</h4>
                   </div>
                   <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-red-500">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Pending Vendor Payouts</p>
                      <h4 className="text-3xl font-black text-red-600 font-serif">₹4.2L</h4>
                   </div>
                   <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-green-500">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Projected Profit (Q2)</p>
                      <h4 className="text-3xl font-black text-green-600 font-serif">₹1.5M</h4>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <h2 className="text-2xl font-bold text-[#002366] serif mb-10">Financial Ledger</h2>
                   <div className="space-y-4">
                      {[
                        { type: "Credit", amount: "₹85,000", desc: "Booking GI-9901 - Vikram Singh", date: "22 Apr 2026" },
                        { type: "Debit", amount: "₹45,000", desc: "Hotel Advance - Dubai Luxury Stay", date: "21 Apr 2026" },
                        { type: "Credit", amount: "₹12,000", desc: "Referral Fee - Agent JD", date: "20 Apr 2026" }
                      ].map((t, i) => (
                        <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl">
                           <div>
                              <p className="font-bold text-[#002366]">{t.desc}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.date}</p>
                           </div>
                           <div className="text-right">
                              <p className={cn("text-lg font-black", t.type === "Credit" ? "text-green-600" : "text-red-600")}>
                                 {t.type === "Credit" ? "+" : "-"} {t.amount}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.type}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "visas" && (
              <motion.div
                key="visas"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-bold text-[#002366] serif">Visa Application Pipeline</h2>
                      <div className="flex gap-4">
                         <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                            <input type="text" placeholder="Search applicant/agent..." className="pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" />
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { name: "Rahul Gupta", country: "Dubai", type: "Tourist 30D", status: "Review", time: "2h ago" },
                        { name: "Suman Travels", country: "Schengen", type: "Business", status: "Docs Pending", time: "5h ago" },
                        { name: "Anita Kapoor", country: "Thailand", type: "E-VOA", status: "Approved", time: "1d ago" }
                      ].map((v, i) => (
                        <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all card-hover">
                           <div className="flex justify-between items-start mb-4">
                              <div>
                                 <h4 className="font-bold text-[#002366]">{v.name}</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{v.country}</p>
                              </div>
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                v.status === "Approved" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                              )}>{v.status}</span>
                           </div>
                           <div className="flex items-center gap-3 text-xs text-slate-500 mb-6 font-medium">
                              <Globe size={14} className="text-[#D4AF37]"/> {v.type}
                           </div>
                           <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                              <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={12}/> {v.time}</span>
                              <button className="text-xs font-bold text-[#002366] hover:text-[#D4AF37] transition-colors flex items-center gap-1">Process <ChevronRight size={14}/></button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Assign Vendor Modal */}
      <AnimatePresence>
        {isAssignModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute inset-0 bg-[#002366]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#002366] serif">Assign Vendor</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Booking ID: {selectedBooking.id}</p>
                </div>
                <button onClick={() => setIsAssignModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X />
                </button>
              </div>
              <div className="p-8 max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {dbVendors.map(vendor => (
                    <button
                      key={vendor.uid}
                      onClick={() => assignVendor(selectedBooking.id, vendor.uid)}
                      className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-[#D4AF37] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10">
                          <ShieldCheck size={24} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-[#002366]">{vendor.businessName}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{vendor.type} • {vendor.regions.join(", ")}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-[#D4AF37] transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                  {dbVendors.length === 0 && (
                    <p className="text-center py-10 text-slate-400 italic">No vendors found. Please register vendors first.</p>
                  )}
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Selecting a vendor will trigger an instant notification.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
