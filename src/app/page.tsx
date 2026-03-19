"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import ServiceCard from "@/components/landing/ServiceCard";
import { Utensils, PartyPopper, Clock, User, Edit, Loader2 } from "lucide-react";
import { IProduct } from "@/types";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function Home() {
  const [featuredDishes, setFeaturedDishes] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products?featured=true");
        const data = await res.json();
        setFeaturedDishes(data.slice(0, 3));
      } catch {
        // If no featured dishes, fetch any 3 dishes
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          setFeaturedDishes(data.slice(0, 3));
        } catch {
          console.error("Failed to fetch dishes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const services = [
    {
      title: "Catering Services",
      description: "Full-service catering for corporate events, weddings, and premium private gatherings. Custom menus designed for your guests.",
      icon: <Utensils size={32} />,
    },
    {
      title: "Event & Party Platters",
      description: "Perfectly prepared platters of our finest grills, sides, and snacks. Ready to serve and impressively presented.",
      icon: <PartyPopper size={32} />,
    },
    {
      title: "Meal Prep & Delivery",
      description: "Nourishing, authentic African meals prepared weekly and delivered to your doorstep. Healthy eating, traditional taste.",
      icon: <Clock size={32} />,
    },
    {
      title: "Private Chef Hire",
      description: "A luxury dining experience in your own home. Our chefs bring the restaurant to you for an unforgettable evening.",
      icon: <User size={32} />,
    },
    {
      title: "Customized Menus",
      description: "Tailor-made culinary creations for specific dietary needs or unique event themes. Your vision, our expertise.",
      icon: <Edit size={32} />,
    },
  ];

  return (
    <main className="min-h-screen bg-secondary overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-32 md:py-40 bg-secondary">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent font-sans text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Our Signature <span className="text-accent italic">Services</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-sm text-sm">
              We provide a spectrum of culinary services designed to bring premium African dining to every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-32 md:py-40 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
        
        <div className="container mx-auto px-6 md:px-20 text-center relative z-10">
          <span className="text-accent font-sans text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
            Limited Time Offers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-8">
            From the <span className="text-accent italic">Savannah Sun</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-16 text-sm md:text-base px-4">
            Discover a rotating selection of our most loved seasonal dishes, carefully picked by Abimbola herself.
          </p>
          
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : featuredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
              {featuredDishes.map((dish) => (
                <div key={dish._id} className="group cursor-pointer text-left">
                  <div className="aspect-[4/5] overflow-hidden mb-6 bg-secondary relative">
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={dish.imageUrl || `https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop`} 
                      alt={dish.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-charcoal/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          addToCart(dish);
                          toast.success(`${dish.title} added to cart!`);
                        }}
                        className="w-full px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-2">{dish.category}</span>
                  <h3 className="text-lg sm:text-xl font-serif text-white mb-2">{dish.title}</h3>
                  <p className="text-accent font-bold">£{dish.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 mb-16 border border-white/5 bg-secondary/50">
              <p className="text-white/30 uppercase tracking-[0.3em] text-xs">No featured dishes yet — check back soon</p>
            </div>
          )}

          <Link 
            href="/menu" 
            className="inline-block px-12 py-5 bg-transparent border border-accent text-accent font-bold hover:bg-accent hover:text-secondary transition-all text-sm md:text-base"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
