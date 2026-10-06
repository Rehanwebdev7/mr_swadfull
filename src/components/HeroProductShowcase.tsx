import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';
import { useStore } from '../store/useStore';

// Featured flagship products for slider
const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.isBestseller || p.rating >= 4.9).slice(0, 5);

export const HeroProductShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { openQuickView, addToQuote } = useStore();

  const currentProduct: Product = FEATURED_PRODUCTS[currentIndex];

  // Auto slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
  };

  return (
    <section 
      className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF6F0] via-[#F5EFE6] to-[#FAF6F0] relative overflow-hidden border-b border-[#D4A017]/30"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative Golden Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#0F382C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F382C] text-[#F3C649] text-xs font-black uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F3C649]" />
            <span>Interactive Product Showcase</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-5xl font-black text-[#0A2920] tracking-tight">
            Flagship Taste & Pure Spices
          </h2>
          <p class="text-sm sm:text-base text-[#3E5C51] font-medium">
            Explore our signature Assam CTC teas, stone-ground pure spices, and handcrafted urad papad.
          </p>
        </div>

        {/* MAIN SHOWCASE CONTAINER: LEFT DETAILS + RIGHT IMAGE */}
        <div className="bg-[#FFFFFF] border-2 border-[#D4A017]/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT SIDE: PRODUCT DETAILS (COL 7) */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Category Pill & Rating */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#0F382C] text-[#F3C649] text-xs font-black uppercase tracking-widest">
                      {currentProduct.category} • {currentProduct.brand}
                    </span>
                    <div className="flex items-center gap-1.5 bg-[#FFFBF0] border border-[#D4A017]/40 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
                      <span className="text-xs font-black text-[#0A2920]">{currentProduct.rating}</span>
                      <span className="text-xs text-[#8B6508] font-bold">({currentProduct.reviewCount} Reviews)</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2920] leading-tight">
                    {currentProduct.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-base sm:text-lg text-[#2D4D41] font-medium leading-relaxed">
                    {currentProduct.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-2">
                    {currentProduct.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-[#0F382C]">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & MOQ Tier */}
                  <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#D4A017]/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#8B6508] uppercase tracking-wider">Wholesale Direct Rate</div>
                      <div className="text-2xl font-black text-[#0A2920]">
                        ₹{currentProduct.wholesalePriceTier.basePricePerKg}
                        <span className="text-xs font-bold text-[#555] font-normal"> / kg</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#8B6508] uppercase tracking-wider">Minimum Order</div>
                      <div className="text-sm font-black text-[#0F382C]">
                        {currentProduct.wholesalePriceTier.moq} Bulk Pack
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={`/products/${currentProduct.id}`}
                      className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0F382C] to-[#164E3D] text-[#FAF6F0] font-black text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-xl hover:shadow-[#0F382C]/40 flex items-center gap-2 border border-[#D4A017]/50"
                    >
                      <span>Explore Full Details</span>
                      <ArrowRight className="w-4 h-4 text-[#F3C649]" />
                    </a>

                    <button
                      onClick={() => openQuickView(currentProduct)}
                      className="px-6 py-3.5 rounded-2xl bg-[#FFFBF0] border-2 border-[#D4A017] text-[#0A2920] font-extrabold text-sm uppercase tracking-wider hover:bg-[#D4A017] hover:text-[#0A2920] transition-all flex items-center gap-2 shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Quick Quote</span>
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE: PRODUCT PACKAGING IMAGE (COL 5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              
              {/* Product Card Backdrop Plate */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF8E7] via-[#FFF3D6] to-[#FAF5EC] rounded-3xl border border-[#D4A017]/30 transform rotate-2 scale-95 shadow-inner pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative z-10 p-6 sm:p-8 w-full flex items-center justify-center"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-[380px] w-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* SLIDER CONTROLS: PREV/NEXT ARROWS & INDICATORS */}
          <div className="mt-8 pt-6 border-t border-[#D4A017]/30 flex items-center justify-between">
            
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {FEATURED_PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'w-8 bg-[#0F382C]' 
                      : 'w-3 bg-[#D4A017]/40 hover:bg-[#D4A017]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#D4A017]/50 text-[#0A2920] hover:bg-[#0F382C] hover:text-[#F3C649] transition-all shadow-md active:scale-95"
                aria-label="Previous Product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#D4A017]/50 text-[#0A2920] hover:bg-[#0F382C] hover:text-[#F3C649] transition-all shadow-md active:scale-95"
                aria-label="Next Product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroProductShowcase;
