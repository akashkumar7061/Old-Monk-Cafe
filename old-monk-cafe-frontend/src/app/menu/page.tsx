"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuCard, MenuItemData } from "@/components/MenuCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Chatbot } from "@/components/Chatbot";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { Search, Coffee, RefreshCw, Download } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";
import { fallbackMenuItems } from "@/config/menuDefaults";

export default function Menu() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>(fallbackMenuItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch from backend
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/menu`);
        if (res.data?.success && res.data?.data && res.data.data.length > 0) {
          const apiItems = res.data.data.map((item: any) => ({
            id: item._id || item.id,
            name: item.name,
            price: item.price,
            discountPrice: item.discountPrice,
            description: item.description,
            category: item.category?.slug || item.category || "coffee",
            image: typeof item.image === "string" ? item.image : (item.image?.url || ""),
            isVeg: item.isVeg ?? true,
            isAvailable: item.isAvailable ?? true,
            rating: item.rating,
          }));
          setMenuItems(apiItems);
        }
      } catch (err) {
        console.warn("Backend menu fetch failed or offline. Using premium offline menu data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = [
    { key: "all", label: "All Items" },
    { key: "coffee", label: "Specialty Coffee" },
    { key: "mocktails", label: "Mocktails" },
    { key: "burgers", label: "Burgers" },
    { key: "pizza", label: "Pizzas" },
    { key: "pasta", label: "Pastas" },
    { key: "momos", label: "Momos" },
    { key: "chinese", label: "Chinese" },
    { key: "desserts", label: "Desserts" },
    { key: "combos", label: "Combos" },
  ];

  // Filtering logic
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg === true;

    return matchesCategory && matchesSearch && matchesVeg;
  });

  const handleDownloadMenuPDF = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-primary-dark border-b border-secondary/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#8c6239_1px,transparent_1px)] opacity-5 [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-secondary/10 text-xs text-secondary font-bold uppercase tracking-widest font-sans">
            <Coffee className="w-3.5 h-3.5" />
            <span>Artisanal Kitchen</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-wide">
            Our Signature <span className="text-gold-gradient font-serif">Menu</span>
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-sans">
            Every dish is handcrafted using fresh local ingredients and custom recipes inspired by modern high-end café brands.
          </p>

          {/* Menu PDF download button */}
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={handleDownloadMenuPDF}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-secondary/20 hover:border-secondary hover:text-secondary rounded text-xs font-bold uppercase tracking-wider text-foreground transition-all cursor-pointer font-sans"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Veg Toggle Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-secondary/10 pb-8">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-foreground/45" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, coffee, mocktails..."
              className="w-full bg-primary border border-secondary/20 rounded-lg pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 placeholder-foreground/30 font-sans"
            />
          </div>
          {/* 100% Veg Certified Badge */}
          <div className="flex items-center gap-2 bg-green-600/10 border border-green-600/25 rounded-full px-5 py-2.5 self-end md:self-auto font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></span>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider">100% Pure Vegetarian Cafe</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-12 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 transition-all cursor-pointer font-sans ${
                selectedCategory === cat.key
                  ? "bg-secondary border-secondary text-white shadow-md"
                  : "bg-primary border-secondary/15 hover:border-secondary/35 text-foreground/75 hover:text-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 font-sans">
            <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-sm text-foreground/50">Fetching signature recipes...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Grid state */
          <div className="text-center py-24 glass-panel rounded-2xl border border-secondary/10 max-w-lg mx-auto bg-primary">
            <Coffee className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-foreground">No items found</h3>
            <p className="text-sm text-foreground/50 max-w-xs mx-auto mt-2 font-sans">
              We couldn't find any dishes matching your filters. Try clearing some selections or search queries.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setVegOnly(false);
              }}
              className="mt-6 text-xs font-bold uppercase tracking-wider text-secondary border border-secondary/30 rounded px-4 py-2 hover:bg-secondary hover:text-white transition-colors font-sans"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Food Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <Chatbot />
      <FloatingCTAs />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
