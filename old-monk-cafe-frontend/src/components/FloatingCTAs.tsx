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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5.5 h-5.5">
          <path d="M17.472 14.382c-.022-.08-.117-.146-.427-.301-.301-.15-1.793-.883-2.072-1.004-.28-.115-.483-.176-.688.13-.205.305-.796.101-.975.305-.178.204-.356.23-.656.079-.3-.15-1.267-.467-2.417-1.485-.89-.79-1.492-1.77-1.667-2.072-.175-.3-.019-.462.131-.611.135-.133.3-.349.45-.523.149-.174.198-.298.298-.497.1-.2.05-.374-.025-.524-.075-.15-.688-1.66-1.95-3.085-.246-.596-.5-.515-.685-.525-.178-.01-.383-.01-.588-.01a1.13 1.13 0 0 0-.818.383c-.28.305-1.072 1.05-1.072 2.56 0 1.51 1.097 2.97 1.246 3.17.15.2 2.16 3.292 5.23 4.61 2.228.956 3.118 1.06 4.225.894 1.11-.166 2.378-.973 2.714-1.87.336-.897.336-1.667.236-1.87zM12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.69 22l4.28-1.12C8.58 21.57 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.81 0-3.52-.49-5-1.34l-.36-.21-2.5.65.67-2.43-.24-.38C3.68 15.02 3 13.06 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9-4.04 9-9 9z"/>
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
