import * as React from "react";
import { motion } from "framer-motion";
import { 
  Car, 
  MapPin, 
  Clock, 
  Sun, 
  Trees, 
  Coffee, 
  ArrowRight,
  Filter,
  Search,
  Star,
  Map as MapIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const weekendDestinations = [
  {
    id: "mussoorie",
    name: "Mussoorie & Dhanaulti",
    distance: "290 km from Delhi",
    time: "2 Nights / 3 Days",
    price: "₹6,499",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
    tags: ["Hill Station", "Family"],
    rating: 4.8
  },
  {
    id: "rishikesh",
    name: "Rishikesh Adventure",
    distance: "240 km from Delhi",
    time: "1 Night / 2 Days",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d46707?q=80&w=800&auto=format&fit=crop",
    tags: ["Adventure", "Spiritual"],
    rating: 4.9
  },
  {
    id: "jim-corbett",
    name: "Jim Corbett Safari",
    distance: "230 km from Delhi",
    time: "2 Nights / 3 Days",
    price: "₹7,200",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=800&auto=format&fit=crop",
    tags: ["Wildlife", "Luxury"],
    rating: 4.7
  },
  {
    id: "nainital",
    name: "Lake City Nainital",
    distance: "300 km from Delhi",
    time: "2 Nights / 3 Days",
    price: "₹6,800",
    image: "https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?q=80&w=800&auto=format&fit=crop",
    tags: ["Lakes", "Romantic"],
    rating: 4.6
  }
];

export default function WeekendGetaways() {
  const [activeTag, setActiveTag] = React.useState("All");
  const tags = ["All", "Hill Station", "Adventure", "Wildlife", "Romantic"];

  const filtered = weekendDestinations.filter(d => 
    activeTag === "All" || d.tags.includes(activeTag)
  );

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[#002366] py-24 text-white relative">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] mb-4 block text-sm">Quick Escapes</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 serif">Premium <span className="text-[#D4AF37]">Weekend Getaways</span></h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
              Perfect short breaks from the capital. Curated packages for the modern traveler seeking luxury and serenity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="container-custom sticky top-30 z-30 -mt-8">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                  activeTag === tag 
                    ? "bg-[#002366] text-white" 
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search destination..." className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((dest) => (
              <motion.div
                layout
                key={dest.id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={14} className="text-brand-gold fill-brand-gold" />
                    <span className="text-xs font-bold text-[#002366]">{dest.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {dest.tags.map(tag => (
                      <span key={tag} className="bg-[#002366]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <MapPin size={14} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{dest.distance}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#002366] mb-4 serif">{dest.name}</h3>
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50 mt-auto">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={16} />
                      <span className="text-xs font-medium">{dest.time}</span>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Starting B2B</p>
                       <p className="text-xl font-black text-[#D4AF37]">{dest.price}</p>
                    </div>
                  </div>
                  <Link 
                    to="/contact" 
                    className="w-full py-4 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#D4AF37] hover:text-[#002366] transition-all flex items-center justify-center gap-3"
                  >
                    Get B2B Quote <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="bg-white rounded-[3rem] p-10 flex flex-wrap justify-between items-center gap-8 border border-slate-100 shadow-sm">
            {[
              { icon: <Car className="text-[#D4AF37]" />, title: "Private Transfers", desc: "Premium SUVs & Sedans" },
              { icon: <Sun className="text-[#D4AF37]" />, title: "Curated Stays", desc: "Luxury Boutiques & Resorts" },
              { icon: <Trees className="text-[#D4AF37]" />, title: "Offbeat Trails", desc: "Local Hidden Gems" },
              { icon: <Coffee className="text-[#D4AF37]" />, title: "Agent Markup", desc: "Guaranteed High Profits" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                   {feature.icon}
                </div>
                <div>
                   <h4 className="font-bold text-[#002366] text-sm">{feature.title}</h4>
                   <p className="text-xs text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
