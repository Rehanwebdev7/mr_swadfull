import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { 
  ShoppingBag, Trash2, Plus, Minus, Send, Phone, 
  CheckCircle, Sparkles, AlertCircle, ArrowRight, ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useStore } from '../store/useStore';
import { COMPANY_INFO } from '../data/products';

export const QuoteDrawer: React.FC = () => {
  const { isQuoteDrawerOpen, setQuoteDrawerOpen, quoteItems, updateQuoteQty, removeFromQuote, clearQuote } = useStore();

  const [businessName, setBusinessName] = useState('');
  const [personName, setPersonName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalKg = quoteItems.reduce((acc, i) => acc + i.quantityKg, 0);

  // Calculate Subtotal & Discount
  const rawSubtotal = quoteItems.reduce((acc, item) => {
    return acc + (item.product.wholesalePriceTier.basePricePerKg * item.quantityKg);
  }, 0);

  let discountPct = 0;
  if (totalKg >= 200) discountPct = 12;
  else if (totalKg >= 50) discountPct = 7;

  const discountAmount = Math.round((rawSubtotal * discountPct) / 100);
  const finalEstimate = rawSubtotal - discountAmount;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName || !phone || !city) {
      toast.error('Please enter Name, Phone Number & City');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    toast.success('Wholesale quote request generated successfully!');

    // Prepare WhatsApp Message
    const itemsText = quoteItems
      .map((i) => `• ${i.product.name}: ${i.quantityKg} kg`)
      .join('%0A');

    const message = `Hello Mr. Swadful Team,%0A%0AI would like to place a B2B Wholesale Quote Request:%0A%0A*Business Name:* ${businessName || 'N/A'}%0A*Contact Person:* ${personName}%0A*Phone:* ${phone}%0A*Delivery City:* ${city}%0A%0A*Requested Items:*%0A${itemsText}%0A%0A*Total Weight:* ${totalKg} kg%0A*Estimated Amount:* ₹${finalEstimate.toLocaleString('en-IN')}%0A%0APlease confirm availability and dispatch terms.`;

    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${message}`, '_blank');
    }, 800);
  };

  return (
    <Drawer.Root open={isQuoteDrawerOpen} onOpenChange={setQuoteDrawerOpen} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-brand-green-deep text-brand-cream border-l border-brand-gold/30 shadow-2xl flex flex-col focus:outline-none">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between bg-brand-charcoal/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-cream">B2B Wholesale Quote</h3>
                <p className="text-xs text-brand-cream/60">Factory Direct Bulk Supply • Maharashtra</p>
              </div>
            </div>

            <button
              onClick={() => setQuoteDrawerOpen(false)}
              className="p-2 rounded-xl bg-brand-cream/10 text-brand-cream/80 hover:text-brand-gold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {quoteItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-cream">Your Quote Cart is Empty</h4>
                <p className="text-xs text-brand-cream/60 max-w-xs mx-auto">
                  Browse our tea, spices, and papad products and click "Add to Bulk Quote" to build your custom wholesale order.
                </p>
                <a
                  href="/products"
                  onClick={() => setQuoteDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-charcoal font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand-gold">
                    <span>Selected Items ({quoteItems.length})</span>
                    <button onClick={clearQuote} className="text-brand-red hover:underline flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  </div>

                  {quoteItems.map((item) => (
                    <div key={item.product.id} className="p-3.5 rounded-xl bg-brand-cream/5 border border-brand-gold/20 flex items-center justify-between gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain bg-white/10 rounded-lg p-1" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-brand-cream truncate">{item.product.name}</div>
                        <div className="text-xs text-brand-gold font-medium">₹{item.product.wholesalePriceTier.basePricePerKg}/kg base</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-brand-charcoal/80 rounded-lg p-1 border border-brand-gold/30">
                        <button
                          onClick={() => updateQuoteQty(item.product.id, item.quantityKg - 5)}
                          className="w-6 h-6 rounded flex items-center justify-center text-brand-cream hover:text-brand-gold hover:bg-brand-cream/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-brand-gold min-w-[32px] text-center">
                          {item.quantityKg}kg
                        </span>
                        <button
                          onClick={() => updateQuoteQty(item.product.id, item.quantityKg + 5)}
                          className="w-6 h-6 rounded flex items-center justify-center text-brand-cream hover:text-brand-gold hover:bg-brand-cream/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromQuote(item.product.id)}
                        className="text-brand-cream/40 hover:text-brand-red transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tier Discount Meter */}
                <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-xs space-y-2">
                  <div className="flex items-center justify-between text-brand-gold font-bold">
                    <span>Bulk Tier Discount:</span>
                    <span>{discountPct > 0 ? `${discountPct}% OFF Applied!` : 'Order 50kg+ for 7% OFF'}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-brand-charcoal overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-light transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalKg / 200) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-brand-cream/60">
                    <span>Total: {totalKg} kg</span>
                    <span>50kg Tier (7%)</span>
                    <span>200kg Tier (12%)</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-xl bg-brand-charcoal/60 border border-brand-gold/20 space-y-2 text-xs">
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Base Wholesale Subtotal:</span>
                    <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-gold font-semibold">
                      <span>Volume Discount ({discountPct}%):</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-brand-gold/20 flex justify-between text-sm font-bold text-brand-cream">
                    <span>Estimated Total:</span>
                    <span className="text-brand-gold text-base">₹{finalEstimate.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Inquiry Form */}
                <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                    Submit Inquiry Details
                  </div>

                  <input
                    type="text"
                    placeholder="Business / Shop Name (Optional)"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/5 border border-brand-gold/30 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-gold"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Contact Person *"
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/5 border border-brand-gold/30 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-gold"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/5 border border-brand-gold/30 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Delivery City / Town (Maharashtra) *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/5 border border-brand-gold/30 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-gold"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-charcoal font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-brand-gold/20 bg-brand-charcoal/80 text-[11px] text-brand-cream/60 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Factory Direct Dispatch
            </span>
            <span>Dhule, MH</span>
          </div>

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default QuoteDrawer;
