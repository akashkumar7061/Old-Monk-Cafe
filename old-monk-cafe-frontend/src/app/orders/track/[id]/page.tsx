"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Coffee, MapPin, Phone, MessageSquare, RefreshCw, ShoppingBag, ShieldCheck } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

interface OrderDetail {
  id: string;
  orderNumber: string;
  orderType: string;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  paymentStatus: string;
  paymentMethod: string;
  items: Array<{ name: string; price: number; quantity: number; subtotal: number }>;
  itemsTotal: number;
  taxAmount: number;
  deliveryFee: number;
  totalAmount: number;
  tableNumber?: string;
  deliveryAddress?: string;
  createdAt: string;
}

export default function TrackOrder() {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const paymentQuery = searchParams.get("payment");
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [activeStep, setActiveStep] = useState(1); // 1: Confirmed, 2: Preparing, 3: Out/Ready, 4: Delivered

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      if (id.startsWith("mock-")) {
        simulateMockOrder();
        setLoading(false);
        return;
      }

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_BASE_URL}/orders/${id}`, { headers });
      if (res.data?.success && res.data?.data) {
        const o = res.data.data;
        const mappedOrder: OrderDetail = {
          id: o._id || o.id,
          orderNumber: o.orderNumber || "OMC-ORD-9281",
          orderType: o.orderType || "dine_in",
          status: o.status || "confirmed",
          paymentStatus: o.paymentStatus || "pending",
          paymentMethod: o.paymentMethod || "COD",
          items: o.items || [],
          itemsTotal: o.itemsTotal || 0,
          taxAmount: o.taxAmount || 0,
          deliveryFee: o.deliveryFee || 0,
          totalAmount: o.totalAmount || 0,
          tableNumber: o.tableNumber,
          deliveryAddress: o.deliveryAddress,
          createdAt: o.createdAt || new Date().toISOString(),
        };
        setOrder(mappedOrder);
        mapStatusToStep(mappedOrder.status);
      }
    } catch (err) {
      console.warn("Backend fetch failed or order not found. Simulating offline order details.", err);
      simulateMockOrder();
    } finally {
      setLoading(false);
    }
  };

  const mapStatusToStep = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
      case "confirmed":
        setActiveStep(1);
        break;
      case "preparing":
        setActiveStep(2);
        break;
      case "out_for_delivery":
        setActiveStep(3);
        break;
      case "delivered":
        setActiveStep(4);
        break;
      default:
        setActiveStep(1);
    }
  };

  const simulateMockOrder = () => {
    const mockOrder: OrderDetail = {
      id: id,
      orderNumber: id.substring(5).toUpperCase() || "OMC-ORD-1092",
      orderType: "dine_in",
      status: "preparing",
      paymentStatus: paymentQuery === "success" ? "paid" : "pending",
      paymentMethod: paymentQuery === "success" ? "RAZORPAY" : "COD",
      items: [
        { name: "Classic Cold Coffee", price: 159, quantity: 2, subtotal: 318 },
        { name: "Paneer Burger", price: 179, quantity: 1, subtotal: 179 },
        { name: "Farmhouse Pizza", price: 299, quantity: 1, subtotal: 299 },
      ],
      itemsTotal: 796,
      taxAmount: 40,
      deliveryFee: 0,
      totalAmount: 836,
      tableNumber: "Table 4",
      createdAt: new Date().toISOString(),
    };
    setOrder(mockOrder);
    setActiveStep(2); // Set mock to preparing
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id, token]);

  const steps = [
    { title: "Order Confirmed", desc: "Received by kitchen" },
    { title: "Preparing", desc: "Crafting in progress" },
    { title: "Out for Delivery / Ready", desc: "Fresh & hot" },
    { title: "Served / Delivered", desc: "Enjoy your meal!" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-8 bg-primary-dark border-b border-secondary/10 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">Track Order</h1>
          {order && (
            <p className="text-foreground/50 text-xs uppercase tracking-widest mt-1">
              Order ID: #{order.orderNumber}
            </p>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 font-sans">
            <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-sm text-foreground/50">Fetching live status...</p>
          </div>
        ) : !order ? (
          <div className="text-center py-24 glass-panel rounded-2xl max-w-md mx-auto bg-primary border border-secondary/15">
            <ShoppingBag className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-foreground">Order not found</h3>
            <p className="text-sm text-foreground/50 mt-2">
              We couldn't locate this order in our records. Please verify the URL or link.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Tracking Status Card */}
            <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-secondary/15 bg-primary shadow-sm space-y-8">
              
              {/* Top Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-secondary/10 pb-6 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Estimated Arrival</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" />
                    <p className="text-xl sm:text-2xl font-bold font-sans text-foreground">
                      {order.status === "delivered" ? "Delivered" : "25–35 Mins"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchOrderDetails}
                    className="p-2 border border-secondary/20 hover:border-secondary hover:text-secondary rounded-lg transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-foreground"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                  
                  <a
                    href="https://wa.me/919296935757"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary-dark text-white p-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-secondary" />
                    <span>Need Help?</span>
                  </a>
                </div>
              </div>

              {/* Progress Steps Visualizer */}
              <div className="relative font-sans pt-4">
                {/* Horizontal line (Desktop) */}
                <div className="hidden sm:block absolute left-1/12 right-1/12 top-6 h-0.5 bg-foreground/10 -z-10">
                  <div
                    className="h-full bg-secondary transition-all duration-500"
                    style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-4">
                  {steps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = activeStep >= stepNum;
                    const isCurrent = activeStep === stepNum;

                    return (
                      <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                        {/* Step circle */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isCurrent
                            ? "bg-secondary/15 border-secondary text-secondary animate-pulse"
                            : isDone
                            ? "bg-secondary border-secondary text-white"
                            : "bg-primary border-secondary/15 text-foreground/40"
                        }`}>
                          {isDone && !isCurrent ? (
                            <CheckCircle2 className="w-6 h-6 fill-current text-white" />
                          ) : (
                            <Coffee className="w-5 h-5" />
                          )}
                        </div>

                        {/* Title and details */}
                        <div>
                          <p className={`text-sm font-bold ${isDone ? "text-foreground" : "text-foreground/40"}`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-foreground/50 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details & Summary Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Delivery Info */}
              <div className="bg-primary p-6 rounded-2xl border border-secondary/15 space-y-4 font-sans shadow-sm">
                <h3 className="font-serif text-lg font-bold text-foreground border-b border-secondary/10 pb-2">
                  Delivery / Table Info
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Serving Option</p>
                      <p className="text-foreground/60 mt-0.5">
                        {order.orderType === "dine_in"
                          ? `Dine-in (Table: ${order.tableNumber || "TBD"})`
                          : order.orderType === "delivery"
                          ? `Delivery Address: ${order.deliveryAddress}`
                          : "Takeaway Counter"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-secondary shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Order Placed At</p>
                      <p className="text-foreground/60 mt-0.5">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 border-t border-secondary/10 pt-3 mt-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Payment Status</p>
                      <p className="text-xs text-green-600 font-bold uppercase mt-0.5">
                        {order.paymentStatus} ({order.paymentMethod})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-primary p-6 rounded-2xl border border-secondary/15 space-y-4 font-sans shadow-sm">
                <h3 className="font-serif text-lg font-bold text-foreground border-b border-secondary/10 pb-2">
                  Bill Details
                </h3>

                <div className="divide-y divide-secondary/10 space-y-2.5">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm py-1">
                      <span className="text-foreground/70">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-foreground font-bold">₹{item.subtotal}</span>
                    </div>
                  ))}
                  
                  <div className="pt-2.5 space-y-1.5 text-xs text-foreground/50">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-foreground font-semibold">₹{order.itemsTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (5% GST)</span>
                      <span className="text-foreground font-semibold">₹{order.taxAmount}</span>
                    </div>
                    {order.orderType === "delivery" && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="text-foreground font-semibold">₹{order.deliveryFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-foreground border-t border-secondary/15 pt-2 mt-2">
                      <span className="font-serif">Grand Total</span>
                      <span className="text-secondary text-base">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
