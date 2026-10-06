import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Plus, Check } from 'lucide-react';
import type { Product } from '../data/products';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToQuote, setQuickViewProduct } = useStore();
  const [added, setAdded] = React.useState(false);

  const handleAddQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQuote(product, 25);
    setAdded(true);
    toast.success(`Added 25kg of ${product.name} to Wholesale Quote!`);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl bg-[#FFFFFF] border-2 border-[#D4A017]/30 hover:border-[#D4A017] shadow-xl hover:shadow-2xl hover:shadow-[#0F382C]/15 transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/10 rounded-full blur-2xl group-hover:bg-[#D4A017]/25 transition-all duration-500 pointer-events-none" />

      {/* Card Content */}
      <div className="p-6 space-y-4">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-[#0F382C] text-[#F3C649] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            {product.category}
          </span>

          <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[#647870] text-[10px] font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Image Container */}
        <div 
          onClick={() => (window.location.href = `/products/${product.id}`)}
          className="relative h-52 w-full flex items-center justify-center p-4 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#F8F4EE] to-[#EFE7DC] border border-[#D4A017]/20"
        >
          <img
            src={product.image}
            alt={product.name}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            className="max-h-48 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
          />

          {product.isBestseller && (
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#C82333] text-white text-[10px] font-black uppercase tracking-widest shadow">
              ★ Bestseller
            </div>
          )}

          {/* Quick View Button overlay */}
          <div className="absolute inset-0 bg-[#0A2920]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#0A2920] font-extrabold text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4 text-[#0F382C]" />
              <span>Quick Details</span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="text-[10px] font-extrabold text-[#B8860B] uppercase tracking-widest">
            {product.brand}
          </div>
          <h3 
            onClick={() => (window.location.href = `/products/${product.id}`)}
            className="font-serif text-lg font-bold text-[#0A2920] group-hover:text-[#D4A017] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#3E5C51] line-clamp-2 mt-1 font-medium">
            {product.short}
          </p>
        </div>

        {/* Flavor Profile Indicators */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#0F382C]/10 text-[11px] text-[#4A645A]">
          <div>
            <span className="font-bold text-[#0A2920]">Strength:</span> {product.flavorProfile.strength}/10
          </div>
          <div>
            <span className="font-bold text-[#0A2920]">Aroma:</span> {product.flavorProfile.aroma}/10
          </div>
        </div>
      </div>

      {/* Card Footer Pricing & B2B Action */}
      <div className="p-6 pt-0 border-t border-[#0F382C]/10 mt-2 flex items-center justify-between gap-3 bg-[#FCFAF7] py-4">
        <div>
          <div className="text-[10px] text-[#647870] font-medium">Wholesale Rate</div>
          <div className="text-lg font-extrabold text-[#0A2920]">
            ₹{product.wholesalePriceTier.basePricePerKg} <span className="text-xs text-[#647870] font-normal">/ kg</span>
          </div>
        </div>

        <button
          onClick={handleAddQuote}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-md ${
            added 
              ? 'bg-emerald-700 text-white' 
              : 'bg-gradient-to-r from-[#D4A017] to-[#F3C649] text-[#0A2920] hover:scale-105 shadow-[#D4A017]/30 border border-[#B8860B]/40'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add 25kg Quote</span>
            </>
          )}
        </button>
      </div>

    </motion.div>
  );
};

export default ProductCard;
