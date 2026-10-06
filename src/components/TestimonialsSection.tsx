import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The Premium Family Mix is now our morning ritual. Rich colour, kadak taste, and the aroma fills the whole kitchen — my in-laws even asked me for the brand.",
    name: "Anjali Patil",
    role: "Homemaker · Nashik, Maharashtra",
    initial: "A",
    avatarBg: "bg-[#7A9A8B]",
    rating: 5
  },
  {
    quote: "I've switched three brands in twenty years. Mr. CUP gives the strongest colour and most mileage per kg. My regulars notice the difference.",
    name: "Ramesh Jadhav",
    role: "Tea Shop Owner (est. 1998) · Dhule, Maharashtra",
    initial: "R",
    avatarBg: "bg-[#D4A017]",
    rating: 5
  },
  {
    quote: "Their turmeric is the real thing — the yellow is bold, and you can smell the earthiness the second you open the pack. Same story with the red chilli.",
    name: "Priya Deshmukh",
    role: "Chef & Food Blogger · Pune, Maharashtra",
    initial: "P",
    avatarBg: "bg-[#0F382C]",
    rating: 5
  },
  {
    quote: "Consistent quality and unbeatable direct factory rates. We've been distributing Mr. Swadful products across Khandesh region for over 8 years with zero complaints.",
    name: "Suresh Patil",
    role: "Wholesale Partner · Jalgaon, Maharashtra",
    initial: "S",
    avatarBg: "bg-[#B8860B]",
    rating: 5
  }
];

// Duplicate for continuous seamless marquee loop
const infiniteLoopTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

export const TestimonialsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#0A2920] text-xs font-black uppercase tracking-widest shadow-sm"
          >
            <Star className="w-3.5 h-3.5 fill-[#D4A017] text-[#D4A017]" />
            <span>LOVED BY OUR PEOPLE</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0A2920] tracking-tight"
          >
            Stories from kitchens, <br className="hidden sm:inline" /> tea-shops & tables
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-[#2D4D41] font-medium max-w-xl mx-auto"
          >
            The best marketing we have is our customers telling other customers.
          </motion.p>

          {/* Accent Gold Separator */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4A017]" />
            <div className="w-2 h-2 rotate-45 bg-[#D4A017]" />
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4A017]" />
          </div>
        </div>
      </div>

      {/* CONTINUOUS INFINITE MARQUEE SCROLL TRACK */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Subtle Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF6F0] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF6F0] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={isPaused ? {} : { x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {infiniteLoopTestimonials.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-7 border border-[#D4A017]/30 shadow-lg relative flex flex-col justify-between hover:shadow-2xl hover:border-[#D4A017] transition-all duration-300 group overflow-hidden"
            >
              {/* Corner Verified Tag */}
              <div className="absolute top-0 right-0 bg-[#D4A017] text-[#0A2920] font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow-sm">
                VERIFIED
              </div>

              <div>
                {/* Big Quote Symbol */}
                <div className="text-[#D4A017]/30 mb-2">
                  <Quote className="w-10 h-10 stroke-1" />
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#2D4D41] leading-relaxed font-medium mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-serif font-bold text-base flex items-center justify-center shrink-0 shadow-md`}>
                    {item.initial}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#0A2920]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#5C786C] font-semibold">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default TestimonialsSection;
