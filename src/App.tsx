import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Briefcase
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { AuthProvider, useAuth } from "./context/AuthContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import B2BPortal from "./pages/B2BPortal";
import ReferEarn from "./pages/ReferEarn";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PaymentPolicy from "./pages/PaymentPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import B2BTerms from "./pages/B2BTerms";
import CharDhamYatra from "./pages/CharDhamYatra";
import DestinationWedding from "./pages/DestinationWedding";
import VisaServices from "./pages/VisaServices";
import B2BPartnership from "./pages/B2BPartnership";
import WeekendGetaways from "./pages/WeekendGetaways";
import AdminPortal from "./pages/AdminPortal";
import WhatsAppChat from "./components/WhatsAppChat";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { profile, login, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Visa Services", path: "/visa-services" },
    { name: "Char Dham Yatra", path: "/char-dham-yatra" },
    { name: "Destination Wedding", path: "/destination-wedding" },
    { name: "Domestic Packages", path: "/services" },
    { name: "Weekend Getaways", path: "/weekend-getaways" },
    { name: "B2B Partnership", path: "/b2b-partnership" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-[#002366] py-3 border-[#D4AF37]/30 shadow-lg" : "bg-transparent py-5 border-transparent"
    )}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="https://giholidays.com/wp-content/uploads/2025/08/cropped-Untitled-design-1.png" 
              alt="GI Holidays Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col border-l border-white/20 pl-3">
            <span className="font-serif text-lg font-bold leading-none tracking-tight text-white">GI HOLIDAYS</span>
            <span className="text-[9px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">Ganga International</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-xs font-bold tracking-tight hover:text-brand-gold transition-colors",
                location.pathname === link.path ? "text-brand-gold" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {!loading && (
            profile ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{profile.displayName}</span>
                  <span className="text-[8px] text-brand-gold font-bold uppercase">{profile.role}</span>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-sm font-bold uppercase tracking-wider text-[10px] transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="ml-2 px-4 py-2 bg-[#D4AF37] text-[#002366] rounded-sm font-bold hover:brightness-110 transition-all uppercase tracking-wider text-[10px]"
              >
                Agent Login
              </button>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-blue border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    location.pathname === link.path ? "text-brand-gold" : "text-white/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/b2b-portal" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-brand-gold text-brand-blue text-center py-3 rounded font-bold mt-2"
              >
                B2B Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white py-12 px-8 border-t border-slate-200">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 pb-8 border-b border-slate-100">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://giholidays.com/wp-content/uploads/2025/08/cropped-Untitled-design-1.png" 
              alt="GI Holidays Logo" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col border-l border-slate-200 pl-3">
              <span className="font-serif text-sm font-bold leading-none tracking-tight text-[#002366]">GI HOLIDAYS</span>
              <span className="text-[8px] text-[#D4AF37] uppercase tracking-widest font-bold">The B2B Specialist</span>
            </div>
          </Link>
          <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
            Your Trusted B2B Travel Partner with 15+ years of experience in creating unmatched holiday experiences worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-[11px] text-slate-500 font-medium">
          <div className="space-y-4">
            <h4 className="text-[#002366] font-bold uppercase tracking-widest text-[10px]">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-2"><MapPin size={14} className="text-[#D4AF37]" /> Dwarka Vihar, Najafgarh, New Delhi - 110043</li>
              <li className="flex gap-2"><Phone size={14} className="text-[#D4AF37]" /> <a href="tel:+919354810841">+91 93548 10841</a></li>
              <li className="flex gap-2"><Mail size={14} className="text-[#D4AF37]" /> <a href="mailto:info@giholidays.com">info@giholidays.com</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#002366] font-bold uppercase tracking-widest text-[10px]">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-[#D4AF37]">B2B Rates</Link></li>
              <li><Link to="/char-dham-yatra" className="hover:text-[#D4AF37]">Char Dham Yatra</Link></li>
              <li><Link to="/b2b-portal" className="hover:text-[#D4AF37]">Partner Login</Link></li>
              <li><Link to="/admin-portal" className="hover:text-[#D4AF37]">Internal Portal</Link></li>
              <li><Link to="/b2b-partnership" className="hover:text-[#D4AF37]">Partnership Details</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#002366] font-bold uppercase tracking-widest text-[10px]">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="hover:text-[#D4AF37]">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#D4AF37]">Terms & Conditions</Link></li>
              <li><Link to="/payment-policy" className="hover:text-[#D4AF37]">Payment Policy</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-[#D4AF37]">Cancellation & Refund</Link></li>
              <li><Link to="/b2b-terms" className="hover:text-[#D4AF37]">B2B Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Flight Booking</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Hotel Inventory</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>Visa Support</span>
        </div>
        <p>© 2026 GI Holidays. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/919354810841" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center group overflow-hidden"
  >
    <MessageCircle size={28} />
    <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden group-hover:ml-3 font-semibold">
      Chat with us
    </span>
  </a>
);

const Preloader = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-[#002366] flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      <div className="w-32 h-32 border-4 border-[#D4AF37]/20 rounded-full animate-[spin_3s_linear_infinite]" />
      <div className="absolute inset-0 w-32 h-32 border-t-4 border-[#D4AF37] rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="https://giholidays.com/wp-content/uploads/2025/08/cropped-Untitled-design-1.png" 
          alt="GI Logo" 
          className="w-16 h-16 object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center"
    >
      <h2 className="text-white font-serif text-2xl font-bold tracking-[0.2em] mb-2 uppercase">GI Holidays</h2>
      <div className="flex items-center gap-2 justify-center">
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const location = useLocation();
  const { pathname } = location;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <AnimatePresence>
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/char-dham-yatra" element={<CharDhamYatra />} />
              <Route path="/destination-wedding" element={<DestinationWedding />} />
              <Route path="/visa-services" element={<VisaServices />} />
              <Route path="/weekend-getaways" element={<WeekendGetaways />} /> 
              <Route path="/b2b-partnership" element={<B2BPartnership />} />
              <Route path="/b2b-portal/*" element={<B2BPortal />} />
              <Route path="/admin-portal/*" element={<AdminPortal />} />
              <Route path="/refer-earn" element={<ReferEarn />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/payment-policy" element={<PaymentPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/b2b-terms" element={<B2BTerms />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppChat />
      </div>
    </AuthProvider>
  );
}
