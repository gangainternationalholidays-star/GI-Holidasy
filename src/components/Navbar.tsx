import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Home", path: "/" },
  { 
    name: "Packages", 
    path: "#",
    dropdown: [
      { name: "Domestic Packages", path: "/packages?region=Domestic" },
      { name: "International Packages", path: "/packages?region=International" }
    ]
  },
  { name: "Corporate Travel", path: "/corporate-travel" },
  { name: "Weekend Getaway", path: "/weekend-getaways" },
  { name: "Destination Wedding", path: "/destination-wedding" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { profile, login, logout, loading } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  }, [location]);

  // Click outside search to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = searchQuery.length > 2 ? [
    { type: "Destination", name: "Thailand Luxury Experience", path: "/packages?search=thailand" },
    { type: "Package", name: "Bali Romantic Escape", path: "/packages?search=bali" },
    { type: "Category", name: "Spiritual Char Dham Yatra", path: "/char-dham-yatra" },
    { type: "Destination", name: "Singapore Family Fun", path: "/packages?search=singapore" },
  ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 bg-[#D4AF37] shadow-xl",
        isScrolled ? "py-3 border-b border-white/20" : "py-5 border-b border-brand-midnight/5"
      )}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden">
              <img 
                src="https://giholidays.com/wp-content/uploads/2025/08/cropped-Untitled-design-1.png" 
                alt="GI Holidays Logo" 
                className="h-10 sm:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col border-l border-brand-midnight/20 pl-2 py-0.5">
              <span className="font-serif text-sm sm:text-lg font-bold leading-none tracking-[0.05em] text-brand-midnight uppercase">GIHOLIDAYS</span>
              <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] font-black mt-0.5 whitespace-nowrap text-brand-midnight/60">Signature of Luxury Travel</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden in Mobile Style */}
          <div className="hidden">
            {/* The old desktop links are removed to favor the global hamburger menu */}
          </div>

          {/* Unified Navigation Actions (Mobile Style Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
            <Link 
              to="/contact"
              className="hidden sm:flex bg-brand-midnight text-white px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-brand-midnight/10 hover:bg-brand-gold hover:text-brand-blue transition-all transform hover:-translate-y-1"
            >
              Plan Trip
            </Link>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 transition-all text-brand-midnight hover:scale-110"
            >
              <Search size={24} />
            </button>
            
            <button 
              className="p-2 transition-all text-brand-midnight hover:scale-110 flex flex-col gap-1 items-end group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={cn("h-0.5 bg-brand-midnight transition-all duration-300", isMenuOpen ? "w-8 rotate-45 translate-y-1.5" : "w-8")} />
              <div className={cn("h-0.5 bg-brand-midnight transition-all duration-300", isMenuOpen ? "opacity-0" : "w-6")} />
              <div className={cn("h-0.5 bg-brand-midnight transition-all duration-300", isMenuOpen ? "w-8 -rotate-45 -translate-y-1.5" : "w-4 group-hover:w-8")} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-[#D4AF37] p-8 lg:p-16 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-brand-midnight tracking-[0.05em] leading-tight uppercase">GIHOLIDAYS</span>
                  <span className="text-[9px] text-brand-midnight/60 uppercase tracking-[0.2em] mt-1 font-black">Signature of Luxury Travel</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-brand-midnight">
                  <X size={32} />
                </button>
              </div>

              <div className="flex-grow space-y-6 overflow-y-auto pr-4">
                {navigation.map(item => (
                  <div key={item.name} className="space-y-4">
                    {item.dropdown ? (
                      <div className="space-y-4">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="w-full flex items-center justify-between text-3xl font-serif text-brand-midnight"
                        >
                          {item.name}
                          <ChevronDown className={cn("transition-transform duration-300", activeDropdown === item.name ? "rotate-180" : "")} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-6 space-y-4 overflow-hidden"
                            >
                              {item.dropdown.map(sub => (
                                <Link 
                                  key={sub.name} 
                                  to={sub.path}
                                  className="block text-lg font-serif text-brand-midnight/60 hover:text-brand-midnight italic"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="text-3xl font-serif text-brand-midnight hover:text-white transition-colors block"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-brand-midnight/10 space-y-4">
                <Link 
                  to="/contact" 
                  className="sm:hidden block w-full py-5 bg-white text-brand-midnight text-center font-black uppercase tracking-[0.2em] rounded-xl shadow-lg mb-4"
                >
                  Plan Trip
                </Link>
                {!profile ? (
                  <button onClick={login} className="w-full py-5 bg-brand-midnight text-white font-black uppercase tracking-[0.2em]">Partner Login</button>
                ) : (
                  <button onClick={logout} className="w-full py-5 border border-brand-midnight text-brand-midnight font-black uppercase tracking-[0.2em]">Logout</button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6"
            >
              <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                onClick={() => setIsSearchOpen(false)}
              />
              <div 
                ref={searchRef}
                className="relative w-full max-w-4xl"
              >
                <div className="relative">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search destinations, packages, categories..." 
                    className="w-full bg-white/10 border-b-2 border-brand-gold py-8 px-12 text-3xl font-serif text-white outline-none focus:bg-white/5 transition-all placeholder:text-white/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold" size={32} />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <X size={32} />
                  </button>
                </div>

                {/* Suggestions */}
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-2"
                  >
                    {suggestions.length > 0 ? (
                      suggestions.map((s, idx) => (
                        <Link 
                          key={idx} 
                          to={s.path}
                          className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-brand-gold group transition-all rounded-sm"
                        >
                          <div className="flex items-center gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold py-1 px-3 border border-brand-gold/30">{s.type}</span>
                            <h5 className="text-xl font-bold text-white group-hover:text-brand-gold">{s.name}</h5>
                          </div>
                          <ChevronDown className="-rotate-90 text-white/20 group-hover:text-brand-gold" size={20} />
                        </Link>
                      ))
                    ) : (
                      <p className="text-white/30 text-center py-10 font-serif italic text-xl">No signature journeys found for "{searchQuery}"</p>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to push content below nav */}
      {!isScrolled && <div className="h-[104px] lg:h-[120px]" />}
    </>
  );
}
