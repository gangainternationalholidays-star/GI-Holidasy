import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const visaDestinations = [
  {
    id: "dubai",
    country: "United Arab Emirates",
    city: "Dubai",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    types: [
      { name: "30 Days Tourist", price: "₹6,500", time: "2-3 Working Days" },
      { name: "60 Days Tourist", price: "₹12,500", time: "3-5 Working Days" },
      { name: "Job Seeker Visa", price: "₹22,000", time: "7-10 Working Days" }
    ],
    documents: ["Passport Front & Back", "Passport Size Photo (White Background)", "Pan Card Copy"],
    description: "Hassle-free Dubai E-Visa with GI Holidays. 99% approval rate."
  },
  {
    id: "thailand",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
    types: [
      { name: "Tourist Visa (E-VOA)", price: "₹4,800", time: "24-48 Hours" },
      { name: "Sticker Visa", price: "₹6,800", time: "5-7 Working Days" }
    ],
    documents: ["Original Passport", "6 Months Bank Statement", "Hotel & Flight Bookings"],
    description: "Explore the land of smiles with our expedited Thailand visa services."
  },
  {
    id: "singapore",
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625230556-8e8ad16bd539?q=80&w=800&auto=format&fit=crop",
    types: [
      { name: "Tourist E-Visa (Entry)", price: "₹3,500", time: "3-5 Working Days" }
    ],
    documents: ["Passport Copy", "Photo (Soft Copy)", "Form 14A", "Invitation Letter (if any)"],
    description: "Seamless Singapore E-Visa processing for tourists and business travelers."
  },
  {
    id: "schengen",
    country: "Europe (Schengen)",
    city: "Paris/Rome",
    flag: "🇪🇺",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
    types: [
      { name: "Short Term Tourist", price: "₹14,500", time: "15-20 Working Days" }
    ],
    documents: ["Passport", "Salary Slips", "ITR (3 Years)", "Covering Letter", "Travel Insurance"],
    description: "Expert guidance for Schengen Visa appointments and document verification."
  }
];

export default function VisaServices() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState<typeof visaDestinations[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const filteredVisas = visaDestinations.filter(visa => 
    visa.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visa.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#002366] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Globe className="w-full h-full text-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] mb-4 block text-sm">Global Mobility Solutions</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">Fast & Reliable <span className="text-[#D4AF37]">Visa Services</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              We simplify international travel with expert visa consultancy, real-time tracking, and doorstep document collection.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-12 relative group">
            <div className="absolute inset-y-0 left-6 flex items-center text-slate-400 group-focus-within:text-[#002366]">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search country (e.g., Dubai, Singapore, Thailand...)"
              className="w-full py-6 pl-16 pr-8 bg-white rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 shadow-2xl transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="container-custom -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck className="text-[#D4AF37]" />, label: "99% Success Rate" },
            { icon: <Clock className="text-[#D4AF37]" />, label: "Express Processing" },
            { icon: <ArrowRight className="text-[#D4AF37]" />, label: "Doorstep Service" },
            { icon: <CheckCircle2 className="text-[#D4AF37]" />, label: "Verified Agent Support" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="font-bold text-[#002366] text-sm tracking-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Visa Grid */}
      <section className="py-24">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#002366] serif">Popular Visa Destinations</h2>
              <div className="w-20 h-1 bg-[#D4AF37] mt-4"></div>
            </div>
            <p className="text-slate-500 font-medium">B2B rates available for partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVisas.length > 0 ? filteredVisas.map((visa) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-slate-100 flex flex-col"
              >
                <div className="relative h-56">
                  <img 
                    src={visa.image} 
                    alt={visa.country} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="text-lg">{visa.flag}</span>
                    <span className="text-xs font-bold text-[#002366] uppercase tracking-widest">{visa.country}</span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#002366] mb-3 serif">{visa.city}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">{visa.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    {visa.types.slice(0, 2).map((type, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-medium">{type.name}</span>
                        <span className="text-[#002366] font-extrabold">{type.price}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedCountry(visa);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-4 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#D4AF37] hover:text-[#002366] transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    View Requirements <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <Info size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-400 font-medium">No destinations found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCountry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#002366]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="md:w-2/5 relative">
                <img 
                  src={selectedCountry.image} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-[#002366]/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-4xl font-bold serif mb-2">{selectedCountry.city}</h2>
                  <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">{selectedCountry.country}</p>
                </div>
              </div>

              <div className="md:w-3/5 p-10 md:p-14 overflow-y-auto">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-8 right-8 text-slate-400 hover:text-[#002366] transition-colors"
                >
                  <Search size={24} className="rotate-45" />
                </button>

                <h3 className="text-2xl font-bold text-[#002366] mb-8 serif">Visa Information</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-slate-400 mb-4">Visa Options</h4>
                    <div className="grid gap-3">
                      {selectedCountry.types.map((type, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div>
                            <p className="font-bold text-[#002366]">{type.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                              <Clock size={12} /> {type.time}
                            </div>
                          </div>
                          <span className="text-lg font-black text-[#D4AF37]">{type.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-slate-400 mb-4">Document Checklist</h4>
                    <div className="grid gap-3">
                      {selectedCountry.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex gap-4">
                    <Link 
                      to="/contact" 
                      className="flex-grow py-5 bg-[#002366] text-white rounded-2xl font-bold hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
                    >
                      Apply Now <Send size={18} />
                    </Link>
                    <button className="px-6 py-5 border-2 border-slate-100 text-[#002366] rounded-2xl font-bold hover:bg-slate-50 transition-all">
                      <Mail size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-[#002366] rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 serif leading-tight">Expert Consultation for <span className="text-[#D4AF37]">Complex Visas</span></h2>
                <p className="text-white/70 text-lg mb-8 font-light">
                  Need a UK, USA, or Canada visa? Our specialist team handles end-to-end documentation for high-standard embassies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                    <FileText size={18} className="text-[#D4AF37]" />
                    <span className="text-white text-sm font-bold tracking-tight">Personalized Checklist</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                    <Calendar size={18} className="text-[#D4AF37]" />
                    <span className="text-white text-sm font-bold tracking-tight">Appointment Assistance</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 w-full">
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl">
                  <h3 className="text-2xl font-bold text-[#002366] mb-6 text-center">Quick Inquiry</h3>
                  <form className="space-y-4" onSubmit={handleInquiry}>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="text" placeholder="Your Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="tel" placeholder="Mobile Number" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="text" placeholder="Destination Country" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#D4AF37] text-[#002366] font-extrabold rounded-xl hover:brightness-110 transition-all uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : isSuccess ? "Success!" : "Send Request"}
                    </button>
                    {isSuccess && <p className="text-green-600 text-[10px] font-bold text-center uppercase tracking-widest mt-2">Inquiry Sent Successfully!</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Promo */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <span className="gold-text font-bold uppercase tracking-[0.3em] mb-4 block text-sm">For Travel Partners</span>
            <h2 className="text-4xl font-bold text-[#002366] mb-8 serif">Are you a Travel Agent?</h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
              Login to our B2B Portal to access special net rates for visa processing and exclusive white-label documentation for your clients.
            </p>
            <Link 
              to="/b2b-portal" 
              className="px-12 py-5 bg-[#002366] text-white font-extrabold rounded-sm items-center gap-3 hover:translate-y-[-4px] transition-all shadow-xl inline-flex"
            >
              Partner Portal Access <CreditCard size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
