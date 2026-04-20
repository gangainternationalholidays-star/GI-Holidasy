import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { 
  Lock, 
  UserPlus, 
  LayoutDashboard, 
  LogOut, 
  FileText, 
  TrendingUp, 
  Search, 
  Map, 
  Download,
  AlertCircle,
  Building,
  CheckCircle2,
  Filter,
  Clock,
  ArrowUpRight,
  Wallet,
  Users as UsersIcon,
  Globe,
  X as CloseIcon,
  Calendar,
  User,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { cn } from "../lib/utils";

const mockRates = [
  { id: 1, destination: "Srinagar & Pahalgam – 6 Days", price: 14450, availability: "High", category: "Basic", region: "Domestic" },
  { id: 2, destination: "Andaman Quick Escape – 2 Nights", price: 5525, availability: "High", category: "Basic", region: "Domestic" },
  { id: 3, destination: "Mumbai & Lonavala – 5 Days", price: 11899, availability: "High", category: "Basic", region: "Domestic" },
  { id: 4, destination: "Honeymoon Shimla & Manali – 6 Days", price: 8925, availability: "High", category: "Basic", region: "Domestic" },
  { id: 5, destination: "Royal Himachal with Amritsar – 10 Days", price: 19125, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 6, destination: "Kullu Manali Volvo Tour – 3 Nights", price: 5949, availability: "High", category: "Basic", region: "Domestic" },
  { id: 7, destination: "Andaman Affair (PB + Havelock) – 4 Nights", price: 13004, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 8, destination: "Andaman Dream (PB + Hav + Neil) – 5 Nights", price: 14874, availability: "High", category: "Basic", region: "Domestic" },
  { id: 9, destination: "3 Nights Getaway in Andaman", price: 12409, availability: "High", category: "Basic", region: "Domestic" },
  { id: 10, destination: "3 Nights Bhubaneswar & Puri Highlights", price: 2550, availability: "High", category: "Basic", region: "Domestic" },
  { id: 11, destination: "6 Nights Hill Stations (Mussoorie, Nainital)", price: 19124, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 12, destination: "4 Nights Hill Stations (Rishikesh, Mussoorie)", price: 13599, availability: "High", category: "Basic", region: "Domestic" },
  { id: 13, destination: "11-Day Himachal Adventure", price: 47600, availability: "Limited", category: "Basic", region: "Domestic" },
  { id: 14, destination: "Dev Bhoomi Himachal – 9 Days", price: 10625, availability: "High", category: "Basic", region: "Domestic" },
  { id: 15, destination: "Andaman Bliss – 6 Days", price: 21249, availability: "High", category: "Basic", region: "Domestic" },
  { id: 16, destination: "6-Day Andaman Adventure", price: 17000, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 17, destination: "Manali Volvo Tour – 3 Nights", price: 10199, availability: "High", category: "Basic", region: "Domestic" },
  { id: 18, destination: "Sikkim & Darjeeling – 8 Days", price: 12750, availability: "High", category: "Basic", region: "Domestic" },
  { id: 19, destination: "Char Dham – 12 Days", price: 20399, availability: "High", category: "Basic", region: "Domestic" },
  { id: 20, destination: "Char Dham Yatra – 11 Days", price: 23799, availability: "High", category: "Basic", region: "Domestic" },
  { id: 21, destination: "Tropical Andaman Retreat – 4 Nights", price: 10880, availability: "High", category: "Basic", region: "Domestic" },
  { id: 22, destination: "Explore Shimla & Manali – 4 Nights", price: 12665, availability: "High", category: "Basic", region: "Domestic" },
  { id: 23, destination: "6-Day Shimla, Manali & Solang Valley", price: 10328, availability: "High", category: "Basic", region: "Domestic" },
  { id: 24, destination: "Royal Dharamshala & Dalhousie – 4 Nights", price: 11049, availability: "High", category: "Basic", region: "Domestic" },
  { id: 25, destination: "5-Day Sikkim & Darjeeling Highlights", price: 10000, availability: "High", category: "Basic", region: "Domestic" },
  { id: 26, destination: "Kerala Backwaters – 4 Nights", price: 13175, availability: "High", category: "Basic", region: "Domestic" },
  { id: 27, destination: "Luxe Kashmir Winter Package – 4 Nights", price: 17850, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 28, destination: "Charming Shimla–Kullu–Manali – 6 Days", price: 6375, availability: "High", category: "Basic", region: "Domestic" },
  { id: 29, destination: "6-Day Shillong, Cherrapunjee & Dawki", price: 17850, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 30, destination: "Veena World – Mathura-Vrindavan – 4 Days", price: 26350, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 31, destination: "Veena World – Highlights of Kerala – 6 Days", price: 29750, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 32, destination: "Veena World – Dwarka & Somnath – 5 Days", price: 31450, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 33, destination: "Veena World – Best of Amritsar – 4 Days", price: 32300, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 34, destination: "Veena World – Statue of Unity – 5 Days", price: 34000, availability: "Medium", category: "Basic", region: "Domestic" },
  { id: 101, destination: "Kerala Royale Indulgence – 5 Days", price: 35035, availability: "High", category: "Premium", region: "Domestic" },
  { id: 102, destination: "Glorious Kerala Super Premium – 7 Days", price: 40283, availability: "High", category: "Premium", region: "Domestic" },
  { id: 103, destination: "Ultimate Kerala Super Premium – 8 Days", price: 48613, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 104, destination: "Kerala Serene Luxury Escape – 6 Days", price: 41551, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 105, destination: "Kerala Hills & Backwater Bliss – 4 Days", price: 26530, availability: "High", category: "Premium", region: "Domestic" },
  { id: 106, destination: "Luxurious Wayanad Getaway – 3 Days", price: 19846, availability: "High", category: "Premium", region: "Domestic" },
  { id: 107, destination: "Kerala Honeymoon Luxury – 5 Days", price: 32300, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 108, destination: "Luxury Golden Triangle – 6 Days", price: 29750, availability: "High", category: "Premium", region: "Domestic" },
  { id: 109, destination: "Luxury Rajasthan Desert Heritage – 7 Days", price: 35700, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 110, destination: "Premium Kashmir Ski Resort – 6 Days", price: 38250, availability: "High", category: "Premium", region: "Domestic" },
  { id: 111, destination: "Private Luxury Goa Villa – 4 Days", price: 27200, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 112, destination: "Luxury Himalayan Retreat – 8 Days", price: 42500, availability: "High", category: "Luxury", region: "Domestic" },
  { id: 113, destination: "Luxury Buddhist Circuit – 6 Days", price: 30600, availability: "High", category: "Premium", region: "Domestic" },
  { id: 114, destination: "Premium Kerala & Coorg Estate – 7 Days", price: 34000, availability: "High", category: "Premium", region: "Domestic" },
  { id: 115, destination: "Luxury Wildlife & Safari – 5 Days", price: 28900, availability: "High", category: "Premium", region: "Domestic" },
  { id: 201, destination: "Dubai Special 4N/5D", price: 21800, availability: "High", category: "Premium", region: "International" },
  { id: 202, destination: "Switzerland Magic 7N/8D", price: 98500, availability: "Medium", category: "Premium", region: "International" },
];

const mockBookings = [
  { id: "GI-8821", agent: "JD", client: "Amit Sharma", package: "Dubai 4N/5D", status: "Confirmed", date: "2026-04-18" },
  { id: "GI-8822", agent: "JD", client: "Surbhi Gupta", package: "Bali 5N/6D", status: "Pending", date: "2026-04-19" },
  { id: "GI-8820", agent: "JD", client: "Rajesh Kumar", package: "Paris 5N/6D", status: "Processing", date: "2026-04-15" },
];

const mockEarnings = {
  total: 124500,
  thisMonth: 32000,
  pending: 15400,
  referrals: [
    { name: "Rahul Travel Agency", joined: "2026-03-10", status: "Active", earned: 5000 },
    { name: "Global Tours New Delhi", joined: "2026-01-15", status: "Active", earned: 12500 },
    { name: "Suman Holidays", joined: "2026-04-01", status: "Pending", earned: 0 },
  ]
};

export default function B2BPortal() {
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "bookings" | "earnings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isLogged, setIsLogged] = useState(false);

  // Booking Modal State
  const [selectedPackage, setSelectedPackage] = useState<typeof mockRates[0] | null>(null);
  const [bookingStep, setBookingStep] = useState<"details" | "success">("details");
  const [bookingDetails, setBookingDetails] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    travelDate: ""
  });
  const [generatedBookingId, setGeneratedBookingId] = useState("");

  // Share Modal State
  const [sharePackage, setSharePackage] = useState<typeof mockRates[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (pkg: typeof mockRates[0]) => {
    setSharePackage(pkg);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/packages/${sharePackage?.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GI-${Math.floor(Math.random() * 9000) + 1000}`;
    setGeneratedBookingId(newId);
    setBookingStep("success");
  };

  const closeBookingModal = () => {
    setSelectedPackage(null);
    setBookingStep("details");
    setBookingDetails({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      travelDate: ""
    });
  };

  const filteredRates = useMemo(() => {
    return mockRates.filter(rate => {
      const matchesSearch = rate.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = filterRegion === "All" || rate.region === filterRegion;
      const matchesCategory = filterCategory === "All" || rate.category === filterCategory;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, filterRegion, filterCategory]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogged(true);
    setView("dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration request sent! Our team will verify your agency shortly.");
    setView("login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (view === "dashboard") {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-[#002366] text-white p-6 sticky top-20 h-auto md:h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
            <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center font-bold text-[#002366] text-lg">JD</div>
            <div>
              <h3 className="font-bold">John Doe</h3>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-medium">Verified Partner</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: <LayoutDashboard size={18}/> },
              { id: "packages", label: "Search packages", icon: <Globe size={18}/> },
              { id: "bookings", label: "My Bookings", icon: <Map size={18}/> },
              { id: "earnings", label: "Earnings & Referrals", icon: <Wallet size={18}/> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl transition-all font-medium text-sm text-left",
                  activeTab === tab.id 
                    ? "bg-[#D4AF37] text-[#002366] shadow-lg shadow-[#D4AF37]/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            
            <div className="pt-8 mt-8 border-t border-white/10">
              <button 
                onClick={() => setView("login")}
                className="w-full flex items-center gap-4 p-4 text-white/50 hover:text-red-400 transition-colors text-sm font-medium"
              >
                <LogOut size={18} /> Logout Session
              </button>
            </div>
          </nav>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-grow p-6 lg:p-12 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h1 className="text-4xl font-bold text-[#002366] mb-2 serif">Partner Overview</h1>
                    <p className="text-slate-500">Live analytics and trending B2B rates for your agency.</p>
                  </div>
                  <button className="hidden md:flex bg-white shadow-sm border border-slate-200 px-6 py-3 rounded-lg items-center gap-3 font-bold text-sm text-[#002366] hover:bg-slate-50 transition-colors">
                    <Download size={18} /> Download Excel Rates
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><FileText size={28}/></div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Active Leads</p>
                      <h4 className="text-3xl font-bold text-[#002366]">48</h4>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><TrendingUp size={28}/></div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Bookings Growth</p>
                      <h4 className="text-3xl font-bold text-[#002366] font-serif">+12.5%</h4>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"><Wallet size={28}/></div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Commission Slab</p>
                      <h4 className="text-3xl font-bold text-[#002366]">Best Net</h4>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-xl font-bold text-[#002366]">Hot B2B Offers</h3>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      {["All", "Domestic", "International"].map(r => (
                        <button 
                          key={r}
                          onClick={() => setFilterRegion(r)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            filterRegion === r ? "bg-white text-[#002366] shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        <tr>
                          <th className="px-8 py-5">Destination</th>
                          <th className="px-8 py-5">Category</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5">Region</th>
                          <th className="px-8 py-5">Request</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRates.slice(0, 4).map(rate => (
                          <tr key={rate.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <span className="font-bold text-[#002366] block">{rate.destination}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold">{rate.category}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                rate.availability === "High" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              )}>
                                {rate.availability}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-xs text-slate-500 font-medium">{rate.region}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setSelectedPackage(rate)}
                              className="bg-[#002366] text-white p-2 rounded-lg hover:bg-[#D4AF37] hover:text-[#002366] transition-all"
                              title="Book Now"
                            >
                              <ArrowUpRight size={16}/>
                            </button>
                            <button 
                              onClick={() => handleShare(rate)}
                              className="bg-slate-100 text-slate-600 p-2 rounded-lg hover:bg-slate-200 transition-all border border-slate-200"
                              title="Share"
                            >
                              <Share2 size={16}/>
                            </button>
                          </div>
                        </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "packages" && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                  <h1 className="text-4xl font-bold text-[#002366] serif">Global B2B Inventory</h1>
                  <div className="flex flex-col md:flex-row w-full lg:w-auto gap-4">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search packages..." 
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D4AF37] shadow-sm transition-all text-[#002366] text-sm"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                      {["All", "Domestic", "International"].map(r => (
                        <button 
                          key={r}
                          onClick={() => setFilterRegion(r)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                            filterRegion === r ? "bg-white text-[#002366] shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                      {["All", "Basic", "Premium", "Luxury"].map(c => (
                        <button 
                          key={c}
                          onClick={() => setFilterCategory(c)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                            filterCategory === c ? "bg-white text-[#002366] shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRates.map(rate => (
                    <motion.div 
                      layout
                      key={rate.id}
                      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm card-hover flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="px-4 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rate.region}</span>
                          <span className="px-4 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-bold uppercase tracking-widest">{rate.category}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#002366] mb-2">{rate.destination}</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">Complete B2B ground package including standard stay and airport transfers.</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedPackage(rate)}
                          className="flex-grow py-4 bg-slate-50 text-[#002366] font-bold rounded-xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3"
                        >
                           Book Now <ArrowUpRight size={18}/>
                        </button>
                        <button 
                          onClick={() => handleShare(rate)}
                          className="w-14 h-14 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all border border-slate-100"
                        >
                           <Share2 size={20}/>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Share Modal */}
            <AnimatePresence>
              {sharePackage && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSharePackage(null)}
                    className="absolute inset-0 bg-[#002366]/60 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#002366] serif mb-2">Share Package</h2>
                        <p className="text-slate-500 text-sm">Copy the link to share with your clients or team.</p>
                      </div>
                      <button 
                        onClick={() => setSharePackage(null)}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                      >
                        <CloseIcon size={24} className="text-slate-400" />
                      </button>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                       <h4 className="font-bold text-[#002366] mb-2">{sharePackage.destination}</h4>
                       <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-bold uppercase tracking-widest">{sharePackage.category}</span>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-4 pr-32 text-slate-500 text-sm truncate">
                        {window.location.origin}/packages/{sharePackage.id}
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className={cn(
                          "absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2",
                          copied ? "bg-green-500 text-white" : "bg-[#002366] text-white hover:bg-[#D4AF37] hover:text-[#002366]"
                        )}
                      >
                        {copied ? <Check size={18}/> : <Copy size={18}/>}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Booking Modal */}
            <AnimatePresence>
              {selectedPackage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeBookingModal}
                    className="absolute inset-0 bg-[#002366]/60 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                  >
                    <div className="p-10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-3xl font-bold text-[#002366] serif mb-2">
                            {bookingStep === "details" ? "Secure Booking Request" : "Booking Confirmed!"}
                          </h2>
                          <p className="text-slate-500 text-sm">
                            {bookingStep === "details" 
                              ? `For: ${selectedPackage.destination}` 
                              : `Success! Inquiry ID: ${generatedBookingId}`}
                          </p>
                        </div>
                        <button 
                          onClick={closeBookingModal}
                          className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                        >
                          <CloseIcon size={24} className="text-slate-400" />
                        </button>
                      </div>

                      {bookingStep === "details" ? (
                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Client Full Name</label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                  type="text" 
                                  required
                                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-[#D4AF37] transition-all"
                                  placeholder="John Doe"
                                  value={bookingDetails.clientName}
                                  onChange={e => setBookingDetails({...bookingDetails, clientName: e.target.value})}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Phone Number</label>
                              <div className="relative">
                                <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                  type="tel" 
                                  required
                                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-[#D4AF37] transition-all"
                                  placeholder="+91 00000 00000"
                                  value={bookingDetails.clientPhone}
                                  onChange={e => setBookingDetails({...bookingDetails, clientPhone: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Client Email Address</label>
                            <div className="relative">
                              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                              <input 
                                type="email" 
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-[#D4AF37] transition-all"
                                placeholder="client@email.com"
                                value={bookingDetails.clientEmail}
                                onChange={e => setBookingDetails({...bookingDetails, clientEmail: e.target.value})}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Preferred Travel Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                              <input 
                                type="date" 
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-[#D4AF37] transition-all font-sans"
                                value={bookingDetails.travelDate}
                                onChange={e => setBookingDetails({...bookingDetails, travelDate: e.target.value})}
                              />
                            </div>
                          </div>

                          <button 
                            type="submit"
                            className="w-full bg-[#002366] text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#002366]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                          >
                            Confirm Booking Request <CheckCircle2 size={20} />
                          </button>
                        </form>
                      ) : (
                        <div className="text-center py-8">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                          >
                            <CheckCircle2 size={48} />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-[#002366] mb-4 serif">Successfully Processing</h3>
                          <p className="text-slate-500 mb-8 leading-relaxed">
                            Booking request for <strong>{bookingDetails.clientName}</strong> has been received with ID <strong>{generatedBookingId}</strong>. <br />
                            Our team will verify the details and confirm the ground logistics within 2 hours.
                          </p>
                          <div className="flex gap-4">
                            <button 
                              onClick={closeBookingModal}
                              className="flex-1 py-4 bg-slate-50 text-[#002366] font-bold rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest text-xs"
                            >
                              Close
                            </button>
                            <button 
                              onClick={() => setActiveTab("bookings")}
                              className="flex-1 py-4 bg-[#D4AF37] text-[#002366] font-bold rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-xs"
                            >
                              View My Bookings
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-4xl font-bold text-[#002366] mb-10 serif">Booking Requests</h1>
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        <tr>
                          <th className="px-8 py-6">Inquiry ID</th>
                          <th className="px-8 py-6">Client Name</th>
                          <th className="px-8 py-6">Package</th>
                          <th className="px-8 py-6">Request Date</th>
                          <th className="px-8 py-6">Current Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {mockBookings.map(booking => (
                          <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-6 text-[#002366] font-bold">{booking.id}</td>
                            <td className="px-8 py-6 font-medium">{booking.client}</td>
                            <td className="px-8 py-6 text-slate-600">{booking.package}</td>
                            <td className="px-8 py-6 text-slate-400">{booking.date}</td>
                            <td className="px-8 py-6">
                              <span className={cn(
                                "px-4 py-2 rounded-lg text-xs font-bold uppercase",
                                getStatusColor(booking.status)
                              )}>
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "earnings" && (
              <motion.div
                key="earnings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                   <div className="bg-[#002366] p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl shadow-[#002366]/20">
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-3 bg-white/10 rounded-2xl">
                             <Wallet className="text-[#D4AF37]" size={32}/>
                          </div>
                          <h3 className="text-2xl font-bold serif">Wallet Balance</h3>
                        </div>
                        <p className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Withdrawable Referral Commission</p>
                        <h2 className="text-6xl font-bold text-[#D4AF37] mb-8 font-serif leading-none">Synced</h2>
                      </div>
                      <button className="w-full py-5 gold-gradient text-[#002366] font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-lg shadow-xl shadow-brand-gold/10">
                        Withdraw Earnings
                      </button>
                   </div>

                   <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-slate-50 rounded-2xl">
                           <UsersIcon className="text-[#002366]" size={32}/>
                        </div>
                        <h3 className="text-2xl font-bold serif text-[#002366]">Referral Network</h3>
                      </div>
                      <div className="space-y-6">
                         {mockEarnings.referrals.map((agency, i) => (
                           <div key={i} className="flex justify-between items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                             <div>
                               <h4 className="font-bold text-[#002366]">{agency.name}</h4>
                               <p className="text-xs text-slate-400">Joined {agency.joined}</p>
                             </div>
                             <div className="text-right">
                               <p className="font-bold text-[#D4AF37]">Active</p>
                               <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{agency.status}</span>
                             </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center gap-8">
                   <div className="p-6 bg-white rounded-3xl shadow-sm text-[#002366]">
                      <UsersIcon size={40}/>
                   </div>
                   <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#002366] mb-2 serif">Earn 5% Lifetime Commission</h3>
                      <p className="text-slate-600 leading-relaxed max-w-2xl">Invite other agencies to Ganga International Holidays. You'll get 5% of our profit from every booking they make—forever.</p>
                   </div>
                   <button className="px-10 py-5 bg-[#002366] text-white font-bold rounded-2xl hover:bg-[#001a4d] transition-all whitespace-nowrap">
                      Copy My Referral Link
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div 
          key="forms"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-grow flex items-center justify-center p-6 bg-cover bg-center py-20"
          style={{ backgroundImage: `linear-gradient(rgba(0, 35, 102, 0.8), rgba(0, 35, 102, 0.8)), url('https://picsum.photos/seed/office/1920/1080')` }}
        >
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden mt-10">
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setView("login")}
                className={cn(
                  "flex-1 py-5 font-bold transition-all flex items-center justify-center gap-2",
                  view === "login" ? "text-[#D4AF37] bg-white" : "text-gray-400 bg-gray-50 border-r border-gray-100"
                )}
              >
                <Lock size={18} /> Partner Login
              </button>
              <button 
                onClick={() => setView("register")}
                className={cn(
                  "flex-1 py-5 font-bold transition-all flex items-center justify-center gap-2",
                  view === "register" ? "text-[#D4AF37] bg-white" : "text-gray-400 bg-gray-50"
                )}
              >
                <UserPlus size={18} /> New Agent
              </button>
            </div>

            <div className="p-10">
              {view === "login" ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#002366] serif">Access Portal</h2>
                    <p className="text-slate-500 text-sm">Welcome back, Travel Partner.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Agency Email</label>
                    <input type="email" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37] transition-all" placeholder="agent@agency.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                    <input type="password" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37] transition-all" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full bg-[#002366] text-white py-5 rounded-xl font-bold shadow-xl hover:bg-[#001a4d] transition-all uppercase tracking-widest text-xs">
                    Access Dashboard
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    Forgot agency credentials? <button type="button" className="text-[#D4AF37] font-bold">Contact Support</button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#002366] serif">Apply for Access</h2>
                    <p className="text-slate-500 text-sm">Join the network of 5000+ happy agents.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name</label>
                      <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]" placeholder="Full Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Agency</label>
                      <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]" placeholder="Agency Name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone No.</label>
                    <input type="tel" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Office Email</label>
                    <input type="email" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]" placeholder="official@agency.com" />
                  </div>
                  <button type="submit" className="w-full gold-gradient text-[#002366] py-5 rounded-xl font-bold shadow-xl hover:brightness-110 transition-all uppercase tracking-widest text-xs">
                    Join as Partner
                  </button>
                </form>
              )}
            </div>

            <div className="p-6 bg-[#002366] text-white flex items-start gap-4">
              <CheckCircle2 className="text-[#D4AF37] shrink-0" size={24} />
              <div>
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-1">Professional Verification</p>
                <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                  We only verify genuine business entities. Registration might take up to 24 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
