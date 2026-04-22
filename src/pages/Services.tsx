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
    <div className="pt-20">
      <section className="luxury-gradient py-24 text-white">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Premium <span className="gold-text">B2B Services</span>
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A comprehensive suite of travel products designed to give your agency the competitive edge.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
              >
                <div className="text-[#D4AF37] mb-8 bg-[#D4AF37]/5 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#002366] transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={service.link || "/contact"} 
                  className="inline-flex items-center gap-2 font-bold text-brand-blue group-hover:text-brand-gold transition-colors"
                >
                  {service.link ? "Explore More" : "Request B2B Rates"} <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Tours Highlight */}
      <section className="bg-gray-50 py-24">
        <div className="container-custom">
          <div className="bg-brand-blue rounded-[3rem] overflow-hidden text-white flex flex-col lg:flex-row items-center shadow-2xl">
            <div className="lg:w-1/2 p-12 lg:p-20">
              <span className="gold-text font-bold uppercase tracking-[0.2em] mb-4 block">Specialized Offering</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Fixed Departures & Group Tours</h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Join our exclusive fixed departures for travel agents. Fully managed itineraries with guaranteed profits and 24/7 ground support. We handle everything from flights to local transfers.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                  <span className="text-2xl font-bold text-brand-gold">100+</span>
                  <span className="text-xs uppercase tracking-wider text-white/50">Groups/Year</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                  <span className="text-2xl font-bold text-brand-gold">30+</span>
                  <span className="text-xs uppercase tracking-wider text-white/50">Partners</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-[400px] lg:h-auto self-stretch">
              <img src="https://picsum.photos/seed/groups/800/800" alt="Group Tours" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Info size={48} className="text-brand-gold mx-auto mb-8" />
            <h2 className="text-4xl font-bold mb-6">Need a Custom B2B Quote?</h2>
            <p className="text-gray-600 text-lg mb-10">
              Our experts are ready to design the perfect itinerary for your clients. Partner with us for reliable ground handling and premium pricing.
            </p>
            <Link to="/contact" className="gold-bg text-brand-blue px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block shadow-xl">
              Get in Touch Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
