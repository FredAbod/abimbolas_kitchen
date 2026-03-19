import React from "react";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, PackageSearch, Truck, Utensils, AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface TrackingPageProps {
  params: { id: string };
}

export default async function TrackingPage({ params }: TrackingPageProps) {
  await dbConnect();

  const resolvedParams = await params;

  let order = null;
  try {
    order = await Order.findById(resolvedParams.id).lean();
  } catch (err) {
    // Invalid ObjectId format
    return notFound();
  }

  if (!order) {
    return notFound();
  }

  const statuses = [
    { id: "pending", label: "Order Placed", icon: <PackageSearch size={24} /> },
    { id: "confirmed", label: "Confirmed & Cooking", icon: <Utensils size={24} /> },
    { id: "out_for_delivery", label: "Out for Delivery", icon: <Truck size={24} /> },
    { id: "completed", label: "Delivered", icon: <CheckCircle2 size={24} /> }
  ];

  // Map backend status to our progress tracker
  // Treating processing as confirmed for the tracker
  let currentStatusIndex = 0;
  if (order.fulfillmentStatus === "confirmed" || order.fulfillmentStatus === "processing") currentStatusIndex = 1;
  if (order.fulfillmentStatus === "out_for_delivery") currentStatusIndex = 2;
  if (order.fulfillmentStatus === "completed" || order.fulfillmentStatus === "delivered") currentStatusIndex = 3;

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-20 max-w-4xl">
          <div className="text-center mb-16">
             <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-4">Live Updates</span>
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Track Your <span className="text-accent italic">Order</span></h1>
             <p className="text-white/40 uppercase tracking-widest text-xs">Order #{order._id.toString().slice(-8).toUpperCase()}</p>
          </div>

          <div className="bg-charcoal/50 border border-white/5 p-8 md:p-16 relative overflow-hidden mb-8">
            {/* Status Timeline */}
            <div className="relative flex justify-between items-center z-10 before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:w-full before:bg-white/10 before:-z-10">
               {statuses.map((step, idx) => {
                 const isActive = idx <= currentStatusIndex;
                 const isCurrent = idx === currentStatusIndex;
                 return (
                   <div key={step.id} className="flex flex-col items-center relative gap-6">
                     <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500
                       ${isActive ? 'bg-accent border-charcoal text-secondary' : 'bg-charcoal border-white/10 text-white/20'}
                       ${isCurrent ? 'scale-110 shadow-[0_0_30px_rgba(210,105,30,0.3)]' : ''}
                     `}>
                       {step.icon}
                     </div>
                     <span className={`absolute -bottom-10 whitespace-nowrap text-[10px] uppercase tracking-widest font-bold transition-colors duration-500
                       ${isActive ? 'text-accent' : 'text-white/20'}
                     `}>
                       {step.label}
                     </span>
                   </div>
                 );
               })}
            </div>
            {/* Payment Warning if unpaid */}
            {order.paymentStatus !== "paid" && (
              <div className="mt-20 flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
                <AlertCircle size={20} />
                <p><strong>Awaiting Payment:</strong> Your order is pending payment verification. Our kitchen will begin cooking once payment is confirmed.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 border border-white/5 p-8 space-y-6">
              <h3 className="text-white uppercase tracking-widest text-xs font-bold border-b border-white/5 pb-4">Delivery Information</h3>
              <div className="space-y-4 text-white/60 text-sm">
                <p><strong className="text-white">Name:</strong> {order.customerName}</p>
                <div>
                  <strong className="text-white block mb-1">Address:</strong>
                  <p>{order.deliveryAddress?.line1}</p>
                  {order.deliveryAddress?.line2 && <p>{order.deliveryAddress?.line2}</p>}
                  <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.postcode}</p>
                </div>
              </div>
            </div>

            <div className="bg-charcoal/30 border border-white/5 p-8 space-y-6">
              <h3 className="text-white uppercase tracking-widest text-xs font-bold border-b border-white/5 pb-4">Order Summary</h3>
              <div className="space-y-4">
                 {(order.items as any[]).map((item, i) => (
                   <div key={i} className="flex justify-between text-sm">
                     <span className="text-white/60">{item.quantity}x {item.title}</span>
                     <span className="text-white font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
                 <div className="flex justify-between text-sm py-4 border-t border-white/5">
                   <div className="flex flex-col gap-1">
                     <span className="text-white font-bold uppercase tracking-widest text-xs">Total</span>
                     <span className={`text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-accent'}`}>
                       STATUS: {order.paymentStatus}
                     </span>
                   </div>
                   <span className="text-accent font-bold text-lg">£{order.totalAmount.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
