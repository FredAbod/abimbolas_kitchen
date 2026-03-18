"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Welcome back!");
        router.push("/admin");
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-accent/5 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
      
      <div className="w-full max-w-md bg-secondary border border-white/5 p-12 relative z-10 shadow-2xl">
         <div className="text-center mb-12">
            <span className="text-accent font-serif font-bold text-3xl tracking-wider block mb-2">ABIMBOLA&apos;S</span>
            <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Admin Portal</span>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:outline-none focus:border-accent transition-all" 
                    placeholder="admin@example.com"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Password</label>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:outline-none focus:border-accent transition-all" 
                    placeholder="••••••••"
                  />
               </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In to Dashboard"}
            </button>
         </form>

         <p className="mt-12 text-center text-white/20 text-[10px] uppercase tracking-widest leading-relaxed">
            Unauthorized access is strictly prohibited.<br />
            Secure session monitoring in progress.
         </p>
      </div>
    </main>
  );
};

export default AdminLoginPage;
