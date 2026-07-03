"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, ShoppingCart, Check, Star } from "lucide-react";

export interface MenuItemData {
  _id?: string;
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: string;
  image: string | { url: string; publicId?: string };
  isVeg: boolean;
  isAvailable: boolean;
  rating?: number;
  orderCount?: number;
}

interface MenuCardProps {
  item: MenuItemData;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const imageUrl = item.image
    ? typeof item.image === "string"
      ? item.image
      : (item.image as any).url || ""
    : "";

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.discountPrice || item.price,
      image: imageUrl,
      category: item.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasDiscount = item.discountPrice !== undefined && item.discountPrice < item.price;
  const displayPrice = hasDiscount ? item.discountPrice : item.price;
  const rating = item.rating || 4.8;

  return (
    <div className="glass-panel rounded-xl overflow-hidden hover:border-secondary/30 transition-all duration-300 group flex flex-col h-full hover:shadow-lg bg-primary">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-primary-dark">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Badge & Veg Flag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-primary/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded text-secondary border border-secondary/10 uppercase tracking-wide">
            {item.category}
          </span>
          <span className={`backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border flex items-center gap-1 ${
            item.isVeg 
              ? "bg-green-500/15 text-green-700 border-green-500/20" 
              : "bg-red-500/15 text-red-700 border-red-500/20"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}></span>
            {item.isVeg ? "VEG" : "NON-VEG"}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm py-1 px-2 rounded flex items-center gap-1 border border-secondary/10">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-foreground text-xs font-bold font-sans">{rating.toFixed(1)}</span>
        </div>

        {/* Sold Out Dark Blur Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-red-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-red-500/30 shadow-md uppercase tracking-widest font-sans animate-pulse">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1 mb-1.5">
          {item.name}
        </h3>
        <p className="text-foreground/75 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
          {item.description || "Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe."}
        </p>

        {/* Price & Cart Add button */}
        <div className="flex items-center justify-between border-t border-secondary/10 pt-4 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-sans text-foreground">
              ₹{displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-sm font-sans text-foreground/40 line-through">
                ₹{item.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              !item.isAvailable
                ? "bg-foreground/5 text-foreground/30 border border-foreground/10 cursor-not-allowed"
                : added
                ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                : "bg-secondary text-white hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/25"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : !item.isAvailable ? (
              <span>Sold Out</span>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
