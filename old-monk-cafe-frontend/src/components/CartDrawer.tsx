"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    deliveryAddress,
    setDeliveryAddress,
  } = useCart();

  if (!isOpen) return null;

  const taxAmount = Math.round(cartTotal * 0.05); // 5% tax
  const deliveryFee = orderType === "delivery" ? 30 : 0;
  const finalTotal = cartTotal + taxAmount + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-primary border-l border-secondary/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-secondary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5.5 h-5.5 text-secondary" />
              <h2 className="font-serif text-lg font-bold text-foreground">Your Order</h2>
              <span className="bg-secondary/10 text-secondary border border-secondary/20 text-xs px-2 py-0.5 rounded-full font-bold font-sans">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-secondary/10 rounded-full transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5 text-foreground/60 hover:text-foreground" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="w-16 h-16 text-foreground/10 mb-4" />
                <p className="text-foreground/60 text-sm">Your cart is empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs font-bold text-secondary uppercase tracking-wider hover:underline"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Selector */}
                <div className="bg-primary-dark p-1 rounded-lg flex border border-secondary/10">
                  {(["dine_in", "delivery", "takeaway"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 text-center py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
                        orderType === type
                          ? "bg-secondary text-white shadow-sm"
                          : "text-foreground/60 hover:text-foreground hover:bg-white/50"
                      }`}
                    >
                      {type.replace("_", " ")}
                    </button>
                  ))}
                </div>

                {/* Conditional Inputs */}
                {orderType === "dine_in" && (
                  <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/10 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wide text-foreground/70">
                      Table Number
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 5"
                      className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary font-sans"
                    />
                  </div>
                )}

                {orderType === "delivery" && (
                  <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/10 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wide text-foreground/70">
                      Delivery Address
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter full delivery address..."
                      rows={2}
                      className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary font-sans resize-none"
                    />
                  </div>
                )}

                {/* Items List */}
                <div className="divide-y divide-secondary/10 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pt-3 first:pt-0">
                      <img
                        src={(typeof item.image === "string" ? item.image : (item.image as any)?.url) || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=200"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-primary-dark border border-secondary/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-secondary font-sans mt-0.5">₹{item.price}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity control */}
                          <div className="flex items-center gap-1.5 border border-secondary/20 rounded bg-primary-dark px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-secondary text-foreground/60"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold font-sans text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-secondary text-foreground/60"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-foreground/35 hover:text-red-600 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold font-sans text-foreground">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout details */}
          {cart.length > 0 && (
            <div className="border-t border-secondary/10 bg-primary-dark px-6 py-5 space-y-4">
              <div className="space-y-2 text-sm text-foreground/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-sans text-foreground font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="font-sans text-foreground font-semibold">₹{taxAmount}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-sans text-foreground font-semibold">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-foreground border-t border-secondary/15 pt-2 mt-2">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-sans text-secondary text-lg">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout button */}
              <Link
                href={user ? "/checkout" : "/login?redirect=/checkout"}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-white font-bold uppercase tracking-wider rounded text-sm transition-all duration-300 hover:bg-secondary-dark hover:shadow-md hover:shadow-secondary/25"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
