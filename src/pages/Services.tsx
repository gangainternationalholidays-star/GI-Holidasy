import { motion } from "framer-motion";
import { 
  Hotel, 
  Plane, 
  Shield, 
  Globe, 
  Users, 
  Camera, 
  Briefcase,
  Heart,
  ArrowRight,
  Info,
  Compass
} from "lucide-react";
import { Link } from "react-router-dom";

const serviceList = [
  {
    icon: <Hotel size={40} />,
    title: "B2B Hotel Bookings",
    description: "Exclusive negotiated rates with 500,000+ properties globally. Direct XML integrations and offline inventory access.",
    features: ["Instant Confirmations", "Pay at Hotel Options", "Group Blockings", "Lowest Price Match"]
  },
  {
    icon: <Globe size={40} />,
    title: "Visa Assistance",
    description: "Hassle-free visa processing for tourist, business, and transit visas across 100+ nations with document pickup services.",
    features: ["Expert Counseling", "Fast Documentation", "Status Tracking", "Multi-country support"],
    link: "/visa-services"
  },
  {
    icon: <Plane size={40} />,
    title: "Flight Management",
    description: "GDS and LCC content coverage for domestic and international sectors. Manage cancellations and rescheduling via dedicated portal.",
    features: ["Ancillary Services", "Seat Selection", "Corporate Fare Access", "24/7 Ticketing Support"]
  },
  {
    icon: <Briefcase size={40} />,
    title: "Corporate Travel (MICE)",
    description: "End-to-end management for Meetings, Incentives, Conferences, and Exhibitions for specialized groups.",
    features: ["Venue Sourcing", "Logistics Planning", "Team Building", "Budget Control"]
  },
  {
    icon: <Heart size={40} />,
    title: "Destination Weddings",
    description: "Specialized logistics, venue sourcing, and total management for royal and boutique weddings globally.",
    features: ["Venue Sourcing", "RSVP Management", "Luxury Fleet", "On-ground Team"],
    link: "/destination-wedding"
  },
  {
    icon: <Compass size={40} />,
    title: "Spiritual Tours (Char Dham)",
    description: "Expertly managed religious circuits with a focus on safety, comfort, and direct vendor access.",
    features: ["Char Dham Specialist", "VIP Darshan Support", "Senior Citizen Care", "Helicopter Booking"],
    link: "/char-dham-yatra"
  },
  {
    icon: <Shield size={40} />,
    title: "Travel Insurance",
    description: "Comprehensive travel protection plans including medical, trip cancellation, and baggage loss coverage.",
    features: ["Zero Paperwork", "Instant Issuance", "COVID Coverage", "Worldwide Claims"]
  }
];

export default function Services() {
  return (
    <div className="pt-20 overflow-hidden">
      <section className="vibrant-gradient py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-20" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-xs mb-6 block">Elite Travel Inventory</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">
              Signature <span className="text-brand-gold">B2B Experiences</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              A meticulously curated suite of travel products designed to empower your agency with global reach and margin priority.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {serviceList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-luxury p-10 flex flex-col h-full bg-slate-50 shadow-slate-100"
              >
                <div className="text-brand-gold mb-10 bg-white w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all border border-slate-100">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 text-brand-blue italic">{service.title}</h3>
                <p className="text-slate-500 mb-10 flex-grow leading-relaxed font-light text-lg">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-10 pb-8 border-b border-slate-200">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={service.link || "/contact"} 
                  className="btn-luxury bg-brand-blue text-white hover:bg-brand-gold glow-hover"
                >
                  {service.link ? "Explore Journey" : "Concierge Access"} <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Tours Highlight */}
      <section className="py-32 bg-slate-50">
        <div className="container-custom">
          <div className="vibrant-gradient rounded-[4rem] overflow-hidden text-white flex flex-col lg:flex-row items-center shadow-3xl relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="lg:w-1/2 p-16 lg:p-24 relative z-10">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] mb-6 block text-sm">Strategic Inventory</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 leading-tight">Fixed Departures & <br /> <span className="text-brand-gold">Global Escapes</span></h2>
              <p className="text-white/60 text-xl mb-12 leading-relaxed font-light">
                Leverage our guaranteed group blockings. Fully managed itineraries with prioritized profit margins and 24/7 elite ground support everywhere.
              </p>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-serif font-bold text-white">1,500+</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold mt-2">Annual Groups</span>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-4xl font-serif font-bold text-white">40+</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold mt-2">Elite Gateways</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-[500px] lg:h-auto self-stretch">
              <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800" alt="Group Tours" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 text-center bg-white relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-12 border border-slate-100 shadow-xl">
               <Info size={40} className="text-brand-gold" />
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-brand-blue">Evolve Your <br /> Travel Business</h2>
            <p className="text-slate-500 text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-light">
              Our architects are ready to curate the perfect portfolio for your discerning clients. Partner with the signature of luxury.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="btn-luxury bg-brand-gold text-brand-blue shadow-2xl shadow-brand-gold/20 hover:scale-105 active:scale-95">
                Consult With Us
              </Link>
              <Link to="/b2b-partnership" className="btn-luxury border-2 border-slate-200 text-brand-blue hover:border-brand-gold">
                Agency Registration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
