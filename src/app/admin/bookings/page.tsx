"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Calendar as CalendarIcon, Users, Clock, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-accent/10 text-accent';
      case 'contacted': return 'bg-blue-500/10 text-blue-500';
      case 'confirmed': return 'bg-green-500/10 text-green-500';
      default: return 'bg-white/10 text-white/40';
    }
  };

  return (
    <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Service <span className="text-accent italic">Inquiries</span></h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Manage premium catering and chef requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <div className="lg:col-span-2 py-40 flex justify-center">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : bookings.length === 0 ? (
            <div className="lg:col-span-2 py-40 text-center border border-white/5 bg-secondary">
               <p className="text-white/20 uppercase tracking-[0.3em] text-xs">No service inquiries yet</p>
            </div>
          ) : bookings.map((booking) => (
            <div key={booking._id} className="bg-secondary border border-white/5 p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-2">{booking.serviceType.replace(/-/g, ' ')}</span>
                  <h3 className="text-2xl font-serif text-white">{booking.customerName}</h3>
                </div>
                <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-tighter ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8 text-white/60">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-accent" />
                  <span className="text-xs truncate">{booking.customerEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-accent" />
                  <span className="text-xs">{booking.customerPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon size={16} className="text-accent" />
                  <span className="text-xs">{new Date(booking.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-accent" />
                  <span className="text-xs">{booking.guestCount} Guests</span>
                </div>
              </div>

              <div className="bg-charcoal/30 p-4 border border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">CLIENT MESSAGE</p>
                <p className="text-white/70 text-sm italic leading-relaxed">
                  {booking.message || "No additional requirements provided."}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase">
                  <Clock size={12} />
                  Received {new Date(booking.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-4">
                   <button className="text-accent text-[10px] font-bold uppercase tracking-widest hover:underline">Mark Contacted</button>
                   <button className="text-white/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdminBookingsPage;
