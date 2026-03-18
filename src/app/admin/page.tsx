"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Package, Calendar, ArrowUpRight, Clock } from "lucide-react";
import { IOrder } from "@/types";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => 
    order.paymentStatus === "paid" ? acc + order.totalAmount : acc, 0);

  const stats = [
    { name: "Total Revenue", value: `£${totalRevenue.toFixed(2)}`, icon: TrendingUp, change: "+12.5%", color: "text-green-500" },
    { name: "Active Orders", value: orders.filter(o => o.fulfillmentStatus === "pending").length.toString(), icon: Package, change: "+3", color: "text-accent" },
    { name: "New Bookings", value: "8", icon: Calendar, change: "Today", color: "text-blue-500" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-serif font-bold text-white mb-2">Business <span className="text-accent italic">Overview</span></h1>
        <p className="text-white/40 text-sm tracking-widest uppercase">Real-time performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-secondary p-8 border border-white/5 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon size={64} />
            </div>
            <div className="relative z-10">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">{stat.name}</p>
              <h3 className="text-3xl font-serif font-bold text-white mb-2">{stat.value}</h3>
              <p className={`text-xs font-bold ${stat.color} flex items-center gap-1`}>
                {stat.change} <ArrowUpRight size={12} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-secondary border border-white/5">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-white">Recent Orders</h3>
          <button className="text-accent text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/30 bg-charcoal/30">
                <th className="px-8 py-4 font-bold">Customer</th>
                <th className="px-8 py-4 font-bold">Order ID</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold">Total</th>
                <th className="px-8 py-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-white font-medium">{order.customerName}</p>
                      <p className="text-white/40 text-[10px]">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-white/40 font-mono text-xs">#{order._id?.slice(-8).toUpperCase()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-tighter ${
                      order.paymentStatus === "paid" ? "bg-green-500/10 text-green-500" : "bg-accent/10 text-accent"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-white font-bold">£{order.totalAmount.toFixed(2)}</td>
                  <td className="px-8 py-6 text-white/40 text-xs">{new Date(order.createdAt!).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-white/20 uppercase tracking-widest text-xs">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  return <AdminDashboard />;
}
