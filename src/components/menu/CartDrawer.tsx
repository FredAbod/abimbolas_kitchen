"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-secondary z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3 text-white">
                <ShoppingBag size={24} className="text-accent" />
                <h2 className="text-xl font-serif font-bold">Your Selection</h2>
                <span className="text-xs text-white/40 tracking-widest">{cart.length} ITEMS</span>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                    <ShoppingBag size={40} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-serif text-xl">Your cart is empty</p>
                    <p className="text-white/40 text-sm">Start exploring Abimbola&apos;s kitchen and add some magic to your plate.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-charcoal flex-shrink-0 overflow-hidden">
                      <img 
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop'} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-serif font-bold">{item.title}</h4>
                        <button 
                          onClick={() => removeFromCart(item._id!)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">{item.category}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60 flex items-center gap-3">
                          <span className="text-xs">Qty:</span> {item.quantity}
                        </span>
                        <span className="text-accent font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-6 bg-charcoal/30">
                <div className="space-y-3">
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>Subtotal</span>
                    <span>£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>Delivery Fee</span>
                    <span>£5.00</span>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between text-white font-bold items-baseline">
                    <span className="text-base uppercase tracking-widest font-sans">Total</span>
                    <span className="text-xl text-accent">£{(cartTotal + 5).toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 group shadow-2xl hover:bg-primary/90 transition-all"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-[9px] text-center text-white/20 uppercase tracking-[0.3em]">
                  Secure payment via Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
