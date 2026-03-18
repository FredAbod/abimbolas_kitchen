"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Lock, Loader2, Info } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    dietary: "",
    instructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customerDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.line1,
              line2: formData.line2,
              city: formData.city,
              postcode: formData.postcode,
            },
          },
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/menu" className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest">
            <ArrowLeft size={14} />
            Back to Menu
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-serif font-bold text-white mb-12">Delivery & <span className="text-accent italic">Details</span></h1>
              
              <form onSubmit={handleCheckout} className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-white font-serif text-xl border-b border-white/5 pb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-white font-serif text-xl border-b border-white/5 pb-4">Delivery Address</h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Address Line 1</label>
                      <input required name="line1" value={formData.line1} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">City</label>
                        <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Postcode</label>
                        <input required name="postcode" value={formData.postcode} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-white font-serif text-xl border-b border-white/5 pb-4">Dietary Preferences</h3>
                  <textarea name="dietary" value={formData.dietary} onChange={handleChange} placeholder="Any allergies or special requirements?" rows={3} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                </div>

                <button 
                  disabled={loading || cart.length === 0}
                  className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-2xl"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                  Pay Securely via Stripe
                </button>
              </form>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5">
              <div className="bg-charcoal/50 border border-white/5 p-8 md:p-12 sticky top-40">
                <h3 className="text-white font-serif text-2xl mb-8">Order Summary</h3>
                
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between gap-4">
                      <div className="flex-grow">
                        <h4 className="text-white text-sm font-bold uppercase tracking-widest">{item.title}</h4>
                        <p className="text-white/40 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-white font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8 space-y-4 mb-8">
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Subtotal</span>
                    <span>£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Delivery Fee</span>
                    <span>£5.00</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-white font-bold">
                    <span className="text-xl">Total</span>
                    <span className="text-2xl text-accent font-serif">£{(cartTotal + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                  <Info size={16} className="text-accent flex-shrink-0" />
                  <p>Estimated delivery time: 45 - 60 minutes within London zones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
