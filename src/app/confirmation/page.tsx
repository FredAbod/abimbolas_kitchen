"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, MapPin, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const ConfirmationContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("No order ID found in the URL.");
        }

        const res = await fetch(`/api/orders?id=${orderId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("We couldn't verify your order yet. Please check your email for confirmation details.");
        }

        // In future we can use the response to show full order details
        clearCart();
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong while confirming your order.");
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [clearCart]);

  return (
    <section className="pt-48 pb-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 text-accent mb-4">
            <CheckCircle2 size={48} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
            Order <span className="text-accent italic">Confirmed.</span>
          </h1>
          
          <p className="text-white/60 text-lg">
            Thank you for choosing Abimbola&apos;s Kitchen. Your culinary journey has begun, and our chefs are already preparing your feast.
          </p>

          <div className="bg-charcoal/50 border border-white/5 p-8 md:p-12 text-left space-y-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest opacity-20">Order #{orderId?.slice(-6).toUpperCase()}</span>
             </div>

             {error && (
               <div className="mb-6 rounded-md border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-200">
                 {error}
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                 <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                   <Clock size={16} />
                   Estimated Time
                 </div>
                 <p className="text-white text-xl font-serif">45 - 60 Minutes</p>
               </div>
               
               <div className="space-y-4">
                 <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                   <MapPin size={16} />
                   Fulfillment
                 </div>
                 <p className="text-white text-xl font-serif">Signature Delivery</p>
               </div>
             </div>

             <div className="space-y-6 pt-8 border-t border-white/5">
                <h3 className="text-white font-serif text-lg">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <p className="text-sm text-white/60">You will receive a confirmation email with a full invoice.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <p className="text-sm text-white/60">Our team will call you when the order is out for delivery.</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link 
              href="/menu" 
              className="px-10 py-5 bg-white text-secondary font-bold uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all"
            >
              Back to Menu
            </Link>
            <Link
              href={`/tracking/${orderId}`}
              className="px-10 py-5 border border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all"
            >
              <Search size={16} />
              Track Live Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConfirmationPage = () => {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <Suspense fallback={
        <div className="pt-48 pb-20 text-center text-white/40 uppercase tracking-[0.3em] text-xs">
          Loading order details...
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </main>
  );
};

export default ConfirmationPage;
