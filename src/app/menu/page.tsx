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

  useEffect(() => {
    // In a real app, this fetches from /api/products
    // For now, we'll simulate a fetch with demo data
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Mock data for immediate preview
        const demoData: IProduct[] = [
          {
            _id: "1",
            title: "Smoky Party Jollof",
            description: "Long grain parboiled rice cooked in a rich, spicy tomato and pepper base with the perfect signature grill smoke.",
            price: 18.50,
            category: "rice",
            type: "dish",
            isAvailable: true,
            isFeatured: true,
            allergens: ["None"],
            imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop"
          },
          {
            _id: "2",
            title: "Suya Grilled Wings",
            description: "Tender chicken wings marinated in our secret Yaji spice blend and flame-grilled to perfection. Served with red onions.",
            price: 12.00,
            category: "grills",
            type: "dish",
            isAvailable: true,
            isFeatured: false,
            allergens: ["Nuts"],
            imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2106&auto=format&fit=crop"
          },
          {
            _id: "3",
            title: "Egusi Soup with Pounded Yam",
            description: "Melon seeds ground and cooked with spinach, palm oil, and various proteins (beef, cow skin, tripe). Served with smooth pounded yam.",
            price: 22.00,
            category: "soups",
            type: "dish",
            isAvailable: true,
            isFeatured: true,
            allergens: ["Fish"],
            imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=2070&auto=format&fit=crop"
          },
          {
            _id: "4",
            title: "Assorted Meat Grill Platter",
            description: "A grand selection of beef, chicken, and goat meat, seasoned with traditional spices and grilled over open flame.",
            price: 45.00,
            category: "platters",
            type: "dish",
            isAvailable: true,
            isFeatured: false,
            imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
          },
          {
            _id: "5",
            title: "Beef Fried Rice",
            description: "Stir-fried rice with tender beef strips, mixed vegetables, and a hint of sesame oil for a savory African-fusion taste.",
            price: 16.50,
            category: "rice",
            type: "dish",
            isAvailable: true,
            isFeatured: false,
            imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1925&auto=format&fit=crop"
          },
          {
            _id: "6",
            title: "Zobo Native Juice",
            description: "Refreshing hibiscus flower petals brewed with pineapple, ginger, and cloves. Naturally sweetened and chilled.",
            price: 5.50,
            category: "drinks",
            type: "dish",
            isAvailable: true,
            isFeatured: false,
            imageUrl: "https://images.unsplash.com/photo-1610631882980-60b6bbfda643?q=80&w=1974&auto=format&fit=crop"
          }
        ];
        
        setProducts(demoData);
        setFilteredProducts(demoData);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

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
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-xs tracking-widest text-white focus:outline-none focus:border-accent transition-colors transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-20">
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
