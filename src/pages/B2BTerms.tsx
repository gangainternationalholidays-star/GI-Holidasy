import { motion } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, UserCheck, Briefcase } from "lucide-react";

export default function B2BTerms() {
  const terms = [
    { icon: <ShieldCheck className="text-[#D4AF37]" />, title: "Margin Control", desc: "एजेंट अपना margin खुद decide कर सकता है - Agents have full control over their own profit margins." },
    { icon: <Briefcase className="text-[#D4AF37]" />, title: "Backend Operations", desc: "All logistics and on-ground operations are handled exclusively by Ganga International Holidays." },
    { icon: <UserCheck className="text-[#D4AF37]" />, title: "Zero Interference", desc: "No direct client interference. We respect the relationship between the primary agent and their client." },
    { icon: <Lock className="text-[#D4AF37]" />, title: "White-Label Support", desc: "We provide white-label service support available for established partners." },
    { icon: <CreditCard className="text-[#D4AF37]" />, title: "Payment Security", desc: "Secure transaction processing. Payment security is fully assured for all business accounts." },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="gold-text font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Executive Terms</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#002366] serif">B2B Partnership Terms</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {terms.map((term, idx) => (
              <div key={idx} className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#D4AF37] transition-all">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
                  {term.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#002366] mb-2">{term.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{term.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
