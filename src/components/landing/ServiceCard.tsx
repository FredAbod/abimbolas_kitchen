"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, Zap, Clock, UserCheck, Edit3 } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 bg-secondary border border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors duration-500" />
      
      <div className="mb-6 inline-flex p-4 bg-white/5 text-accent rounded-none group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      
      <h3 className="text-2xl font-serif text-white mb-4">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed mb-6">
        {description}
      </p>
      
      <Link 
        href={`/services#${title.toLowerCase().replace(/ /g, "-")}`}
        className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
      >
        Learn More
        <span className="h-[1px] w-8 bg-accent" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
