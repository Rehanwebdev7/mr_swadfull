import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Download, Sparkles, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PRODUCTS } from '../data/products';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

export const WholesaleCalculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [quantityKg, setQuantityKg] = useState(100);

  const { addToQuote } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  let discountPct = 0;
  if (quantityKg >= 500) discountPct = 18;
  else if (quantityKg >= 200) discountPct = 12;
  else if (quantityKg >= 50) discountPct = 7;

  const basePricePerKg = product.wholesalePriceTier.basePricePerKg;
  const rawTotal = basePricePerKg * quantityKg;
  const discountAmount = Math.round((rawTotal * discountPct) / 100);
  const finalTotal = rawTotal - discountAmount;
  const effectivePricePerKg = Math.round(finalTotal / quantityKg);

  const chartData = [
    { name: 'Standard Rate', price: rawTotal },
    { name: 'Wholesale Tier', price: finalTotal }
  ];

  const handleAdd = () => {
    addToQuote(product, quantityKg);
    toast.success(`Added ${quantityKg}kg of ${product.name} to B2B Quote!`);
  };

  return (
    <div className="glass-panel bg-brand-green-deep/95 border border-brand-gold/30 rounded-3xl p-6 sm:p-10 text-brand-cream shadow-2xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Controls Column */}
        <div className="flex-1 space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Interactive B2B Pricing Calculator
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream">
              Calculate Direct Wholesale Savings
            </h3>
            <p className="text-xs text-brand-cream/70 mt-1">
              Select any product and adjust volume quantity to preview factory discount tiers.
            </p>
          </div>

          {/* Product Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-gold">
              Select Product:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-charcoal border border-brand-gold/40 text-brand-cream text-sm font-semibold focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category}) — ₹{p.wholesalePriceTier.basePricePerKg}/kg
                </option>
              ))}
            </select>
          </div>

          {/* Volume Quantity Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="uppercase tracking-widest text-brand-gold">Order Volume:</span>
              <span className="text-brand-cream text-sm font-bold bg-brand-gold/20 px-3 py-1 rounded-full border border-brand-gold/40">
                {quantityKg} kg
              </span>
            </div>

            <input
              type="range"
              min="25"
              max="1000"
              step="25"
              value={quantityKg}
              onChange={(e) => setQuantityKg(Number(e.target.value))}
              className="w-full h-2.5 bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />

            <div className="flex justify-between text-[11px] text-brand-cream/60">
              <span>25 kg (MOQ)</span>
              <span>200 kg (12% OFF)</span>
              <span>500 kg+ (18% OFF)</span>
            </div>
          </div>

          {/* Tier Perks */}
          <div className="p-4 rounded-2xl bg-brand-charcoal/60 border border-brand-gold/20 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-brand-gold font-semibold">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Applied Volume Tier: {discountPct}% Discount</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-brand-cream/80 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Free Factory Packing
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> GST Tax Invoice Included
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Doorstep Logistics
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Fresh 100% Batch
              </div>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-charcoal font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span>Add {quantityKg}kg to B2B Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Visual Chart Column */}
        <div className="flex-1 bg-brand-charcoal/80 rounded-3xl p-6 border border-brand-gold/25 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">
              Savings Visualization
            </div>
            <div className="text-xs text-brand-cream/60">
              Comparing Standard Retail Value vs Direct Factory Tier Rate
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#FAF6F0" fontSize={11} tickLine={false} />
                <YAxis stroke="#FAF6F0" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A251D', borderColor: '#D4A017', borderRadius: '12px', color: '#FAF6F0' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                />
                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                  <Cell fill="#4F5E59" />
                  <Cell fill="#D4A017" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-4 rounded-2xl bg-brand-green-deep border border-brand-gold/30 space-y-2 text-xs">
            <div className="flex justify-between text-brand-cream/70">
              <span>Standard Base Rate (₹{basePricePerKg}/kg):</span>
              <span className="line-through">₹{rawTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-semibold">
              <span className="flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> Total Savings ({discountPct}%):
              </span>
              <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-brand-gold/20 flex justify-between items-center">
              <div>
                <div className="text-[10px] text-brand-cream/60">Effective Rate Per Kg</div>
                <div className="text-sm font-bold text-brand-gold">₹{effectivePricePerKg}/kg</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-brand-cream/60">Final Wholesale Quote</div>
                <div className="text-xl font-bold text-brand-gold">₹{finalTotal.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WholesaleCalculator;
