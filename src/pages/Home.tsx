import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Star,
  ChevronRight,
  Briefcase,
  Heart,
  Mountain,
  Users,
  Compass,
  Palmtree,
  Search,
  Globe,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { getCollection } from "../lib/firebase";
import { Package, packages as localFallback } from "../lib/data";

const heroSlides = [
  {
    video: "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-and-palm-trees-4043-large.mp4",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920&h=1080",
    title: "Crystal Shores & Azure Horizons",
    tagline: "Experience the pinnacle of tropical luxury in overwater villas.",
    btnText: "Explore Islands",
    link: "/services?dest=bali"
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920&h=1080",
    title: "Majestic Peaks & Alpine Grace",
    tagline: "Bespoke mountain retreats for the discerning adventurer.",
    btnText: "Plan Expedition",
    link: "/services?category=adventure"
  },
  {
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1920&h=1080",
    title: "Ancient Spirits & Sacred Trails",
    tagline: "A soul-stirring journey through the heart of the Himalayas.",
    btnText: "Divine Yatra",
    link: "/char-dham-yatra"
  },
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920&h=1080",
    title: "Urban Elegance & Golden Sands",
    tagline: "Ultra-luxury stays in the world’s most iconic skylines.",
    btnText: "Dubai Deluxe",
    link: "/services?dest=dubai"
  }
];

const categories = [
  { name: "Adventure", path: "/services?category=adventure", icon: <Mountain size={40} /> },
  { name: "Safari", path: "/services?category=safari", icon: <Compass size={40} /> },
  { name: "Cultural", path: "/services?category=cultural", icon: <Palmtree size={40} /> },
  { name: "Spiritual", path: "/char-dham-yatra", icon: <Heart size={40} /> },
  { name: "Family", path: "/services?category=family", icon: <Users size={40} /> },
];

const popularDestinations = [
  { name: "Thailand", tagline: "Tropical Escape", path: "/packages?search=thailand", image: "https://images.unsplash.com/photo-1528181304800-2f140c894979?auto=format&fit=crop&q=80&w=800" },
  { name: "Bali (Indonesia)", tagline: "Island Sanctuary", path: "/packages?search=bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" },
  { name: "Malaysia", tagline: "Vibrant Heritage", path: "/packages?search=malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc18a5ce?auto=format&fit=crop&q=80&w=800" },
  { name: "Singapore", tagline: "Futuristic Wonders", path: "/packages?search=singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" },
  { name: "Hong Kong", tagline: "Skyline Dreams", path: "/packages?search=hongkong", image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800" },
  { name: "Japan", tagline: "Modern Zen Experience", path: "/packages?search=japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" },
];

const testimonials = [
  {
    name: "Vikram Mehta",
    position: "Founder, Elite Journeys India",
    content: "GI Holidays has redefined our B2B interactions. Their luxury inventory is unmatched and their support is truly concierge-grade."
  },
  {
    name: "Sarah Thompson",
    position: "Corporate Head, Global Linkers",
    content: "The seamless management of our annual retreat was spectacular. Every detail was handled with precision and elegance."
  }
];

const indianDestinations = [
  {
    category: "Hill Stations",
    icon: <Mountain size={20} />,
    color: "from-blue-400 to-indigo-600",
    destinations: [
      { name: "Manali", tagline: "Snow paradise", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600" },
      { name: "Shimla", tagline: "Colonial charm", image: "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&q=80&w=600" },
      { name: "Mussoorie", tagline: "Queen of hills", image: "https://images.unsplash.com/photo-1596701062351-be5f43058f50?auto=format&fit=crop&q=80&w=600" },
      { name: "Nainital", tagline: "City of lakes", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ca2?auto=format&fit=crop&q=80&w=600" },
      { name: "Dharamshala", tagline: "Peaceful retreat", image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=600" },
      { name: "Kashmir", tagline: "Heaven on earth", image: "https://images.unsplash.com/photo-1566833925222-f66304672681?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    category: "Beach Destinations",
    icon: <Palmtree size={20} />,
    color: "from-brand-teal to-cyan-600",
    destinations: [
      { name: "Goa", tagline: "Beach vibes", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600" },
      { name: "Andaman", tagline: "Crystal waters", image: "https://images.unsplash.com/photo-1589135398309-114405f68b05?auto=format&fit=crop&q=80&w=600" },
      { name: "Lakshadweep", tagline: "Untouched beauty", image: "https://images.unsplash.com/photo-1544735745-b89b57c61dfd?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    category: "Cultural & Heritage",
    icon: <Globe size={20} />,
    color: "from-brand-orange to-red-600",
    destinations: [
      { name: "Rajasthan", tagline: "Royal legacy", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600" },
      { name: "Varanasi", tagline: "Eternal city", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600" },
      { name: "Khajuraho", tagline: "Artistic marvel", image: "https://images.unsplash.com/photo-1598450130612-9c3f4e1f7d98?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    category: "Spiritual Destinations",
    icon: <Navigation size={20} />,
    color: "from-amber-400 to-brand-gold",
    destinations: [
      { name: "Char Dham", tagline: "Soulful journey", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600" },
      { name: "Haridwar", tagline: "Gateway to God", image: "https://images.unsplash.com/photo-1622359487900-50b28e67f083?auto=format&fit=crop&q=80&w=600" },
      { name: "Rishikesh", tagline: "Yoga capital", image: "https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&q=80&w=600" },
      { name: "Tirupati", tagline: "Divine grace", image: "https://images.unsplash.com/photo-1616036740257-9449ea1f6621?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    category: "Wildlife & Safari",
    icon: <Compass size={20} />,
    color: "from-emerald-500 to-green-700",
    destinations: [
      { name: "Jim Corbett", tagline: "Tiger trails", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?auto=format&fit=crop&q=80&w=600" },
      { name: "Ranthambore", tagline: "Lion's roar", image: "https://images.unsplash.com/photo-1581012771300-2249339906a2?auto=format&fit=crop&q=80&w=600" },
      { name: "Kaziranga", tagline: "Rhino kingdom", image: "https://images.unsplash.com/photo-1547448415-e9f0b291c107?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    category: "South India",
    icon: <Compass size={20} />,
    color: "from-teal-400 to-brand-teal",
    destinations: [
      { name: "Kerala", tagline: "God's own country", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600" },
      { name: "Coorg", tagline: "Scotland of India", image: "https://images.unsplash.com/photo-1580137469216-3e91307b22a6?auto=format&fit=crop&q=80&w=600" },
      { name: "Ooty", tagline: "Misty mountains", image: "https://images.unsplash.com/photo-1590050752117-23aae2368bb1?auto=format&fit=crop&q=80&w=600" },
      { name: "Kodaikanal", tagline: "Princess of hills", image: "https://images.unsplash.com/photo-1621644781664-5a3311690e8c?auto=format&fit=crop&q=80&w=600" },
    ]
  }
];

export default function Home() {
  const [packages, setPackages] = useState<Package[]>(localFallback);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const remoteContent = await getCollection<Package>("packages");
        if (remoteContent && remoteContent.length > 0) {
          setPackages(remoteContent);
        }
      } catch (e) {
        console.error("Home Data Fetch Fail:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const hotOffers = packages.filter(p => p.isHot).slice(0, 6);
  const weekendTrips = packages.filter(p => (p as any).duration?.includes("Night") || (p as any).category === "Weekend").slice(0, 4);

  const domesticHighlight = [
    { name: "Manali", tagline: "Snow Paradise", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600" },
    { name: "Goa", tagline: "Beach Bliss", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600" },
    { name: "Kashmir", tagline: "Heaven on Earth", image: "https://images.unsplash.com/photo-1566833925222-f66304672681?auto=format&fit=crop&q=80&w=600" },
    { name: "Kerala", tagline: "God's Own Country", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600" },
    { name: "Rajasthan", tagline: "Royal Heritage", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600" },
    { name: "Andaman", tagline: "Crystal Waters", image: "https://images.unsplash.com/photo-1589135398309-114405f68b05?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] sm:h-screen sm:min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-midnight">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-midnight/60 via-transparent to-brand-midnight z-10" />
            {heroSlides[currentSlide].video ? (
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={heroSlides[currentSlide].video} type="video/mp4" />
              </video>
            ) : (
              <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="container-custom relative z-20 text-center">
          <motion.div
            key={currentSlide + "-content"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4"
          >
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[8px] sm:text-xs mb-3 sm:mb-6 block drop-shadow-lg">Signature of Luxury Travel</span>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold text-white leading-tight mb-4 sm:mb-8 drop-shadow-2xl">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-white/80 text-sm sm:text-lg md:text-2xl font-light mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].tagline}
            </p>

            <div className="max-w-3xl mx-auto mb-6 sm:mb-12 group">
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden p-1 sm:p-2 shadow-2xl transition-all group-focus-within:bg-white/20 group-focus-within:border-brand-gold/50">
                <div className="flex-grow flex items-center px-4 sm:px-6">
                  <Search size={18} className="text-brand-gold mr-2 sm:mr-4 sm:w-6 sm:h-6" />
                  <input 
                    type="text" 
                    placeholder="Search journey..."
                    className="w-full bg-transparent outline-none text-sm sm:text-xl font-sans placeholder:text-white/40 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link to={`/packages?search=${searchQuery}`} className="bg-brand-gold text-brand-blue px-4 py-2 sm:px-10 sm:py-5 rounded-full font-bold uppercase tracking-widest text-[9px] sm:text-sm hover:brightness-110">
                  Find
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="btn-luxury bg-white text-brand-blue hover:bg-brand-gold hover:text-white glow-hover">
                Plan Your Trip
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOT OFFERS SECTION 🔥 */}
      <section className="py-12 sm:py-32 bg-slate-50">
        <div className="container-custom px-4">
          <div className="text-center mb-8 sm:mb-20">
            <span className="inline-block p-1 px-3 bg-red-100 text-red-600 font-black text-[8px] sm:text-[10px] uppercase tracking-widest rounded-full mb-3">Limited Offers</span>
            <h2 className="text-3xl sm:text-6xl font-serif font-bold text-brand-blue mb-4 sm:mb-6 leading-tight">Hot Deals & Limited Offers</h2>
            <div className="w-16 sm:w-24 h-1 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
            {hotOffers.map((pkg, idx) => (
              <motion.div 
                key={pkg.id} 
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group flex flex-col"
              >
                <div className="relative h-32 sm:h-64 overflow-hidden">
                  <img src={pkg.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-2 sm:top-6 left-2 sm:left-6 flex flex-col gap-1 sm:gap-2">
                    <span className="bg-brand-midnight text-brand-gold px-2 sm:px-4 py-1 rounded-full text-[6px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg">Best Seller</span>
                    <span className="bg-red-500 text-white px-2 sm:px-4 py-1 rounded-full text-[6px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg animate-pulse">Limited Offer</span>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6 right-2 sm:right-6 flex justify-between items-end">
                    <div className="bg-white/90 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
                      <p className="text-[6px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Duration</p>
                      <p className="text-[7px] sm:text-xs font-bold text-brand-midnight uppercase tracking-widest">{pkg.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-8 flex-grow flex flex-col">
                  <h3 className="text-xs sm:text-2xl font-serif font-bold text-brand-midnight mb-1 sm:mb-4 group-hover:text-brand-gold transition-colors line-clamp-2">{pkg.name}</h3>
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-8 text-slate-500 font-medium">
                    <MapPin size={10} className="text-brand-gold sm:hidden" />
                    <MapPin size={16} className="text-brand-gold hidden sm:block" />
                    <span className="text-[8px] sm:text-sm">{pkg.destination}</span>
                  </div>
                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-6 border-t border-slate-100">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-[6px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting from</p>
                      <p className="text-xs sm:text-2xl font-black text-brand-midnight tracking-tighter">₹{pkg.priceCustomer.toLocaleString()}</p>
                    </div>
                    <Link to={`/packages/${pkg.id}`} className="bg-brand-midnight text-white px-3 sm:px-8 py-2 sm:py-4 rounded-full text-[7px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all text-center">
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERNATIONAL PACKAGES 🌍 */}
      <section className="py-12 sm:py-32 bg-white">
        <div className="container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-center sm:items-end mb-8 sm:mb-20 gap-4 sm:gap-8">
            <div className="max-w-2xl text-center sm:text-left">
              <span className="text-brand-gold font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[10px] mb-2 sm:mb-4 block">World Collection</span>
              <h2 className="text-3xl sm:text-6xl font-serif font-bold leading-tight text-brand-blue uppercase tracking-tight">Explore International</h2>
            </div>
            <Link to="/packages?region=International" className="px-6 py-3 sm:px-10 sm:py-5 rounded-full border border-slate-200 text-brand-midnight hover:border-brand-gold hover:text-brand-gold text-[9px] sm:text-sm font-black uppercase tracking-widest transition-all">
              All International
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
            {popularDestinations.map((dest, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -15 }}
                className="group relative h-64 sm:h-[550px] rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700"
              >
                <img src={dest.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent opacity-90 transition-opacity" />
                <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 right-4 sm:right-12 z-10 transition-transform duration-500 group-hover:-translate-y-2 text-center sm:text-left">
                  <span className="text-brand-gold font-bold text-[7px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-1 sm:mb-3 block drop-shadow-lg">{dest.tagline}</span>
                  <h4 className="text-xl sm:text-4xl font-serif text-white font-bold mb-3 sm:mb-8 italic drop-shadow-xl">{dest.name}</h4>
                  <Link to={dest.path} className="flex items-center justify-between w-full bg-white text-brand-blue px-3 sm:px-8 py-2 sm:py-5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] shadow-2xl hover:bg-brand-gold hover:text-white transition-all transform">
                    <span className="sm:inline hidden">View Packages</span>
                    <span className="sm:hidden">Packages</span>
                    <ArrowRight size={12} className="sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOMESTIC PACKAGES 🇮🇳 */}
      <section className="py-12 sm:py-32 bg-slate-50">
        <div className="container-custom px-4">
          <div className="text-center mb-8 sm:mb-20">
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[10px] mb-2 sm:mb-4 block italic leading-none">Incredible India</span>
            <h2 className="text-3xl sm:text-6xl font-serif font-bold text-brand-blue uppercase tracking-tight">Explore India</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
            {domesticHighlight.map((dest, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-64 sm:h-96 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-center sm:text-left">
                  <span className="text-brand-gold font-bold text-[7px] sm:text-[10px] uppercase tracking-widest mb-1 sm:mb-2 block">{dest.tagline}</span>
                  <h4 className="text-xl sm:text-4xl font-serif text-white font-bold mb-3 sm:mb-6 italic">{dest.name}</h4>
                  <Link 
                    to={`/packages?search=${dest.name}`} 
                    className="inline-flex items-center gap-2 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] px-3 sm:px-8 py-2 sm:py-4 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-all"
                  >
                    View <ArrowRight size={12} className="sm:hidden" />
                    <span className="hidden sm:inline">Packages</span> <ArrowRight size={14} className="hidden sm:inline" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DESTINATION WEDDING 💍 */}
      <section className="py-12 sm:py-32 bg-white overflow-hidden">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-10 text-center sm:text-left"
            >
              <div className="w-16 sm:w-20 h-1 bg-brand-orange mb-4 sm:mb-8 mx-auto sm:mx-0" />
              <h2 className="text-3xl sm:text-7xl font-serif font-bold text-brand-midnight leading-tight">Plan Your <br /><span className="italic text-brand-orange font-serif">Dream Wedding.</span></h2>
              <p className="text-base sm:text-xl text-slate-500 font-light leading-relaxed max-w-lg">
                Orchestrating cinematic celebrations that transcend expectations globally.
              </p>
              <div className="flex justify-center sm:justify-start pt-4">
                <Link to="/destination-wedding" className="bg-brand-orange text-white px-8 py-4 sm:px-12 sm:py-6 rounded-full font-black uppercase tracking-widest text-[9px] sm:text-[10px] shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 sm:gap-4">
                  Concierge <Heart size={14} fill="white" className="sm:w-4 sm:h-4" />
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-brand-orange/5 blur-3xl -z-10" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[3rem] overflow-hidden h-[500px] shadow-3xl transform -rotate-2"
              >
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-[3rem] overflow-hidden h-[400px] shadow-3xl transform translate-y-24 rotate-3"
              >
                <img src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WEEKEND GETAWAY 🚗 */}
      <section className="py-12 sm:py-32 bg-slate-50">
        <div className="container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-20 gap-4 sm:gap-8">
            <div className="text-center md:text-left">
              <span className="text-brand-gold font-extrabold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[10px] mb-2 sm:mb-4 block">Signature Escapes</span>
              <h2 className="text-3xl sm:text-6xl font-serif font-bold text-brand-midnight uppercase tracking-tight italic">Weekend Getaways</h2>
            </div>
            <Link to="/weekend-getaways" className="bg-brand-midnight text-white px-6 py-3 sm:px-10 sm:py-5 rounded-full font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-brand-gold transition-all shadow-xl">
              All Escapes
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {weekendTrips.map((pkg, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col">
                <div className="relative h-32 sm:h-64 overflow-hidden">
                  <img src={pkg.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-brand-midnight/90 text-white px-2 sm:px-4 py-1 sm:py-1.5 font-bold text-[6px] sm:text-[9px] uppercase tracking-widest rounded-full">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-3 sm:p-8 flex-grow flex flex-col">
                  <h3 className="text-xs sm:text-xl font-serif font-bold mb-2 sm:mb-4 text-brand-blue group-hover:text-brand-gold transition-colors line-clamp-2">{pkg.name}</h3>
                  <div className="mt-auto pt-2 sm:pt-6 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] sm:text-lg font-black text-brand-midnight tracking-tighter">₹{pkg.priceCustomer.toLocaleString()}</p>
                    <Link to={`/packages/${pkg.id}`} className="p-1.5 sm:p-3 bg-brand-midnight text-white rounded-full hover:bg-brand-gold transition-all">
                      <ArrowRight size={12} className="sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CORPORATE TRAVEL 🏢 */}
      <section className="py-12 sm:py-32 bg-white relative overflow-hidden">
        <div className="container-custom px-4">
          <div className="bg-brand-midnight rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-32 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/10 -skew-x-12 transform translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
              <div className="space-y-6 sm:space-y-10 text-center lg:text-left">
                <Briefcase size={36} className="text-brand-gold mb-4 sm:mb-10 mx-auto lg:mx-0 sm:w-14 sm:h-14" />
                <h2 className="text-3xl sm:text-7xl font-serif font-bold text-white mb-4 sm:mb-8 italic leading-tight">Corporate MICE Excellence.</h2>
                <p className="text-white/60 text-base sm:text-xl font-light leading-relaxed max-w-md italic mx-auto lg:mx-0">
                  Premium management for conferences, team retreats, and global tours.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Link to="/corporate-travel" className="inline-flex items-center gap-4 bg-brand-gold text-brand-blue px-8 py-4 sm:px-12 sm:py-6 rounded-full font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] shadow-2xl hover:brightness-110 transition-all">
                    Get Proposal <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="w-full aspect-square rounded-full border-2 border-brand-gold/20 flex items-center justify-center animate-pulse">
                  <div className="w-3/4 aspect-square rounded-full border-2 border-brand-gold/40 flex items-center justify-center">
                    <div className="w-1/2 aspect-square rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <Globe size={80} className="text-brand-gold animate-[spin_10s_linear_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS ⭐ */}
      <section className="py-12 sm:py-24 bg-slate-50">
        <div className="container-custom px-4">
          <div className="text-center mb-10 sm:mb-20 max-w-4xl mx-auto">
            <span className="text-brand-teal font-extrabold uppercase tracking-[0.4em] text-[8px] sm:text-[10px] mb-2 sm:mb-4 block leading-none">Traveler Voices</span>
            <h2 className="text-3xl sm:text-6xl font-serif font-bold text-brand-blue italic leading-tight">Echoes of Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-lg relative group hover:shadow-brand-gold/5 transition-all">
                <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white shadow-xl rounded-full flex items-center justify-center border border-slate-50">
                  <Star size={18} fill="#D4AF37" className="text-brand-gold sm:w-6 sm:h-6" />
                </div>
                <p className="text-lg sm:text-xl font-serif text-slate-600 leading-relaxed italic mb-6 sm:mb-10 line-clamp-4">"{t.content}"</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 sm:w-12 h-0.5 bg-brand-gold/30" />
                  <div>
                    <h4 className="font-bold text-brand-blue uppercase tracking-widest text-[10px] sm:text-xs">{t.name}</h4>
                    <p className="text-brand-gold text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-0.5">{t.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA 🚀 */}
      <section className="py-16 sm:py-32 bg-white overflow-hidden">
        <div className="container-custom px-4">
          <div className="vibrant-gradient p-8 sm:p-24 rounded-[3rem] sm:rounded-[5rem] text-center shadow-3xl relative">
            <div className="max-w-4xl mx-auto">
              <Navigation className="text-white/20 mx-auto mb-6 sm:mb-10 w-12 h-12 sm:w-20 sm:h-20" />
              <h2 className="text-3xl sm:text-7xl font-serif font-bold text-white mb-6 sm:mb-10 leading-tight">Plan Your Trip Now</h2>
              <p className="text-white/60 mb-10 sm:mb-16 max-w-xl mx-auto text-sm sm:text-xl font-light italic leading-relaxed">
                Our advisors are standing by to transform your travel aspirations into a custom itinerary.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link to="/contact" className="bg-brand-gold text-brand-blue px-10 py-5 sm:px-16 sm:py-7 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-2xl hover:scale-105 transition-all">
                  Contact Us
                </Link>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-midnight px-10 py-5 sm:px-16 sm:py-7 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-2xl hover:scale-105 transition-all border border-brand-midnight/10">
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
