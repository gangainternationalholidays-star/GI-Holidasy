import * as React from "react";
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Services", path: "/services" },
        { name: "Signature Packages", path: "/packages" },
        { name: "B2B Partnership", path: "/b2b-partnership" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-conditions" },
        { name: "Payment Policy", path: "/payment-policy" },
        { name: "Cancellation Policy", path: "/cancellation-policy" },
        { name: "Refer & Earn", path: "/refer-earn" },
      ]
    },
    {
      title: "Destinations",
      links: [
        { name: "Char Dham Yatra", path: "/char-dham-yatra" },
        { name: "Goa Beach Tours", path: "/packages?search=Goa" },
        { name: "Manali Hill Escapes", path: "/packages?search=Manali" },
        { name: "Kerala Backwaters", path: "/packages?search=Kerala" },
        { name: "Thailand Luxury", path: "/packages?search=Thailand" },
      ]
    }
  ];

  return (
    <footer className="relative bg-brand-midnight text-white overflow-hidden pt-24 pb-12">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-orange/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 max-w-sm">
            <Link to="/" className="flex items-center gap-4 mb-8">
              <img 
                src="https://giholidays.com/wp-content/uploads/2025/08/cropped-Untitled-design-1.png" 
                alt="GI Holidays Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col border-l border-brand-gold/30 pl-4 py-1">
                <span className="font-serif text-2xl font-bold leading-none tracking-wider text-white">GI HOLIDAYS</span>
                <span className="text-[10px] text-brand-gold uppercase tracking-[0.4em] font-black mt-2">Signature of Luxury Travel</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              Crafting uncompromising luxury experiences across the globe since 2008. Your gateway to the world's most exclusive destinations.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: <Instagram size={20} />, link: "#" },
                { icon: <Facebook size={20} />, link: "#" },
                { icon: <Twitter size={20} />, link: "#" },
                { icon: <Youtube size={20} />, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-blue transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {footerLinks.map((group, idx) => (
              <div key={idx} className={idx === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-gold mb-8">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        to={link.path} 
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center group/link"
                      >
                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-brand-gold mr-1" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-gold mb-8">Concierge Service</h4>
              <div className="space-y-8">
                <a href="tel:+919876543210" className="flex items-start gap-5 group">
                  <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Call Us</span>
                    <span className="text-lg font-bold group-hover:text-brand-gold transition-colors">+91 91100 00000</span>
                  </div>
                </a>
                <a href="mailto:info@giholidays.com" className="flex items-start gap-5 group">
                  <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Email Us</span>
                    <span className="text-lg font-bold group-hover:text-brand-gold transition-colors">info@giholidays.com</span>
                  </div>
                </a>
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Our Studio</span>
                    <span className="text-white/70 leading-relaxed">
                      New Delhi, India<br />
                      Corporate Hub Sector 44
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-gold" />
              IATA Accredited
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-brand-gold" />
              Luxury Excellence Award 2024
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-brand-gold" />
              24/7 Global Concierge
            </div>
          </div>
          
          <div className="text-white/30 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} Ganga International Holidays. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
