"use client";

import React, { useState, useEffect } from "react";
import { Phone, MapPin } from "lucide-react";

export const FloatingCTAs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // If the page is short (no scroll room), keep it visible
      if (totalHeight - windowHeight < 100) {
        setIsVisible(true);
        return;
      }

      // Hide only when scrolled within 300px of the very bottom (footer view)
      if (totalHeight - (scrollPosition + windowHeight) < 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-40 flex flex-col gap-3 transition-all duration-300 ${
      isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
    }`}>
      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919296935757?text=Hi%20OLD%20MONK%20CAFE%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20food%20or%20booking%20a%20table!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-green-400/20"
        title="Chat on WhatsApp"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor" className="w-5.5 h-5.5">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </a>

      {/* Instagram Follow Button */}
      <a
        href="https://www.instagram.com/oldmonkcafe_dbg?igsh=Z2JsMXZldnlsNHg1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        title="Follow us on Instagram"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </a>

      {/* Direct Call Button (Mobile Focus) */}
      <a
        href="tel:+919296935757"
        className="flex items-center justify-center w-12 h-12 bg-[#c49a6c] hover:bg-[#ab7f50] text-primary-dark rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-300/20 md:hidden"
        title="Call Cafe Manager"
        aria-label="Phone"
      >
        <Phone className="w-5.5 h-5.5 fill-current" />
      </a>

      {/* Google Maps directions */}
      <a
        href="https://www.google.com/maps/place/OLD+MONK+CAFE/@26.1791599,85.896985,17z/data=!3m1!4b1!4m6!3m5!1s0x39edb70058367b4f:0x885307f4732543eb!8m2!3d26.1791551!4d85.8995599!16s%2Fg%2F11yzbf03h6?entry=ttu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-400/20"
        title="Get Directions"
        aria-label="Directions"
      >
        <MapPin className="w-5.5 h-5.5" />
      </a>
    </div>
  );
};
