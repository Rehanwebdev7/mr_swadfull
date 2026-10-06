import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { 
  Search, Coffee, Flame, UtensilsCrossed, Phone, Mail, 
  Moon, Sun, Calculator, Download, ExternalLink, ArrowRight 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS, COMPANY_INFO } from '../data/products';
import { toast } from 'sonner';

export const CommandMenu: React.FC = () => {
  const { 
    isCommandMenuOpen, 
    setCommandMenuOpen, 
    isDarkMode, 
    toggleDarkMode, 
    setQuoteDrawerOpen 
  } = useStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMenuOpen(!isCommandMenuOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isCommandMenuOpen, setCommandMenuOpen]);

  if (!isCommandMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setCommandMenuOpen(false)} 
      />

      <div className="relative w-full max-w-xl bg-brand-green-deep border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden text-brand-cream z-10">
        <Command label="Command Menu" className="w-full">
          <div className="flex items-center border-b border-brand-gold/20 px-4 py-3">
            <Search className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search products, wholesale pricing, or contact info..."
              className="w-full bg-transparent text-sm text-brand-cream placeholder-brand-cream/40 focus:outline-none"
            />
            <kbd className="px-2 py-0.5 text-[10px] font-bold rounded bg-brand-charcoal text-brand-gold border border-brand-gold/30">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-6 text-center text-xs text-brand-cream/60">
              No results found for your search.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group heading="QUICK ACTIONS" className="text-[10px] font-bold uppercase tracking-widest text-brand-gold px-2 py-1">
              <Command.Item
                onSelect={() => {
                  setCommandMenuOpen(false);
                  setQuoteDrawerOpen(true);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 cursor-pointer transition-colors text-sm font-medium"
              >
                <Calculator className="w-4 h-4 text-brand-gold" />
                <span className="flex-1">Open B2B Wholesale Quote Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold/60" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  toggleDarkMode();
                  setCommandMenuOpen(false);
                  toast.success(`Theme switched to ${!isDarkMode ? 'Dark' : 'Light'} mode`);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 cursor-pointer transition-colors text-sm font-medium"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-gold" />}
                <span className="flex-1">Toggle Theme ({isDarkMode ? 'Light' : 'Dark'})</span>
              </Command.Item>
            </Command.Group>

            {/* Products */}
            <Command.Group heading="CATALOGUE PRODUCTS" className="text-[10px] font-bold uppercase tracking-widest text-brand-gold px-2 py-1">
              {PRODUCTS.map((prod) => (
                <Command.Item
                  key={prod.id}
                  onSelect={() => {
                    setCommandMenuOpen(false);
                    window.location.href = `/products/${prod.id}`;
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 cursor-pointer transition-colors"
                >
                  <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-brand-cream truncate">{prod.name}</div>
                    <div className="text-xs text-brand-cream/60 truncate">{prod.short}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-gold/20 text-brand-gold">
                    {prod.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Direct Contact */}
            <Command.Group heading="FACTORY CONTACT" className="text-[10px] font-bold uppercase tracking-widest text-brand-gold px-2 py-1">
              <Command.Item
                onSelect={() => {
                  window.location.href = `tel:${COMPANY_INFO.contact.phonePrimary}`;
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 cursor-pointer transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Sales ({COMPANY_INFO.contact.phonePrimary})</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-brand-gold/20 px-4 py-2 flex items-center justify-between text-[11px] text-brand-cream/50">
            <span>Navigation: ↑↓ Navigate | Enter Select</span>
            <span>Mr. Swadful Foods ⌘K</span>
          </div>
        </Command>
      </div>
    </div>
  );
};

export default CommandMenu;
