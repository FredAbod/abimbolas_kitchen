import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import ServiceCard from "@/components/landing/ServiceCard";
import { Utensils, PartyPopper, Clock, User, Edit } from "lucide-react";

export default function Home() {
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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

      {/* Featured Menu Intro */}
      <section className="py-32 md:py-40 bg-charcoal relative overflow-hidden">
        {/* Subtle pattern background placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
        
        <div className="container mx-auto px-6 md:px-20 text-center relative z-10">
          <span className="text-accent font-sans text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
            Limited Time Offers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
            From the <span className="text-accent italic">Savannah Sun</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-16">
            Discover a rotating selection of our most loved seasonal dishes, carefully picked by Abimbola herself.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* These would be dish cards eventually */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-secondary relative">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop`} 
                    alt="Featured Dish"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      View Dish
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-white mb-2">Signature Jollof Rice</h3>
                <p className="text-accent font-bold">£18.50</p>
              </div>
            ))}
          </div>

          <button className="px-12 py-5 bg-transparent border border-accent text-accent font-bold hover:bg-accent hover:text-secondary transition-all">
            View Full Menu
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
