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
import Packages from "./pages/Packages";
import CorporateTravel from "./pages/CorporateTravel";
import AdminPortal from "./pages/AdminPortal";
import VendorPortal from "./pages/VendorPortal";
import WhatsAppChat from "./components/WhatsAppChat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/919354810841" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-2.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center group overflow-hidden"
  >
    <MessageCircle size={20} className="sm:w-7 sm:h-7" />
    <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden group-hover:ml-3 font-semibold text-xs sm:text-base">
      Chat
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
              <Route path="/packages" element={<Packages />} />
              <Route path="/char-dham-yatra" element={<CharDhamYatra />} />
              <Route path="/destination-wedding" element={<DestinationWedding />} />
              <Route path="/corporate-travel" element={<CorporateTravel />} />
              <Route path="/visa-services" element={<VisaServices />} />
              <Route path="/weekend-getaways" element={<WeekendGetaways />} /> 
              <Route path="/b2b-partnership" element={<B2BPartnership />} />
              <Route path="/b2b-portal/*" element={<B2BPortal />} />
              <Route path="/vendor/*" element={<VendorPortal />} />
              <Route path="/admin" element={<AdminPortal />} />
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
