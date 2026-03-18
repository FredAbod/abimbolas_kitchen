"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
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
              Terms of <span className="text-accent italic">Service</span>
            </h1>
            
            <div className="space-y-12 text-white/70 leading-relaxed text-lg">
              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Abimbola&apos;s Kitchen website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on Abimbola&apos;s Kitchen website for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">3. Orders and Payments</h2>
                <p>
                  All orders placed through our website are subject to availability and acceptance. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the service without notice.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">4. Delivery</h2>
                <p>
                  Delivery times are estimates and cannot be guaranteed. We are not responsible for delays outside of our control. Please ensure someone is available at the delivery address to receive the order.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">5. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
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

export default TermsPage;
