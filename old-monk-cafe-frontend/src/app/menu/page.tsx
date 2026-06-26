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

// Default Menu Items with prices matching the user's request
const fallbackMenuItems: MenuItemData[] = [
  // COFFEE & BEVERAGES
  { id: "c1", name: "Espresso Shot", price: 89, description: "Strong and bold shot of premium extracted espresso.", category: "coffee", image: "/images/espresso_shot.png", isVeg: true, isAvailable: true },
  { id: "c2", name: "Americano", price: 99, description: "Espresso shots topped with hot water for a smooth black coffee.", category: "coffee", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "c3", name: "Cappuccino", price: 129, description: "Classic espresso with steamed milk and thick foam layer.", category: "coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "c4", name: "Café Latte", price: 139, description: "Mild coffee made of espresso and creamy steamed milk.", category: "coffee", image: "/images/coffee_art.png", isVeg: true, isAvailable: true },
  { id: "c5", name: "Café Mocha", price: 149, description: "Rich chocolate coupled with espresso shot and steamed milk.", category: "coffee", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "c6", name: "Classic Cold Coffee", price: 159, description: "Creamy whipped milk, vanilla ice cream, and espresso blended with ice.", category: "coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "c7", name: "Irish Coffee", price: 179, description: "Artisanal espresso flavored with rich Irish syrup and fresh cream.", category: "coffee", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "c8", name: "Hazelnut Cold Coffee", price: 189, description: "Specialty cold brew infused with premium sweet hazelnut extracts.", category: "coffee", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400", isVeg: true, isAvailable: true },

  // MOCKTAILS
  { id: "m1", name: "Virgin Mojito", price: 149, description: "Refreshing blend of fresh mint, lime slices, sugar syrup, and soda.", category: "mocktails", image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "m2", name: "Blue Lagoon Cooler", price: 169, description: "Exotic blue curacao mixed with tangy lemon juice, mint, and sprite.", category: "mocktails", image: "/images/premium_mocktail.png", isVeg: true, isAvailable: true },
  { id: "m3", name: "Green Apple Fizz", price: 169, description: "Tangy-sweet green apple syrup topped with soda and mint leaves.", category: "mocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "m4", name: "Watermelon Cooler", price: 159, description: "Freshly muddled sweet watermelon with a pinch of black salt and lime.", category: "mocktails", image: "/images/watermelon_cooler.png", isVeg: true, isAvailable: true },
  { id: "m5", name: "Tropical Fruit Punch", price: 189, description: "Assorted tropical juices shaken with cream and grenadine syrup.", category: "mocktails", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=400", isVeg: true, isAvailable: true },

  // BURGERS
  { id: "b1", name: "Veg Burger", price: 139, description: "Crispy vegetable patty topped with lettuce, tomato, onions, and mayo.", category: "burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "b2", name: "Paneer Burger", price: 179, description: "Grilled marinated paneer slab loaded with cheese and spicy house sauces.", category: "burgers", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "b3", name: "Crispy Cheese Burger", price: 189, description: "Double layered crispy veg patty with melting cheddar cheese slice.", category: "burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "b4", name: "Mushroom Cheese Burger", price: 229, description: "Sautéed garlic mushrooms with melting swiss cheese slice and herbs.", category: "burgers", image: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=400", isVeg: true, isAvailable: true },

  // PIZZA
  { id: "p1", name: "Margherita Pizza", price: 249, description: "Classic stone-baked pizza topped with fresh tomato sauce, mozzarella, and basil.", category: "pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "p2", name: "Farmhouse Pizza", price: 299, description: "Loaded with crunchy capsicum, onions, golden corn, mushrooms, and tomatoes.", category: "pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "p3", name: "Paneer Tikka Pizza", price: 329, description: "Fusion pizza topped with smoky tandoori paneer tikka cubes and coriander.", category: "pizza", image: "/images/paneer_tikka_pizza.png", isVeg: true, isAvailable: true },
  { id: "p4", name: "Tandoori Mushroom Pizza", price: 369, description: "Delicious stone-baked pizza loaded with spicy marinated button mushrooms, onions, and cheese.", category: "pizza", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400", isVeg: true, isAvailable: true },

  // PASTA
  { id: "pas1", name: "White Sauce Pasta", price: 229, description: "Penne pasta tossed in rich, velvety cheese cream sauce with garlic bread.", category: "pasta", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "pas2", name: "Red Sauce Pasta", price: 219, description: "Penne pasta in spicy, tangy tomato arrabbiata sauce with Italian herbs.", category: "pasta", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "pas3", name: "Mix Sauce Pasta", price: 249, description: "Creamy pink sauce pasta - best of both cream and rich tomato flavors.", category: "pasta", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "pas4", name: "Creamy Mushroom Pasta", price: 289, description: "Tender button mushroom slices tossed in rich garlic alfredo sauce with penne.", category: "pasta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400", isVeg: true, isAvailable: true },

  // MOMOS
  { id: "mo1", name: "Veg Steam Momos (6 Pcs)", price: 99, description: "Thin wrap loaded with minced fresh garden vegetables and served with hot dip.", category: "momos", image: "/images/veg_steam_momos.png", isVeg: true, isAvailable: true },
  { id: "mo2", name: "Paneer Momos (6 Pcs)", price: 129, description: "Stuffed with minced spicy paneer and served with red momo chutney.", category: "momos", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "mo3", name: "Veg Cheese Corn Momos (6 Pcs)", price: 149, description: "Steaming hot momos stuffed with sweet corn kernels and melting mozzarella cheese.", category: "momos", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "mo4", name: "Fried Momos (6 Pcs)", price: 159, description: "Golden fried crispy momos (Veg or Paneer options available).", category: "momos", image: "/images/fried_momos.png", isVeg: true, isAvailable: true },
  { id: "mo5", name: "Tandoori Momos (6 Pcs)", price: 189, description: "Momos marinated in tandoori paste, chargrilled in tandoor to perfection.", category: "momos", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400", isVeg: true, isAvailable: true },

  // CHINESE
  { id: "ch1", name: "Veg Hakka Noodles", price: 169, description: "Stir-fried noodles with crunchy cabbage, capsicum, carrots, and spring onions.", category: "chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "ch2", name: "Paneer Chilli Noodles", price: 199, description: "Stir-fried noodles loaded with spicy soy-glazed paneer cubes.", category: "chinese", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "ch3", name: "Schezwan Noodles", price: 229, description: "Spicy stir-fried noodles tossed in rich garlic Schezwan sauce and vegetables.", category: "chinese", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "ch4", name: "Veg Fried Rice", price: 179, description: "Wok-tossed rice with fresh seasonal vegetables and soy-garlic.", category: "chinese", image: "/images/veg_fried_rice.png", isVeg: true, isAvailable: true },
  { id: "ch5", name: "Chilli Potato", price: 179, description: "Crispy french fries tossed in spicy honey-chilli soy glaze.", category: "chinese", image: "/images/chilli_potato.png", isVeg: true, isAvailable: true },
  { id: "ch6", name: "Veg Manchurian Gravy", price: 199, description: "Deep fried vegetable balls cooked in rich spicy garlic manchurian sauce.", category: "chinese", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400", isVeg: true, isAvailable: true },

  // DESSERTS
  { id: "d1", name: "Brownie with Ice Cream", price: 179, description: "Warm sizzling chocolate fudge brownie topped with vanilla scoop and hot fudge.", category: "desserts", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "d2", name: "Chocolate Lava Cake", price: 199, description: "Soft baked chocolate cake with a molten liquid chocolate core.", category: "desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "d3", name: "Fudge Hot Sundae", price: 189, description: "Triple scoop ice cream topped with waffle pieces, nuts, and chocolate fudge.", category: "desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "d4", name: "Premium Pastry Slice", price: 99, description: "Decadent slice of fresh cream butter pastry (Black Forest / Red Velvet).", category: "desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400", isVeg: true, isAvailable: true },

  // COMBOS
  { id: "co1", name: "Coffee + Burger Combo", price: 249, description: "Classic cold coffee paired with crisp Veg Burger - save 15%!", category: "combos", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "co2", name: "Pizza + Mocktail Combo", price: 449, description: "Farmhouse pizza paired with refreshing Virgin Mojito.", category: "combos", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400", isVeg: true, isAvailable: true },
  { id: "co3", name: "Momos + Cold Coffee Combo", price: 249, description: "Veg Steam Momos (6 Pcs) with classic rich Cold Coffee.", category: "combos", image: "/images/momos_coffee_combo.png", isVeg: true, isAvailable: true },
  { id: "co4", name: "Couple Special Feast Combo", price: 799, description: "1 Pizza, 1 Pasta, 2 Mocktails, and 1 Chocolate Lava Cake - the ultimate date night feast!", category: "combos", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", isVeg: true, isAvailable: true },
];

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
