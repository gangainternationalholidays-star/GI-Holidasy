import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    requirement: "",
    type: "Inquiry"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        status: "New",
        createdAt: serverTimestamp(),
        source: "Website Contact Form"
      });
      
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", company: "", requirement: "", type: "Inquiry" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 overflow-hidden">
      <section className="vibrant-gradient py-32 text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-[0.6em] text-xs mb-6 block">Concierge Desk</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">
              Connect With <br /> <span className="text-brand-gold">Excellence</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
              Designing exceptional travel experiences requires precise collaboration. Our team of architects is at your service.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10 text-brand-blue">Signature <br /> Support</h2>
              <p className="text-slate-500 mb-16 leading-relaxed text-xl font-light">
                For prioritized agency support, high-value corporate inquiries, or bespoke wedding logistics, utilize our dedicated channels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors">
                    <MapPin size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-xl mb-3 text-brand-blue">Headquarters</h4>
                  <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider">
                    Dwarka Vihar, Najafgarh,<br />
                    New Delhi - 110043, India
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors">
                    <Phone size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-xl mb-3 text-brand-blue">Direct Line</h4>
                  <a href="tel:+919354810841" className="text-brand-gold font-bold text-lg hover:underline block mb-2 tracking-widest">+91 93548 10841</a>
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Global Desk (10 AM - 7 PM IST)</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors">
                    <Mail size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-xl mb-3 text-brand-blue">Electronic Mail</h4>
                  <a href="mailto:info@giholidays.com" className="text-brand-gold font-bold text-lg hover:underline tracking-widest">info@giholidays.com</a>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors">
                    <MessageSquare size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-xl mb-3 text-brand-blue">Instant Portal</h4>
                  <a href="https://wa.me/919354810841" className="text-brand-gold font-bold text-lg hover:underline tracking-widest">+91 93548 10841</a>
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-2">(WhatsApp Business)</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-16 rounded-[3rem] shadow-3xl border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold opacity-5 rounded-bl-full pointer-events-none" />
              <h3 className="text-3xl font-serif font-bold mb-10 text-brand-blue italic">Manifest Journey</h3>
              
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="bg-brand-gold/10 text-brand-gold w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h4 className="text-3xl font-serif font-bold mb-6 text-brand-blue">Inquiry Lodged</h4>
                  <p className="text-slate-500 mb-10 text-lg font-light leading-relaxed">Our architects have received your transmission and are reviewing the requirements.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-brand-gold font-bold uppercase tracking-widest text-xs hover:underline decoration-brand-gold decoration-2 underline-offset-8"
                  >
                    Lodge New Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border-b-2 border-slate-100 px-0 py-4 outline-none focus:border-brand-gold transition-all font-bold text-brand-blue"
                        placeholder="ALEXANDER VANCE"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Contact Number</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full bg-slate-50 border-b-2 border-slate-100 px-0 py-4 outline-none focus:border-brand-gold transition-all font-bold text-brand-blue"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Official Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-50 border-b-2 border-slate-100 px-0 py-4 outline-none focus:border-brand-gold transition-all font-bold text-brand-blue"
                        placeholder="VANCE@AGENCY.COM"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Organization</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border-b-2 border-slate-100 px-0 py-4 outline-none focus:border-brand-gold transition-all font-bold text-brand-blue"
                        placeholder="ROYAL TRAVELERS CO."
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Signature Requirements</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-50 border-b-2 border-slate-100 px-0 py-4 outline-none focus:border-brand-gold transition-all font-bold text-brand-blue resize-none"
                      placeholder="DESCRIBE YOUR LUXURY REQUIREMENTS..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-luxury bg-brand-blue text-white hover:bg-brand-gold hover:text-brand-blue transition-all group py-6 glow-hover rounded-2xl"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "lodging transmission"} 
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight py-16 text-center">
        <div className="container-custom">
          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em] max-w-xl mx-auto block mb-2">
            Signature Data Protection
          </p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest max-w-xl mx-auto">
            Ganga International Holidays maintains absolute confidentiality for all B2B and private inquiries.
          </p>
        </div>
      </section>

      {/* Google Sheets Integration Logic Note */}
      <section className="bg-slate-50 py-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        <div className="container-custom">
          <p className="max-w-xl mx-auto italic">
            * Note: These forms are ready for Google Sheets integration. Simply provide the Script URL in the fetch() call to sync all submissions directly to your spreadsheets.
          </p>
        </div>
      </section>
    </div>
  );
}
