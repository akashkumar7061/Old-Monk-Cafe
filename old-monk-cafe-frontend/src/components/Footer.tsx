"use client";

import React from "react";
import Link from "next/link";
import { 
  Coffee, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle 
} from "lucide-react";

export const Footer: React.FC = () => {
  const categories = [
    { name: "Coffee & Hot Brews", href: "/menu?cat=coffee" },
    { name: "Mocktails & Coolers", href: "/menu?cat=mocktails" },
    { name: "Gourmet Burgers", href: "/menu?cat=burgers" },
    { name: "Stone-Baked Pizzas", href: "/menu?cat=pizza" },
    { name: "Handcrafted Momos", href: "/menu?cat=momos" },
    { name: "Desserts & Cakes", href: "/menu?cat=desserts" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Story", href: "/#about" },
    { name: "Food Menu", href: "/menu" },
    { name: "Gallery Showcase", href: "/#gallery" },
    { name: "Reviews & Ratings", href: "/#reviews" },
    { name: "Book a Table", href: "/reserve" },
    { name: "Admin Portal", href: "/admin" },
  ];

  return (
    <footer className="bg-primary-dark border-t border-secondary/10 pt-12 pb-6 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        {/* Brand & Hours */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo_white_bg.jpg"
              alt="Old Monk Cafe Logo"
              className="dark:hidden w-10 h-10 rounded-full object-cover border border-secondary/20"
            />
            <img
              src="/logo_black_bg.jpg"
              alt="Old Monk Cafe Logo"
              className="hidden dark:block w-10 h-10 rounded-full object-cover border border-secondary/20"
            />
            <img
              src="/logo_text.jpg"
              alt="Old Monk Cafe"
              className="h-10 w-auto object-contain transition-all duration-300 dark:invert dark:brightness-200"
            />
          </Link>
          <p className="text-sm leading-relaxed opacity-70">
            Experience the finest premium café atmosphere in Darbhanga with handcrafted coffee, artisanal pizzas, cooling mocktails, and cozy spaces designed for great conversations.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <h4 className="text-foreground font-semibold flex items-center gap-2 text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4 text-secondary" />
              Hours of Operation
            </h4>
            <p className="text-sm font-medium opacity-90">
              Open Daily: 10:00 AM – 12:00 AM
            </p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-foreground font-serif text-lg font-semibold mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
            Our Menu
          </h3>
          <ul className="flex flex-col gap-3.5">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={cat.href}
                  className="text-sm hover:text-secondary transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-foreground font-serif text-lg font-semibold mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-secondary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground font-serif text-lg font-semibold mb-2 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
            Get In Touch
          </h3>
          
          <div className="flex items-start gap-3 mt-4">
            <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">OLD MONK CAFE</p>
              <p className="mt-0.5 leading-relaxed">
                7, Sundarpur, Darbhanga, Basdeopur, Bihar 846005 <br />
                <span className="text-[11px] opacity-50">(Plus Code: 5VHX+MR Darbhanga, Bihar)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-secondary shrink-0" />
            <a
              href="tel:+919296935757"
              className="text-sm text-foreground hover:text-secondary transition-colors font-medium"
            >
              +91 92969 35757
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-secondary shrink-0" />
            <a
              href="mailto:mbachaiwaladbg@gmail.com"
              className="text-sm hover:text-secondary transition-colors font-medium truncate max-w-full"
            >
              mbachaiwaladbg@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.instagram.com/oldmonkcafe_dbg?igsh=Z2JsMXZldnlsNHg1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary/10 hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-secondary"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100091798600417"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary/10 hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-secondary"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/919296935757"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary/10 hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-secondary"
              aria-label="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-secondary/10 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-70">
        <p>© 2026 OLD MONK CAFE. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <a
            href="https://www.google.com/maps/place/OLD+MONK+CAFE/@26.1791599,85.896985,17z/data=!3m1!4b1!4m6!3m5!1s0x39edb70058367b4f:0x885307f4732543eb!8m2!3d26.1791551!4d85.8995599!16s%2Fg%2F11yzbf03h6?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline flex items-center gap-1 font-semibold"
          >
            Google Maps Location
          </a>        </div>
      </div>
    </footer>
  );
};
