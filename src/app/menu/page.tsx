"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DishCard from "@/components/menu/DishCard";
import { IProduct } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

const categories = [
  { id: "all", name: "All Dishes" },
  { id: "rice", name: "Rice Dishes" },
  { id: "soups", name: "Soups & Stews" },
  { id: "grills", name: "The Grills" },
  { id: "platters", name: "Party Platters" },
  { id: "drinks", name: "Native Drinks" },
];

const MenuPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load menu. Please try again.");
        }

        const data: IProduct[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        console.error("Failed to fetch products", err);
        setError(err.message || "Something went wrong loading the menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (activeCategory !== "all") {
      updated = updated.filter((p) => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      updated = updated.filter((p) => {
        return (
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
        );
      });
    }

    setFilteredProducts(updated);
  }, [activeCategory, products, searchTerm]);

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="space-y-4 mb-10"> {/* 16px text spacing, 40px before next element */}
            <span className="text-accent font-sans text-xs font-bold tracking-[0.4em] uppercase block">
              Curated Selection
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              The <span className="text-accent italic">Menu</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              From comforting classics to modern interpretations, our menu is a love letter to African culinary heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="sticky top-[72px] bg-secondary z-40 border-b border-white/5 py-6">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? "text-accent border-b-2 border-accent pb-2" 
                    : "text-white/40 hover:text-white pb-2 border-b-2 border-transparent"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH DISHES..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-xs tracking-widest text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-20">
          {error && !loading && (
            <div className="mb-10 rounded-lg border border-red-500/40 bg-red-500/5 px-6 py-4 text-sm text-red-200">
              <p className="font-semibold tracking-[0.2em] uppercase text-xs mb-1">Unable to load menu</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="animate-spin text-accent" size={40} />
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Preparing Chef&apos;s Secrets...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
              >
                {filteredProducts.map((item) => (
                  <DishCard key={item._id} product={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-40">
              <p className="text-white font-serif text-2xl mb-4">No dishes found in this category.</p>
              <button 
                onClick={() => setActiveCategory("all")}
                className="text-accent underline uppercase tracking-widest text-xs font-bold"
              >
                View all dishes
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MenuPage;
