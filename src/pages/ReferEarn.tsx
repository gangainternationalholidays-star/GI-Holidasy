import { motion } from "framer-motion";
import { 
  Gift, 
  Share2, 
  Wallet, 
  TrendingUp, 
  UserPlus, 
  Trophy,
  ArrowRight,
  Handshake,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus />,
    title: "Invite Agents",
    description: "Share your unique referral link with travel agents in your network."
  },
  {
    icon: <Handshake />,
    title: "They Register",
    description: "Once they register and get verified as a B2B partner with GI Holidays."
  },
  {
    icon: <Wallet />,
    title: "Earn Commission",
    description: "Get a percentage of every booking they make for the first 12 months."
  }
];

export default function ReferEarn() {
  return (
    <div className="pt-20">
      <section className="luxury-gradient py-24 text-white relative">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="gold-text font-bold uppercase tracking-[0.2em] mb-4 block">Exclusive Agent Program</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Refer & <span className="gold-text">Earn</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Grow your earnings by inviting other travel professionals to join the GI Holidays network. Get rewarded for every successful booking they make.
            </p>
            <button className="gold-bg text-brand-blue px-12 py-5 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-3 mx-auto">
              Get Your Referral Link <Share2 size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">How it Works?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three simple steps to start earning passive income while helping your fellow travel agents get better rates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="text-brand-gold mb-8 flex justify-center scale-125 group-hover:scale-150 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
                <div className="absolute top-0 right-0 p-4 font-serif text-5xl font-black text-gray-50 opacity-10 leading-none">
                  0{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="bg-brand-blue section-padding text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Transparent Commission Structure</h2>
              <p className="text-white/60 mb-10 text-lg leading-relaxed">
                We believe in fair play and rewarding our loyal partners. Our referral program is designed to create a win-win ecosystem for the B2B community.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Bonus Credit on first booking",
                  "Exclusive Commission on all Hotel bookings",
                  "Premium Commission on all International Packages",
                  "Monthly payouts directly to your account",
                  "Real-time tracking dashboard"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg">
                    <CheckCircle2 className="text-brand-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              <Trophy className="text-brand-gold absolute -top-8 -right-8" size={80} />
              <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Top Referrer Rewards</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                  <span className="font-bold">Platinum Tier (10+ Refs)</span>
                  <span className="text-brand-gold font-bold">Extra Bonus</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-white/60">Gold Tier (5+ Refs)</span>
                  <span className="text-brand-gold font-bold">Priority Bonus</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-white/60">Silver Tier (2+ Refs)</span>
                  <span className="text-white/60">Standard</span>
                </div>
              </div>
              <div className="mt-10 p-6 bg-brand-gold rounded-2xl text-brand-blue text-center">
                <p className="font-bold text-sm uppercase tracking-widest mb-2">Total Paid to Partners</p>
                <p className="text-4xl font-black">Success Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refer CTA */}
      <section className="section-padding text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Gift size={64} className="text-brand-gold mx-auto mb-8" />
            <h2 className="text-4xl font-bold mb-6">Start Earning Today</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Why wait? Your network is your net worth. Login to your B2B dashboard to get your unique link and start referring agents now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="gold-bg text-brand-blue px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl">
                Start Referring <ArrowRight size={20} />
              </button>
              <button className="border border-brand-blue px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-blue hover:text-white transition-all">
                Read Program Terms
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
