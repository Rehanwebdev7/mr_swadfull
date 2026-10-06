import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Home, ChevronRight as BreadcrumbArrow } from 'lucide-react';

export interface SlideItem {
  image: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroSliderProps {
  badgeText?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  slides?: SlideItem[];
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  heightClass?: string;
}

const defaultSlides: SlideItem[] = [
  {
    image: '/assets/tea_harvest_hero.png',
    badge: 'ESTATE DIRECT TEAS',
    title: 'Assam & Nilgiri Chai Blends',
    subtitle: 'Hand-picked CTC granules & aromatic tea leaves for rich morning kadak chai.'
  },
  {
    image: '/assets/spices_field_hero.png',
    badge: 'COLD-GROUND PURITY',
    title: '100% Pure Indian Spices',
    subtitle: 'High-curcumin turmeric, rich red chilli powder, coriander & green elaichi.'
  },
  {
    image: '/assets/papad_tradition_hero.png',
    badge: 'DHULE HERITAGE RECIPE',
    title: 'Handcrafted Crisp Urad Papad',
    subtitle: 'Hand-rolled urad dal papad infused with Sajji khar, hing & crushed black pepper.'
  }
];

export const PageHeroSlider: React.FC<PageHeroSliderProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  slides = defaultSlides,
  breadcrumbs = [],
  actions,
  children,
  heightClass = "min-h-[460px] sm:min-h-[520px]"
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-play interval (every 5 seconds)
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden text-white border-b-2 border-[#D4A017]/40 bg-[#0A2920]`}>
      
      {/* Background Image Slider with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title || title}
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Luxury Gradient Overlay (Zero Tint, Ultra High Contrast) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/85 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-10 pointer-events-none" />

      {/* Slide Navigation Controls (Left / Right Floating Buttons) */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A017]/40 text-white hover:bg-[#D4A017] hover:text-[#0A2920] hover:scale-110 transition-all flex items-center justify-center shadow-2xl focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A017]/40 text-white hover:bg-[#D4A017] hover:text-[#0A2920] hover:scale-110 transition-all flex items-center justify-center shadow-2xl focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-20 w-full text-center">
        
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F3C649]/90 mb-5">
            <a href="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                <BreadcrumbArrow className="w-3 h-3 text-[#D4A017]/60" />
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Top Badge Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-black/60 border border-[#D4A017] text-[#F3C649] text-xs font-black uppercase tracking-widest shadow-2xl backdrop-blur-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3C649]" />
          <span>{badgeText || currentSlide.badge || 'MR. SWADFUL FOODS'}</span>
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto drop-shadow-2xl mb-4"
        >
          {title}{' '}
          {highlightText && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3C649] via-[#D4A017] to-[#FFF0C2]">
              {highlightText}
            </span>
          )}
        </motion.h1>

        {/* Dynamic Subtitle */}
        {(subtitle || currentSlide.subtitle) && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-lg text-[#F3F4F6] max-w-2xl mx-auto font-medium leading-relaxed drop-shadow mb-6"
          >
            {subtitle || currentSlide.subtitle}
          </motion.p>
        )}

        {/* Optional Actions / CTAs */}
        {actions && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            {actions}
          </motion.div>
        )}

        {/* Extra Header Content (e.g. Category Filter Tabs) */}
        {children && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="pt-6"
          >
            {children}
          </motion.div>
        )}

        {/* Bottom Slide Dots Indicator */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlideIndex === idx
                    ? 'w-8 h-2.5 bg-[#F3C649]'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PageHeroSlider;
