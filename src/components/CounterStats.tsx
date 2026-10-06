import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/products';

interface StatItem {
  id: number;
  label: string;
  baseValue: number;
  suffix: string;
  isDecimal?: boolean;
  variations: number[];
}

const STATS_DATA: StatItem[] = [
  {
    id: 0,
    label: "Years of Culinary Excellence",
    baseValue: 15,
    suffix: "+",
    variations: [15, 16, 15, 17, 15, 16]
  },
  {
    id: 1,
    label: "Satisfied Wholesale Partners",
    baseValue: 2500,
    suffix: "+",
    variations: [2500, 2512, 2528, 2506, 2535, 2518]
  },
  {
    id: 2,
    label: "Kilograms Processed Daily",
    baseValue: 10,
    suffix: " T+",
    isDecimal: true,
    variations: [10.0, 10.5, 10.8, 11.2, 10.4, 10.9]
  },
  {
    id: 3,
    label: "Quality Checks Per Batch",
    baseValue: 18,
    suffix: " Points",
    variations: [18, 19, 18, 20, 18, 19]
  }
];

export const CounterStats: React.FC = () => {
  const [currentValues, setCurrentValues] = useState<number[]>([15, 2500, 10, 18]);
  const [activePulseIndex, setActivePulseIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * STATS_DATA.length);
      const stat = STATS_DATA[randomIndex];
      const nextVal = stat.variations[Math.floor(Math.random() * stat.variations.length)];
      
      setActivePulseIndex(randomIndex);
      setCurrentValues(prev => {
        const copy = [...prev];
        copy[randomIndex] = nextVal;
        return copy;
      });

      setTimeout(() => {
        setActivePulseIndex(null);
      }, 1000);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
      {STATS_DATA.map((stat, i) => {
        const isPulsing = activePulseIndex === i;
        const displayVal = stat.isDecimal 
          ? currentValues[i].toFixed(1) 
          : Math.round(currentValues[i]).toLocaleString();

        return (
          <motion.div 
            key={stat.id} 
            whileHover={{ y: -4, scale: 1.02 }}
            className={`bg-[#FFFFFF] border-2 rounded-2xl p-4 text-center shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-center items-center ${
              isPulsing 
                ? 'border-[#D4A017] ring-2 ring-[#D4A017]/30 scale-102' 
                : 'border-[#D4A017]/30 hover:border-[#D4A017]'
            }`}
          >
            {/* Live Indicator Dot when updating */}
            {isPulsing && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A017]"></span>
              </span>
            )}

            {/* Dynamic Fluctuating Number */}
            <div className="font-serif text-2xl sm:text-3xl font-black text-[#D4A017]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayVal}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {displayVal}
                </motion.span>
              </AnimatePresence>
              <span className="text-[#B8860B] text-xl font-sans ml-0.5">{stat.suffix}</span>
            </div>

            {/* Label */}
            <div className="text-[11px] sm:text-xs font-black text-[#0A2920] uppercase tracking-wider mt-1 leading-tight">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CounterStats;
