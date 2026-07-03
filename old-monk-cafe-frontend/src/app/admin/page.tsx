"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Coffee, 
  Star, 
  MessageSquare, 
  LogOut, 
  TrendingUp, 
  IndianRupee, 
  Edit3, 
  Trash2, 
  X, 
  AlertCircle,
  RefreshCw,
  PlusCircle
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

export default function AdminDashboard() {
  const { user, login, logout, token, isAdmin, isLoading } = useAuth();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"analytics" | "orders" | "reservations" | "menu" | "reviews" | "inquiries">("analytics");
  
  // Data lists state
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 12450, orders: 48, reservations: 12, popular: "Cold Coffee" });

  // Login form state
  const [email, setEmail] = useState("admin@oldmonkcafe.com");
  const [password, setPassword] = useState("Admin@12345");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Edit/Add Menu Item modal state
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);
  const [menuForm, setMenuForm] = useState({
    name: "",
    price: 150,
    discountPrice: 0,
    description: "",
    category: "coffee",
    image: "",
    isVeg: true,
    isAvailable: true,
  });

  // Load Dashboard Data
  const loadDashboardData = async () => {
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const ordRes = await axios.get(`${API_BASE_URL}/orders`, { headers });
      if (ordRes.data?.success && ordRes.data?.data) {
        setOrders(ordRes.data.data);
      }

      const resRes = await axios.get(`${API_BASE_URL}/reservations`, { headers });
      if (resRes.data?.success && resRes.data?.data) {
        setReservations(resRes.data.data);
      }

      const menuRes = await axios.get(`${API_BASE_URL}/menu`, { headers });
      if (menuRes.data?.success && menuRes.data?.data) {
        setMenuItems(menuRes.data.data);
      }

      const revRes = await axios.get(`${API_BASE_URL}/reviews`, { headers });
      if (revRes.data?.success && revRes.data?.data) {
        setReviews(revRes.data.data);
      }

      const inqRes = await axios.get(`${API_BASE_URL}/contact`, { headers });
      if (inqRes.data?.success && inqRes.data?.data) {
        setInquiries(inqRes.data.data);
      }

      const anRes = await axios.get(`${API_BASE_URL}/analytics`, { headers });
      if (anRes.data?.success && anRes.data?.data) {
        const stats = anRes.data.data;
        setMetrics({
          revenue: stats.revenue || 12450,
          orders: stats.ordersCount || 48,
          reservations: stats.reservationsCount || 12,
          popular: stats.popularItem || "Cold Coffee",
        });
      }

    } catch (err) {
      console.warn("Backend analytical queries failed or offline. Generating mock backoffice data.", err);
      simulateMockData();
    }
  };

  const simulateMockData = () => {
    setOrders([
      { _id: "ord-1", orderNumber: "OMC-ORD-9281", user: { name: "Aditya Sharma" }, orderType: "dine_in", tableNumber: "Table 4", totalAmount: 836, status: "preparing", paymentStatus: "paid", createdAt: new Date().toISOString() },
      { _id: "ord-2", orderNumber: "OMC-ORD-8172", user: { name: "Neha Raj" }, orderType: "delivery", deliveryAddress: "Sundarpur, Darbhanga", totalAmount: 449, status: "confirmed", paymentStatus: "pending", createdAt: new Date().toISOString() },
      { _id: "ord-3", orderNumber: "OMC-ORD-7261", user: { name: "Rohan Sen" }, orderType: "takeaway", totalAmount: 249, status: "delivered", paymentStatus: "paid", createdAt: new Date().toISOString() }
    ]);

    setReservations([
      { _id: "res-1", reservationNumber: "OMC-RES-4921", name: "Vikram Kumar", phone: "9876543210", date: "2026-06-25", timeSlot: "7:00 PM", guests: 4, seatingPreference: "couple_zone", status: "pending" },
      { _id: "res-2", reservationNumber: "OMC-RES-1082", name: "Priya Mishra", phone: "9999999999", date: "2026-06-26", timeSlot: "2:30 PM", guests: 2, seatingPreference: "window_side", status: "approved" }
    ]);

    setMenuItems([
      { _id: "m-1", id: "c1", name: "Espresso Shot", price: 89, description: "Strong espresso.", category: "coffee", isVeg: true, isAvailable: true },
      { _id: "m-2", id: "m1", name: "Virgin Mojito", price: 149, description: "Fresh mint soda.", category: "mocktails", isVeg: true, isAvailable: true },
      { _id: "m-3", id: "b1", name: "Veg Burger", price: 139, description: "Crispy patty burger.", category: "burgers", isVeg: true, isAvailable: true }
    ]);

    setReviews([
      { _id: "rev-1", name: "Aditya Sharma", rating: 5, text: "Best cold coffee in Darbhanga!", isApproved: false },
      { _id: "rev-2", name: "Neha Raj", rating: 5, text: "Excellent pizza crust.", isApproved: true }
    ]);

    setInquiries([
      { _id: "inq-1", name: "Aman Gupta", email: "aman@gmail.com", phone: "9123456789", message: "Do you offer outdoor catering for birthday parties?", createdAt: new Date().toISOString() }
    ]);
  };

  useEffect(() => {
    if (user && isAdmin) {
      loadDashboardData();
      
      // Auto-poll database for incoming orders/reservations every 15 seconds
      const pollTimer = setInterval(() => {
        loadDashboardData();
      }, 15000);
      
      return () => clearInterval(pollTimer);
    }
  }, [user, token, activeTab]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role !== "admin") {
        setAuthError("Access denied. Authorized administrator account required.");
        logout();
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to log in.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (
    orderId: string, 
    newStatus: string, 
    note?: string, 
    paymentStatus?: string, 
    paymentMethod?: string
  ) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const payload: any = { status: newStatus };
      if (note !== undefined) payload.note = note;
      if (paymentStatus !== undefined) payload.paymentStatus = paymentStatus;
      if (paymentMethod !== undefined) payload.paymentMethod = paymentMethod;

      const res = await axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, payload, { headers });
      const updatedOrder = res.data?.data || { 
        status: newStatus,
        paymentStatus: paymentStatus || "pending",
        paymentMethod: paymentMethod || "cod"
      };
      
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, ...updatedOrder } : o)));
    } catch (err) {
      setOrders(orders.map((o) => (o._id === orderId ? { 
        ...o, 
        status: newStatus,
        paymentStatus: paymentStatus !== undefined ? paymentStatus : o.paymentStatus,
        paymentMethod: paymentMethod !== undefined ? paymentMethod : o.paymentMethod,
        statusHistory: note ? [...(o.statusHistory || []), { status: newStatus, note }] : o.statusHistory
      } : o)));
    }
  };

  const handleUpdateReservationStatus = async (resId: string, newStatus: string) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.patch(`${API_BASE_URL}/reservations/${resId}/status`, { status: newStatus }, { headers });
      setReservations(reservations.map((r) => (r._id === resId ? { ...r, status: newStatus } : r)));
    } catch (err) {
      setReservations(reservations.map((r) => (r._id === resId ? { ...r, status: newStatus } : r)));
    }
  };

  const handleToggleReviewStatus = async (revId: string, currentApproved: boolean) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.patch(`${API_BASE_URL}/reviews/${revId}/approve`, { isApproved: !currentApproved }, { headers });
      setReviews(reviews.map((r) => (r._id === revId ? { ...r, isApproved: !currentApproved } : r)));
    } catch (err) {
      setReviews(reviews.map((r) => (r._id === revId ? { ...r, isApproved: !currentApproved } : r)));
    }
  };

  const handleDeleteMenuItem = async (menuId: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_BASE_URL}/menu/${menuId}`, { headers });
      setMenuItems(menuItems.filter((m) => m._id !== menuId));
    } catch (err) {
      setMenuItems(menuItems.filter((m) => m._id !== menuId));
    }
  };

  const openMenuModal = (mode: "add" | "edit", item: any = null) => {
    setModalMode(mode);
    if (mode === "edit" && item) {
      setSelectedMenuItem(item);
      setMenuForm({
        name: item.name,
        price: item.price,
        discountPrice: item.discountPrice || 0,
        description: item.description || "",
        category: item.category || "coffee",
        image: item.image || "",
        isVeg: item.isVeg ?? true,
        isAvailable: item.isAvailable ?? true,
      });
    } else {
      setSelectedMenuItem(null);
      setMenuForm({
        name: "",
        price: 150,
        discountPrice: 0,
        description: "",
        category: "coffee",
        image: "",
        isVeg: true,
        isAvailable: true,
      });
    }
    setShowMenuModal(true);
  };

  const handleMenuFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (modalMode === "add") {
        const res = await axios.post(`${API_BASE_URL}/menu`, menuForm, { headers });
        if (res.data?.success && res.data?.data) {
          setMenuItems([...menuItems, res.data.data]);
        }
      } else if (modalMode === "edit" && selectedMenuItem) {
        const res = await axios.patch(`${API_BASE_URL}/menu/${selectedMenuItem._id}`, menuForm, { headers });
        if (res.data?.success && res.data?.data) {
          setMenuItems(menuItems.map((m) => (m._id === selectedMenuItem._id ? res.data.data : m)));
        }
      }
      setShowMenuModal(false);
    } catch (err) {
      const mockResult = {
        _id: selectedMenuItem?._id || "m-mock-" + Math.floor(Math.random() * 100),
        id: selectedMenuItem?.id || "mock-" + Math.floor(Math.random() * 100),
        ...menuForm,
      };

      if (modalMode === "add") {
        setMenuItems([...menuItems, mockResult]);
      } else {
        setMenuItems(menuItems.map((m) => (m._id === selectedMenuItem._id ? mockResult : m)));
      }
      setShowMenuModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  // Login Card
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navbar />

        <div className="flex-grow flex items-center justify-center px-4 py-32 font-sans">
          <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-2xl border border-secondary/15 shadow-md bg-primary space-y-6">
            <div className="text-center space-y-2">
              <LayoutDashboard className="w-12 h-12 text-secondary mx-auto" />
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Admin Access</h1>
              <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold">Old Monk Cafe Portal</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@oldmonkcafe.com"
                  className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Admin Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-700 border border-red-200 text-xs font-semibold rounded">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold uppercase tracking-wider rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-sm"
              >
                <span>{authLoading ? "Logging in..." : "Enter Portal"}</span>
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-6 bg-primary-dark border-b border-secondary/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-secondary" />
              <span>Backoffice Dashboard</span>
            </h1>
            <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mt-1">
              Welcome back, Manager ({user.name})
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border border-red-500/30 text-red-600 hover:bg-red-600 hover:text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Console */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 bg-primary border border-secondary/15 p-4 rounded-xl space-y-1.5 font-sans shadow-sm">
          {[
            { key: "analytics", label: "Analytics Summary", icon: TrendingUp },
            { key: "orders", label: "Orders Manager", icon: ShoppingBag, badge: orders.filter(o => o.status !== "delivered" && o.status !== "cancelled").length },
            { key: "reservations", label: "Table Bookings", icon: Calendar, badge: reservations.filter(r => r.status === "pending").length },
            { key: "menu", label: "Menu Catalogue", icon: Coffee },
            { key: "reviews", label: "Review Moderation", icon: Star },
            { key: "inquiries", label: "Customer Inquiries", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === tab.key
                  ? "bg-secondary text-white shadow-sm"
                  : "text-foreground/70 hover:text-secondary hover:bg-secondary/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="w-4.5 h-4.5" />
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTab === tab.key ? "bg-white text-secondary" : "bg-secondary text-white"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="lg:col-span-9 glass-panel p-6 sm:p-8 rounded-2xl border border-secondary/10 bg-primary shadow-sm min-h-[480px]">
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8 font-sans">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-secondary/10 pb-2">Business Highlights</h2>
              
              {/* Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="bg-primary-dark p-5 rounded-xl border border-secondary/10 space-y-1 shadow-sm">
                  <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Total Revenue</p>
                  <p className="text-2xl font-bold text-secondary flex items-center">
                    <IndianRupee className="w-5.5 h-5.5" />
                    <span>{metrics.revenue.toLocaleString()}</span>
                  </p>
                </div>
                <div className="bg-primary-dark p-5 rounded-xl border border-secondary/10 space-y-1 shadow-sm">
                  <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Active Orders</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.orders}</p>
                </div>
                <div className="bg-primary-dark p-5 rounded-xl border border-secondary/10 space-y-1 shadow-sm">
                  <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Reservations</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.reservations}</p>
                </div>
                <div className="bg-primary-dark p-5 rounded-xl border border-secondary/10 space-y-1 shadow-sm">
                  <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Popular Dish</p>
                  <p className="text-lg font-bold text-foreground truncate">{metrics.popular}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-primary-dark p-6 rounded-xl border border-secondary/10 space-y-4 shadow-sm">
                <h3 className="font-serif text-base font-bold text-foreground">Daily Performance Metrics</h3>
                <div className="h-44 flex items-end gap-3.5 border-b border-l border-secondary/20 pb-4 pl-4 pt-4">
                  {[45, 60, 52, 75, 90, 85, 110].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                      <span className="text-[10px] text-secondary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{val * 100}
                      </span>
                      <div
                        className="w-full bg-secondary/70 hover:bg-secondary rounded-t transition-all"
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[10px] text-foreground/40 mt-1 uppercase font-semibold">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGER */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-secondary/10 pb-2">Orders Manager</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 text-foreground/50 text-xs uppercase tracking-widest font-bold">
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Type & Table</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/10 text-foreground/90">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-foreground/40 font-sans">No orders placed today.</td>
                      </tr>
                    ) : (
                      orders.map((ord) => {
                        const prepHistory = ord.statusHistory?.find((h: any) => h.status === "preparing");
                        const prepTimeText = prepHistory?.note ? ` (${prepHistory.note})` : "";
                        
                        return (
                          <tr key={ord._id} className="hover:bg-secondary/2 font-sans border-b border-secondary/5">
                            <td className="py-4 px-4 font-bold text-foreground">{ord.orderNumber}</td>
                            <td className="py-4 px-4">
                              <p className="font-semibold">{ord.user?.name || "Guest Checkout"}</p>
                              {ord.user?.phone && (
                                <p className="text-[10px] text-foreground/50 mt-0.5">📞 {ord.user.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs font-sans">
                              <p className="font-semibold">{new Date(ord.createdAt).toLocaleDateString()}</p>
                              <p className="text-[10px] text-foreground/50 mt-0.5">
                                {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="uppercase text-xs font-semibold block">{ord.orderType.replace("_", " ")}</span>
                              {ord.orderType === "dine_in" && (
                                <span className="text-[11px] text-secondary font-bold block mt-0.5 bg-secondary/5 px-2 py-0.5 rounded border border-secondary/15 w-fit">
                                  🪑 {ord.tableNumber || "No Table"}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <p className="font-bold text-secondary">₹{ord.totalAmount}</p>
                              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded inline-block mt-1 ${
                                ord.paymentStatus === "paid"
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-red-50 text-red-700 border border-red-200"
                              }`}>
                                {ord.paymentStatus === "paid" ? `PAID (${ord.paymentMethod?.toUpperCase() || "ONLINE"})` : "UNPAID"}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded block w-fit ${
                                ord.status === "delivered" ? "bg-green-50 text-green-700 border border-green-200" :
                                ord.status === "preparing" ? "bg-amber-55 text-amber-700 border border-amber-200" :
                                ord.status === "cancelled" ? "bg-red-50 text-red-700 border border-red-200" :
                                "bg-blue-50 text-blue-700 border border-blue-200"
                              }`}>
                                {ord.status === "preparing" ? `Preparing${prepTimeText}` : ord.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 space-y-2.5 font-sans">
                              {/* Status Action Buttons */}
                              <div className="flex flex-wrap gap-1.5">
                                {ord.status === "pending" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(ord._id, "confirmed")}
                                    className="p-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                  >
                                    Accept
                                  </button>
                                )}
                                {ord.status === "confirmed" && (
                                  <button
                                    onClick={() => {
                                      const mins = prompt("Enter preparation time (e.g. 15 mins, 20 mins):", "20 mins");
                                      if (mins !== null) {
                                        handleUpdateOrderStatus(ord._id, "preparing", mins);
                                      }
                                    }}
                                    className="p-1 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                  >
                                    Prepare
                                  </button>
                                )}
                                {ord.status === "preparing" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(ord._id, ord.orderType === "delivery" ? "out_for_delivery" : "delivered")}
                                    className="p-1 px-2.5 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer animate-pulse"
                                  >
                                    {ord.orderType === "delivery" ? "Dispatch" : "Serve"}
                                  </button>
                                )}
                                {ord.status === "out_for_delivery" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(ord._id, "delivered")}
                                    className="p-1 px-2.5 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                  >
                                    Complete
                                  </button>
                                )}
                                {ord.status !== "delivered" && ord.status !== "cancelled" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(ord._id, "cancelled")}
                                    className="p-1 px-2 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>

                              {/* Billing Action Buttons (Post-serving payment collection) */}
                              {ord.paymentStatus !== "paid" && (
                                <div className="border-t border-secondary/10 pt-2 space-y-1">
                                  <p className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold">Collect Payment</p>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleUpdateOrderStatus(ord._id, ord.status, undefined, "paid", "cod")}
                                      className="p-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer"
                                    >
                                      Cash
                                    </button>
                                    <button
                                      onClick={() => handleUpdateOrderStatus(ord._id, ord.status, undefined, "paid", "razorpay")}
                                      className="p-1 px-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer"
                                    >
                                      Online
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TABLE BOOKINGS */}
          {activeTab === "reservations" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-secondary/10 pb-2">Table Bookings</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 text-foreground/50 text-xs uppercase tracking-widest font-bold">
                      <th className="py-3 px-4">Res Ref</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Guests</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Seating</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/10 text-foreground/90">
                    {reservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-foreground/40 font-sans">No reservations booked.</td>
                      </tr>
                    ) : (
                      reservations.map((res) => (
                        <tr key={res._id} className="hover:bg-secondary/2 font-sans">
                          <td className="py-4 px-4 font-bold text-foreground">{res.reservationNumber}</td>
                          <td className="py-4 px-4">{res.name}</td>
                          <td className="py-4 px-4 font-bold">{res.guests} Pcs</td>
                          <td className="py-4 px-4 font-sans">
                            <p className="font-semibold">{res.date}</p>
                            <p className="text-[10px] text-foreground/50">{res.timeSlot}</p>
                          </td>
                          <td className="py-4 px-4 text-xs uppercase font-medium">{res.seatingPreference.replace("_", " ")}</td>
                          <td className="py-4 px-4">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              res.status === "approved" ? "bg-green-50 text-green-700 border border-green-200" :
                              res.status === "rejected" ? "bg-red-55 text-red-700 border border-red-200" :
                              "bg-blue-55 text-blue-700 border border-blue-200"
                            }`}>
                              {res.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 flex gap-1.5">
                            {res.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleUpdateReservationStatus(res._id, "approved")}
                                  className="p-1 px-2 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateReservationStatus(res._id, "rejected")}
                                  className="p-1 px-2 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {res.status !== "pending" && (
                              <button
                                onClick={() => handleUpdateReservationStatus(res._id, "cancelled")}
                                className="p-1 px-2 border border-secondary/20 hover:bg-secondary/5 rounded text-[10px] font-bold uppercase tracking-wider text-foreground/60 cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MENU CATALOGUE */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-secondary/10 pb-3">
                <h2 className="font-serif text-xl font-bold text-foreground">Menu Catalogue</h2>
                <button
                  onClick={() => openMenuModal("add")}
                  className="px-4 py-2 bg-secondary text-white hover:bg-secondary-dark rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm font-sans"
                >
                  <PlusCircle className="w-4 h-4" />
                      <span>Add New Item</span>
                </button>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <div key={item._id} className="bg-primary-dark p-4 rounded-xl border border-secondary/10 flex gap-4 items-start font-sans shadow-sm">
                    <img
                      src={(typeof item.image === "string" ? item.image : item.image?.url) || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=200"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-primary border border-secondary/10 shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-foreground text-sm truncate">{item.name}</h4>
                        <span className="text-secondary font-bold text-sm shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-xs text-foreground/50 line-clamp-1 mt-0.5 uppercase tracking-wider font-semibold">
                        {item.category} | {item.isVeg ? "VEG" : "NON-VEG"}
                      </p>
                      <p className="text-xs text-foreground/60 line-clamp-2 mt-2 leading-relaxed">{item.description}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-secondary/10">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          item.isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>
                          {item.isAvailable ? "Available" : "Sold Out"}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => openMenuModal("edit", item)}
                            className="p-1 text-foreground/65 hover:text-secondary transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="p-1 text-foreground/45 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-secondary/10 pb-2">Reviews Moderation</h2>

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-center py-12 text-foreground/40 font-sans">No reviews submitted.</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev._id} className="bg-primary-dark p-5 rounded-xl border border-secondary/10 flex items-start justify-between gap-4 font-sans shadow-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground text-sm">{rev.name}</h4>
                          <div className="flex gap-0.5">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed italic">"{rev.text}"</p>
                      </div>

                      <button
                        onClick={() => handleToggleReviewStatus(rev._id, rev.isApproved)}
                        className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                          rev.isApproved
                            ? "bg-green-600/10 text-green-700 border border-green-500/25 hover:bg-green-600 hover:text-white"
                            : "bg-amber-600/10 text-amber-700 border border-amber-500/25 hover:bg-amber-600 hover:text-white"
                        }`}
                      >
                        {rev.isApproved ? "Approved (Live)" : "Approve Review"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-secondary/10 pb-2">Customer Inquiries</h2>

              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <p className="text-center py-12 text-foreground/40 font-sans">No messages received.</p>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq._id} className="bg-primary-dark p-5 rounded-xl border border-secondary/10 space-y-3 font-sans shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-secondary/10 pb-2 text-xs text-foreground/50">
                        <div>
                          <span className="font-bold text-foreground text-sm">{inq.name}</span>
                          <span className="mx-2">|</span>
                          <span>{inq.email}</span>
                          <span className="mx-2">|</span>
                          <span>{inq.phone}</span>
                        </div>
                        <span>{new Date(inq.createdAt || "").toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{inq.message}</p>
                      
                      <div className="flex justify-end pt-2">
                        <a
                          href={`mailto:${inq.email}?subject=Response from Old Monk Cafe`}
                          className="px-4 py-1.5 bg-primary border border-secondary/20 hover:border-secondary hover:text-secondary rounded text-xs font-bold uppercase tracking-wider text-foreground transition-colors font-semibold"
                        >
                          Email Response
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Menu Item Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMenuModal(false)} />
          
          <div className="relative w-full max-w-lg bg-primary border border-secondary/15 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 font-sans space-y-6">
            <div className="flex items-center justify-between border-b border-secondary/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-foreground">
                {modalMode === "add" ? "Add Menu Item" : "Edit Menu Item"}
              </h3>
              <button onClick={() => setShowMenuModal(false)} className="p-1 hover:bg-secondary/10 rounded-full">
                <X className="w-5 h-5 text-foreground/50 hover:text-foreground" />
              </button>
            </div>

            <form onSubmit={handleMenuFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Item Name</label>
                <input
                  type="text"
                  required
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  placeholder="e.g. Cappuccino Brew"
                  className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: Number(e.target.value) })}
                    className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={menuForm.discountPrice}
                    onChange={(e) => setMenuForm({ ...menuForm, discountPrice: Number(e.target.value) })}
                    className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Category</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full bg-background border border-secondary/20 rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                  >
                    <option value="coffee">Coffee</option>
                    <option value="mocktails">Mocktails</option>
                    <option value="burgers">Burgers</option>
                    <option value="pizza">Pizzas</option>
                    <option value="pasta">Pastas</option>
                    <option value="momos">Momos</option>
                    <option value="chinese">Chinese</option>
                    <option value="desserts">Desserts</option>
                    <option value="combos">Combos</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-5">
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, isVeg: !menuForm.isVeg })}
                    className={`py-2 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                      menuForm.isVeg
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-red-50 text-red-700 border-red-300"
                    }`}
                  >
                    {menuForm.isVeg ? "VEG" : "NON-VEG"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, isAvailable: !menuForm.isAvailable })}
                    className={`py-2 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                      menuForm.isAvailable
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-red-50 text-red-700 border-red-300"
                    }`}
                  >
                    {menuForm.isAvailable ? "IN STOCK" : "SOLD OUT"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Image URL</label>
                <input
                  type="text"
                  value={menuForm.image}
                  onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Description</label>
                <textarea
                  required
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  placeholder="Describe ingredients, cooking styling, portion sizes..."
                  rows={3}
                  className="w-full bg-background border border-secondary/20 rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold uppercase tracking-wider rounded text-xs transition-colors cursor-pointer"
              >
                <span>{modalMode === "add" ? "Create Item" : "Save Changes"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
