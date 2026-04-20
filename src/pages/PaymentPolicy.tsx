import { motion } from "framer-motion";

export default function PaymentPolicy() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 prose prose-slate max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#002366] mb-8 serif">Payment Policy</h1>
          <div className="space-y-6 text-slate-600">
            <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold flex-shrink-0">30%</div>
              <p className="m-0">30–50% advance required for booking confirmation depending on the package type.</p>
            </div>
            <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold flex-shrink-0">100%</div>
              <p className="m-0">Full payment must be cleared before the journey start date.</p>
            </div>
            <div className="p-6 bg-[#002366] text-white rounded-2xl">
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">B2B Special Terms</h3>
              <p className="text-white/80 m-0">B2B partners get special credit terms based on business volume and verification (case-by-case basis).</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
