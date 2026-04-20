import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";

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
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", company: "", requirement: "", type: "Inquiry" });
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="luxury-gradient py-24 text-white">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get In <span className="gold-text">Touch</span>
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to scale your travel business? Our team is here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Contact Information</h2>
              <p className="text-gray-600 mb-12 leading-relaxed text-lg">
                For urgent inquiries, booking support, or partnership discussions, feel free to reach out via any of the channels below.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-gold/10 p-4 rounded-2xl text-brand-gold">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Our Office</h4>
                    <p className="text-gray-500 leading-relaxed">
                      Dwarka Vihar, Najafgarh,<br />
                      New Delhi - 110043, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-brand-gold/10 p-4 rounded-2xl text-brand-gold">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Call Us</h4>
                    <a href="tel:+919354810841" className="text-brand-gold font-bold text-lg hover:underline block mb-1">+91 93548 10841</a>
                    <p className="text-gray-500 text-sm italic">Mon-Sat, 10am to 7pm IST</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-brand-gold/10 p-4 rounded-2xl text-brand-gold">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Email Us</h4>
                    <a href="mailto:info@giholidays.com" className="text-brand-gold font-bold text-lg hover:underline">info@giholidays.com</a>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-gold/10 p-4 rounded-2xl text-brand-gold">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">WhatsApp Direct</h4>
                    <a href="https://wa.me/919354810841" className="text-brand-gold font-bold text-lg hover:underline">+91 93548 10841</a>
                    <p className="text-gray-500 text-xs italic mt-1">(Instant WhatsApp Support)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-8">Send an Inquiry</h3>
              
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">Inquiry Sent!</h4>
                  <p className="text-gray-600 mb-8">Thank you for reaching out. Our B2B specialists will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-brand-gold font-bold hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-[#D4AF37] transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-[#D4AF37] transition-all"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="john@agency.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="Travel Agency XYZ"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Requirement Details</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gold-bg text-brand-blue py-5 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send size={20} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Sheets Integration Logic Note */}
      <section className="bg-gray-100 py-12 text-center text-sm text-gray-500">
        <div className="container-custom">
          <p className="max-w-xl mx-auto italic">
            * Note: These forms are ready for Google Sheets integration. Simply provide the Script URL in the fetch() call to sync all submissions directly to your spreadsheets.
          </p>
        </div>
      </section>
    </div>
  );
}
