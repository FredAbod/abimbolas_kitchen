"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Calendar, Settings, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { name: "Menu Items", icon: <UtensilsCrossed size={20} />, path: "/admin/menu" },
    { name: "Bookings", icon: <Calendar size={20} />, path: "/admin/bookings" },
  ];

  return (
    <div className="flex min-h-screen bg-charcoal">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-8">
           <Link href="/" className="inline-block">
            <span className="text-xl font-serif font-bold text-accent tracking-wider leading-none">
              ABIMBOLA&apos;S
              <span className="block text-[10px] font-sans tracking-[0.3em] text-white/40">ADMIN PANEL</span>
            </span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-none text-sm font-medium transition-all ${
                pathname === item.path
                  ? "bg-accent text-secondary"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={pathname === item.path ? "text-secondary" : "text-accent"}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link href="/admin/settings" className="flex items-center gap-4 text-white/40 hover:text-white text-sm transition-colors">
            <Settings size={18} />
            Settings
          </Link>
          <button className="flex items-center gap-4 text-white/40 hover:text-red-500 text-sm transition-colors w-full">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-20">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
