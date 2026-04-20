import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  Globe, 
  ArrowRight,
  Clock,
  Plane,
  ChevronDown,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const itinerary = [
  { day: 1, title: "Delhi to Haridwar (210 kms / 6 hrs)", desc: "Meet our representative in Delhi and drive to Haridwar. In the evening, witness the famous Ganga Aarti at Har Ki Pauri. Overnight stay at Haridwar." },
  { day: 2, title: "Haridwar to Barkot (220 kms / 7 hrs)", desc: "Drive to Barkot via Mussoorie. En-route enjoy the scenic beauty and visit Kempty Falls. Barkot is the gateway to Yamunotri. Overnight stay at Barkot." },
  { day: 3, title: "Barkot to Yamunotri & Return (36 kms drive + 6 kms trek)", desc: "Early morning drive to Janki Chatti and start the trek to Yamunotri. Take a holy dip in Surya Kund and offer prayers at the temple. Return back to Barkot for stay." },
  { day: 4, title: "Barkot to Uttarkashi (100 kms / 4 hrs)", desc: "Drive to Uttarkashi, a town situated on the banks of Bhagirathi. Visit Kashi Vishwanath Temple in the evening. Overnight stay at Uttarkashi." },
  { day: 5, title: "Uttarkashi to Gangotri & Return (100 kms / 4 hrs each way)", desc: "Day trip to Gangotri. Take a holy dip in the Ganges (Bhagirathi) and offer prayers at the Bhagirathi Shila. Return to Uttarkashi for overnight stay." },
  { day: 6, title: "Uttarkashi to Guptkashi (220 kms / 8-9 hrs)", desc: "Long scenic drive towards Guptkashi. The route follows the beautiful Alaknanda and Mandakini rivers. Overnight stay at Guptkashi." },
  { day: 7, title: "Guptkashi to Kedarnath (30 kms drive + 16 kms trek / Helicopter)", desc: "Drive to Sonprayag/Gaurikund and start the trek to Kedarnath. Alternatively, opt for the helicopter service (subject to booking). Witness the evening aarti at the temple. Overnight stay at Kedarnath." },
  { day: 8, title: "Kedarnath to Guptkashi (16 kms trek + 30 kms drive)", desc: "Perform early morning darshan and start the descent to Gaurikund. Drive back to Guptkashi for overnight stay and rest." },
  { day: 9, title: "Guptkashi to Badrinath (190 kms / 7 hrs)", desc: "Drive to Badrinath via Joshimath. In the evening, visit the Badrinath Temple and Tapt Kund. Overnight stay at Badrinath." },
  { day: 10, title: "Badrinath to Rudraprayag (160 kms / 6 hrs)", desc: "Morning darshan and visit Mana Village (the last village of India). Drive to Rudraprayag, the confluence of Alaknanda and Mandakini. Overnight stay." },
  { day: 11, title: "Rudraprayag to Rishikesh (140 kms / 5 hrs)", desc: "Drive to Rishikesh via Devprayag. Visit Laxman Jhula, Ram Jhula, and Triveni Ghat for evening aarti. Overnight stay at Rishikesh." },
  { day: 12, title: "Rishikesh to Delhi (230 kms / 6-7 hrs)", desc: "After breakfast, depart for Delhi. Dropping at Airport/Railway station. End of the spiritual journey." },
];

const variants = [
  {
    name: "Basic Package",
    price: "₹24,999 - ₹35,000",
    approx: "approx",
    stay: "Budget Hotels / Dharamshala",
    transport: "Shared Vehicle (Tempo Traveller)",
    meals: "Basic Veg Meals (MAP Plan)",
    features: ["Standard Darshan Support", "Experienced Driver", "Toll & Parking Included"],
    highlight: false
  },
  {
    name: "Premium Package",
    price: "₹55,000 - ₹75,000",
    approx: "approx",
    stay: "3-Star Deluxe Hotels",
    transport: "Private AC Vehicle (Sedan/SUV)",
    meals: "Buffet Veg Meals (MAP Plan)",
    features: ["Better Comfort + Support", "Punctual Operations", "Handpicked Stays", "Verified Drivers"],
    highlight: false
  },
  {
    name: "Luxury Package",
    price: "₹1,40,000",
    approx: "per person",
    stay: "Premium Hotels / Boutique Resorts",
    transport: "Private Luxury SUV / Innova Crysta",
    meals: "Gourmet Buffet (All Meals)",
    features: ["Helicopter Option Included*", "VIP Darshan Assistance", "Dedicated Tour Manager", "Senior Citizen Friendly Support", "Luxury Welcome Kits"],
    highlight: true
  }
];

export default function CharDhamYatra() {
  const [activeDay, setActiveDay] = React.useState<number | null>(1);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://giholidays.com/wp-content/uploads/2026/04/Char_Dham_tour_202604011708.jpeg" 
            className="w-full h-full object-cover" 
            alt="Kedarnath Temple"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#002366]/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-transparent to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gold-text font-bold uppercase tracking-[0.4em] mb-6 block text-sm">Divine Pilgrimage 2026</span>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.1] font-serif">
              Char Dham Yatra <br />
              <span className="gold-text italic">The Moksha Path</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-medium font-serif leading-relaxed italic">
              "Twelve days of spiritual awakening, exploring the four sacred portals to the divine."
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#booking" className="px-12 py-5 gold-gradient text-[#002366] font-extrabold text-lg rounded-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                Book My Yatra <Clock size={20} />
              </a>
              <a href="#itinerary" className="px-12 py-5 border-2 border-white/30 text-white font-extrabold text-lg rounded-sm hover:bg-white/10 transition-all">
                View Itinerary
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#002366] mb-8 serif">The Sacred Circuit of Salvation</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                The Char Dham Yatra is one of the most sacred pilgrimages in India. Located in the majestic Himalayas of Uttarakhand, this circuit covers four holy shrines: <strong>Yamunotri, Gangotri, Kedarnath, and Badrinath</strong>. It is believed that completing this yatra washes away all sins and opens the gates to Moksha (Salvation).
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Ganga International Holidays provides a meticulously well-planned 12-day route, ensuring safety, spiritual comfort, and seamless operations through the challenging yet divine terrains of Uttarakhand.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366]">Safety First</h4>
                    <p className="text-xs text-slate-500">Verified vehicles & drivers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366]">Helicopter Ready</h4>
                    <p className="text-xs text-slate-500">Kedarnath heli-support.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://giholidays.com/wp-content/uploads/2026/04/Screenshot-2026-04-01-at-5.27.41-PM-scaled.png" 
                alt="Divine View" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#D4AF37] rounded-full flex items-center justify-center text-white p-10 text-center shadow-2xl">
                <p className="font-serif italic text-xl font-bold leading-tight">Trusted by 10,000+ Devotees & 200+ Agencies</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="gold-text font-bold uppercase tracking-widest text-sm mb-4 block">Day-by-Day Experience</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">The 12-Day Divine Itinerary</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {itinerary.map((item) => (
              <motion.div 
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <button 
                  onClick={() => setActiveDay(activeDay === item.day ? null : item.day)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl transition-all border",
                    activeDay === item.day ? "bg-[#002366] text-white border-[#002366]" : "bg-white text-[#002366] border-slate-100 hover:border-[#D4AF37]"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                      activeDay === item.day ? "bg-[#D4AF37] text-[#002366]" : "bg-slate-100 text-[#002366]"
                    )}>
                      {item.day}
                    </span>
                    <span className="text-lg font-bold text-left">{item.title}</span>
                  </div>
                  <ChevronDown className={cn("transition-transform duration-300", activeDay === item.day && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeDay === item.day && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 bg-white border-x border-b border-slate-100 rounded-b-2xl text-slate-600 leading-relaxed">
                        {item.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Variants */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="gold-text font-bold uppercase tracking-widest text-sm mb-4 block">Travel Your Way</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">Package Variants for Every Comfort</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {variants.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-10 rounded-[3rem] border relative flex flex-col h-full",
                  v.highlight ? "bg-[#002366] text-white border-[#002366] shadow-2xl shadow-[#002366]/30 scale-105 z-10" : "bg-white text-[#002366] border-slate-100 shadow-sm"
                )}
              >
                {v.highlight && (
                  <div className="absolute top-8 right-8 bg-[#D4AF37] text-[#002366] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Best for Comfort
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-6 italic serif">{v.name}</h3>
                <div className="mb-8">
                  <span className={cn("text-4xl font-bold", v.highlight ? "text-[#D4AF37]" : "text-[#002366]")}>
                    {v.price}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest ml-2 block opacity-60">
                    {v.approx}
                  </span>
                </div>

                <div className="space-y-6 flex-grow mb-10">
                  <div className="flex gap-4">
                    <Calendar className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Accommodation</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.stay}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Ground Transport</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.transport}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Users className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Meal Plan</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.meals}</p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    {v.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                        <CheckCircle2 className={v.highlight ? "text-green-400" : "text-[#D4AF37]"} size={14} /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {v.highlight && (
                  <p className="text-[10px] text-white/40 mb-6 italic">
                    *Helicopter pricing is kept 10–20% competitive vs current market rates.
                  </p>
                )}

                <button className={cn(
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all",
                  v.highlight ? "bg-[#D4AF37] text-[#002366] hover:brightness-110" : "bg-slate-100 text-[#002366] hover:bg-[#D4AF37] hover:text-[#002366]"
                )}>
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions / Exclusions */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h3 className="text-3xl font-bold mb-10 serif flex items-center gap-4">
                <span className="w-10 h-[2px] bg-[#D4AF37]"></span> Package Inclusions
              </h3>
              <ul className="space-y-6">
                {[
                  "Hotel accommodation as per selected variant",
                  "Pure Veg Meals (Breakfast + Dinner included)",
                  "Comfortable Transport (AC vehicle for plains, Non-AC for hills)",
                  "Dedicated & Professional Driver with hill experience",
                  "All State Toll, Parking, and Driver Allowances",
                  "Assistance for Biometric Registration",
                  "On-ground Darshan guidance at each shrine"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-6 text-white/70">
                    <div className="w-6 h-6 border-2 border-brand-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-10 serif flex items-center gap-4">
                <span className="w-10 h-[2px] bg-[#D4AF37]"></span> Package Exclusions
              </h3>
              <ul className="space-y-6">
                {[
                  "Mandatory GST (5% extra)",
                  "Personal expenses like Laundry, Phone, Mini Bar",
                  "Pony, Palki, or Helicopter charges (unless specified in Luxury)",
                  "Any early check-in or late check-out charges",
                  "Any items or services not explicitly mentioned in Inclusions",
                  "Entry tickets to museums, monuments, or VIP passes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-6 text-white/50">
                    <CloseIcon className="text-red-500 flex-shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="section-padding bg-[#D4AF37]">
        <div className="container-custom">
          <div className="bg-[#002366] rounded-[3rem] p-12 lg:p-20 text-white shadow-3xl flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5">
              <span className="gold-text font-bold uppercase tracking-[0.2em] mb-4 block">Attention Travel Agents</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 serif">Exclusive Char Dham <br /><span className="gold-text italic">B2B Partner Program</span></h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl">
                Scale your travel business with the most trusted Char Dham operator. We provide the strongest backend Support for agents across India.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                {[
                  { title: "Best Net Rates", desc: "Highest margins in the industry." },
                  { title: "White Label Options", desc: "Use your own branding." },
                  { title: "Fixed Inventory", desc: "No last minute cancellations." },
                  { title: "24/7 Operations", desc: "Live on-ground tracking." }
                ].map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                         <Stars size={16}/>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                        <p className="text-[10px] text-white/40">{item.desc}</p>
                      </div>
                   </div>
                ))}
              </div>

              <Link to="/b2b-partnership" className="px-10 py-5 bg-[#D4AF37] text-[#002366] font-extrabold rounded-xl hover:scale-105 transition-all text-lg flex items-center justify-center gap-3 w-full md:w-auto">
                Become Our B2B Partner <ArrowRight size={20}/>
              </Link>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20">
                <h3 className="text-2xl font-bold mb-8 italic serif">Verified Partner Benefits</h3>
                <div className="space-y-6">
                  {[
                    "Immediate Booking Confirmation",
                    "Dedicated B2B Support Manager",
                    "Monthly Settlement Options",
                    "Customized Itinerary Support",
                    "Marketing Kit for Social Media"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-medium">
                       <CheckCircle2 className="text-[#D4AF37]" size={18}/>
                       {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">Why Pilgrimage with GI Holidays?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck size={32}/>, title: "Experienced Operator", desc: "Over 15 years specializing in Uttarakhand tourism." },
              { icon: <Clock size={32}/>, title: "24x7 Operations", desc: "Ground support stationed at every Dham during the season." },
              { icon: <Users size={32}/>, title: "Senior Citizen Friendly", desc: "Special attention for medical and physical assistance." },
              { icon: <Star size={32}/>, title: "B2B Trust", desc: "Preferred backend partner for 200+ agents nationwide." }
            ].map((feature, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#D4AF37] mx-auto mb-6 group-hover:bg-[#002366] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-[#002366] mb-3">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#002366] serif">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { 
                q: "What is the best time for Char Dham Yatra?", 
                a: "The Yatra opens in May and lasts until October. May to June (Summer) and September to October (Post-Monsoon) are visualy preferred for clear weather." 
              },
              { 
                q: "Is it safe for senior citizens to perform the Yatra?", 
                a: "Yes, provided they consult their doctor first. We offer Luxury packages with VIP darshan and medical support to ensure their comfort." 
              },
              { 
                q: "Are helicopter bookings available for Kedarnath?", 
                a: "Yes, helicopter services are available from Phata, Guptkashi, and Sirsi. We recommend booking in advance as slots fill up quickly." 
              },
              { 
                q: "How long does a full Char Dham Yatra take from Delhi?", 
                a: "A comfortable and well-planned road yatra takes 12 days. We follow the standard Delhi - Haridwar - Barkot - Uttarkashi - Guptkashi - Kedarnath - Badrinath - Rudraprayag - Rishikesh route." 
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-lg font-bold text-[#002366] mb-3">{faq.q}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="booking" className="py-24 bg-[#002366] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px]"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 serif">Limited Seats Available for 2026</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
              Secure your journey to salvation now. Book your early bird slots and get exclusive seasonal discounts.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                   <PhoneCall size={28}/>
                </div>
                <div>
                   <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-1">Call for Booking</p>
                   <p className="text-2xl font-bold font-serif">+91 93548 10841</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                   <Mail size={28}/>
                </div>
                <div>
                   <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-1">Email Support</p>
                   <p className="text-2xl font-bold font-serif">info@giholidays.com</p>
                </div>
              </div>
            </div>

            <div className="p-1 max-w-md mx-auto gold-gradient rounded-full">
              <button className="w-full py-6 bg-[#002366] text-white rounded-full font-extrabold text-xl hover:bg-transparent transition-all uppercase tracking-[0.2em] shadow-2xl">
                Click to Enquire Now
              </button>
            </div>
            <p className="mt-8 text-sm font-medium text-white/40">Office: Dwarka Vihar, Najafgarh, New Delhi - 110043</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CloseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Stars(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20V20C11 15.0294 7.02944 11 2 11V11C7.02944 11 11 7.02944 11 2V2C11 7.02944 14.9706 11 20 11V11C14.9706 11 11 15.0294 11 20Z" />
    </svg>
  );
}
