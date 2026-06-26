"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Coffee, Calendar, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  actions?: Array<{ label: string; actionKey: string }>;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Namaste! Welcome to OLD MONK CAFE. I'm Monky, your virtual coffee assistant. 🍵 How can I help you today?",
        timestamp: new Date(),
        actions: [
          { label: "View Menu Categories", actionKey: "menu" },
          { label: "Book a Table", actionKey: "reserve" },
          { label: "Opening Hours", actionKey: "hours" },
          { label: "Get Directions", actionKey: "location" },
          { label: "Tell me a coffee joke!", actionKey: "joke" },
        ],
      },
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const coffeeJokes = [
    "Why did the coffee file a police report? It got mugged! ☕",
    "How does a coffee show respect? It espresso-es itself! ☕",
    "What do you call sad coffee? Depresso. 😢",
    "How does Elon Musk like his coffee? Rocket fuel-ed! 🚀",
    "Why did the espresso keep checking its watch? It was pressed for time! ⏰",
  ];

  const handleAction = (actionKey: string) => {
    let userText = "";
    let responseText = "";
    let actions: Message["actions"] = undefined;

    switch (actionKey) {
      case "menu":
        userText = "Tell me about the Menu";
        responseText = "We offer a delightful range of items:\n\n• Handcrafted Coffees (Espresso, Latte, Cold Coffee)\n• Refreshing Mocktails (Virgin Mojito, Blue Lagoon)\n• Gourmet Fast Food (Burgers, Pizzas, Pasta)\n• Chinese Specialities (Noodles, Manchurian)\n• Steaming Momos & Sweet Desserts.\n\nPrices range from ₹69 to ₹369! Would you like to view our full menu page?";
        actions = [
          { label: "Go to Menu Page", actionKey: "go_to_menu" },
          { label: "Check Combos", actionKey: "combos" },
        ];
        break;
      case "reserve":
        userText = "How do I book a table?";
        responseText = "Booking is quick and simple! You can click the link below to go to our Table Reservation page. Select your date, time, and table size, and we will reserve the perfect cozy spot for you.";
        actions = [{ label: "Book Table Now", actionKey: "go_to_reserve" }];
        break;
      case "hours":
        userText = "What are your business hours?";
        responseText = "We are open daily (Monday to Sunday) from 10:00 AM to 12:00 AM (midnight). Perfect for morning coffee sessions or late-night dinners!";
        break;
      case "location":
        userText = "Where is the café located?";
        responseText = "We are located at:\n📍 7, Sundarpur, Darbhanga, Basdeopur, Bihar 846005.\n\nWe are right in the heart of Darbhanga. You can easily find us on Google Maps.";
        actions = [{ label: "Open in Google Maps", actionKey: "go_to_maps" }];
        break;
      case "joke":
        userText = "Tell me a coffee joke!";
        responseText = coffeeJokes[Math.floor(Math.random() * coffeeJokes.length)];
        actions = [{ label: "Tell me another!", actionKey: "joke" }];
        break;
      case "combos":
        userText = "Show me Special Combos";
        responseText = "Here are our current bestsellers:\n• Coffee + Burger Combo: ₹249\n• Momos + Cold Coffee Combo: ₹249\n• Pizza + Mocktail Combo: ₹449\n• Couple Special Combo: ₹799\n\nAll items are freshly prepared!";
        break;
      case "go_to_menu":
        setIsOpen(false);
        window.location.href = "/menu";
        return;
      case "go_to_reserve":
        setIsOpen(false);
        window.location.href = "/reserve";
        return;
      case "go_to_maps":
        window.open("https://www.google.com/maps/place/OLD+MONK+CAFE/@26.1791599,85.896985,17z/data=!3m1!4b1!4m6!3m5!1s0x39edb70058367b4f:0x885307f4732543eb!8m2!3d26.1791551!4d85.8995599!16s%2Fg%2F11yzbf03h6?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D", "_blank");
        return;

      default:
        return;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, timestamp: new Date() },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, timestamp: new Date(), actions },
      ]);
    }, 600);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userQuery = inputText.trim().toLowerCase();
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: inputText, timestamp: new Date() },
    ]);
    setInputText("");

    setTimeout(() => {
      let responseText = "Thank you for reaching out! I'm still learning, but you can always get direct support by calling our café at +91 92969 35757 or by clicking the WhatsApp icon to chat with our staff.";
      let actions: Message["actions"] = [
        { label: "Call Cafe Now", actionKey: "call" },
        { label: "Menu Options", actionKey: "menu" },
      ];

      if (userQuery.includes("hello") || userQuery.includes("hi") || userQuery.includes("hey")) {
        responseText = "Hello there! Hope you are having a wonderful day. How can I help you today?";
      } else if (userQuery.includes("menu") || userQuery.includes("food") || userQuery.includes("coffee") || userQuery.includes("drink")) {
        responseText = "Our menu features hot and cold coffees, mocktails, burgers, pizzas, momos, noodles, fried rice, peri-peri fries, chocolate lava cakes, and combo offers. Click below to view all items and pricing!";
        actions = [{ label: "View Menu", actionKey: "go_to_menu" }];
      } else if (userQuery.includes("book") || userQuery.includes("reserve") || userQuery.includes("table")) {
        responseText = "Would you like to reserve a table? Our online table booking allows you to reserve a slot and receive confirmations. Click below!";
        actions = [{ label: "Book Table Page", actionKey: "go_to_reserve" }];
      } else if (userQuery.includes("time") || userQuery.includes("open") || userQuery.includes("hour") || userQuery.includes("close")) {
        responseText = "OLD MONK CAFE is open daily from 10:00 AM to 12:00 AM (midnight).";
      } else if (userQuery.includes("location") || userQuery.includes("where") || userQuery.includes("address") || userQuery.includes("darbhanga")) {
        responseText = "We are located at 7, Sundarpur, Darbhanga, Basdeopur, Bihar 846005. You can get driving directions on Google Maps.";
        actions = [{ label: "Google Maps Directions", actionKey: "go_to_maps" }];
      } else if (userQuery.includes("joke") || userQuery.includes("funny")) {
        responseText = coffeeJokes[Math.floor(Math.random() * coffeeJokes.length)];
      } else if (userQuery.includes("phone") || userQuery.includes("contact") || userQuery.includes("call") || userQuery.includes("number")) {
        responseText = "You can contact our manager at +91 92969 35757. Click below to call directly.";
        actions = [{ label: "Call Now", actionKey: "call_now" }];
      }

      if (userQuery.includes("call") && userQuery.includes("now")) {
        window.open("tel:+919296935757");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, timestamp: new Date(), actions },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[280px] sm:w-[320px] h-[390px] sm:h-[430px] bg-primary rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-secondary/15"
          >
            {/* Header */}
            <div className="p-3 bg-primary-dark border-b border-secondary/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Coffee className="w-4.5 h-4.5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground text-xs">Monky Assistant</h3>
                  <p className="text-[9px] text-green-600 flex items-center gap-1 font-semibold font-sans">
                    <span className="w-1.2 h-1.2 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-secondary/10 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4.5 h-4.5 text-foreground/60 hover:text-foreground" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-3 space-y-3 bg-background">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-secondary text-white font-medium rounded-tr-none"
                        : "bg-primary-dark text-foreground rounded-tl-none border border-secondary/10 shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  
                  {/* Message timestamp */}
                  <span className="text-[9px] text-foreground/45 mt-0.5 px-1 font-sans">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Message actions (Options) */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5 max-w-[90%]">
                      {msg.actions.map((act) => (
                        <button
                          key={act.label}
                          onClick={() => handleAction(act.actionKey)}
                          className="text-[10px] bg-primary hover:bg-secondary hover:text-white text-foreground px-2.5 py-1 rounded-full border border-secondary/20 hover:border-secondary transition-all shadow-sm font-sans cursor-pointer"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendText}
              className="p-2 bg-primary border-t border-secondary/10 flex gap-1.5"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-background border border-secondary/10 rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 placeholder-foreground/35 font-sans"
              />
              <button
                type="submit"
                className="bg-secondary text-white p-1.5 rounded-md hover:bg-secondary-dark transition-colors shrink-0 cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-secondary-dark transition-colors border border-secondary/20 relative"
        aria-label="Toggle Chat Helper"
      >
        {isOpen ? <X className="w-5.5 h-5.5" /> : <MessageSquare className="w-5 h-5" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce font-sans">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};
