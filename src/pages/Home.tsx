import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Hotel,
  Plane,
  Globe,
  Star,
  ChevronRight,
  Send,
  CheckCircle2 as CheckCircle,
  Car,
  Wind,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const services = [
  {
    icon: <Hotel className="text-[#D4AF37]" size={32} />,
    title: "Global Hotel Inventory",
    description: "Access 500,000+ hotels worldwide with exclusive B2B negotiated rates for travel agents."
  },
  {
    icon: <Globe className="text-[#D4AF37]" size={32} />,
    title: "International Packages",
    description: "Customized holiday packages for Europe, Asia, Middle East, and more with full ground handling."
  },
  {
    icon: <Plane className="text-[#D4AF37]" size={32} />,
    title: "Flight Bookings",
    description: "Domestic and international flight tickets with competitive markups and instant ticketing."
  },
  {
    icon: <ShieldCheck className="text-[#D4AF37]" size={32} />,
    title: "Visa Assistance",
    description: "End-to-end visa support for over 100+ countries with high success rate and expert counseling."
  }
];

const destinations = [
  { name: "Dubai", image: "https://picsum.photos/seed/dubai_skyline_burj/800/600", description: "City of Wonders" },
  { name: "Switzerland", image: "https://picsum.photos/seed/swiss_alps_village/800/600", description: "Alpine Paradise" },
  { name: "Bali", image: "https://picsum.photos/seed/bali_temple_forest/800/600", description: "Island of Gods" },
  { name: "Thailand", image: "https://picsum.photos/seed/thailand_phi_phi_island/800/600", description: "Land of Smiles" },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    agency: "Global Travels, Delhi",
    content: "GI Holidays has transformed our B2B bookings. The rates are unbeatable and the support is 24/7.",
    stars: 5
  },
  {
    name: "Anita Sharma",
    agency: "Wonder Tours, Mumbai",
    content: "The best partner for international group packages. Their ground handling in Europe is exceptional.",
    stars: 5
  }
];

const categoryPackages = {
  Basic: [
    { 
      id: 1, 
      name: "Srinagar & Pahalgam", 
      duration: "5 Nights / 6 Days", 
      image: "https://picsum.photos/seed/kashmir_dal_lake/800/600",
      inclusions: ["Hotels", "Breakfast & Dinner", "Pahalgam Trip", "AC Cab"]
    },
    { 
      id: 2, 
      name: "Shimla & Manali Honeymoon", 
      duration: "5 Nights / 6 Days", 
      image: "https://picsum.photos/seed/himachal_snow_mountains/800/600",
      inclusions: ["3* Deluxe Hotel", "Candle Light Dinner", "Solang Valley", "Individual Cab"]
    },
    { 
      id: 3, 
      name: "Kerala Backwaters", 
      duration: "4 Nights / 5 Days", 
      image: "https://picsum.photos/seed/kerala_houseboat_backwaters/800/600",
      inclusions: ["Munnar & Thekkady", "Houseboat Stay", "Daily Breakfast", "Transfers"]
    },
    { 
      id: 4, 
      name: "Char Dham Yatra", 
      duration: "11 Nights / 12 Days", 
      image: "https://picsum.photos/seed/himalayan_temple_uttarakhand/800/600",
      inclusions: ["All Char Dhams", "Hotel Stay", "All Meals", "Group Coach"]
    },
    { 
      id: 5, 
      name: "Andaman Affair", 
      duration: "4 Nights / 5 Days", 
      image: "https://picsum.photos/seed/andaman_beach_tropical/800/600",
      inclusions: ["Port Blair & Havelock", "Ferry Tickets", "Radhanagar Beach", "Breakfast"]
    },
    { 
      id: 6, 
      name: "Royal Himachal & Amritsar", 
      duration: "9 Nights / 10 Days", 
      image: "https://picsum.photos/seed/golden_temple_amritsar/800/600",
      inclusions: ["Golden Temple", "Wagah Border", "Rohtang Pass", "Luxury Tempo"]
    }
  ],
  Premium: [
    { 
      id: 101, 
      name: "Kerala Royale Indulgence", 
      duration: "4 Nights / 5 Days", 
      image: "https://picsum.photos/seed/luxury_kerala_resort/800/600",
      inclusions: ["Private Houseboat", "Luxury Resort", "Breakfast & Dinner", "SUV Transfer"]
    },
    { 
      id: 102, 
      name: "Luxury Golden Triangle", 
      duration: "5 Nights / 6 Days", 
      image: "https://picsum.photos/seed/taj_mahal_agra/800/600",
      inclusions: ["Taj Mahal Sunrise", "Heritage Havelis", "Private Guide", "Luxury Sedan"]
    },
    { 
      id: 103, 
      name: "Premium Kashmir Ski Resort", 
      duration: "5 Nights / 6 Days", 
      image: "https://picsum.photos/seed/gulmarg_ski_resort/800/600",
      inclusions: ["Khyber Resort Stay", "Gondola Phase 1&2", "Dal Lake Houseboat", "Expert Ski Assist"]
    },
    { 
      id: 104, 
      name: "Kerala & Coorg Tea-Estate", 
      duration: "6 Nights / 7 Days", 
      image: "https://picsum.photos/seed/coorg_tea_plantation/800/600",
      inclusions: ["Boutique Estate Stay", "Coffee Plantation Tour", "Munnar Hills", "Private Driver"]
    },
    { 
      id: 105, 
      name: "Goa Private Villa Retreat", 
      duration: "3 Nights / 4 Days", 
      image: "https://picsum.photos/seed/goa_beach_villa/800/600",
      inclusions: ["Private Pool Villa", "Beachside Dining", "Airport Limousine", "24/7 Butler"]
    },
    { 
      id: 106, 
      name: "Wildlife & Safari Luxury", 
      duration: "4 Nights / 5 Days", 
      image: "https://picsum.photos/seed/tiger_safari_india/800/600",
      inclusions: ["Ranthambore Jungle Safari", "Taj View Room", "Safari Jeep", "Naturalist Support"]
    }
  ],
  Luxury: [
    { 
      id: 201, 
      name: "Ultimate Kerala Super Premium", 
      duration: "7 Nights / 8 Days", 
      image: "https://picsum.photos/seed/kerala_ayurveda_luxury/800/600",
      inclusions: ["All 5* Premium Hotels", "Luxury Houseboat", "Spa Sessions", "Premium SUV Transfers"]
    },
    { 
      id: 202, 
      name: "Sikkim & Darjeeling Luxury", 
      duration: "7 Nights / 8 Days", 
      image: "https://picsum.photos/seed/mount_kanchenjunga_sikkim/800/600",
      inclusions: ["Glenburn Tea Estate", "Chartered Flights", "Private Chef", "Heritage Steam Train"]
    },
    { 
      id: 203, 
      name: "Luxury Himalayan Retreat", 
      duration: "7 Nights / 8 Days", 
      image: "https://picsum.photos/seed/himalayan_luxury_spa/800/600",
      inclusions: ["Wildflower Hall Stay", "Manali Luxury Cottage", "Personal Yoga", "SUV Support"]
    },
    { 
      id: 204, 
      name: "Royal Rajasthan Desert Heritage", 
      duration: "6 Nights / 7 Days", 
      image: "https://picsum.photos/seed/rajasthan_desert_fort/800/600",
      inclusions: ["Umaid Bhawan Safari", "Luxury Tent Stay", "Camel Caravan", "Royal Welcome"]
    }
  ]
};

const heroSlides = [
  {
    image: "https://picsum.photos/seed/dubai_luxury_travel/1920/1080",
    subtitle: "Global B2B Inventory",
    desc: "Direct access to 500,000+ properties with exclusive agent markups."
  },
  {
    image: "https://picsum.photos/seed/kedarnath_temple_himalayas/1920/1080",
    subtitle: "Heritage & Spiritual Tours",
    desc: "Exclusive Char Dham & Cultural Departures with guaranteed ground support."
  },
  {
    image: "https://picsum.photos/seed/leh_ladakh_landscape/1920/1080",
    subtitle: "Elite Himalayan Escapes",
    desc: "Premium Ski Resorts & Luxury Cottages at the best B2B net rates."
  },
  {
    image: "https://picsum.photos/seed/alleppey_backwaters_sunset/1920/1080",
    subtitle: "Serene South India",
    desc: "Curated Kerala Houseboats & Backwater Bliss for your high-end clients."
  }
];

const tickerContent = [
  "Char Dham Yatra – Fixed Departures & Custom Groups",
  "Helicopter Packages for Kedarnath Available",
  "Complete B2B Travel Solutions for Agents",
  "Weekend Getaways from Delhi – High Margins",
  "Luxury + Budget Packages Available"
];

const charDhamDestinations = [
  { name: "Kedarnath Temple", image: "https://picsum.photos/seed/kedarnath_temple_glow/800/600", desc: "Spiritual heights and divine energy." },
  { name: "Badrinath Temple", image: "https://picsum.photos/seed/badrinath_temple_spiritual/800/600", desc: "The holy abode of Lord Vishnu." },
  { name: "Yamunotri Temple", image: "https://picsum.photos/seed/yamunotri_river_himalayas/800/600", desc: "Source of the sacred Yamuna river." },
  { name: "Gangotri Temple", image: "https://picsum.photos/seed/gangotri_glacier_temple/800/600", desc: "Where the Ganges descends to Earth." },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"Basic" | "Premium" | "Luxury">("Basic");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    agencyName: "",
    phone: "",
    email: "",
    requirement: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Connect to the same API as Contact page
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partnerForm, type: "Partner Request" })
      });
      if (response.ok) {
        setIsSuccess(true);
        setPartnerForm({ name: "", agencyName: "", phone: "", email: "", requirement: "" });
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-[#002366]">
        {/* Carousel Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={heroSlides[currentSlide].image} 
              alt="Travel background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#002366]/40 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#002366] via-[#002366]/60 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-white"
          >
            <motion.div 
              key={currentSlide + "meta"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase">{heroSlides[currentSlide].subtitle}</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-[5.5rem] font-bold leading-[0.95] mb-8 font-serif">
              India's Most Trusted Partner for <br />
              <span className="gold-text italic">Char Dham</span> & Spiritual Journeys
            </h1>
            
            <motion.p 
              key={currentSlide + "desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl font-medium"
            >
              Premium travel experiences designed for comfort, safety, and seamless operations — for both travelers and travel partners.
            </motion.p>

            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/char-dham-yatra" className="px-10 py-5 bg-[#D4AF37] text-[#002366] font-extrabold text-lg rounded-sm shadow-2xl shadow-[#D4AF37]/30 hover:scale-105 transition-all uppercase tracking-widest flex items-center gap-3 group">
                Explore Packages <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/b2b-partnership" className="px-10 py-5 border-2 border-white/50 text-white font-extrabold text-lg rounded-sm hover:bg-white/20 transition-all uppercase tracking-widest">
                Become B2B Partner
              </Link>
            </div>
            
            {/* Floating Icons Animation */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-24">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <Car size={32} className="text-[#D4AF37]" />
              </motion.div>
              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 -translate-x-12">
                <Plane size={32} className="text-[#D4AF37]" />
              </motion.div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <Wind size={32} className="text-[#D4AF37]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "w-1 transition-all duration-500 rounded-full",
                currentSlide === idx ? "h-12 bg-brand-gold" : "h-6 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* Text Ticker */}
      <div className="bg-[#002366] py-6 overflow-hidden border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerContent, ...tickerContent].map((text, idx) => (
            <span key={idx} className="mx-8 text-white/80 font-bold uppercase tracking-widest text-xs flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Animation & Icon Section */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#002366] serif">Travel Made Powerful with Smart Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Car size={48} />, title: "Road Trips", subtitle: "Car Packages", desc: "Expertly planned road journeys with premium fleet." },
              { icon: <Plane size={48} />, title: "Air Travel", subtitle: "Flight Integration", desc: "Seamless domestic and international flight connections." },
              { icon: <Wind size={48} />, title: "Helicopter Services", subtitle: "Kedarnath Premium दर्शन", desc: "VIP aerial access to the most sacred shrines." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-12 rounded-[3rem] text-center group border border-transparent hover:border-[#D4AF37] transition-all"
              >
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#D4AF37] mx-auto mb-8 shadow-xl group-hover:rotate-12 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#002366] mb-2 serif">{item.title}</h3>
                <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-4">{item.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Char Dham Special Section */}
      <section id="char-dham" className="bg-[#002366] py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img src="https://giholidays.com/wp-content/uploads/2026/04/Char_Dham_tour_202604011708.jpeg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <span className="gold-text font-bold uppercase tracking-[0.4em] mb-6 block text-sm">Spiritual Awakening</span>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-8 serif">Char Dham Yatra – Complete <span className="gold-text italic">Spiritual Journey</span></h2>
              <p className="text-white/70 text-xl leading-relaxed mb-10 font-light">
                Experience the sacred journey of Char Dham with professionally managed itineraries. We offer a blend of devotion, comfort, and safety for your spiritual quest.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  "12 Days / 11 Nights Complete Yatra",
                  "Do Dham Options (Kedar + Badri)",
                  "Helicopter Packages Available",
                  "Senior Citizen Friendly Tours",
                  "VIP Darshan Assistance",
                  "Verified Accommodation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/90">
                    <CheckCircle size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="px-10 py-5 bg-[#D4AF37] text-[#002366] font-extrabold text-lg rounded-sm hover:scale-105 transition-all uppercase tracking-widest shadow-2xl">
                👉 View Char Dham Packages
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {charDhamDestinations.map((dest, idx) => (
                <div key={idx} className={cn(
                  "relative h-64 rounded-3xl overflow-hidden group",
                  idx === 1 || idx === 2 ? "translate-y-8" : ""
                )}>
                  <img src={dest.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002366] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">{dest.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rishikesh - Haridwar Section */}
      <section className="bg-slate-50 py-32 overflow-hidden">
        <div className="container-custom">
          <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-96 lg:h-auto">
              <img src="https://giholidays.com/wp-content/uploads/2026/04/Screenshot-2026-04-01-at-5.27.11-PM.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
              <span className="gold-text font-bold uppercase tracking-[0.3em] mb-6 block text-sm">Weekend Spiritual Escape</span>
              <h2 className="text-5xl font-bold text-[#002366] mb-8 serif">Rishikesh & Haridwar</h2>
              <div className="space-y-6 mb-12">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">2 Days / 1 Night Full Tour</h4>
                      <p className="text-slate-500 text-sm italic">Include Rishikesh, Haridwar, Ganga Aarti Experience</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Complete Sightseeing</h4>
                      <p className="text-slate-500 text-sm italic">Hotel Stay + Transport + Professional Guide</p>
                    </div>
                 </div>
              </div>
              <Link to="/contact" className="px-10 py-5 bg-[#002366] text-white font-extrabold text-lg rounded-sm hover:bg-[#D4AF37] hover:text-[#002366] transition-all uppercase tracking-widest text-center">
                👉 Contact for B2B Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#D4AF37] font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">About Ganga International</span>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-none tracking-tight text-[#002366] serif">
                Premium B2B Travel Management Company
              </h2>
              <div className="w-20 h-1.5 bg-[#D4AF37] mb-8"></div>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Ganga International Holidays (GI Holidays) is a premier B2B Travel Management Company based in New Delhi, dedicated to serving the professional travel community with trust, reliability, and the most competitive market rates for over 15 years.
              </p>
              
              <div className="grid grid-cols-3 gap-10 py-10 border-y border-slate-100">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[#002366] font-serif mb-1">5K+</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Active Agents</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[#002366] font-serif mb-1">120+</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Safe Destinations</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[#002366] font-serif mb-1">MSME</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Certified</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-6"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,35,102,0.3)] relative z-10">
                <img 
                  src="https://giholidays.com/wp-content/uploads/2026/04/Screenshot-2026-04-01-at-5.26.31-PM-scaled.png" 
                  alt="Premium Travel" 
                  className="w-full h-auto object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-[3.5rem] -z-0 translate-x-4 translate-y-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-slate-50 py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#D4AF37] font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Infinite Services</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#002366] serif">What We Facilitate</h2>
            <p className="text-slate-500 font-medium">Bespoke B2B solutions designed for global scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Hotel size={28}/>, title: "Hotel Bookings", desc: "Global net rates for 500k+ properties." },
              { icon: <Plane size={28}/>, title: "Flight GDS", desc: "No-markup flight ticketing system." },
              { icon: <ShieldCheck size={28}/>, title: "Visa Expert", desc: "Premium counseling for 40+ countries." },
              { icon: <Globe size={28}/>, title: "Group Tours", desc: "Fixed departures with best B2B rates." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all group"
              >
                <div className="mb-8 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#002366] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#002366]">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
                <div className="w-10 h-1 bg-brand-gold/20 group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Packages Section */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#D4AF37] font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Recommended Departures</span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#002366] serif mb-6 leading-none">Global B2B Inventory</h2>
              <div className="flex gap-4 mt-8">
                {(["Basic", "Premium", "Luxury"] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                      activeCategory === cat 
                        ? "bg-[#002366] text-white shadow-xl shadow-[#002366]/20" 
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    {cat} {cat === "Basic" && <span className="text-[10px] opacity-60 ml-2">(Middle Class)</span>}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/b2b-portal" className="bg-[#002366] text-white px-10 py-5 rounded-sm font-extrabold hover:bg-[#D4AF37] hover:text-[#002366] transition-all flex items-center gap-3 uppercase tracking-widest text-sm shadow-xl shadow-[#002366]/20">
              Agent Access <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {categoryPackages[activeCategory].map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#002366]/5 border border-slate-100 flex flex-col transition-all duration-500 group"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002366]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-end p-8">
                       <p className="text-white text-sm font-medium italic opacity-0 group-hover:opacity-100 transition-opacity delay-200">Limited Availability B2B Deal</p>
                    </div>
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#002366] px-5 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-xl">
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="p-10 flex-grow">
                    <h3 className="text-2xl font-bold text-[#002366] mb-6 serif group-hover:text-[#D4AF37] transition-colors">{pkg.name}</h3>
                    <div className="grid grid-cols-2 gap-y-4 mb-8">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-tight">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div> {inc}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-50 pt-8 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] text-[#D4AF37] uppercase font-extrabold tracking-[0.2em] mb-2">Net B2B Rates</p>
                        <p className="text-xl font-bold text-[#002366] serif">Best Price Guaranteed</p>
                      </div>
                      <Link to="/b2b-portal" className="w-14 h-14 bg-slate-50 text-[#002366] rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] transition-all group-hover:scale-110">
                        <ArrowRight size={24} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <span className="gold-text font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Top Destinations</span>
              <h2 className="text-4xl md:text-5xl font-bold">Recommended for Agents</h2>
            </div>
            <Link to="/services" className="text-brand-blue font-bold flex items-center gap-2 hover:text-brand-gold transition-colors">
              Explore All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="relative h-[450px] rounded-2xl overflow-hidden group shadow-lg"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-white text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {dest.description}
                  </p>
                  <div className="h-1 w-0 group-hover:w-full bg-brand-gold transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Partnership Section */}
      <section id="b2b-partnership" className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="gold-text font-bold uppercase tracking-[0.4em] mb-6 block text-sm">Strategic Backend Support</span>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 serif leading-tight">Grow Your Travel <br /><span className="gold-text italic">Business with Us</span></h2>
              <p className="text-white/60 text-xl mb-12 leading-relaxed font-light">
                We specialize in backend support for travel agents across India. Enhance your margins and operational reliability.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Best Net Rates", desc: "Access direct inventory with High Margins." },
                  { title: "Complete Ground Handling", desc: "Verified transport and expert on-ground management." },
                  { title: "Dedicated Support Team", desc: "Expert managers for every region." },
                  { title: "Custom Branding Options", desc: "White-label itineraries for your clients." },
                  { title: "Fast Confirmation", desc: "Quick Booking & Response system." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center flex-shrink-0 text-brand-gold">
                      <Navigation size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <span>Travel Agents</span>
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                <span>Tour Operators</span>
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                <span>Corporate Planners</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl"
            >
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 serif text-brand-blue">Application Received</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Thank you for your interest. A partnership manager will reach out within 24 hours to onboard your agency.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="gold-text font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold mb-8 serif text-brand-blue">Agency Onboarding</h3>
                  <form onSubmit={handlePartnerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-brand-gold transition-all"
                          placeholder="Your Name"
                          value={partnerForm.name}
                          onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Agency Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-brand-gold transition-all"
                          placeholder="Your Travel Agency"
                          value={partnerForm.agencyName}
                          onChange={(e) => setPartnerForm({...partnerForm, agencyName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-brand-gold transition-all"
                          placeholder="+91 00000 00000"
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({...partnerForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Email Address</label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-brand-gold transition-all"
                          placeholder="name@agency.com"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Primary Requirement</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 outline-none focus:border-brand-gold transition-all resize-none"
                        placeholder="Tell us about your client niche or monthly volume..."
                        value={partnerForm.requirement}
                        onChange={(e) => setPartnerForm({...partnerForm, requirement: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gold-bg text-brand-blue py-5 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Partner with Us"} <Send size={18} />
                    </button>
                    <p className="text-[9px] text-slate-400 text-center italic mt-4">
                      * By submitting, you agree to GI Holidays B2B Partner Terms & Privacy Policy.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Capture Banner Removed in favor of full section above */}
      
      {/* Testimonials */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          {/* Partner Logos */}
          <div className="mb-24 pb-16 border-b border-slate-200">
            <div className="text-center mb-10">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Our Trusted Partners & Airlines</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-serif font-black tracking-tighter">EMIRATES</span>
              <span className="text-2xl font-serif font-black tracking-tighter">HILTON</span>
              <span className="text-2xl font-serif font-black tracking-tighter">SINGAPORE</span>
              <span className="text-2xl font-serif font-black tracking-tighter">MARRIOTT</span>
              <span className="text-2xl font-serif font-black tracking-tighter">QATAR</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <span className="gold-text font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366]">Trusted by 5000+ Agents</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full card-hover">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={18} className="text-[#D4AF37] fill-[#D4AF37]" />)}
                </div>
                <p className="text-slate-600 text-lg italic mb-8 flex-grow leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 gold-gradient rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[#002366]">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366]">{t.name}</h4>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{t.agency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
