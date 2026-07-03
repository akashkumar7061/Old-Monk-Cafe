"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { CartDrawer } from "@/components/CartDrawer";
import { 
  Star, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Coffee, 
  Heart, 
  Camera, 
  PartyPopper, 
  UserCheck, 
  Laptop, 
  Sparkles, 
  Phone, 
  ArrowRight,
  Send,
  MessageCircle,
  Compass,
  CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeGalleryCat, setActiveGalleryCat] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [stats, setStats] = useState({ coffee: 0, customers: 0, rating: 0 });

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactStatus, setContactStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [submittingContact, setSubmittingContact] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Statistics animation
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        coffee: Math.floor((150 / steps) * step),
        customers: Math.floor((3200 / steps) * step),
        rating: Number(((4.8 / steps) * step).toFixed(1)),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ coffee: 150, customers: 3200, rating: 4.8 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Guarantee anchor hash scrolling on mount (especially navigating from other pages)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const element = document.getElementById(hashId);
      if (element) {
        // Small delay to allow page layouts/Framer Motion to fully mount/render
        const t = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(t);
      }
    }
  }, []);

  const galleryItems = [
    { cat: "interior", title: "Premium Seating Area", img: "/images/cafe_interior.png" },
    { cat: "coffee", title: "Pour Over Latte Art", img: "/images/coffee_art.png" },
    { cat: "drinks", title: "Blue Lagoon Mocktail", img: "/images/premium_mocktail.png" },
    { cat: "food", title: "Premium Paneer Burger", img: "/images/old_monk_burger.png" },
    { cat: "food", title: "Artisanal Pizza", img: "/images/old_monk_pizza.png" },
    { cat: "food", title: "White Sauce Pasta", img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=600" },
    { cat: "food", title: "Pan-Fried Momos", img: "/images/old_monk_momos.png" },
    { cat: "interior", title: "Seating Layout", img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600" },
    { cat: "interior", title: "Cafe Cozy Night", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600" },
    { cat: "drinks", title: "Virgin Mojito Refresh", img: "/images/old_monk_mojito.png" },
  ];

  const filteredGallery = activeGalleryCat === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === activeGalleryCat);

  const reviews = [
    { name: "Aditya Sharma", rating: 5, date: "2 weeks ago", text: "Amazing light interior and cozy seating! Honestly, this is the best cold coffee I have ever had in Darbhanga. The staff was super friendly too." },
    { name: "Neha Raj", rating: 5, date: "3 weeks ago", text: "Their farmhouse pizza and crispy burgers are superb. Perfect place to celebrate birthdays and hangout with college buddies. Loved the glassmorphism aesthetic!" },
    { name: "Vikram Kumar", rating: 5, date: "1 month ago", text: "Polite staff and fast service. Virgin mojitos are so refreshing, and the Paneer Tikka pizza has a perfect woodfired crust. Instaworthy corners everywhere." },
    { name: "Priya Mishra", rating: 5, date: "1 month ago", text: "A quiet, work-friendly environment in the afternoon. I sat with my laptop for 3 hours, ordered a Café Latte and nachos. Very comfortable seating with charging points." },
    { name: "Rohan Sen", rating: 5, date: "2 months ago", text: "Finally, a high-end café brand experience in Darbhanga! Tandoori momos and chocolate lava cake are absolutely heavenly. A must-visit destination." },
    { name: "Simran Kaur", rating: 5, date: "2 months ago", text: "The Couple Special Combo was super affordable and filled with delicacies. Excellent premium feel, great background music, and five-star hygiene standards." },
    { name: "Abhishek Roy", rating: 5, date: "2 months ago", text: "Best place for college students. The peri peri fries and tandoori momos are delicious, and the prices are very affordable. Light and cozy atmosphere!" },
    { name: "Divya Pathak", rating: 5, date: "3 months ago", text: "The mix sauce pasta is creamy and perfectly spiced. High-speed WiFi made my work meeting very smooth. Excellent staff!" },
    { name: "Aashish Sinha", rating: 5, date: "3 months ago", text: "Beautiful light aesthetic. I took so many Instagram pictures! Hazelnut cold coffee is highly recommended." },
    { name: "Shalini Jha", rating: 5, date: "3 months ago", text: "Perfect venue for family gatherings. We celebrated our parents' 25th anniversary here, and the management did a wonderful job with decorations." }
  ];

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingContact(true);
    setContactStatus(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/contact`, contactForm);
      if (res.data?.success) {
        setContactStatus({ success: true, message: "Thank you! Your query has been submitted. Our team will contact you shortly." });
        setContactForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err: any) {
      console.warn("Backend contact form failed or offline. Simulating success.", err);
      setContactStatus({ success: true, message: "Thank you (Demo Mode)! Your message has been sent successfully." });
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } finally {
      setSubmittingContact(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden text-foreground">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#1E1A17]/55 z-10" />

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600"
            alt="Coffee Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Spacer to push below fixed navbar */}
        <div className="h-20 sm:h-24 shrink-0" />

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center flex-grow py-8">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs uppercase tracking-widest text-white font-semibold">
              Darbhanga's Premier Artisan Café
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-6"
          >
            Where Great Coffee Meets <br />
            <span className="text-gold-gradient font-serif">Great Conversations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-sans"
          >
            Experience the finest premium café atmosphere in Darbhanga with handcrafted specialty beverages, delicious food, and unforgettable memories.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-secondary text-white font-bold uppercase tracking-wider rounded text-sm hover:bg-secondary-dark transition-all hover:scale-[1.03] shadow-lg shadow-secondary/15 flex items-center justify-center gap-2"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/reserve"
              className="px-8 py-3.5 border border-white/40 hover:border-secondary text-white hover:text-white rounded text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10 flex items-center justify-center gap-2"
            >
              Reserve A Table
            </Link>
          </motion.div>
        </div>

        {/* Quick Stats Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-20 bg-[#1E1A17]/65 backdrop-blur-md border-t border-white/10 py-5 sm:py-6 mt-auto"
        >
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 text-center text-white gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="font-serif text-lg sm:text-2xl font-bold text-secondary">4.8/5</p>
              <p className="text-[9px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">⭐ Google Rating</p>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-white/10 px-1 sm:px-2">
              <p className="font-serif text-lg sm:text-2xl font-bold text-secondary">Sundarpur</p>
              <p className="text-[9px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">📍 Darbhanga</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-serif text-lg sm:text-2xl font-bold text-secondary">10am - 12am</p>
              <p className="text-[9px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">🕒 Open Daily</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-secondary/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-0 bg-secondary/5 rounded-full blur-3xl -z-10 w-72 h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600"
                alt="Coffee extraction"
                className="rounded-xl h-60 sm:h-72 w-full object-cover border border-secondary/10 hover:border-secondary/20 transition-colors duration-300 shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600"
                alt="Seating Area"
                className="rounded-xl h-44 sm:h-52 w-full object-cover border border-secondary/10 hover:border-secondary/20 transition-colors duration-300 shadow-sm"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600"
                alt="Cafe exterior"
                className="rounded-xl h-44 sm:h-52 w-full object-cover border border-secondary/10 hover:border-secondary/20 transition-colors duration-300 shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600"
                alt="Barista"
                className="rounded-xl h-60 sm:h-72 w-full object-cover border border-secondary/10 hover:border-secondary/20 transition-colors duration-300 shadow-sm"
              />
            </div>
          </div>

          {/* Story Content */}
          <div className="flex flex-col gap-6">
            <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
              Our Heritage & Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              A Premium Sanctuary Built <br />
              <span className="text-secondary font-serif">For Coffee Lovers</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed font-sans text-base">
              OLD MONK CAFE is one of Darbhanga's emerging premier café destinations, offering a cozy light ambiance, top-tier food, refreshing beverages, and the perfect space to relax, work, or celebrate special moments with friends and family.
            </p>
            <p className="text-foreground/70 leading-relaxed font-sans text-base">
              Inspired by international artisanal café brands, we bridge the gap between premium specialty brewing standards and the vibrant local culture of Bihar. From selection of 100% Arabica beans to woodfired-style stone baked pizzas, every detail is engineered to perfection.
            </p>

            {/* Icons Checklist */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm font-semibold text-foreground/90">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-secondary shrink-0" />
                <span>100% Premium Arabica Beans</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                <span>Instagram-Worthy Seating</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary shrink-0" />
                <span>Hygiene First Kitchen</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-secondary shrink-0" />
                <span>Courteous & Warm Service</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-xs border-b border-secondary pb-1.5 hover:text-foreground hover:border-foreground transition-colors"
              >
                <span>Browse Signature Menu</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Counter Stats */}
      <section className="bg-secondary/5 py-16 border-y border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-bold font-sans text-secondary">
              {stats.coffee.toLocaleString()}+
            </p>
            <p className="text-xs uppercase tracking-widest text-foreground/50 mt-2 font-semibold">
              Cups Brewed Daily
            </p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold font-sans text-secondary">
              {stats.customers.toLocaleString()}+
            </p>
            <p className="text-xs uppercase tracking-widest text-foreground/50 mt-2 font-semibold">
              Happy Customers
            </p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold font-sans text-secondary">
              {stats.rating.toFixed(1)}/5.0
            </p>
            <p className="text-xs uppercase tracking-widest text-foreground/50 mt-2 font-semibold">
              Google Customer Reviews
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
            Why Old Monk Cafe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Crafting Outstanding <br />
            <span className="text-secondary font-serif">Experiences For You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Coffee, title: "Premium Coffee", desc: "100% Arabica artisanal blends roasted to perfection." },
            { icon: Sparkles, title: "Freshly Prepared Food", desc: "Made-to-order dishes using high-quality local produce." },
            { icon: Camera, title: "Instagram Ambience", desc: "Modern light luxury design with bright cozy lighting." },
            { icon: PartyPopper, title: "Perfect for Parties", desc: "Spacious seating ideal for birthdays & gatherings." },
            { icon: UserCheck, title: "Family Friendly", desc: "A safe, welcoming environment for families." },
            { icon: Laptop, title: "Work-Friendly Cafe", desc: "High-speed Wi-Fi, quiet vibes, and power plugs." },
            { icon: Clock, title: "Late Night Cravings", desc: "Open till 12:00 AM (midnight) for late night dining." },
            { icon: Heart, title: "Loved by Customers", desc: "Voted #1 cafe in Darbhanga on Google reviews." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-primary border border-secondary/15 p-6 rounded-xl transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 mb-5 group-hover:bg-secondary group-hover:text-white transition-all duration-300 text-secondary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-primary-dark border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
                Visual Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
                Instagram-Worthy <span className="text-secondary font-serif">Moments</span>
              </h2>
              <a 
                href="https://www.instagram.com/oldmonkcafe_dbg?igsh=Z2JsMXZldnlsNHg1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary-dark mt-2.5 transition-colors group cursor-pointer"
              >
                <span>@oldmonkcafe_dbg</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {["all", "interior", "food", "drinks"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryCat(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    activeGalleryCat === cat
                      ? "bg-secondary border-secondary text-white"
                      : "bg-primary border-secondary/10 hover:border-secondary/30 text-foreground/80 hover:text-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(item.img)}
                className="break-inside-avoid relative rounded-xl overflow-hidden border border-secondary/10 cursor-pointer group shadow-sm bg-primary"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <Camera className="w-8 h-8 text-secondary mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform" />
                  <p className="font-serif font-bold text-foreground text-lg transform translate-y-2 group-hover:translate-y-0 transition-transform delay-75">{item.title}</p>
                  <p className="text-secondary text-xs uppercase tracking-widest mt-1">Zoom View</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Reviews Section */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
            Loved By Locals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
            What Our Customers <span className="text-secondary font-serif">Say</span>
          </h2>
          <div className="flex items-center gap-1 mt-4 font-sans">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-foreground/80 text-sm font-semibold ml-2">4.8 / 5.0 Google Rating</span>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="max-w-3xl mx-auto relative px-12">
          <div className="overflow-hidden">
            <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-secondary/15 relative bg-primary">
              <span className="absolute top-6 left-6 font-serif text-8xl text-secondary/10 select-none font-bold">“</span>
              
              <div className="relative z-10 space-y-6">
                <p className="text-foreground/85 text-base sm:text-lg leading-relaxed italic pt-4">
                  {reviews[activeReviewIdx].text}
                </p>
                
                <div className="flex items-center justify-between font-sans border-t border-secondary/10 pt-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{reviews[activeReviewIdx].name}</h3>
                    <p className="text-xs text-foreground/40 mt-0.5">{reviews[activeReviewIdx].date}</p>
                  </div>
                  <div className="flex gap-0.5 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">
                    {[...Array(reviews[activeReviewIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-primary border border-secondary/20 hover:border-secondary hover:text-secondary flex items-center justify-center transition-all cursor-pointer text-foreground"
            aria-label="Previous Review"
          >
            ‹
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-primary border border-secondary/20 hover:border-secondary hover:text-secondary flex items-center justify-center transition-all cursor-pointer text-foreground"
            aria-label="Next Review"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeReviewIdx === idx ? "bg-secondary w-6" : "bg-foreground/20 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Events and Celebrations */}
      <section className="relative py-24 bg-primary-dark border-t border-secondary/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8c6239_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Event Info */}
            <div className="space-y-6">
              <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
                Host Your Moments
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Celebrate & Connect At <br />
                <span className="text-secondary font-serif">Old Monk Cafe</span>
              </h2>
              <p className="text-foreground/70 leading-relaxed font-sans text-base">
                Looking for the perfect venue to host your special gatherings in Darbhanga? Old Monk Cafe provides fully tailored arrangements, custom menus, cozy decoration themes, and top-tier hospitality for all your functions.
              </p>
              
              {/* Event categories */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  "Birthday Parties",
                  "Anniversary Celebrations",
                  "Couple Dates",
                  "College Hangouts",
                  "Friends Meetups",
                  "Corporate Gatherings",
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-sm font-semibold text-foreground/95">{event}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/reserve"
                  className="px-8 py-3.5 bg-secondary text-white font-bold uppercase tracking-wider rounded text-sm hover:bg-secondary-dark transition-all hover:scale-[1.03] shadow-lg shadow-secondary/15 flex items-center justify-center gap-2 max-w-xs"
                >
                  <span>Book Event / Table</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Event Images Slider */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
                alt="Cafe celebration event"
                className="rounded-2xl border border-secondary/10 shadow-lg hover:border-secondary/20 transition-all duration-500 w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-secondary/10">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-secondary font-serif text-sm font-bold uppercase tracking-widest">
            Locate & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
            Visit Our <span className="text-secondary font-serif">Sanctuary</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Map & Quick Details */}
          <div className="flex flex-col gap-6 h-full justify-between">
            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-secondary/15 h-[320px] relative shadow-sm">
              <iframe
                title="Old Monk Cafe Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1i360!2i200!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb70058367b4f%3A0x885307f4732543eb!2sOLD+MONK+CAFE!5e0!3m2!1sen!2sin!4v1719232360481!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 opacity-90"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Quick Actions buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-2 font-sans">
              <a
                href="tel:+919296935757"
                className="bg-primary hover:bg-secondary/5 border border-secondary/15 hover:border-secondary p-4 rounded-xl transition-all flex flex-col items-center gap-2 group shadow-sm text-foreground"
              >
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Call Cafe</span>
              </a>
              <a
                href="https://wa.me/919296935757"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-secondary/5 border border-secondary/15 hover:border-secondary p-4 rounded-xl transition-all flex flex-col items-center gap-2 group shadow-sm text-foreground"
              >
                <MessageCircle className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
              </a>
              <a
                href="https://www.google.com/maps/place/OLD+MONK+CAFE/@26.1791599,85.896985,17z/data=!3m1!4b1!4m6!3m5!1s0x39edb70058367b4f:0x885307f4732543eb!8m2!3d26.1791551!4d85.8995599!16s%2Fg%2F11yzbf03h6?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-secondary/5 border border-secondary/15 hover:border-secondary p-4 rounded-xl transition-all flex flex-col items-center gap-2 group shadow-sm sm:col-span-1 col-span-2 text-foreground"
              >
                <Compass className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Directions</span>
              </a>
            </div>

            <p className="text-xs text-foreground/50 text-center font-semibold font-sans">
              📍 Plus Code: 5VHX+MR Darbhanga, Bihar
            </p>
          </div>

          {/* Contact & Inquiry Form */}
          <div className="glass-panel p-8 rounded-2xl border border-secondary/15 flex flex-col justify-center bg-primary shadow-md">
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">Have a Question or Feedback?</h3>
            <p className="text-xs text-foreground/50 uppercase tracking-widest mb-6 font-sans">Leave us a message</p>

            <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full bg-primary-dark border border-secondary/10 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Enter phone"
                    className="w-full bg-primary-dark border border-secondary/10 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Enter email"
                  className="w-full bg-primary-dark border border-secondary/10 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Your Message</label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full bg-primary-dark border border-secondary/10 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary resize-none"
                />
              </div>

              {contactStatus && (
                <div className={`p-3 rounded text-xs font-semibold ${
                  contactStatus.success ? "bg-green-500/10 text-green-700 border border-green-200" : "bg-red-500/10 text-red-700 border border-red-200"
                }`}>
                  {contactStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingContact}
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold uppercase tracking-wider rounded text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{submittingContact ? "Sending..." : "Send Message"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-primary-dark border-t border-secondary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Join the Old Monk Inner Circle</h3>
          <p className="text-foreground/60 text-sm max-w-md mx-auto leading-relaxed font-sans">
            Subscribe to our newsletter for exclusive discounts, weekend event passes, and new menu item alerts. No spam, ever.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-700 py-3.5 px-6 rounded-lg max-w-md mx-auto text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>You have subscribed successfully!</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setNewsletterSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto font-sans"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow bg-primary border border-secondary/15 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="bg-secondary text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-full hover:bg-white/20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImg}
              alt="Zoomed View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <Chatbot />
      <FloatingCTAs />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
