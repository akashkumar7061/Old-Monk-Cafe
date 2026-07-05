"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Calendar, 
  Coffee,
  LayoutDashboard,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onCartClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  const isDarkBg = !scrolled && pathname === "/";
  const logoSrc = (isDarkBg || theme === "dark") ? "/logo_black_bg.jpg" : "/logo_white_bg.jpg";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href === "/" && pathname === "/") {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (href.startsWith("/#") && pathname !== "/") {
      router.push(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-secondary/10 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => handleLinkClick("/")}
            className="flex flex-col items-center group select-none leading-none py-1"
          >
            <span className="font-sans font-black tracking-widest text-lg sm:text-2xl text-foreground transition-colors duration-300 flex items-center">
              OLD M
              <span className="relative inline-flex items-center justify-center mx-0.5 w-[1.1em] h-[1.1em]">
                <img
                  src={logoSrc}
                  alt="O"
                  className="absolute w-full h-full rounded-full object-cover border border-[#E53935] transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              NK
            </span>
            <span className="text-foreground font-serif italic font-semibold text-xs sm:text-sm tracking-widest flex items-center justify-center w-full mt-1 opacity-95">
              <span className="h-[1px] w-3 sm:w-5 bg-[#E53935] mr-1.5 shrink-0"></span>
              Cafe
              <span className="h-[1px] w-3 sm:w-5 bg-[#E53935] ml-1.5 shrink-0"></span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-secondary ${
                  pathname === link.href || (link.href.startsWith("/#") && pathname === "/" && currentHash === link.href.substring(1))
                    ? "text-secondary font-semibold"
                    : isDarkBg
                      ? "text-white/80"
                      : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Table Booking */}
            <Link
              href="/reserve"
              className="hidden lg:flex items-center gap-2 px-5 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 rounded text-sm font-medium uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              Book Table
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 hover:bg-secondary/10 rounded-full transition-colors duration-300 group ${
                isDarkBg ? "text-white" : "text-foreground"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5.5 h-5.5 group-hover:text-secondary transition-colors duration-300" />
              ) : (
                <Sun className="w-5.5 h-5.5 group-hover:text-secondary transition-colors duration-300" />
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 hover:bg-secondary/10 rounded-full transition-colors duration-300 group"
              aria-label="Open Cart"
            >
              <ShoppingBag className={`w-5.5 h-5.5 group-hover:text-secondary transition-colors duration-300 ${
                isDarkBg ? "text-white" : "text-foreground"
              }`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white font-sans text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Dashboard */}
            {isAuthenticated ? (
              <div className="relative group/profile">
                <button
                  className={`flex items-center gap-1.5 p-1 px-3 hover:bg-secondary/10 rounded-full transition-colors duration-300 border border-secondary/20 ${
                    isDarkBg ? "text-white" : "text-foreground"
                  }`}
                >
                  <UserIcon className="w-4.5 h-4.5 text-secondary" />
                  <span className="hidden sm:inline text-xs font-medium max-w-[80px] truncate">
                    {user?.name.split(" ")[0]}
                  </span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 glass-panel rounded-lg shadow-xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 py-1 overflow-hidden">
                  <div className="px-4 py-2 border-b border-secondary/10 bg-secondary/5">
                    <p className="text-[10px] text-foreground/50">Logged in as</p>
                    <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:text-secondary hover:bg-secondary/5 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-secondary" />
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:text-secondary hover:bg-secondary/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-secondary" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/reserve"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:text-secondary hover:bg-secondary/5 transition-colors lg:hidden"
                  >
                    <Calendar className="w-4 h-4 text-secondary" />
                    Book Table
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:text-red-500 hover:bg-red-50 transition-colors border-t border-secondary/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-1.5 p-2 px-4 border border-secondary/20 hover:border-secondary rounded text-xs uppercase tracking-wider hover:bg-secondary/5 transition-all font-medium ${
                  isDarkBg ? "text-white hover:text-secondary" : "text-foreground hover:text-secondary"
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 md:hidden hover:bg-secondary/10 rounded-full transition-colors ${
                isDarkBg ? "text-white" : "text-foreground"
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-background pt-24 pb-8 px-6 border-b border-secondary/10 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-5 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-lg font-semibold py-1 transition-colors ${
                    pathname === link.href || (link.href.startsWith("/#") && pathname === "/" && currentHash === link.href.substring(1))
                      ? "text-secondary font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 border-t border-secondary/10 pt-6">
              {isAuthenticated && (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-secondary text-secondary font-bold uppercase tracking-wider rounded text-sm transition-colors hover:bg-secondary/5"
                >
                  <UserIcon className="w-4 h-4" />
                  My Profile
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 w-full py-3 border border-secondary text-secondary font-bold uppercase tracking-wider rounded text-sm transition-colors hover:bg-secondary/5"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
              <Link
                href="/reserve"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-white font-bold uppercase tracking-wider rounded text-sm transition-colors hover:bg-secondary-dark"
              >
                <Calendar className="w-4 h-4" />
                Book A Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
