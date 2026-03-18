import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white/80 pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold text-accent tracking-wider">
                ABIMBOLA&apos;S
                <span className="block text-xs font-sans tracking-[0.3em] text-white/60">KITCHEN</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Authentic Nigerian and African cuisine crafted with passion and premium ingredients. Experience the heart of Savannah in every bite.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/menu" className="hover:text-accent transition-colors">Our Menu</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/catering" className="hover:text-accent transition-colors">Catering</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-white font-serif text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services#catering" className="hover:text-accent transition-colors">Catering Services</Link></li>
              <li><Link href="/services#platters" className="hover:text-accent transition-colors">Event & Party Platters</Link></li>
              <li><Link href="/services#meal-prep" className="hover:text-accent transition-colors">Meal Prep & Delivery</Link></li>
              <li><Link href="/services#private-chef" className="hover:text-accent transition-colors">Private Chef Hire</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <span>+44 700 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>hello@abimbolaskitchen.co.uk</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-white/40">
          <p>© 2024 Abimbola&apos;s Kitchen. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
