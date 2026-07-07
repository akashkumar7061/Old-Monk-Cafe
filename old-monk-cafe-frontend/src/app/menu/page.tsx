"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Chatbot } from "@/components/Chatbot";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { Search, Coffee, RefreshCw, Download, ChevronRight, LogIn, Plus, Sparkles } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";
import { fallbackMenuItems } from "@/config/menuDefaults";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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

export default function Menu() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>(fallbackMenuItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const { cart, addToCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Fetch from backend
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/menu?limit=250`);
        if (res.data?.success && res.data?.data && res.data.data.length > 0) {
          const apiItems = res.data.data.map((item: any) => ({
            id: item._id || item.id,
            name: item.name,
            price: item.price,
            discountPrice: item.discountPrice,
            description: item.description,
            category: (item.category?.slug || (typeof item.category === "string" ? item.category : "") || "coffee").replace(/_/g, "-"),
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
    { key: "all", label: "All Items", icon: "🍽️" },
    { key: "kadak_chai", label: "Kadak Chai", icon: "☕" },
    { key: "hot_coffee", label: "Hot Coffee", icon: "☕" },
    { key: "hot_milk", label: "Hot Milk", icon: "🥛" },
    { key: "cold_coffee", label: "Cold Coffee", icon: "🧋" },
    { key: "milk_shake", label: "Milk Shakes", icon: "🥤" },
    { key: "coolers", label: "Coolers", icon: "🥤" },
    { key: "garlic_bread", label: "Garlic Bread", icon: "🥖" },
    { key: "french_fries", label: "French Fries", icon: "🍟" },
    { key: "burgers", label: "Burgers", icon: "🍔" },
    { key: "pizza", label: "Pizzas", icon: "🍕" },
    { key: "sandwich", label: "Sandwiches", icon: "🥪" },
    { key: "maggie", label: "Maggie", icon: "🍜" },
    { key: "special", label: "Old Monk Specials", icon: "🌟" },
    { key: "momos", label: "Momos", icon: "🥟" },
    { key: "pasta", label: "Pastas", icon: "🍝" },
    { key: "noodles", label: "Noodles", icon: "🍜" },
    { key: "fried_rice", label: "Fried Rice", icon: "🍚" },
    { key: "rolls", label: "Rolls", icon: "🌯" },
    { key: "chinese_snacks", label: "Chinese Snacks", icon: "🥡" },
    { key: "soup", label: "Soups", icon: "🥣" },
    { key: "desi_paneer", label: "Desi Paneer", icon: "🥘" },
    { key: "mushroom", label: "Mushroom Delights", icon: "🍄" },
    { key: "roti_rice", label: "Roti & Rice", icon: "🍛" },
    { key: "pav", label: "Pav Specials", icon: "🥖" },
    { key: "south_indian", label: "South Indian", icon: "🥞" },
    { key: "desserts", label: "Dessert Dhamaka", icon: "🍨" },
  ];

  const handleDownloadMenuPDF = () => {
    window.print();
  };

  const handleScrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Zomato style add to cart handler
  const handleAdd = (item: MenuItemData, imageUrl: string) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: imageUrl,
      category: item.category.replace(/_/g, "-"),
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-poppins selection:bg-secondary selection:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image with slight blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10s] ease-out animate-pulse-slow"
          style={{ 
            backgroundImage: "url('/images/media__1783432167113.jpg')",
          }}
        />
        {/* Overlay with slight blur transitioning to theme background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background backdrop-blur-[2px] transition-colors duration-300" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white font-semibold uppercase tracking-widest backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Premium Café Experience</span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-2xl">
            Old Monk <span className="text-gold-gradient font-serif">Cafe</span>
          </h1>
          
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Fresh Food <span className="text-secondary font-serif">•</span> Premium Coffee <span className="text-secondary font-serif">•</span> Delicious Meals
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleScrollToMenu}
              className="px-8 py-3.5 bg-secondary text-white font-bold uppercase tracking-wider rounded text-sm hover:bg-secondary-dark transition-all hover:scale-[1.03] shadow-lg shadow-secondary/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownloadMenuPDF}
              className="px-8 py-3.5 border border-white/40 hover:border-secondary text-white hover:text-white rounded text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Menu</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-serif">Scroll Down</span>
          <div className="w-1.5 h-6 bg-white/20 rounded-full relative overflow-hidden">
            <div className="w-full h-2 bg-secondary rounded-full absolute top-0 left-0" />
          </div>
        </div>
      </div>

      {/* Main Filter & Grid Section */}
      <main id="menu-section" ref={menuSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        
        {/* Sticky Filter & Search Control Panel */}
        <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border border-secondary/10 dark:border-white/5 rounded-2xl p-4 mb-16 shadow-xl space-y-4 transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md shrink-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, coffee, mocktails..."
                className="w-full bg-primary border border-secondary/15 hover:border-secondary/35 rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground focus:outline-none placeholder-foreground/40 transition-colors"
              />
            </div>

            {/* 100% Veg Certified Badge */}
            <div className="flex items-center gap-2.5 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">100% Pure Vegetarian Cafe</span>
            </div>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-secondary/10 dark:border-white/5 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat.key
                    ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/10"
                    : "bg-primary border-secondary/15 hover:border-secondary/40 text-foreground/80 hover:text-secondary"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <RefreshCw className="w-10 h-10 text-secondary animate-spin" />
            <p className="text-sm text-gray-400 font-light font-serif">Preparing signature recipes...</p>
          </div>
        ) : (
          /* Categories cards container */
          <div className="space-y-12">
            {categories
              .filter(cat => cat.key !== "all" && (selectedCategory === "all" || selectedCategory === cat.key))
              .map((cat) => {
                // Filter items belonging to this category
                const itemsInCategory = menuItems.filter(item => {
                  const matchesCategory = item.category.replace(/_/g, "-") === cat.key.replace(/_/g, "-");
                  const matchesSearch = searchQuery === "" || 
                                       item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                       item.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
                });

                // Sort items: ascending order by price, with "Add-on" / "Addon" items always placed last
                const sortedItems = [...itemsInCategory].sort((a, b) => {
                  const isAddonA = a.name.toLowerCase().includes("add-on") || a.name.toLowerCase().includes("addon");
                  const isAddonB = b.name.toLowerCase().includes("add-on") || b.name.toLowerCase().includes("addon");
                  if (isAddonA && !isAddonB) return 1;
                  if (!isAddonA && isAddonB) return -1;
                  return a.price - b.price;
                });

                // If no items match the search query in this category, don't render the category card
                if (sortedItems.length === 0) return null;

                return (
                  <div 
                    key={cat.key} 
                    id={`category-${cat.key}`}
                    className="glass-panel bg-primary/40 dark:bg-[#1A1A1A]/40 border border-secondary/10 dark:border-white/5 shadow-2xl rounded-2xl p-6 md:p-8 space-y-6 scroll-mt-28 transition-all duration-300"
                  >
                    {/* Category Title Header */}
                    <div className="flex items-center justify-between border-b border-secondary/10 dark:border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cat.icon}</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-wide font-serif text-foreground">
                          {cat.label}
                        </h2>
                      </div>
                      <span className="text-xs text-foreground/50 uppercase tracking-widest font-medium">
                        {sortedItems.length} {sortedItems.length === 1 ? "Item" : "Items"}
                      </span>
                    </div>

                    {/* Category Menu Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sortedItems.map((item) => {
                        const imageUrl = item.image
                          ? typeof item.image === "string"
                            ? item.image
                            : (item.image as any).url || ""
                          : "";

                        const cartItem = cart.find((i) => i.id === item.id);
                        const quantityInCart = cartItem ? cartItem.quantity : 0;
                        
                        // Deterministic popular tag (e.g. first item or special item)
                        const isPopular = item.price > 140 || item.name.includes("Special") || item.name.includes("Premium");

                        return (
                          <div 
                            key={item.id} 
                            className={`relative flex gap-4 bg-primary/55 dark:bg-[#1A1A1A]/55 hover:bg-primary-dark/80 dark:hover:bg-[#1A1A1A]/85 border border-secondary/10 dark:border-white/5 hover:border-secondary/25 dark:hover:border-secondary/25 p-4 rounded-xl transition-all duration-300 group shadow-md hover:shadow-lg ${
                              !item.isAvailable ? "opacity-75" : ""
                            }`}
                          >
                            {/* Small food image */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-black/5 dark:bg-black/20">
                              <img 
                                src={imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                loading="lazy" 
                              />
                              {/* Optional Popular Badge */}
                              {isPopular && item.isAvailable && (
                                <span className="absolute top-1.5 left-1.5 bg-secondary text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-md">
                                  Popular
                                </span>
                              )}

                              {/* Sold Out Dark Blur Overlay */}
                              {!item.isAvailable && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                                  <span className="bg-red-600/90 text-white text-[8px] font-extrabold px-1.5 py-1 rounded border border-red-500/25 uppercase tracking-wider">
                                    Sold Out
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Content Block */}
                            <div className="flex-grow flex flex-col justify-between h-full min-w-0">
                              {/* Heading & Price aligned right */}
                              <div>
                                <div className="flex justify-between items-start gap-3">
                                  <h3 className="text-foreground font-semibold text-sm sm:text-base group-hover:text-secondary transition-colors truncate">
                                    {item.name}
                                  </h3>
                                  <span className="text-secondary font-bold font-sans text-sm sm:text-base whitespace-nowrap">
                                    ₹{item.price}
                                  </span>
                                </div>
                                <p className="text-foreground/70 text-xs line-clamp-2 mt-1 font-light leading-relaxed pr-1">
                                  {item.description || "Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe."}
                                </p>
                              </div>

                              {/* Controls/Veg Tag footer */}
                              <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-secondary/10 dark:border-white/5">
                                <div className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                  <span className="text-[9px] text-green-600 dark:text-green-400 font-bold uppercase tracking-widest">Veg</span>
                                </div>

                                {/* Cart quantity updater or Add button */}
                                {quantityInCart > 0 ? (
                                  <div className="flex items-center bg-secondary text-white rounded font-sans font-bold h-7.5 overflow-hidden">
                                    <button
                                      onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                                      className="px-2.5 h-full flex items-center justify-center hover:bg-secondary-dark transition-colors cursor-pointer text-xs"
                                    >
                                      —
                                    </button>
                                    <span className="px-1 text-[11px] tracking-wider min-w-[1.25rem] text-center select-none text-white">
                                      {quantityInCart}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                                      className="px-2.5 h-full flex items-center justify-center hover:bg-secondary-dark transition-colors cursor-pointer text-xs"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleAdd(item, imageUrl)}
                                    disabled={!item.isAvailable}
                                    className={`flex items-center justify-center gap-1 px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-300 h-7.5 ${
                                      !item.isAvailable
                                        ? "bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-600 border border-secondary/10 dark:border-white/5 cursor-not-allowed"
                                        : "bg-secondary/5 dark:bg-white/5 hover:bg-secondary text-secondary hover:text-white border border-secondary/15 dark:border-white/10 hover:border-secondary hover:shadow-md hover:shadow-secondary/10 cursor-pointer"
                                    }`}
                                  >
                                    {!item.isAvailable ? (
                                      <span>Sold Out</span>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3" />
                                        <span>Add</span>
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            {/* Empty state if search returned absolutely nothing */}
            {menuItems.filter(item => {
              const matchesCategory = selectedCategory === "all" || item.category.replace(/_/g, "-") === selectedCategory.replace(/_/g, "-");
              const matchesSearch = searchQuery === "" || 
                                   item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   item.description.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesCategory && matchesSearch;
            }).length === 0 && (
              <div className="text-center py-24 glass-panel bg-primary/40 dark:bg-[#1A1A1A]/40 border border-secondary/10 dark:border-white/5 rounded-2xl max-w-lg mx-auto">
                <Coffee className="w-12 h-12 text-secondary/20 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No items match your search</h3>
                <p className="text-sm text-foreground/50 max-w-xs mx-auto mt-2 font-light">
                  We couldn't find any dishes matching "{searchQuery}". Try editing your keyword or filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-6 text-xs font-bold uppercase tracking-wider text-white bg-secondary hover:bg-secondary-dark rounded-full px-6 py-2.5 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
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
