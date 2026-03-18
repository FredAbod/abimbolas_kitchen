"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Utensils, PartyPopper, Clock, User, Edit, Send } from "lucide-react";
import toast from "react-hot-toast";

const services = [
  {
    id: "catering",
    title: "Catering Services",
    description: "From intimate dinner parties to grand weddings and corporate galas, we provide bespoke catering that reflects the richness of African culture. Our team handles everything from menu design to on-site service.",
    icon: <Utensils size={40} />,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "event-platters",
    title: "Event & Party Platters",
    description: "Hosting a casual gathering? Our signature platters are the perfect solution. Choose from a variety of small chops, grilled proteins, and sides, all curated for easy sharing and maximum flavor.",
    icon: <PartyPopper size={40} />,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "meal-prep",
    title: "Meal Prep & Delivery",
    description: "Enjoy the taste of home without the effort. Our weekly meal prep service delivers freshly prepared, authentic Nigerian meals to your door. Balanced, nutritious, and deeply satisfying.",
    icon: <Clock size={40} />,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1925&auto=format&fit=crop"
  },
  {
    id: "private-chef",
    title: "Private Chef Hire",
    description: "Bring the luxury of Abimbola's Kitchen to your home. Our private chef service offers a completely personalized dining experience, with every dish prepared live for you and your guests.",
    icon: <User size={40} />,
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: "customized-menus",
    title: "Customized Menus",
    description: "Have a specific vision or dietary requirement? We work closely with you to create a one-of-a-kind menu that perfectly suits your needs, ensuring no guest is left out of the celebration.",
    icon: <Edit size={40} />,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServicesPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry sent successfully! We will contact you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-40 pb-20 bg-charcoal text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="space-y-4 mb-10"> {/* 16px text spacing, 40px before next element */}
          <span className="text-accent font-sans text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
            The Full Experience
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
            Our <span className="text-accent italic">Services</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Beyond the plate, we offer end-to-end culinary solutions for every moment worth celebrating.
          </p>
        </div>
      </div>
    </section>

      {/* Services List */}
      <section className="py-24 space-y-32">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="container mx-auto px-6 md:px-20">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
              <div className="flex-1 space-y-8">
                <div className="inline-flex p-4 bg-white/5 text-accent rounded-none">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-serif font-bold text-white">{service.title}</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  {service.description}
                </p>
                <div className="pt-4">
                  <a 
                    href="#booking-form" 
                    className="text-accent text-xs font-bold uppercase tracking-widest border-b-2 border-accent pb-2 hover:text-white hover:border-white transition-all"
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] overflow-hidden bg-charcoal">
                <motion.img 
                  whileInView={{ scale: [1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Inquiry Form */}
      <section id="booking-form" className="py-24 bg-charcoal border-t border-white/5">
        <div className="container mx-auto px-6 md:px-20 bg-secondary/50 p-12 md:p-24 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Inquiry Form</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                Let Us Create <br />
                Something <span className="text-accent italic">Bespoke.</span>
              </h2>
              <p className="text-white/60 mb-12">
                Have a date in mind? Fill out the form and our concierge team will reach out within 24 hours to discuss your requirements.
              </p>
              
              <div className="space-y-6 text-white/80">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent"><Send size={18} /></div>
                  <span className="text-sm">hello@abimbolaskitchen.co.uk</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Service Type</label>
                  <select className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option className="bg-secondary">Catering Services</option>
                    <option className="bg-secondary">Event Platters</option>
                    <option className="bg-secondary">Meal Prep</option>
                    <option className="bg-secondary">Private Chef</option>
                    <option className="bg-secondary">Custom Menu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Event Date</label>
                  <input required type="date" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Additional Details</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"></textarea>
              </div>

              <button className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
