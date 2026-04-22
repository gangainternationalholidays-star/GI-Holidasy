import * as React from "react";
import { motion } from "framer-motion";
import { 
  Handshake, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Layers,
  Settings,
  Headphones
} from "lucide-react";
import { Link } from "react-router-dom";

export default function B2BPartnership() {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="bg-[#002366] py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="gold-text font-bold uppercase tracking-[0.3em] mb-6 block"
            >
              Partner with the Best
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-serif"
            >
              Empower Your Agency with <br />
              <span className="text-[#D4AF37]">GI Holidays B2B Network</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed"
            >
              Join 5,000+ active travel agents who trust Ganga International Holidays for their ground logistics, hotel inventory, and fixed departures.
            </motion.p>
            <div className="flex flex-wrap gap-6">
              <Link to="/b2b-portal" className="px-12 py-5 gold-gradient text-[#002366] font-extrabold text-lg rounded-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                Register as Partner <Handshake size={24} />
              </Link>
              <Link to="/contact" className="px-12 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-sm hover:bg-white/10 transition-all">
                Talk to Account Manager
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#002366] serif mb-6">Why GI Holidays?</h2>
            <p className="text-slate-500 text-lg">We provide the technical and operational backbone for high-revenue travel agencies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Settings className="text-[#D4AF37]" size={40} />,
                title: "Live XML Inventory",
                desc: "Direct access to our proprietary hotel engine with 500k+ global properties at net B2B rates."
              },
              {
                icon: <Layers className="text-[#D4AF37]" size={40} />,
                title: "White-Label Portal",
                desc: "Deliver professional, branded itineraries to your clients with your own agency identity."
              },
              {
                icon: <ShieldCheck className="text-[#D4AF37]" size={40} />,
                title: "MSME Certified Trust",
                desc: "A registered B2B travel management company with 15+ years of unblemished legacy."
              },
              {
                icon: <TrendingUp className="text-[#D4AF37]" size={40} />,
                title: "High Margins",
                desc: "We buy in bulk, giving you access to prices that allow for healthy agency markups."
              },
              {
                icon: <Headphones className="text-[#D4AF37]" size={40} />,
                title: "24/7 Ground Operations",
                desc: "Dedicated support team stationed in key destinations like Uttarakhand, Kerala, and Dubai."
              },
              {
                icon: <Globe className="text-[#D4AF37]" size={40} />,
                title: "Global Reach",
                desc: "From local day tours to complex international multi-city circuits, we handle it all."
              }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="mb-8">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-[#002366] mb-4 serif">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Referral System */}
      <section className="bg-slate-50 py-32 overflow-hidden">
        <div className="container-custom">
          <div className="bg-[#002366] rounded-[4rem] text-white flex flex-col lg:flex-row items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none"></div>
            <div className="lg:w-1/2 p-12 lg:p-24 relative z-10">
              <span className="gold-text font-bold uppercase tracking-[0.2em] mb-6 block text-sm">Lifetime Passive Income</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 serif leading-tight">Refer Other Agents & <br /><span className="text-[#D4AF37]">Earn 5% Profit Share</span></h2>
              <p className="text-white/60 text-xl mb-12 font-light leading-relaxed">
                Build your own team within the GI Holidays network. For every successful booking made by your referred agent, you receive a lifetime commission.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "No registration fee for referral program",
                  "Monthly payouts directly to bank/wallet",
                  "Real-time tracking of referral earnings",
                  "Dedicated support for complex team structures"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 size={24} className="text-[#D4AF37]" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/refer-earn" className="px-12 py-5 bg-white text-[#002366] font-bold rounded-sm hover:bg-[#D4AF37] hover:text-[#002366] transition-all uppercase tracking-widest inline-block">
                See How It Works
              </Link>
            </div>
            <div className="lg:w-1/2 h-[500px] lg:h-auto self-stretch">
               <img src="https://picsum.photos/seed/partnership/1000/1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-32">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "5K+", label: "Active Agents" },
              { val: "15+", label: "Years Experience" },
              { val: "500K+", label: "Hotel Inventory" },
              { val: "24/7", label: "Ground Support" }
            ].map((stat, i) => (
              <div key={i}>
                <h4 className="text-5xl font-bold text-[#002366] mb-2 serif tracking-tighter">{stat.val}</h4>
                <p className="text-[#D4AF37] font-extrabold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Layers */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="bg-[#002366] rounded-[3rem] p-12 lg:p-24 text-white flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl">
               <h2 className="text-4xl font-bold mb-6 serif">Ready to scale your business?</h2>
               <p className="text-white/60 text-lg">
                 Stop losing clients to online portals. Offer them the pricing and personalized handling they deserve under your brand name.
               </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
               <Link to="/b2b-portal" className="px-10 py-5 gold-gradient text-[#002366] font-bold rounded-sm text-center shadow-2xl uppercase tracking-widest">
                  Create Agent Account
               </Link>
               <Link to="/contact" className="px-10 py-5 border border-white/20 text-white font-bold rounded-sm text-center hover:bg-white/5 uppercase tracking-widest">
                  Request a Demo
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
