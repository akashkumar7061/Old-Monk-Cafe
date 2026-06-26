import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OLD MONK CAFE | Best Café & Restaurant in Darbhanga, Bihar",
  description: "Experience the finest luxury café atmosphere in Darbhanga. Handcrafted specialty coffees, premium mocktails, delicious fast food, Chinese delicacy, and custom momos. Open daily 10 AM - 12 AM.",
  keywords: "Old Monk Cafe, Cafe in Darbhanga, Best Restaurant in Darbhanga, Darbhanga Coffee Shop, Sundarpur Cafe, Mocktails, Pizza Darbhanga",
  authors: [{ name: "OLD MONK CAFE" }],
  openGraph: {
    title: "OLD MONK CAFE | Darbhanga's Finest Culinary Hangout",
    description: "handcrafted coffees, premium mocktails, delicious food, and unforgettable memories at Sundarpur, Darbhanga.",
    url: "https://oldmonkcafe.com",
    siteName: "OLD MONK CAFE",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800",
        width: 800,
        height: 600,
        alt: "OLD MONK CAFE Ambiance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CafeOrRestaurant",
    "name": "OLD MONK CAFE",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7, Sundarpur, Darbhanga, Basdeopur",
      "addressLocality": "Darbhanga",
      "addressRegion": "Bihar",
      "postalCode": "846005",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.1772",
      "longitude": "85.9014"
    },
    "telephone": "+919296935757",
    "url": "http://localhost:3000",
    "priceRange": "₹200-₹400",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "00:00"
    }
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
