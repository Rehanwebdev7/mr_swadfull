import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Where are your teas and spices sourced from?",
    answer: "We source tea leaves directly from prime tea gardens in Assam and Nilgiri. Spices are procured directly from trusted farmers in Maharashtra and southern spice belts to ensure maximum freshness, authentic aroma, and purity without middlemen."
  },
  {
    question: "Are your products preservative-free?",
    answer: "Yes, 100%! We do not add synthetic colors, artificial flavor enhancers, chemical preservatives, or fillers to any of our tea blends, cold-ground spices, or handcrafted urad papad."
  },
  {
    question: "Do you supply to retailers and tea shops?",
    answer: "Absolutely! We specialize in bulk commercial packs under our flagship Mr. CUP brand and offer factory-direct wholesale pricing to tea stalls, hotels, caterers, and grocery retailers across Maharashtra."
  },
  {
    question: "How do I become a distributor?",
    answer: "You can submit a inquiry via our Wholesale Hub page or connect directly with our sales team on WhatsApp at +91 99756 09708. We offer exclusive district-level distributorship perks, marketing collateral, and margin support."
  },
  {
    question: "How should I store the spices for best flavour?",
    answer: "Store spices in airtight glass or stainless steel containers away from direct sunlight, stove heat, and moisture. This locks in natural essential oils (capsaicin in red chilli & curcumin in turmeric) for up to 12 months."
  },
  {
    question: "Do you ship outside Maharashtra?",
    answer: "Yes, we dispatch wholesale bulk consignments and retail sample boxes across India through fast transport and courier partners with complete tracking support."
  }
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#F5EFE6] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#0A2920] text-xs font-black uppercase tracking-widest shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>COMMON QUESTIONS</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0A2920] tracking-tight"
          >
            Everything you might want to ask
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-[#2D4D41] font-medium max-w-xl mx-auto"
          >
            Sourcing, preservatives, distribution — the answers to what most people write to us about.
          </motion.p>

          {/* Accent Gold Separator */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4A017]" />
            <div className="w-2 h-2 rotate-45 bg-[#D4A017]" />
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4A017]" />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#D4A017]/30 shadow-xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={faq.question}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? 'border-[#D4A017] bg-[#FAF6F0]/60 shadow-md' 
                    : 'border-gray-100 hover:border-[#D4A017]/40 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#0A2920] hover:text-[#D4A017] transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isOpen ? 'bg-[#D4A017] text-[#0A2920] rotate-180' : 'bg-gray-100 text-[#0A2920]'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-[#2D4D41] leading-relaxed font-medium border-t border-[#D4A017]/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqAccordion;
