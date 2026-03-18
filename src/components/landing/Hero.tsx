"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-secondary">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10 pt-24">
        <div className="max-w-4xl">
          <div className="space-y-4"> {/* 16px text spacing */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent font-sans text-xs md:text-sm font-bold tracking-[0.5em] uppercase block"
            >
              Taste the Heart of Africa
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-7xl font-serif font-bold text-white leading-[1.1]"
            >
              Authentic Nigerian <br />
              <span className="text-accent italic">Excellence.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
            >
              Elevate your events and daily meals with Abimbola&apos;s handcrafted dishes. From bustling Lagos streets to your table in the UK.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 mt-10" // 40px spacing before CTAs
          >
            <Link 
              href="/menu" 
              className="px-10 py-5 bg-primary text-white font-bold rounded-none shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              Order Online
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/services" 
              className="px-10 py-5 border border-white/20 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Catering Services
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
