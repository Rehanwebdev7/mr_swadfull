import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Award, ShieldCheck, 
  ArrowUpRight, Heart, Sparkles, Send 
} from 'lucide-react';
import { toast } from 'sonner';
import { COMPANY_INFO } from '../data/products';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to Mr. Swadful wholesale updates!');
    setNewsletterEmail('');
  };

  return (
    <>
      {/* STANDALONE WHOLESALE & DEALER NETWORK SECTION (PLACED DIRECTLY ABOVE FOOTER) */}
      <section className="py-16 bg-[#FAF6F0] relative overflow-hidden border-t border-[#D4A017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0F382C] rounded-3xl p-8 sm:p-12 border-2 border-[#D4A017]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Background Decorative Gold Blurs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A017]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl relative z-10 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4A017]/50 text-[#F3C649] text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHOLESALE & DEALER NETWORK</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Stay Updated with <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3C649] via-[#D4A017] to-[#FFF0C2]">
                  Direct Factory Rates
                </span>
              </h3>
              <p className="text-[#D1E0D9] text-sm leading-relaxed font-medium">
                Subscribe to get monthly price lists, seasonal spice harvest updates, and bulk deal alerts across Maharashtra.
              </p>
            </div>

            <form onSubmit={handleNewsletter} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-5 py-4 rounded-2xl bg-white/10 border border-[#D4A017]/40 text-white placeholder-white/50 focus:outline-none focus:border-[#F3C649] text-sm w-full sm:w-80 shadow-inner"
              />
              <button
                type="submit"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D4A017] to-[#F3C649] text-[#0A2920] font-black text-sm uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-[#0A2920]" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="relative bg-brand-green-deep text-brand-cream border-t border-brand-gold/30 overflow-hidden">
        {/* Decorative Gold Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

        {/* Decorative Background Blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/LOGO.png" 
                  alt="Mr. Swadful Foods" 
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-md" 
                />
                <div>
                  <div className="font-serif text-xl font-bold text-brand-cream">Mr. SWADFUL</div>
                  <div className="text-xs font-semibold text-brand-gold tracking-widest uppercase">Foods • Dhule Since 2011</div>
                </div>
              </div>

              <p className="text-sm text-brand-cream/80 leading-relaxed max-w-md">
                Crafting authentic Indian flavors from Dhule, Maharashtra. Hand-picked Assam & Nilgiri teas, cold-ground spices, and traditional crisp urad papad under our trusted brands <strong className="text-brand-gold">Mr. SWADFUL</strong> and <strong className="text-brand-gold">Mr. CUP</strong>.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {COMPANY_INFO.certifications.map((cert) => (
                  <span key={cert} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-cream/10 border border-brand-gold/20 text-[11px] text-brand-gold font-semibold">
                    <ShieldCheck className="w-3 h-3 text-brand-gold" />
                    {cert.split(' ')[0]} {cert.split(' ')[1]}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm text-brand-cream/80">
                <li>
                  <a href="/" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>All Products</span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>Our Story</span>
                  </a>
                </li>
                <li>
                  <a href="/heritage" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>Heritage & Legacy</span>
                  </a>
                </li>
                <li>
                  <a href="/quality" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>Quality Assurance</span>
                  </a>
                </li>
                <li>
                  <a href="/wholesale" className="hover:text-brand-gold transition-colors flex items-center gap-1 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover:scale-150 transition-transform" />
                    <span>Wholesale Hub</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">
                Catalogue
              </h4>
              <ul className="space-y-2.5 text-sm text-brand-cream/80">
                <li>
                  <a href="/products?category=Tea" className="hover:text-brand-gold transition-colors">
                    Premium Family Tea
                  </a>
                </li>
                <li>
                  <a href="/products?category=Tea" className="hover:text-brand-gold transition-colors">
                    Strong Dust Tea (Cutting Chai)
                  </a>
                </li>
                <li>
                  <a href="/products?category=Tea" className="hover:text-brand-gold transition-colors">
                    Mr. CUP Commercial Bag
                  </a>
                </li>
                <li>
                  <a href="/products?category=Spices" className="hover:text-brand-gold transition-colors">
                    Cold-Ground Red Chilli
                  </a>
                </li>
                <li>
                  <a href="/products?category=Spices" className="hover:text-brand-gold transition-colors">
                    High-Curcumin Turmeric
                  </a>
                </li>
                <li>
                  <a href="/products?category=Spices" className="hover:text-brand-gold transition-colors">
                    Kerala Green Elaichi
                  </a>
                </li>
                <li>
                  <a href="/products?category=Papad" className="hover:text-brand-gold transition-colors">
                    Handmade Urad Papad
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">
                Factory & Office
              </h4>
              <ul className="space-y-3 text-sm text-brand-cream/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href={`tel:${COMPANY_INFO.contact.phonePrimary}`} className="hover:text-brand-gold transition-colors">
                    {COMPANY_INFO.contact.phonePrimary}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-brand-gold transition-colors">
                    {COMPANY_INFO.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 pt-2 border-t border-brand-gold/15">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div>Mon – Sat: 9:00 AM – 7:00 PM</div>
                    <div>Sunday: 11:00 AM – 4:00 PM</div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-brand-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
            <p>© {new Date().getFullYear()} Mr. Swadful Foods. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Made with passion in Dhule, Maharashtra</span>
              <a 
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=Hello%20Mr.%20Swadful%20Team,%20I%20want%20to%20inquire%20about%20products.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-gold font-semibold hover:underline"
              >
                <span>Connect on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
