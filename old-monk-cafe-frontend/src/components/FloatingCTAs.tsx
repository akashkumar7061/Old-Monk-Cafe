"use client";

import React from "react";
import { MessageCircle, Phone, Compass } from "lucide-react";

export const FloatingCTAs: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919296935757?text=Hi%20OLD%20MONK%20CAFE%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20food%20or%20booking%20a%20table!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-green-400/20"
        title="Chat on WhatsApp"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-green-500" />
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
        <Compass className="w-5.5 h-5.5" />
      </a>
    </div>
  );
};
