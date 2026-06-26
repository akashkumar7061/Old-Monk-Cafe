"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  CheckCircle, 
  ArrowRight,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ProfilePage() {
  const { user, token, isAuthenticated, isLoading, updateProfile, apiBaseUrl } = useAuth();
  const router = useRouter();

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [updateStatus, setUpdateStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Orders and Reservations data state
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  // Populate form when user details load
  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name, phone: user.phone || "" });
    }
  }, [user]);

  // Fetch orders and reservations
  useEffect(() => {
    if (user && token) {
      const fetchUserData = async () => {
        // Fetch Orders
        setLoadingOrders(true);
        try {
          const res = await axios.get(`${apiBaseUrl}/orders/my`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data?.success && res.data?.data) {
            setOrders(res.data.data);
          }
        } catch (err) {
          console.warn("Backend orders fetch failed or offline. Using simulated data.", err);
          // Set mock orders for demo purposes if backend is offline
          setOrders([
            {
              _id: "ord-mock-1",
              orderNumber: "OMC-ORD-9128",
              totalAmount: 437,
              status: "delivered",
              createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
              items: [
                { name: "Espresso Shot", quantity: 1, price: 89 },
                { name: "Paneer Tikka Pizza", quantity: 1, price: 329 }
              ]
            }
          ]);
        } finally {
          setLoadingOrders(false);
        }

        // Fetch Reservations
        setLoadingReservations(true);
        try {
          const res = await axios.get(`${apiBaseUrl}/reservations/my`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data?.success && res.data?.data) {
            setReservations(res.data.data);
          }
        } catch (err) {
          console.warn("Backend reservations fetch failed or offline. Using simulated data.", err);
          // Set mock reservations
          setReservations([
            {
              _id: "res-mock-1",
              guestCount: 2,
              bookingDate: new Date(Date.now() + 3600000 * 48).toISOString().split("T")[0],
              bookingTime: "07:00 PM",
              seatingPreference: "window_side",
              status: "confirmed"
            }
          ]);
        } finally {
          setLoadingReservations(false);
        }
      };

      fetchUserData();
    }
  }, [user, token, apiBaseUrl]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setUpdateStatus(null);
    try {
      await updateProfile(editForm);
      setUpdateStatus({ success: true, message: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (err: any) {
      setUpdateStatus({ success: false, message: err.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif text-lg text-foreground/75">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
      <Navbar />

      {/* Header Spacer */}
      <div className="h-28 shrink-0" />

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT COLUMN: User Card & Profile Edit */}
          <div className="space-y-6 lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-secondary/15 relative bg-primary overflow-hidden shadow-xl">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl -z-10" />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-secondary/10 border-2 border-secondary/35 flex items-center justify-center text-secondary text-3xl font-serif font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground truncate max-w-full">{user.name}</h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20 mt-1.5 uppercase tracking-wider font-sans">
                    <Shield className="w-3.5 h-3.5" />
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-8 border-t border-secondary/10 pt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-semibold font-sans">Email Address</p>
                    <p className="text-foreground/90 font-medium truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-semibold font-sans">Phone Number</p>
                    <p className="text-foreground/90 font-medium">{user.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Edit Toggle Button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 py-2.5 bg-secondary/10 hover:bg-secondary text-secondary hover:text-white rounded-lg border border-secondary/25 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <form onSubmit={handleUpdateProfile} className="mt-6 border-t border-secondary/10 pt-6 space-y-4">
                  <h4 className="font-serif font-bold text-foreground text-sm">Edit Profile details</h4>

                  <div>
                    <label className="text-xs text-foreground/60 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-background border border-secondary/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-foreground/60 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-background border border-secondary/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 font-sans"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-grow py-2 bg-secondary text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-secondary-dark transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({ name: user.name, phone: user.phone || "" });
                      }}
                      className="px-3 py-2 bg-foreground/5 hover:bg-foreground/15 rounded-lg text-foreground border border-secondary/10 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Status Message */}
              {updateStatus && (
                <div className={`mt-4 p-3 rounded-lg text-xs font-semibold ${
                  updateStatus.success ? "bg-green-600/10 text-green-700 border border-green-500/20" : "bg-red-600/10 text-red-600 border border-red-500/20"
                }`}>
                  {updateStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Orders & Reservations Tabs */}
          <div className="space-y-8 lg:col-span-2">
            {/* Table Reservations Tab */}
            <div className="glass-panel p-6 rounded-2xl border border-secondary/15 bg-primary shadow-xl">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2 border-b border-secondary/10 pb-3">
                <Calendar className="w-5 h-5 text-secondary" />
                Active Table Bookings
              </h3>

              {loadingReservations ? (
                <div className="flex justify-center py-6">
                  <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : reservations.length === 0 ? (
                <p className="text-center py-8 text-foreground/45 text-sm font-sans">No table bookings scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res) => (
                    <div key={res._id} className="bg-primary-dark p-4 rounded-xl border border-secondary/10 flex items-center justify-between gap-4">
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-foreground">Cozy Table for {res.guestCount} Guests</p>
                        <p className="text-xs text-foreground/50 flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> {res.bookingDate}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {res.bookingTime}</span>
                        </p>
                        {res.seatingPreference && (
                          <p className="text-[10px] bg-secondary/10 text-secondary border border-secondary/25 px-2 py-0.5 rounded-full inline-block mt-1 font-sans">
                            Seating: {res.seatingPreference.replace("_", " ")}
                          </p>
                        )}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-sans border ${
                        res.status === "confirmed" 
                          ? "bg-green-600/10 text-green-700 border-green-500/25"
                          : res.status === "pending"
                            ? "bg-amber-600/10 text-amber-700 border-amber-500/25 animate-pulse"
                            : "bg-foreground/5 text-foreground/45 border-secondary/10"
                      }`}>
                        {res.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Orders Tab */}
            <div className="glass-panel p-6 rounded-2xl border border-secondary/15 bg-primary shadow-xl">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2 border-b border-secondary/10 pb-3">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                My Order History
              </h3>

              {loadingOrders ? (
                <div className="flex justify-center py-6">
                  <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length === 0 ? (
                <p className="text-center py-8 text-foreground/45 text-sm font-sans">You haven't placed any orders yet.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-primary-dark p-4 rounded-xl border border-secondary/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-secondary/5 pb-3">
                        <div>
                          <p className="text-xs text-foreground/40 font-sans">Order Number</p>
                          <p className="font-bold text-foreground text-sm">{order.orderNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-foreground/40 font-sans">Total Amount</p>
                          <p className="font-serif font-bold text-secondary">₹{order.totalAmount}</p>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="space-y-1.5">
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs text-foreground/75 font-sans">
                            <span>{item.name} <span className="text-foreground/45 font-medium">x{item.quantity}</span></span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between border-t border-secondary/5 pt-3">
                        <span className="text-[10px] text-foreground/45 font-sans">
                          Placed: {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-sans border ${
                            order.status === "delivered" || order.status === "served"
                              ? "bg-green-600/10 text-green-700 border-green-500/25"
                              : order.status === "preparing" || order.status === "confirmed"
                                ? "bg-amber-600/10 text-amber-700 border-amber-500/25"
                                : "bg-red-600/10 text-red-700 border-red-500/25"
                          }`}>
                            {order.status}
                          </span>
                          
                          <button
                            onClick={() => router.push(`/orders/track/${order._id}`)}
                            className="p-1.5 bg-secondary text-white hover:bg-secondary-dark rounded transition-colors flex items-center justify-center cursor-pointer shadow"
                            title="Track Order Status"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
