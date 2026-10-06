import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, History } from 'lucide-react';

interface TimelineItem {
  number: string;
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

const TIMELINE_MILESTONES: TimelineItem[] = [
  {
    number: '#01',
    year: '2011',
    title: 'The First Blend',
    description: 'A small tea business begins in Dhule with one blend and a simple promise — freshness in every cup.',
    highlight: 'Tea Leaf Sourcing'
  },
  {
    number: '#02',
    year: '2013',
    title: 'Mr. CUP is Born',
    description: 'A value-focused blend for tea shops, canteens and daily kitchens launches under the Mr. CUP brand.',
    highlight: 'Commercial Range'
  },
  {
    number: '#03',
    year: '2015',
    title: 'Spice Range Launch',
    description: 'Requests from customers lead us to spices — turmeric, red chilli and coriander enter the range, sourced directly from producers.',
    highlight: 'Stone Milling'
  },
  {
    number: '#04',
    year: '2018',
    title: 'Traditional Urad Papad',
    description: 'We add small-batch, hand-made urad papad — the crisp companion to every Indian thali.',
    highlight: 'Dhule Recipe'
  }
];

export const BrandTimeline: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] border-b-2 border-[#D4A017]/35 relative overflow-hidden">
      
      {/* Background Subtle Leaf Watermark Pattern Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F382C] text-[#F3C649] text-xs font-black uppercase tracking-widest shadow-md">
            <History className="w-3.5 h-3.5 text-[#F3C649]" />
            <span>Our Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A2920] tracking-tight leading-[1.08]">
            From one blend to a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4A017] to-[#0A2920]">
              household name.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#3E5C51] font-semibold">
            Fifteen years of steady hands, authentic aromas, and steady flavour.
          </p>

          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mx-auto"></div>
        </div>

        {/* TIMELINE HORIZONTAL MILESTONE CARDS GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TIMELINE_MILESTONES.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.94 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 22px 35px -8px rgba(212, 160, 23, 0.28)"
              }}
              className="group relative bg-[#FFFFFF] border-2 border-[#D4A017]/35 hover:border-[#D4A017] rounded-3xl p-7 text-left shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Giant Semi-Transparent Year Background */}
              <div className="absolute -bottom-4 -right-2 font-serif text-7xl font-black text-[#D4A017]/10 group-hover:text-[#D4A017]/20 transition-colors pointer-events-none select-none">
                {item.year}
              </div>

              {/* Top Row: Year & Badge */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="font-serif text-3xl font-black text-[#D4A017] group-hover:scale-105 transition-transform">
                  {item.year}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4A017]/40 text-[#0F382C] text-xs font-black uppercase tracking-wider">
                  {item.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 relative z-10 mb-6">
                <h3 className="font-serif text-xl font-extrabold text-[#0A2920] group-hover:text-[#B8860B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A645A] font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Accent Bar */}
              <div className="w-12 h-1 bg-gradient-to-r from-[#D4A017] to-transparent rounded-full group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* FOOTER CTA BUTTON */}
        <div className="text-center pt-4">
          <a
            href="/heritage"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0F382C] text-[#FAF6F0] text-xs font-black uppercase tracking-wider hover:scale-105 hover:bg-[#D4A017] hover:text-[#0A2920] transition-all shadow-xl border border-[#D4A017]/50 group"
          >
            <span>See Full Timeline & Heritage Story</span>
            <ArrowRight className="w-4 h-4 text-[#F3C649] group-hover:text-[#0A2920] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default BrandTimeline;
