import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Star, Globe, ShieldCheck } from "lucide-react";

export default function CorporateTravel() {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Modern Corporate Architecture"
          />
          <div className="absolute inset-0 bg-brand-midnight/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-black uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Elite MICE & Corporate Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8"
          >
            Corporate <br /> <span className="italic text-brand-gold">Excellence.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl leading-relaxed font-light"
          >
            Elevate your business journeys with bespoke travel management, seamless event planning, and premium hospitality solutions.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-serif font-bold text-brand-midnight mb-4 uppercase tracking-widest">Our Signature Offerings</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Briefcase className="text-brand-gold" size={40} />,
                title: "Business Travel",
                desc: "Efficient point-to-point travel management for executives who value time and comfort."
              },
              {
                icon: <Users className="text-brand-gold" size={40} />,
                title: "MICE & Events",
                desc: "Meetings, Incentives, Conferences, and Exhibitions executed with surgical precision."
              },
              {
                icon: <Star className="text-brand-gold" size={40} />,
                title: "Team Retreats",
                desc: "Luxurious offsite experiences designed to foster innovation and strengthen team bonds."
              },
              {
                icon: <Globe className="text-brand-gold" size={40} />,
                title: "Global Presence",
                desc: "An extensive network of partners ensuring luxury standards across 6 continents."
              },
              {
                icon: <ShieldCheck className="text-brand-gold" size={40} />,
                title: "VIP Security",
                desc: "Comprehensive safety protocols and discreet concierge services for high-profile travelers."
              },
              {
                icon: <ShieldCheck className="text-brand-gold" size={40} />,
                title: "Policy Compliance",
                desc: "Optimizing travel spends while ensuring 100% adherence to corporate guidelines."
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="mb-8">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-brand-midnight mb-4 uppercase tracking-wider italic">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
