import { motion } from "framer-motion";

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 prose prose-slate max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#002366] mb-8 serif">Terms & Conditions</h1>
          <ul className="space-y-4 text-slate-600">
            <li className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0"></span>
              <span>All bookings are subject to availability.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0"></span>
              <span>Rates may vary during peak season (Char Dham dates, Diwali, New Year).</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0"></span>
              <span>यात्रियों को नियमों का पालन करना आवश्यक है - Travelers must follow local guidelines and safety protocols.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0"></span>
              <span>Legal disputes are subject to Delhi Jurisdiction.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
