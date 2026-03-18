import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Abimbola's Kitchen | Authentic Nigerian Cuisine",
  description: "Experience the premium taste of Africa in the UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased text-white selection:bg-accent selection:text-secondary`}>
        <SessionProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
