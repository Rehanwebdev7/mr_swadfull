import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Search, Moon, Sun, ShoppingBag, 
  Menu as MenuIcon, X, ChevronDown, Sparkles, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS, COMPANY_INFO } from '../data/products';

export const Header: React.FC<{ currentPath?: string }> = ({ currentPath = '/' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { isDarkMode, toggleDarkMode, setCommandMenuOpen, toggleCommandMenu, setQuoteDrawerOpen, quoteItems } = useStore();

  const totalQuoteCount = quoteItems.reduce((acc, item) => acc + item.quantityKg, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { 
      label: 'Products', 
      path: '/products',
      dropdown: [
        {
          title: 'Categories',
          items: [
            { label: 'Tea Blends & CTC', href: '/products?category=Tea', desc: 'Assam, Nilgiri & Dust Chai' },
            { label: 'Fresh Spices', href: '/products?category=Spices', desc: 'Cold-ground Turmeric, Chilli & Elaichi' },
            { label: 'Urad Papad', href: '/products?category=Papad', desc: 'Handcrafted crisp spicy papad' }
          ]
        },
        {
          title: 'Bestsellers',
          items: PRODUCTS.slice(0, 3).map((p) => ({
            label: p.name,
            href: `/products/${p.id}`,
            desc: p.short
          }))
        }
      ]
    },
    { 
      label: 'Company', 
      path: '/about',
      dropdown: [
        {
          title: 'Our Heritage',
          items: [
            { label: 'About Us', href: '/about', desc: 'Story of Mr. Swadful Foods' },
            { label: 'Heritage & Legacy', href: '/heritage', desc: 'Crafting quality since 2011' },
            { label: 'Quality Assurance', href: '/quality', desc: '18-point FSSAI certified standards' }
          ]
        },
        {
          title: 'B2B & Partners',
          items: [
            { label: 'Wholesale Hub', href: '/wholesale', desc: 'Bulk discount calculator & inquiry' },
            { label: 'Contact & Support', href: '/contact', desc: 'Dhule factory & sales team' }
          ]
        }
      ]
    },
    { label: 'Wholesale', path: '/wholesale' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner - Bright Pearl Gold */}
      <div className="bg-[#FAF5EC] text-[#0A2920] text-xs py-2 px-4 border-b border-[#D4A017]/30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0F382C] text-[#F3C649] uppercase tracking-wider shadow-sm">
              Free Delivery
            </span>
            <span className="hidden sm:inline text-[#2D4D41]">
              On wholesale orders across Maharashtra | Factory Direct Wholesale Rates
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#0A2920]">
            <a 
              href={`tel:${COMPANY_INFO.contact.phonePrimary}`} 
              className="flex items-center gap-1.5 hover:text-[#D4A017] transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>{COMPANY_INFO.contact.phonePrimary}</span>
            </a>
            <span className="hidden md:inline text-[#D4A017]">◆</span>
            <span className="hidden md:inline text-[#3E5C51] font-semibold">Dhule, Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar - BRIGHT WHITE LUXURY */}
      <nav 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#FFFFFF]/95 backdrop-blur-xl shadow-xl py-3 border-b border-[#D4A017]/40' 
            : 'bg-[#FFFFFF] py-4 border-b border-[#D4A017]/30 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="/" className="flex items-center group shrink-0 py-1">
            <div className="relative flex items-center">
              <img 
                src="/assets/LOGO.webp" 
                alt="Mr. Swadful Foods" 
                width="180"
                height="64"
                loading="eager"
                fetchPriority="high"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              const hasDropdown = Boolean(link.dropdown);

              return (
                <div 
                  key={link.label} 
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <a
                    href={link.path}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-extrabold tracking-wide uppercase transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#0F382C] text-[#F3C649] border border-[#D4A017]/50 shadow-md' 
                        : 'text-[#0A2920] hover:text-[#D4A017] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.label ? 'rotate-180 text-[#D4A017]' : ''
                        }`} 
                      />
                    )}
                  </a>

                  {/* Mega Menu Dropdown - HIGH CONTRAST PURE WHITE CONTAINER */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-2 w-[480px] z-50"
                      >
                        <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-2xl border-2 border-[#D4A017]/60 text-[#0A2920]">
                          <div className="grid grid-cols-2 gap-6">
                            {link.dropdown?.map((col) => (
                              <div key={col.title}>
                                <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F382C] mb-3 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                                  <span>{col.title}</span>
                                </div>
                                <div className="space-y-2">
                                  {col.items.map((item) => (
                                    <a
                                      key={item.label}
                                      href={item.href}
                                      className="block p-2.5 rounded-xl hover:bg-[#FAF5EC] border border-transparent hover:border-[#D4A017]/30 transition-all group"
                                    >
                                      <div className="text-sm font-extrabold text-[#0A2920] group-hover:text-[#D4A017] transition-colors flex items-center justify-between">
                                        <span>{item.label}</span>
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#D4A017]" />
                                      </div>
                                      {item.desc && (
                                        <div className="text-xs text-[#4A645A] mt-0.5 font-medium">
                                          {item.desc}
                                        </div>
                                      )}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#D4A017]/30 flex items-center justify-between text-xs text-[#0A2920] bg-[#FAF5EC] px-4 py-2.5 rounded-xl font-bold">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
                              FSSAI Certified Direct Supplies
                            </span>
                            <a href="/wholesale" className="text-[#0F382C] font-extrabold hover:underline">
                              Get B2B Rate Card →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search ⌘K */}
            <button
              onClick={toggleCommandMenu}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF5EC] border border-[#D4A017]/40 text-[#0A2920] hover:bg-[#D4A017]/20 hover:border-[#D4A017] transition-all text-xs font-bold shadow-xs"
              title="Search products (⌘K)"
            >
              <Search className="w-4 h-4 text-[#0F382C]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-black rounded bg-[#0F382C] text-[#F3C649]">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-[#FAF5EC] border border-[#D4A017]/40 text-[#0F382C] hover:bg-[#D4A017]/20 transition-all shadow-xs"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#D4A017]" /> : <Moon className="w-4 h-4 text-[#0F382C]" />}
            </button>

            {/* Quote / Bulk Cart Drawer Trigger */}
            <button
              onClick={() => setQuoteDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F3C649] text-[#0A2920] font-black text-xs shadow-lg hover:shadow-[#D4A017]/40 transition-all hover:scale-105 border border-[#B8860B]/40"
            >
              <ShoppingBag className="w-4 h-4 text-[#0A2920]" />
              <span className="hidden sm:inline uppercase tracking-wider">B2B Quote</span>
              {totalQuoteCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C82333] text-white text-[11px] font-black shadow">
                  {totalQuoteCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#FAF5EC] text-[#0A2920] hover:bg-[#D4A017]/20 transition-colors border border-[#D4A017]/40"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F382C]" /> : <MenuIcon className="w-6 h-6 text-[#0F382C]" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FFFFFF] border-b-2 border-[#D4A017]/40 text-[#0A2920] overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-[#0F382C]/10 pb-2">
                  <a
                    href={link.path}
                    className="block text-base font-extrabold uppercase tracking-wider text-[#0F382C] hover:text-[#D4A017] py-1"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <div className="mt-2 pl-4 space-y-1">
                      {link.dropdown.flatMap((c) => c.items).map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block text-xs font-bold text-[#3E5C51] hover:text-[#D4A017] py-1"
                        >
                          • {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY_INFO.contact.phonePrimary}`}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0F382C] text-[#F3C649] font-extrabold text-sm shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Call Wholesale Support ({COMPANY_INFO.contact.phonePrimary})
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
