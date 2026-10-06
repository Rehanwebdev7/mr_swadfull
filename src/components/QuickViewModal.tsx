import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, Check, ShoppingBag, Truck, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToQuote } = useStore();
  const [qtyKg, setQtyKg] = React.useState(25);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToQuote(quickViewProduct, qtyKg);
    toast.success(`Added ${qtyKg}kg of ${quickViewProduct.name} to Wholesale Quote!`);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative w-full max-w-3xl bg-brand-green-deep border border-brand-gold/40 rounded-3xl shadow-2xl overflow-hidden text-brand-cream z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-charcoal/60 text-brand-cream/80 hover:text-brand-gold transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-brand-charcoal to-brand-green-deep flex flex-col items-center justify-center relative">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="max-h-64 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest">
              {quickViewProduct.brand}
            </span>
            <span className="px-3 py-1 rounded-full bg-brand-cream/10 text-brand-cream text-xs font-bold">
              {quickViewProduct.category}
            </span>
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{quickViewProduct.rating} / 5.0</span>
              <span className="text-brand-cream/50">({quickViewProduct.reviewCount} reviews)</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-cream">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-brand-cream/70 mt-2">
              {quickViewProduct.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-gold">Key Highlights</div>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-brand-cream/90">
              {quickViewProduct.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="p-3.5 rounded-xl bg-brand-cream/5 border border-brand-gold/20 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-brand-cream/60">Origin:</span>
              <span className="font-semibold text-brand-gold">{quickViewProduct.specs.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-cream/60">Shelf Life:</span>
              <span className="font-semibold">{quickViewProduct.specs.shelfLife}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-cream/60">Pack Sizes:</span>
              <span className="font-semibold">{quickViewProduct.specs.packagingSizes.join(', ')}</span>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-brand-gold uppercase tracking-wider">Wholesale Quantity:</span>
              <span className="text-brand-cream">{qtyKg} kg</span>
            </div>
            <div className="flex items-center gap-2">
              {[25, 50, 100, 200].map((kg) => (
                <button
                  key={kg}
                  type="button"
                  onClick={() => setQtyKg(kg)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                    qtyKg === kg 
                      ? 'bg-brand-gold text-brand-charcoal border-brand-gold shadow' 
                      : 'bg-brand-cream/5 text-brand-cream border-brand-gold/30 hover:border-brand-gold'
                  }`}
                >
                  {kg}kg
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add */}
          <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-brand-cream/60">Estimated Total</div>
              <div className="text-xl font-bold text-brand-gold">
                ₹{(quickViewProduct.wholesalePriceTier.basePricePerKg * qtyKg).toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-charcoal font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Quote</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;
