"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-secondary text-white">
      <Navbar />

      <section className="pt-48 pb-20">
        <div className="container mx-auto px-6 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-10">
              Privacy <span className="text-accent italic">Policy</span>
            </h1>
            
            <div className="space-y-12 text-white/70 leading-relaxed text-lg">
              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">1. Information We Collect</h2>
                <p>
                  At Abimbola&apos;s Kitchen, we collect information that you provide directly to us when ordering food, subscribing to our newsletter, or contacting us for catering services. This may include your name, email address, phone number, and delivery address.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Process and deliver your food orders.</li>
                  <li>Communicate with you about your orders and inquiries.</li>
                  <li>Send you promotional offers and updates (if you&apos;ve opted in).</li>
                  <li>Improve our services and website experience.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">3. Data Security</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">4. Cookies</h2>
                <p>
                  We use cookies to help us remember and process the items in your shopping cart and understand your preferences for future visits.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">5. Contact Us</h2>
                <p>
                  If there are any questions regarding this privacy policy, you may contact us at hello@abimbolaskitchen.co.uk
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
