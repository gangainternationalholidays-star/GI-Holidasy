import { motion } from "framer-motion";

export default function CancellationPolicy() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 prose prose-slate max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#002366] mb-8 serif">Cancellation & Refund Policy</h1>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50">
                <h4 className="font-bold text-[#002366] mb-2">15+ Days Before Travel</h4>
                <p className="text-slate-600 text-sm">Partial refund available (excluding service fees and non-refundable bookings).</p>
              </div>
              <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50">
                <h4 className="font-bold text-[#002366] mb-2">7–14 Days Before Travel</h4>
                <p className="text-slate-600 text-sm">Limited refund based on vendor cancellation policies.</p>
              </div>
              <div className="p-6 border border-red-100 rounded-2xl bg-red-50/30">
                <h4 className="font-bold text-red-700 mb-2">Less Than 7 Days</h4>
                <p className="text-slate-600 text-sm">No refund will be processed for late cancellations.</p>
              </div>
              <div className="p-6 border border-red-200 rounded-2xl bg-red-100/20">
                <h4 className="font-bold text-red-700 mb-2">Helicopter Tickets</h4>
                <p className="text-slate-600 text-sm">Helicopter tickets for Kedarnath/Badrinath are strictly <strong>non-refundable</strong>.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
