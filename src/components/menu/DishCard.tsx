"use client";

import React, { useState } from "react";
import { Plus, Info, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { IProduct } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

interface DishCardProps {
  product: IProduct;
}
const DishCard = ({ product }: DishCardProps) => {
  const { addToCart } = useCart();
  const [isQuickView, setIsQuickView] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => setIsQuickView(true)}
        className="bg-secondary/40 border border-white/5 overflow-hidden flex flex-col group cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden bg-charcoal">
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop'} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-accent text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-10">
              Featured
            </span>
          )}
          
          <div className="absolute inset-0 bg-secondary/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleAddToCart}
              className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-xl"
              title="Add to Cart"
            >
              <Plus size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsQuickView(true); }}
              className="p-3 bg-white text-secondary rounded-full hover:bg-accent transition-colors shadow-xl"
              title="Quick View"
            >
              <Info size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-white font-bold">£{product.price.toFixed(2)}</span>
          </div>
          
          <h4 className="text-lg font-serif text-white mb-2 group-hover:text-accent transition-colors">
            {product.title}
          </h4>
          
          <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto pt-6 flex flex-wrap gap-2">
            {product.allergens && product.allergens.slice(0, 2).map((allergen) => (
              <span key={allergen} className="text-[9px] uppercase tracking-tighter text-white/30 border border-white/10 px-2 py-0.5">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickView(false)}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-secondary w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-[110] border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                 onClick={() => setIsQuickView(false)}
                 className="absolute top-6 right-6 text-white/40 hover:text-white z-20"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop'} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col">
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                  {product.category}
                </span>
                <h2 className="text-4xl font-serif font-bold text-white mb-4">{product.title}</h2>
                <p className="text-accent text-2xl font-bold mb-8">£{product.price.toFixed(2)}</p>
                
                <div className="space-y-6 text-white/60 leading-relaxed mb-12">
                   <p>{product.description}</p>
                   {product.servingSize && (
                     <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Serving Size: {product.servingSize}</p>
                   )}
                </div>

                <div className="mt-auto space-y-6">
                   <div className="flex gap-4">
                      <button 
                        onClick={(e) => { handleAddToCart(e); setIsQuickView(false); }}
                        className="flex-grow py-5 bg-primary text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                      >
                        <Plus size={16} />
                        Add to Selection
                      </button>
                   </div>
                   
                   <div className="pt-8 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-4">Allergens</p>
                      <div className="flex flex-wrap gap-2">
                         {product.allergens?.map(a => (
                           <span key={a} className="px-3 py-1 border border-white/10 text-white/40 text-[10px] uppercase tracking-tighter">
                             {a}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DishCard;
