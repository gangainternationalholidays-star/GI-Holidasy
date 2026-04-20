import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award, Flag, Users } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="luxury-gradient py-24 text-white relative">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About <span className="text-[#D4AF37]">GI Holidays</span>
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto italic">
            "Your journey is our passion, your success is our mission."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Established Trust Since 2011</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg text-justify">
                Ganga International Holidays (GI Holidays) was founded with a singular vision: to bridge the gap between high-end travel suppliers and local travel agents. Over the last 15 years, we have evolved from a small regional operator into a leading B2B Travel Management Company (BMC) based in New Delhi.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg text-justify">
                As an MSME registered business, we prioritize compliance, security, and professional ethics. Our team of 50+ travel specialists works around the clock to ensure that our partner agents get the fastest confirmation times and the most competitive land rates.
              </p>
              
              <div className="space-y-4">
                {[
                  "MSME Registered & Fully Compliant",
                  "15+ Years Commercial Experience",
                  "Global Network of 500k+ Hotels",
                  "In-house Ground Handling in 10+ Countries",
                  "24/7 Dedicated Agent Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand-gold shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6"
            >
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                  <img src="https://giholidays.com/wp-content/uploads/2026/04/Screenshot-2026-04-01-at-5.25.45-PM-scaled.png" alt="Travel 1" className="w-full h-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mt-16 hover:scale-105 transition-transform duration-500">
                  <img src="https://giholidays.com/wp-content/uploads/2026/04/Screenshot-2026-04-01-at-5.25.20-PM-scaled.png" alt="Travel 2" className="w-full h-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
                </div>
              </div>
              {/* Badge Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,35,102,0.3)] border border-slate-50 text-center z-20 min-w-[200px]">
                <Award size={40} className="text-[#D4AF37] mx-auto mb-4" />
                <span className="block text-4xl font-extrabold text-[#002366] serif">15+</span>
                <span className="text-slate-400 uppercase tracking-[0.2em] text-[9px] font-extrabold">Years of Luxury Expertise</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-brand-blue py-24 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-12 rounded-3xl backdrop-blur-sm border border-white/10"
            >
              <Flag size={48} className="text-brand-gold mb-8" />
              <h3 className="text-3xl font-serif font-bold mb-6">Our Mission</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                To empower small and medium-sized travel agencies with global-scale technology and pricing, enabling them to compete effectively in an ever-evolving digital world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-gold/10 p-12 rounded-3xl backdrop-blur-sm border border-brand-gold/20"
            >
              <Users size={48} className="text-brand-gold mb-8" />
              <h3 className="text-3xl font-serif font-bold mb-6">Our Vision</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                To become Asia's most trusted B2B travel management platform, recognized for ethical business practices, innovation, and unwavering support for our agent partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recognitions & Memberships</h2>
            <div className="h-1 w-24 bg-brand-gold mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="flex flex-col items-center">
               <ShieldCheck size={64} />
               <span className="mt-2 font-bold">MSME</span>
             </div>
             <div className="flex flex-col items-center">
               <Award size={64} />
               <span className="mt-2 font-bold">IATA</span>
             </div>
             <div className="flex flex-col items-center">
               <Users size={64} />
               <span className="mt-2 font-bold">TAFI</span>
             </div>
             {/* Add actual logos here */}
          </div>
        </div>
      </section>
    </div>
  );
}
