import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ShoppingBag, CheckCircle2, ChevronRight, Sparkle } from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';
import { useStore } from '../store/useStore';

interface CategoryShowcaseProps {
  category: 'Tea' | 'Spices' | 'Papad';
  sectionNumber: string;
  badgeText: string;
  heading: string;
  description: string;
  bgClass: string;
  imagePosition?: 'left' | 'right';
  headerPosition?: 'left' | 'right';
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  category,
  sectionNumber,
  badgeText,
  heading,
  description,
  bgClass,
  imagePosition = 'right',
  headerPosition = 'left'
}) => {
  const categoryProducts = PRODUCTS.filter((p) => p.category === category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(categoryProducts.length > 1);

  const selectedProduct: Product = categoryProducts[currentIndex] || categoryProducts[0];
  const { openQuickView } = useStore();

  // Product auto slide interval
  useEffect(() => {
    if (!isAutoPlaying || categoryProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categoryProducts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, categoryProducts.length]);

  const handleSelectProduct = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Details Column Component
  const DetailsContent = (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-5"
        >
          {/* Category Tag & Rating */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#0F382C] text-[#F3C649] text-xs font-black uppercase tracking-wider shadow-sm border border-[#D4A017]/40">
              {selectedProduct.brand} • {selectedProduct.category}
            </span>
            <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#D4A017]/40 px-3 py-1 rounded-full shadow-xs">
              <Star className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
              <span className="text-xs font-black text-[#0A2920]">{selectedProduct.rating}</span>
              <span className="text-xs text-[#8B6508] font-bold">({selectedProduct.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2920] leading-tight">
            {selectedProduct.name}
          </h3>

          {/* Product Description */}
          <p className="text-base sm:text-lg text-[#2D4D41] font-medium leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {selectedProduct.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F382C]">
                <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Wholesale Pricing & MOQ Box */}
          <div className="p-4.5 rounded-2xl bg-[#FFFFFF]/90 border border-[#D4A017]/40 shadow-sm flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-[#8B6508] uppercase tracking-wider">Wholesale Direct Rate</div>
              <div className="text-2xl font-black text-[#0A2920]">
                ₹{selectedProduct.wholesalePriceTier.basePricePerKg} <span className="text-xs font-normal text-[#666]">/ kg</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-[#8B6508] uppercase tracking-wider">Minimum Order</div>
              <div className="text-sm font-black text-[#0F382C]">{selectedProduct.wholesalePriceTier.moq} Bulk Pack</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`/products/${selectedProduct.id}`}
              className="px-7 py-3.5 rounded-2xl bg-[#0F382C] text-[#FAF6F0] font-black text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg flex items-center gap-2 border border-[#D4A017]/40"
            >
              <span>Explore Full Specs</span>
              <ArrowRight className="w-4 h-4 text-[#F3C649]" />
            </a>
            <button
              onClick={() => openQuickView(selectedProduct)}
              className="px-6 py-3.5 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4A017] text-[#0A2920] font-extrabold text-xs uppercase hover:bg-[#D4A017] transition-all flex items-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#0F382C]" />
              <span>Instant Wholesale Quote</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Product Switcher Pills */}
      {categoryProducts.length > 1 && (
        <div className="pt-4 border-t border-[#D4A017]/30 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-[#8B6508] uppercase tracking-wider mr-2">Switch {category}:</span>
          {categoryProducts.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => handleSelectProduct(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                currentIndex === idx
                  ? 'bg-[#0F382C] text-[#F3C649] shadow-md border border-[#D4A017]'
                  : 'bg-[#FFFFFF]/80 text-[#0A2920] hover:bg-[#D4A017]/30 border border-[#D4A017]/30'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Image Column Component
  const ImageContent = (
    <div className="relative flex items-center justify-center p-4">
      {/* Background Soft Glow Plate */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/20 via-[#F3C649]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct.id}
          initial={{ opacity: 0, scale: 0.85, rotate: imagePosition === 'left' ? -4 : 4 }}
          animate={
            category === 'Papad'
              ? { opacity: 1, scale: 1, rotate: 0, y: [0, -14, 0] }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          exit={{ opacity: 0, scale: 0.85, rotate: imagePosition === 'left' ? 4 : -4 }}
          transition={
            category === 'Papad'
              ? { y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }, duration: 0.5 }
              : { duration: 0.45, ease: 'easeOut' }
          }
          className="relative z-10 w-full flex items-center justify-center"
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="max-h-[380px] sm:max-h-[440px] w-auto object-contain filter drop-shadow-[0_22px_30px_rgba(0,0,0,0.22)] hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const isHeaderRight = headerPosition === 'right';

  return (
    <section 
      className={`py-20 sm:py-28 ${bgClass} border-b-2 border-[#D4A017]/35 relative overflow-hidden`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(categoryProducts.length > 1)}
    >
      {/* Background Ambient Light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4A017]/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0F382C]/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* SENIOR DEVELOPER TIER CATEGORY SECTION HEADER (STABLE, SMOOTH & ROCK-SOLID) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-[#D4A017]/30 pb-8 relative ${
            isHeaderRight ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
          }`}
        >
          <div className={`space-y-3.5 max-w-3xl relative ${isHeaderRight ? 'md:ml-auto' : ''}`}>
            
            {/* Number & Badge Header Row */}
            <div className={`flex items-center gap-3 ${isHeaderRight ? 'md:justify-end' : 'justify-start'}`}>
              {!isHeaderRight && (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F382C] via-[#164E3D] to-[#0A2920] text-[#F3C649] font-serif text-xl font-black flex items-center justify-center shadow-lg border-2 border-[#D4A017]/60">
                  {sectionNumber}
                </div>
              )}

              {/* Subtitle Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF]/90 border border-[#D4A017]/50 text-[#0A2920] text-xs font-black uppercase tracking-widest shadow-xs">
                <Sparkle className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>{badgeText}</span>
              </div>

              {isHeaderRight && (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F382C] via-[#164E3D] to-[#0A2920] text-[#F3C649] font-serif text-xl font-black flex items-center justify-center shadow-lg border-2 border-[#D4A017]/60">
                  {sectionNumber}
                </div>
              )}
            </div>

            {/* STABLE CLEAN GRADIENT HEADING (NO LAYOUT SHIFT GLITCHES) */}
            <h2 className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#0A2920] ${isHeaderRight ? 'md:text-right' : 'text-left'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2920] via-[#0F382C] to-[#1C4E3F]">
                {heading}
              </span>
            </h2>

            {/* Golden Divider Line */}
            <div className={`w-32 h-1.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F3C649] to-transparent shadow-xs ${isHeaderRight ? 'md:ml-auto' : ''}`}></div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#3E5C51] font-semibold leading-relaxed">
              {description}
            </p>

          </div>

          {/* Explore Button */}
          <a 
            href={`/products?category=${category}`}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#0F382C] to-[#164E3D] text-[#FAF6F0] text-xs font-black uppercase tracking-wider hover:scale-105 hover:shadow-xl hover:shadow-[#0F382C]/30 transition-all shrink-0 border border-[#D4A017]/50 shadow-md group"
          >
            <span>Explore All {category} Range</span>
            <ChevronRight className="w-4 h-4 text-[#F3C649] group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* SEAMLESS UN-BOXED CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-2">
          {imagePosition === 'left' ? (
            <>
              <div className="lg:col-span-5 order-2 lg:order-1">{ImageContent}</div>
              <div className="lg:col-span-7 order-1 lg:order-2">{DetailsContent}</div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7">{DetailsContent}</div>
              <div className="lg:col-span-5">{ImageContent}</div>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
