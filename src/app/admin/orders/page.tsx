"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle2, Truck, PackageCheck, Loader2 } from "lucide-react";
import { IOrder } from "@/types";
import toast from "react-hot-toast";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<"all" | "pending" | "confirmed" | "out_for_delivery" | "completed">("all");

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, fulfillmentStatus: newStatus }),
      });
      if (res.ok) {
        toast.success(`Order ${newStatus}!`);
        fetchOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus as any });
        }
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeStatus === "all" ? true : order.fulfillmentStatus === activeStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-accent/10 text-accent';
      case 'confirmed': return 'bg-blue-500/10 text-blue-500';
      case 'out_for_delivery': return 'bg-yellow-500/10 text-yellow-500';
      case 'delivered': 
      case 'completed': return 'bg-green-500/10 text-green-500';
      default: return 'bg-white/10 text-white/40';
    }
  };

  return (
    <div className="space-y-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Order <span className="text-accent italic">Fulfillment</span></h1>
            <p className="text-white/40 text-sm tracking-widest uppercase">Manage customer deliveries and pickups</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH ORDERS..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-secondary border border-white/5">
          <div className="p-8 border-b border-white/5 flex gap-4 overflow-x-auto pb-4 md:pb-8 no-scrollbar">
            {["all", "pending", "confirmed", "out_for_delivery", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStatus(tab as typeof activeStatus)}
                className={`whitespace-nowrap px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${
                  activeStatus === tab
                    ? "bg-accent text-secondary"
                    : "bg-white/5 text-white/40 hover:text-white"
                }`}
              >
                {tab.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/30 bg-charcoal/30">
                  <th className="px-8 py-4 font-bold">Details</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold">Payment</th>
                  <th className="px-8 py-4 font-bold">Total</th>
                  <th className="px-8 py-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <Loader2 className="animate-spin text-accent mx-auto" size={32} />
                      </td>
                    </tr>
                ) : filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-8">
                      <div className="space-y-1">
                        <p className="text-white font-bold">{order.customerName}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">#{order._id?.slice(-8).toUpperCase()}</p>
                        <p className="text-white/60 text-xs italic">{order.deliveryAddress?.city}, {order.deliveryAddress?.postcode}</p>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-tighter ${getStatusColor(order.fulfillmentStatus)}`}>
                        {order.fulfillmentStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                       <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-accent'}`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-accent'}`} />
                         {order.paymentStatus}
                       </span>
                    </td>
                    <td className="px-8 py-8">
                      <p className="text-white font-serif text-lg">£{order.totalAmount.toFixed(2)}</p>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex gap-2">
                        {order.fulfillmentStatus === 'pending' && (
                          <button onClick={() => updateStatus(order._id!, 'confirmed')} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all" title="Confirm Order"><CheckCircle2 size={16} /></button>
                        )}
                        {order.fulfillmentStatus === 'confirmed' && (
                          <button onClick={() => updateStatus(order._id!, 'out_for_delivery')} className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all" title="Out for Delivery"><Truck size={16} /></button>
                        )}
                        {order.fulfillmentStatus === 'out_for_delivery' && (
                          <button onClick={() => updateStatus(order._id!, 'completed')} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all" title="Mark Completed"><PackageCheck size={16} /></button>
                        )}
                        <button onClick={() => setSelectedOrder(order)} className="p-2 bg-white/5 text-white/40 hover:text-white transition-all"><Eye size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
            <div className="bg-secondary border border-white/5 w-full max-w-3xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-1">Order Details</h2>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest">#{selectedOrder._id?.toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-white/40 hover:text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">
                {/* Customer Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">Customer</h3>
                     <div className="space-y-1">
                        <p className="text-white font-medium">{selectedOrder.customerName}</p>
                        <p className="text-white/60 text-sm">{selectedOrder.customerEmail}</p>
                        {selectedOrder.customerPhone && <p className="text-white/60 text-sm">{selectedOrder.customerPhone}</p>}
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">Delivery</h3>
                     <div className="space-y-1 text-sm text-white/80">
                        <p>{selectedOrder.deliveryAddress?.line1}</p>
                        {selectedOrder.deliveryAddress?.line2 && <p>{selectedOrder.deliveryAddress?.line2}</p>}
                        <p>{selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.postcode}</p>
                     </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                   <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">Items</h3>
                   <div className="space-y-4">
                     {selectedOrder.items.map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center bg-white/5 p-4">
                         <div className="flex items-center gap-4">
                           <span className="w-8 h-8 flex items-center justify-center bg-charcoal text-white text-xs font-bold">{item.quantity}x</span>
                           <span className="text-white font-medium">{item.title}</span>
                         </div>
                         <span className="text-accent font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                       </div>
                     ))}
                   </div>
                   <div className="flex justify-between items-center py-4 border-t border-white/10 mt-4">
                     <span className="text-white font-serif text-xl">Total Paid</span>
                     <span className="text-accent font-serif text-2xl font-bold">£{selectedOrder.totalAmount.toFixed(2)}</span>
                   </div>
                </div>

                {/* Status Controls */}
                <div className="space-y-4 bg-charcoal/30 p-6 border border-white/5">
                  <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Update Order Status</h3>
                  <div className="flex flex-wrap gap-4">
                    {['pending', 'confirmed', 'processing', 'out_for_delivery', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedOrder._id!, status)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                          selectedOrder.fulfillmentStatus === status 
                            ? 'bg-accent text-secondary' 
                            : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        {status.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default AdminOrdersPage;
