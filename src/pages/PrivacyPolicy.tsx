import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 prose prose-slate max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#002366] mb-8 serif">Privacy Policy</h1>
          <p className="text-slate-600 leading-relaxed">
            At Ganga International Holidays, we respect your privacy and ensure all personal and business data is secure and protected. This Privacy Policy outlines how we collect, use, and safeguard your information.
          </p>
          <h2 className="text-2xl font-bold text-[#002366] mt-8 mb-4">Information Collection</h2>
          <p>We collect information when you register on our B2B portal, place an order, or subscribe to our newsletter.</p>
          <h2 className="text-2xl font-bold text-[#002366] mt-8 mb-4">Data Protection</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
          <h2 className="text-2xl font-bold text-[#002366] mt-8 mb-4">Business Data</h2>
          <p>For our B2B partners, we ensure that agency data and client leads are kept strictly confidential and used only for operational purposes related to your bookings.</p>
        </motion.div>
      </div>
    </div>
  );
}
