"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Utensils, Award, Users, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-secondary text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1974&auto=format&fit=crop')` }}
        />
        
        <div className="container mx-auto px-6 md:px-20 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Our Heritage</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8">
              A Legacy of <br />
              <span className="text-accent italic">Authentic</span> Taste.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The Story Behind <br /><span className="text-accent italic">Abimbola&apos;s Kitchen</span></h2>
              <div className="space-y-6 text-white/70 leading-relaxed text-lg">
                <p>
                  Rooted in the vibrant flavors of Nigeria and inspired by the warmth of African hospitality, Abimbola&apos;s Kitchen was born out of a passion for bringing authentic, home-cooked experiences to the modern dinner table.
                </p>
                <p>
                  What started as a small family gathering has evolved into a premium culinary destination in the UK. Our founder, Abimbola, envisioned a space where traditional recipes passed down through generations could be elevated with modern techniques and the finest local ingredients.
                </p>
                <p>
                  Every spice we blend, every dish we slow-cook, and every plate we serve is a testament to our commitment to excellence and cultural pride.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 border-2 border-accent/20 translate-x-6 translate-y-6" />
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                alt="Chef Preparing Food"
                className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-charcoal/50">
        <div className="container mx-auto px-6 md:px-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <Utensils size={32} />, title: "Premium Quality", desc: "Only the freshest ingredients sourced daily." },
              { icon: <Award size={32} />, title: "Authentic Recipes", desc: "Traditional methods preserved for generations." },
              { icon: <Users size={32} />, title: "Personalized Service", desc: "Bespoke catering for your unique events." },
              { icon: <Heart size={32} />, title: "Cooked with Love", desc: "Passion in every plate, rhythm in every recipe." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="text-accent flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
