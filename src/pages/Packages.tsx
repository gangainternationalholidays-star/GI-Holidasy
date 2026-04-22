import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Filter, 
  Star,
  Info,
  Package as PackageIcon,
  ArrowRight
} from "lucide-react";
import { packages as localPackages, Package } from "../lib/data";
import { cn } from "../lib/utils";

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "All");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(localPackages);

  useEffect(() => {
    const q = searchParams.get("search") || "";
    const reg = searchParams.get("region") || "All";
    const cat = searchParams.get("category") || "All";
    
    setSearchQuery(q);
    setSelectedRegion(reg);
    setSelectedCategory(cat);

    let filtered = localPackages.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(q.toLowerCase()) || 
                            p.destination.toLowerCase().includes(q.toLowerCase());
      const matchesRegion = reg === "All" || p.region === reg;
      const matchesCategory = cat === "All" || p.category === cat;
      
      return matchesSearch && matchesRegion && matchesCategory;
    });

    setFilteredPackages(filtered);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedRegion !== "All") params.region = selectedRegion;
    if (selectedCategory !== "All") params.category = selectedCategory;
    setSearchParams(params);
  };

  const updateFilters = (reg: string, cat: string) => {
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    if (reg !== "All") params.region = reg;
    if (cat !== "All") params.category = cat;
    setSearchParams(params);
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <section className="vibrant-gradient py-6 sm:py-24 text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-7xl font-serif font-bold mb-0 sm:mb-8 italic leading-tight">
              Explore Our <span className="text-brand-gold">Journeys</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2 sm:py-6 shadow-sm">
        <div className="container-custom px-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 sm:w-5 sm:h-5" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-9 sm:pl-14 pr-4 sm:pr-6 py-2 sm:py-4 bg-slate-50 rounded-lg sm:rounded-2xl border border-slate-100 outline-none text-xs sm:text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto items-center overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              <select 
                className="flex-grow sm:w-48 px-3 sm:px-6 py-2 sm:py-4 bg-slate-100 sm:bg-slate-50 rounded-lg sm:rounded-2xl border-none sm:border sm:border-slate-100 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-slate-600 appearance-none cursor-pointer"
                value={selectedRegion}
                onChange={(e) => updateFilters(e.target.value, selectedCategory)}
              >
                <option value="All">Region</option>
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>

              <select 
                className="flex-grow sm:w-48 px-3 sm:px-6 py-2 sm:py-4 bg-slate-100 sm:bg-slate-50 rounded-lg sm:rounded-2xl border-none sm:border sm:border-slate-100 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-slate-600 appearance-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => updateFilters(selectedRegion, e.target.value)}
              >
                <option value="All">Category</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
              </select>

              <button className="bg-brand-blue text-white p-2.5 sm:p-4 rounded-lg sm:rounded-2xl hover:bg-brand-gold transition-colors shadow-lg">
                <Filter size={18} className="sm:hidden" />
                <Filter size={24} className="hidden sm:block" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-8 sm:py-20">
        <div className="container-custom px-4">
          <div className="flex justify-between items-center mb-6 sm:mb-12">
            <p className="text-[10px] sm:text-base text-slate-500 font-medium uppercase tracking-widest">
              Showing <span className="text-brand-blue font-bold">{filteredPackages.length}</span> itineraries
            </p>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredPackages.map((pkg, idx) => (
                  <motion.div
                    layout
                    key={pkg.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="card-luxury overflow-hidden group h-full flex flex-col rounded-2xl sm:rounded-[2rem]"
                  >
                    <div className="relative h-32 sm:h-64 overflow-hidden">
                      <img 
                        src={pkg.images[0]} 
                        alt={pkg.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
                        <span className={cn(
                          "px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[6px] sm:text-[9px] font-black uppercase tracking-widest text-white shadow-lg",
                          pkg.category === "Luxury" ? "bg-brand-gold" : 
                          pkg.category === "Premium" ? "bg-brand-teal" : "bg-brand-orange"
                        )}>
                          {pkg.category}
                        </span>
                        {pkg.isHot && (
                          <span className="bg-brand-midnight text-brand-gold border border-brand-gold/50 px-2 py-0.5 rounded-full text-[6px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1 sm:gap-1.5 backdrop-blur-md">
                            <Star size={8} fill="currentColor" className="sm:w-3 sm:h-3" /> Best Seller
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center">
                        <div className="bg-brand-midnight/80 backdrop-blur-md text-white px-2 py-0.5 sm:px-3 sm:py-1 text-[7px] sm:text-[10px] font-bold rounded sm:rounded-lg flex items-center gap-1 sm:gap-1.5 border border-white/10">
                          <Clock size={10} className="sm:w-3 sm:h-3" /> {pkg.duration}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-1 sm:gap-2 text-brand-orange text-[7px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-3">
                        <MapPin size={10} className="sm:w-3 sm:h-3" /> {pkg.destination}
                      </div>
                      <h3 className="text-[10px] sm:text-xl font-serif font-bold text-brand-blue mb-2 sm:mb-4 leading-tight group-hover:text-brand-gold transition-colors flex-grow line-clamp-2">
                        {pkg.name}
                      </h3>
                      
                      <div className="hidden sm:block space-y-3 mb-8">
                        {pkg.inclusions.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/30" />
                            {inc}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 sm:pt-6 border-t border-slate-100 mt-auto">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 sm:mb-6">
                          <div className="mb-2 sm:mb-0">
                            <span className="text-[6px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Starts From</span>
                            <span className="text-xs sm:text-2xl font-serif font-bold text-brand-blue">₹{pkg.priceCustomer.toLocaleString()}</span>
                          </div>
                          <Link 
                            to={`/contact?pkg=${pkg.id}`}
                            className="bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-blue p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all hidden sm:flex"
                          >
                            <ArrowRight size={20} />
                          </Link>
                        </div>
                        <Link 
                          to={`/contact?pkg=${pkg.id}`}
                          className="w-full bg-brand-blue text-white sm:btn-luxury py-2 sm:py-4 rounded-full text-[8px] sm:text-sm font-black uppercase tracking-widest text-center hover:bg-brand-gold transition-all"
                        >
                          Send Inquiry
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] shadow-xl border border-slate-100">
               <Info size={64} className="mx-auto text-slate-200 mb-8" />
               <h3 className="text-3xl font-serif font-bold text-brand-blue mb-4 italic">No Signature Journeys Found</h3>
               <p className="text-slate-400 max-w-md mx-auto mb-10">We couldn't find any itineraries matching your current search criteria. Try broadening your keywords or filters.</p>
               <button 
                onClick={() => setSearchParams({})}
                className="btn-luxury border border-slate-200 text-brand-blue hover:border-brand-gold hover:text-brand-gold"
               >
                 Clear All Filters
               </button>
            </div>
          )}
        </div>
      </section>

      {/* B2B Strip */}
      <section className="py-12 sm:py-24 bg-brand-midnight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 px-4">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-3xl font-serif font-bold mb-2 sm:mb-4 italic">Are you a Travel Agent?</h2>
            <p className="text-white/60 text-xs sm:text-base">Exclusive net rates and B2B inventory management.</p>
          </div>
          <Link to="/b2b-portal" className="w-full md:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-brand-gold text-brand-blue rounded-full font-black uppercase tracking-widest text-[10px] sm:text-sm hover:scale-105 active:scale-95 shadow-xl transition-all text-center">
            Partner Access <ChevronRight size={16} className="inline ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
