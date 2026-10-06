import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, MapPin, Truck, Award } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: "Hand-picked",
    description: "Fresh Assam & Nilgiri tea leaves"
  },
  {
    icon: ShieldCheck,
    title: "Zero preservatives",
    description: "No colours, no artificial anything"
  },
  {
    icon: MapPin,
    title: "Sourced direct",
    description: "From producers, not middlemen"
  },
  {
    icon: Truck,
    title: "Pan-Maharashtra",
    description: "500+ cities and growing"
  },
  {
    icon: Award,
    title: "FSSAI certified",
    description: "Every batch quality-tested"
  }
];

export const OurPromise: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF6F0] text-[#0A2920] relative overflow-hidden">
      {/* Decorative subtle blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F382C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#0A2920] text-xs font-black uppercase tracking-widest shadow-sm"
          >
            OUR PROMISE
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0A2920] tracking-tight leading-tight"
          >
            Everything you'd want to hear <br className="hidden sm:inline" /> about your food.
          </motion.h2>

          {/* Accent Gold Separator */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4A017]" />
            <div className="w-2 h-2 rotate-45 bg-[#D4A017]" />
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4A017]" />
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 justify-center">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#D4A017]/40 flex items-center justify-center text-[#0F382C] mb-5 group-hover:scale-110 group-hover:bg-[#0F382C] group-hover:text-[#F3C649] transition-all duration-300 shadow-lg">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2]" />
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0A2920] mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2D4D41] max-w-[180px] leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OurPromise;
