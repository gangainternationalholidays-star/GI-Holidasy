import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Users, 
  Camera, 
  Music, 
  Utensils, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  Globe, 
  ArrowRight,
  Clock,
  Gem,
  Award,
  ChevronDown,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const weddingServices = [
  { day: 1, title: "Pre-Wedding Consultation & Planning", desc: "Our journey starts with understanding your vision. From budget allocation to theme selection, our expert planners guide you through every detail." },
  { day: 2, title: "Exotic Venue Sourcing", desc: "Whether it's a beach in Goa, a palace in Rajasthan, or a scenic resort in Bali, we find the perfect backdrop for your love story." },
  { day: 3, title: "Logistics & Guest Management", desc: "Complete ground handling including airport transfers, RSVP management, and luxury accommodation for your guests." },
  { day: 4, title: "Catering & Menu Curation", desc: "Exquisite multi-cuisine menus curated by top chefs, featuring traditional delicacies and international favorites." },
  { day: 5, title: "Decor & Floral Artistry", desc: "Bespoke stage designs, floral arrangements, and lighting that transform the venue into a dream-like setting." },
  { day: 6, title: "Photography & Cinematography", desc: "Capturing every raw emotion and grand moment with the latest technology and award-winning artists." },
  { day: 7, title: "Entertainment & Artist Management", desc: "Live bands, celebrity performances, and traditional music to keep the celebrations alive and energetic." },
  { day: 8, title: "On-Ground Coordination", desc: "A dedicated team of managers ensuring everything runs like clockwork, so you can focus on making memories." }
];

const variants = [
  {
    name: "Classic Wedding Package",
    price: "Custom",
    approx: "Starting from ₹15L",
    stay: "3/4 Star Boutique Properties",
    transport: "Standard Transfers for Guests",
    meals: "Multi-cuisine Buffet (2-3 Events)",
    features: ["Essential Decor & Lighting", "Photography Package", "Guest RSVP Management", "Base Level Planning"],
    highlight: false
  },
  {
    name: "Premium Experience Package",
    price: "Custom",
    approx: "Starting from ₹45L",
    stay: "4/5 Star Beach/Hill Resorts",
    transport: "Luxury AC Coaches & Sedans",
    meals: "Gourmet Catering (4-5 Events)",
    features: ["Thematic Designer Decor", "Cinematography Included", "Artist Management (DJs/Bands)", "Full Planning & Execution"],
    highlight: false
  },
  {
    name: "Royal Grandeur Package",
    price: "Custom",
    approx: "Starting from ₹1.2Cr",
    stay: "Heritage Palaces / Ultra-Luxury Resorts",
    transport: "Luxury Fleet (BMW/Mercedes/Audi)",
    meals: "Fine Dining & Live Counters",
    features: ["Bespoke Royal Stage & Setup", "Celebrity Artist Management", "Dedicated RSVP Team", "24/7 Personal Concierge", "International Destination Options"],
    highlight: true
  }
];

export default function DestinationWedding() {
  const [activeStep, setActiveStep] = React.useState<number | null>(1);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/wedding_grand/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Royal Wedding"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#002366]/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-transparent to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gold-text font-bold uppercase tracking-[0.4em] mb-6 block text-sm">International & Domestic Locations</span>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.1] font-serif">
              Crafting Your <br />
              <span className="gold-text italic">Dream Celebration</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-medium font-serif leading-relaxed italic">
              "From grand palaces in Rajasthan to pristine beaches in Bali – we turn your love story into a legendary event."
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#booking" className="px-12 py-5 gold-gradient text-[#002366] font-extrabold text-lg rounded-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-3 group">
                Begin Planning <Heart size={20} className="group-hover:fill-[#002366] transition-all" />
              </a>
              <a href="#services" className="px-12 py-5 border-2 border-white/30 text-white font-extrabold text-lg rounded-sm hover:bg-white/10 transition-all">
                The G.I. Signature
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#002366] mb-8 serif">Exquisite Memories, Handcrafted by Experts</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                A destination wedding is not just an event; it's a soul-stirring experience that brings together families in a setting of unmatched beauty. At <strong>Ganga International Holidays</strong>, we specialize in the logistical and creative alchemy required to pull off a flawless wedding.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Whether you envision a <strong>Royal Palace Wedding</strong> in Udaipur, a <strong>Bohemian Beach Wedding</strong> in Goa, or an <strong>International Affair</strong> in Thailand, our 15+ years of B2B expertise ensures that your special day is marked by luxury, precision, and heartfelt hospitality.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366]">Full Management</h4>
                    <p className="text-xs text-slate-500">Venue to RSVP support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <Gem size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366]">Hyper-Exclusive</h4>
                    <p className="text-xs text-slate-500">Access to premier venues.</p>
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
                src="https://picsum.photos/seed/wedding_decor/800/800" 
                alt="Wedding Decor" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#D4AF37] rounded-full flex items-center justify-center text-white p-10 text-center shadow-2xl">
                <p className="font-serif italic text-xl font-bold leading-tight">Voted India's Top Destination Wedding Specialists</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services/Itinerary as Journey */}
      <section id="services" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="gold-text font-bold uppercase tracking-widest text-sm mb-4 block">Our 360° Approach</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">The Wedding Planning Odyssey</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {weddingServices.map((item) => (
              <motion.div 
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <button 
                  onClick={() => setActiveStep(activeStep === item.day ? null : item.day)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl transition-all border",
                    activeStep === item.day ? "bg-[#002366] text-white border-[#002366]" : "bg-white text-[#002366] border-slate-100 hover:border-[#D4AF37]"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                      activeStep === item.day ? "bg-[#D4AF37] text-[#002366]" : "bg-slate-100 text-[#002366]"
                    )}>
                      {item.day}
                    </span>
                    <span className="text-lg font-bold text-left">{item.title}</span>
                  </div>
                  <ChevronDown className={cn("transition-transform duration-300", activeStep === item.day && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeStep === item.day && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 bg-white border-x border-b border-slate-100 rounded-b-2xl text-slate-600 leading-relaxed group">
                        <p className="mb-4">{item.desc}</p>
                        <div className="flex gap-4">
                           {item.day === 1 && <Utensils size={18} className="text-[#D4AF37]" />}
                           {item.day === 2 && <MapPin size={18} className="text-[#D4AF37]" />}
                           {item.day === 5 && <Award size={18} className="text-[#D4AF37]" />}
                           {item.day === 6 && <Camera size={18} className="text-[#D4AF37]" />}
                        </div>
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
            <span className="gold-text font-bold uppercase tracking-widest text-sm mb-4 block">Scalable Luxury</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">Signature Wedding Tiers</h2>
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
                    The Grand Signature
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
                    <Globe className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Luxury Accommodation</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.stay}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Users className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Guest Experience</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.transport}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Utensils className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={20} />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Culinary Journey</h4>
                      <p className={cn("text-sm", v.highlight ? "text-white/60" : "text-slate-500")}>{v.meals}</p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    {v.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                        <Star className={v.highlight ? "text-[#D4AF37]" : "text-[#D4AF37]"} size={14} /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <button className={cn(
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all",
                  v.highlight ? "bg-[#D4AF37] text-[#002366] hover:brightness-110" : "bg-slate-100 text-[#002366] hover:bg-[#D4AF37] hover:text-[#002366]"
                )}>
                  Get Free Consultation
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
                <span className="w-10 h-[2px] bg-[#D4AF37]"></span> Comprehensive Inclusions
              </h3>
              <ul className="space-y-6">
                {[
                  "Luxury resort/palace accommodation",
                  "Turn-key Event Decor & Styling",
                  "Curated Menu & Specialist Catering",
                  "Logistics & Airport Limo Transfers",
                  "Professional Event Coordination Team",
                  "Photography, Film & Social Media support",
                  "Guest Concierge & Help Desk at Venue"
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
                <span className="w-10 h-[2px] bg-[#D4AF37]"></span> Noteworthy Exclusions
              </h3>
              <ul className="space-y-6">
                {[
                  "International/Domestic Airfare (Add-on available)",
                  "Mandatory GST as per Government norms",
                  "Alcoholic Beverages (unless specified)",
                  "Personal Shopping & Extra Excursions",
                  "Any Visa or Legal fees if international",
                  "Items not mentioned in the final SLA"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-6 text-white/50">
                    <div className="w-6 h-6 border-2 border-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-red-400">
                       x
                    </div>
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
              <span className="gold-text font-bold uppercase tracking-[0.2em] mb-4 block">For Wedding Planners & Agents</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 serif">Exclusive B2B <br /><span className="gold-text italic">Wedding Logistics Partner</span></h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl">
                Be the front face for your clients while we handle the massive logistics, venue negotiations, and ground handling. We empower you to take giant wedding orders with zero friction.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                {[
                  { title: "Net B2B Rates", desc: "Access huge margins from venues." },
                  { title: "Ghost Operations", desc: "We work as your backend team." },
                  { title: "Tech Integration", desc: "Live RSVP & logistics dashboards." },
                  { title: "White Label", desc: "Everything in your agency brand." }
                ].map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                         <Star size={16}/>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                        <p className="text-[10px] text-white/40">{item.desc}</p>
                      </div>
                   </div>
                ))}
              </div>

              <Link to="/b2b-partnership" className="px-10 py-5 bg-[#D4AF37] text-[#002366] font-extrabold rounded-xl hover:scale-105 transition-all text-lg flex items-center justify-center gap-3 w-full md:w-auto">
                Partner Registration <ArrowRight size={20}/>
              </Link>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20">
                <h3 className="text-2xl font-bold mb-8 italic serif">Collaborative Benefits</h3>
                <div className="space-y-6">
                  {[
                    "XML Property Feed Access",
                    "Dedicated Wedding Manager",
                    "Preferred Payment Terms",
                    "Global Venue Inventory",
                    "Marketing Pitch Deck support"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-medium">
                       <ShieldCheck className="text-[#D4AF37]" size={18}/>
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif">The GI Difference in Weddings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <Gem size={32}/>, title: "Curated Locations", desc: "Handpicked boutique and elite properties globally." },
              { icon: <Clock size={32}/>, title: "Precision Planning", desc: "Every micro-moment scheduled and executed to perfection." },
              { icon: <HeaderIcon size={32}/>, title: "Vendor Network", desc: "Access to India's top caterers, decorates & artists." },
              { icon: <Award size={32}/>, title: "Trusted Backend", desc: "Reliability backed by 15+ years of B2B logistics." }
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
            <h2 className="text-4xl font-bold text-[#002366] serif">Wedding Planning FAQs</h2>
          </div>
          <div className="space-y-6">
            {[
              { 
                q: "What is the lead time for planning a destination wedding?", 
                a: "We recommend starting 6-9 months in advance for destination weddings to secure the best venues and flight rates. However, we have specialized teams for 'Quick Weddings' with a lead time of 3 months." 
              },
              { 
                q: "Do you handle international destination weddings?", 
                a: "Yes! We specialize in Thailand, Bali, Dubai, and Maldives for international weddings, handling everything from visas to specialized logistics." 
              },
              { 
                q: "Can we use our own vendors?", 
                a: "Absolutely. We can act solely as your logistics and venue manager while coordinating seamlessly with your desired artists or photographers." 
              },
              { 
                q: "How do you handle guest management and RSVPs?", 
                a: "We provide a dedicated tech dashboard for each wedding where guests can RSVP, track flights, and view event schedules instantly." 
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
            <h3 className="gold-text font-bold uppercase tracking-widest mb-6">Let's Design Your Forever</h3>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 serif">Book Your Consultation Slot</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
              Our wedding specialists are ready to turn your vision into reality. Availability for the 2026 wedding season is filling fast.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                   <PhoneCall size={28}/>
                </div>
                <div>
                   <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-1">Talk to Specialist</p>
                   <p className="text-2xl font-bold font-serif">+91 93548 10841</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                   <Mail size={28}/>
                </div>
                <div>
                   <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-1">Inquiry Mail</p>
                   <p className="text-2xl font-bold font-serif">info@giholidays.com</p>
                </div>
              </div>
            </div>

            <div className="p-1 max-w-md mx-auto gold-gradient rounded-full">
              <button className="w-full py-6 bg-[#002366] text-white rounded-full font-extrabold text-xl hover:bg-transparent transition-all uppercase tracking-[0.2em] shadow-2xl">
                 Request a Call Back
              </button>
            </div>
            <p className="mt-8 text-sm font-medium text-white/40">Office: Dwarka Vihar, Najafgarh, New Delhi - 110043</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HeaderIcon(props: any) {
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
      <path d="M4 17v-10l8 -4l8 4v10" />
      <path d="M4 11h16" />
      <path d="M12 3v18" />
    </svg>
  );
}
