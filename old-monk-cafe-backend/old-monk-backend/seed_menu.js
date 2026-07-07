require('dotenv').config();
const mongoose = require('mongoose');

const categoriesToSeed = [
  {
    "name": "Kadak Chai",
    "slug": "kadak_chai",
    "displayOrder": 1
  },
  {
    "name": "Hot Coffee",
    "slug": "hot_coffee",
    "displayOrder": 2
  },
  {
    "name": "Hot Milk",
    "slug": "hot_milk",
    "displayOrder": 3
  },
  {
    "name": "Cold Coffee",
    "slug": "cold_coffee",
    "displayOrder": 4
  },
  {
    "name": "Milk Shake",
    "slug": "milk_shake",
    "displayOrder": 5
  },
  {
    "name": "Coolers",
    "slug": "coolers",
    "displayOrder": 6
  },
  {
    "name": "Garlic Bread",
    "slug": "garlic_bread",
    "displayOrder": 7
  },
  {
    "name": "Firangi French Fries",
    "slug": "french_fries",
    "displayOrder": 8
  },
  {
    "name": "Burger Buffet",
    "slug": "burgers",
    "displayOrder": 9
  },
  {
    "name": "Pristine Pizza",
    "slug": "pizza",
    "displayOrder": 10
  },
  {
    "name": "Shahi Sandwich",
    "slug": "sandwich",
    "displayOrder": 11
  },
  {
    "name": "Majestic Maggie",
    "slug": "maggie",
    "displayOrder": 12
  },
  {
    "name": "Old Monk Special",
    "slug": "special",
    "displayOrder": 13
  },
  {
    "name": "Magical Momos",
    "slug": "momos",
    "displayOrder": 14
  },
  {
    "name": "Aakhri Pasta",
    "slug": "pasta",
    "displayOrder": 15
  },
  {
    "name": "Noodles",
    "slug": "noodles",
    "displayOrder": 16
  },
  {
    "name": "Fried Rice",
    "slug": "fried_rice",
    "displayOrder": 17
  },
  {
    "name": "Rolls",
    "slug": "rolls",
    "displayOrder": 18
  },
  {
    "name": "Chinese Snacks",
    "slug": "chinese_snacks",
    "displayOrder": 19
  },
  {
    "name": "Soup",
    "slug": "soup",
    "displayOrder": 20
  },
  {
    "name": "Desi Paneer",
    "slug": "desi_paneer",
    "displayOrder": 21
  },
  {
    "name": "Marvellous Mushroom",
    "slug": "mushroom",
    "displayOrder": 22
  },
  {
    "name": "Roti & Rice",
    "slug": "roti_rice",
    "displayOrder": 23
  },
  {
    "name": "Pav",
    "slug": "pav",
    "displayOrder": 24
  },
  {
    "name": "South Indian",
    "slug": "south_indian",
    "displayOrder": 25
  },
  {
    "name": "Dessert Dhamaka",
    "slug": "desserts",
    "displayOrder": 26
  }
];

const menuItemsToSeed = [
  {
    "id": "item_1",
    "name": "Doodh Patti Chai",
    "price": 25,
    "description": "Rich, aromatic and brewed to perfection with fresh tea leaves. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "/images/media__1783432087219.jpg",
    "isVeg": true
  },
  {
    "id": "item_old_monk_special_chai",
    "name": "Old Monk Special Chai",
    "price": 30,
    "description": "Our signature special spiced tea, slow-brewed to rich creamy perfection. Freshly handcrafted with authentic premium ingredients.",
    "categorySlug": "kadak_chai",
    "image": "/images/media__1783432087219.jpg",
    "isVeg": true
  },
  {
    "id": "item_2",
    "name": "Adrak Elaichi Chai",
    "price": 30,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_3",
    "name": "Chocolate Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_4",
    "name": "Pudina Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_5",
    "name": "Kesar Chai",
    "price": 50,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_6",
    "name": "Regular Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_7",
    "name": "Black Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_8",
    "name": "Bournvita Old School",
    "price": 89,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_9",
    "name": "Hot Chocolate",
    "price": 99,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_classic_cold_coffee",
    "name": "Classic Cold Coffee",
    "price": 149,
    "description": "Smooth, creamy blended coffee, served ice-cold to refresh your senses. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_10",
    "name": "Hazelnut Premium",
    "price": 159,
    "description": "Rich and creamy whipped cold coffee served chilled. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_11",
    "name": "Vanilla Milkshake",
    "price": 149,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_12",
    "name": "Strawberry Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_13",
    "name": "Pineapple Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_14",
    "name": "Mango Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_15",
    "name": "Chocolate Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_16",
    "name": "Oreo Milkshake",
    "price": 179,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_17",
    "name": "KitKat Milkshake",
    "price": 189,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_18",
    "name": "Brownie Milkshake",
    "price": 199,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_19",
    "name": "Masala Lemonade",
    "price": 89,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_20",
    "name": "Mojito",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_21",
    "name": "Lemon Ice Tea",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_22",
    "name": "Virgin Mojito",
    "price": 109,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_cheese_garlic_bread",
    "name": "Cheese Garlic Bread",
    "price": 99,
    "description": "Toasted artisan bread topped with melted mozzarella cheese, garlic butter, and fresh herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "",
    "isVeg": true
  },
  {
    "id": "item_chilli_cheese_garlic_bread",
    "name": "Chilli Cheese Garlic Bread",
    "price": 109,
    "description": "Toasted artisan bread topped with melted mozzarella, fiery green chillies, garlic butter, and herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_23",
    "name": "Chilli Cheese Toast Bread",
    "price": 139,
    "description": "Freshly baked bread infused with rich garlic butter and herbs. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_24",
    "name": "Plain Fries",
    "price": 89,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_25",
    "name": "Masala French Fries",
    "price": 99,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_26",
    "name": "Peri Peri Fries",
    "price": 109,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_27",
    "name": "Cheese French Fries",
    "price": 119,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_addon_cheese",
    "name": "Add-on Cheese",
    "price": 25,
    "description": "Extra slice of melted cheddar cheese to customize your burger. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_28",
    "name": "Aloo Burger",
    "price": 89,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_29",
    "name": "Veg Burger",
    "price": 99,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_30",
    "name": "Cheese Burger",
    "price": 129,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_31",
    "name": "Veg Spicy Burger",
    "price": 139,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_32",
    "name": "Black Pepper Burger",
    "price": 149,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_33",
    "name": "Peri Peri Burger",
    "price": 159,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_addon_cheese_pizza",
    "name": "Add-on Cheese (Pizza)",
    "price": 35,
    "description": "Extra loading of premium mozzarella cheese to customize your pizza. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_34",
    "name": "Margherita Pizza",
    "price": 189,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_35",
    "name": "Corn & Cheese Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_36",
    "name": "Pasta Pizza",
    "price": 209,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_37",
    "name": "Garden Fresh Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_38",
    "name": "Exotic Veg Pizza",
    "price": 219,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_39",
    "name": "Tandoori Paneer Pizza",
    "price": 249,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_40",
    "name": "Paneer Chilli Pizza",
    "price": 259,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_41",
    "name": "Mexican Cheese Pizza",
    "price": 269,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400&h=300&sig=9",
    "isVeg": true
  },
  {
    "id": "item_42",
    "name": "B.B.Q Paneer Pizza",
    "price": 289,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=400&h=300&sig=10",
    "isVeg": true
  },
  {
    "id": "item_43",
    "name": "Cheese Grilled Sandwich",
    "price": 119,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_44",
    "name": "Veg Cheese Grilled Sandwich",
    "price": 139,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_45",
    "name": "Tandoori Paneer Sandwich",
    "price": 159,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_46",
    "name": "Junglee Paneer Sandwich",
    "price": 169,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_47",
    "name": "Mushroom Mood Sandwich",
    "price": 179,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_48",
    "name": "Desi Maggie",
    "price": 89,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_49",
    "name": "Amul Butter Maggie",
    "price": 99,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_50",
    "name": "Corn Cheese Maggie",
    "price": 109,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_51",
    "name": "Chatori Maggie",
    "price": 119,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_52",
    "name": "Chilli Potato Burger",
    "price": 149,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_53",
    "name": "Palak Patta Chaat",
    "price": 159,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_54",
    "name": "Chilli Idli",
    "price": 169,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_55",
    "name": "Bread Cheese Roll",
    "price": 179,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_56",
    "name": "Cheese Corn Ball",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_57",
    "name": "Baby Corn Finger",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_58",
    "name": "Cheese Paneer Dosa",
    "price": 229,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_59",
    "name": "Bold Biryani",
    "price": 239,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_60",
    "name": "Hot Chilli Garlic Paneer Burger",
    "price": 249,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=9",
    "isVeg": true
  },
  {
    "id": "item_61",
    "name": "Veg Steam Momos",
    "price": 119,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_62",
    "name": "Veg Fried Momos",
    "price": 129,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_63",
    "name": "Paneer Steam Momos",
    "price": 139,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_64",
    "name": "Paneer Fried Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_65",
    "name": "Corn Cheese Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_66",
    "name": "Kurkure Momos",
    "price": 159,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_67",
    "name": "White Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_68",
    "name": "Red Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_69",
    "name": "Pink Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_70",
    "name": "Veg Roll",
    "price": 109,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_71",
    "name": "Paneer Chilli Roll",
    "price": 129,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_72",
    "name": "Mushroom Chilli Roll",
    "price": 139,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_73",
    "name": "Paneer 65 Roll",
    "price": 149,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_74",
    "name": "Chilli Potato",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_75",
    "name": "Crispy Corn",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_76",
    "name": "Honey Chilli Potato",
    "price": 149,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_77",
    "name": "Crispy Baby Corn",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_78",
    "name": "Paneer Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_79",
    "name": "Veg Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_80",
    "name": "Chilli Paneer (Dry)",
    "price": 169,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_81",
    "name": "Veg Manchurian (Gravy)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_82",
    "name": "Mushroom Chilli (Dry)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=9",
    "isVeg": true
  },
  {
    "id": "item_83",
    "name": "Mushroom Chilli (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=10",
    "isVeg": true
  },
  {
    "id": "item_84",
    "name": "Paneer Manchurian (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=11",
    "isVeg": true
  },
  {
    "id": "item_85",
    "name": "Paneer 65 (Dry)",
    "price": 199,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=12",
    "isVeg": true
  },
  {
    "id": "item_86",
    "name": "Chilli Paneer (Gravy)",
    "price": 209,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=13",
    "isVeg": true
  },
  {
    "id": "item_87",
    "name": "Paneer 65 (Gravy)",
    "price": 219,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=14",
    "isVeg": true
  },
  {
    "id": "item_88",
    "name": "Matar Paneer",
    "price": 199,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_89",
    "name": "Paneer Do Pyaza",
    "price": 229,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_90",
    "name": "Paneer Butter Masala",
    "price": 249,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_91",
    "name": "Kadai Paneer",
    "price": 259,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_92",
    "name": "Paneer Handi",
    "price": 269,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_93",
    "name": "Paneer Punjabi",
    "price": 279,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_94",
    "name": "Shahi Paneer",
    "price": 289,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_95",
    "name": "Mushroom Matar Masala",
    "price": 199,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_96",
    "name": "Mushroom Do Pyaza",
    "price": 229,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_97",
    "name": "Mushroom Butter Masala",
    "price": 249,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_98",
    "name": "Mushroom Kadai",
    "price": 259,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_99",
    "name": "Mushroom Handi",
    "price": 269,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_100",
    "name": "Tawa Roti",
    "price": 12,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_101",
    "name": "Butter Tawa Roti",
    "price": 15,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_102",
    "name": "Steam Rice",
    "price": 89,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_103",
    "name": "Jeera Rice",
    "price": 99,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_104",
    "name": "Dal Fry",
    "price": 119,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_105",
    "name": "Idli",
    "price": 79,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_106",
    "name": "Plain Dosa",
    "price": 99,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_107",
    "name": "Vada Sambhar",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_108",
    "name": "Plain Uttapam",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_109",
    "name": "Onion Uttapam",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_110",
    "name": "Onion Dosa",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_111",
    "name": "Mix Veg Uttapam",
    "price": 139,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_112",
    "name": "Masala Uttapam",
    "price": 149,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_113",
    "name": "Masala Dosa",
    "price": 159,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=9",
    "isVeg": true
  },
  {
    "id": "item_114",
    "name": "Butter Masala Dosa",
    "price": 169,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300&sig=10",
    "isVeg": true
  },
  {
    "id": "item_115",
    "name": "Paneer Dosa",
    "price": 199,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=11",
    "isVeg": true
  },
  {
    "id": "item_116",
    "name": "Hot Gulab Jamun",
    "price": 69,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_117",
    "name": "Gulab Jamun with Ice Cream",
    "price": 109,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_118",
    "name": "Brownie with Ice Cream",
    "price": 149,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_veg_noodles",
    "name": "Veg Noodles",
    "price": 139,
    "description": "Stir-fried noodles tossed with fresh garden vegetables and savory Chinese sauces. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_garlic_noodles",
    "name": "Garlic Noodles",
    "price": 149,
    "description": "Flavorful noodles wok-tossed with aromatic minced garlic and light seasoning. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_noodles",
    "name": "Mix Veg Noodles",
    "price": 159,
    "description": "Stir-fried noodles loaded with an assortment of crisp vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_paneer_noodles",
    "name": "Paneer Noodles",
    "price": 169,
    "description": "Stir-fried noodles tossed with soft paneer cubes and mild spices. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_schezwan_fried_noodles",
    "name": "Schezwan Fried Noodles",
    "price": 169,
    "description": "Spicy stir-fried noodles tossed in hot and fiery Schezwan sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_veg_hakka_noodles",
    "name": "Veg Hakka Noodles",
    "price": 179,
    "description": "Classic Indo-Chinese style Hakka noodles, wok-tossed to perfection. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_paneer_singapuri_noodles",
    "name": "Paneer Singapuri Noodles",
    "price": 189,
    "description": "Exotic stir-fried noodles cooked with paneer, curry powder, and a touch of sweetness. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_veg_fried_rice",
    "name": "Veg Fried Rice",
    "price": 149,
    "description": "Fluffy basmati rice wok-tossed with finely chopped fresh vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_schezwan_fried_rice",
    "name": "Schezwan Fried Rice",
    "price": 159,
    "description": "Spicy and flavorful fried rice tossed in zesty Schezwan sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_mix_fried_rice",
    "name": "Mix Fried Rice",
    "price": 169,
    "description": "Basmati rice tossed with a loaded assortment of vegetables and mild spices. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_paneer_fried_rice",
    "name": "Paneer Fried Rice",
    "price": 179,
    "description": "Wok-tossed basmati rice with pan-seared paneer cubes and veggies. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_triple_fried_rice",
    "name": "Triple Fried Rice",
    "price": 189,
    "description": "A combination of fried rice, crispy fried noodles, and a rich spicy Chinese gravy. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_singapuri_fried_rice",
    "name": "Singapuri Fried Rice",
    "price": 189,
    "description": "Fragrant and colorful rice tossed with curry powder, cashew nuts, and fresh veggies. Handcrafted with signature Old Monk recipe.",
    "image": "https://images.unsplash.com/featured/400x300/?singapuri-fried-rice-food&sig=137",
    "isVeg": true
  },
  {
    "id": "item_tomato_soup",
    "name": "Tomato Soup",
    "price": 99,
    "description": "Warm, creamy, and rich tomato soup served with crispy croutons. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_soup",
    "name": "Mix Veg Soup",
    "price": 109,
    "description": "Healthy and comforting clear soup loaded with finely chopped garden vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_veg_manchow_soup",
    "name": "Veg Manchow Soup",
    "price": 119,
    "description": "Spicy and tangy Indo-Chinese soup served with crispy fried noodles. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_pav_bhaji",
    "name": "Pav Bhaji",
    "price": 119,
    "description": "Spiced mashed vegetable gravy served with hot butter-toasted pav buns. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_vada_pav",
    "name": "Vada Pav",
    "price": 129,
    "description": "Classic Mumbai street food style spicy potato vada sandwiched in soft pav. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_chilli_o_virgin_sandwich",
    "name": "Chilli-O-Virgin Sandwich",
    "price": 149,
    "description": "Spicy and zesty sandwich stuffed with signature chilly toppings and cheese. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_tax_max_sandwich",
    "name": "Tax-Max Sandwich",
    "price": 159,
    "description": "Ultimate loaded sandwich packed with max veggies and signature tangy sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Get schemas
    const Category = require('./models/Category');
    const MenuItem = require('./models/MenuItem');
    
    // 1. Clear existing menu items and categories
    await MenuItem.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared old menu items and categories.");

    try {
      await MenuItem.collection.dropIndexes();
      console.log("Cleared old index constraints.");
    } catch (indexErr) {
      console.log("Index drop skipped:", indexErr.message);
    }
    
    // 2. Insert Categories
    const seededCategories = await Category.insertMany(categoriesToSeed);
    console.log("Seeded " + seededCategories.length + " categories.");
    
    // Create mapping of categorySlug -> categoryObjectId
    const categoryMap = {};
    seededCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });
    
    // 3. Prepare Menu Items with category object references
    const preparedMenuItems = menuItemsToSeed.map((item) => {
      const categoryId = categoryMap[item.categorySlug];
      if (!categoryId) {
        throw new Error("Category slug not found: " + item.categorySlug);
      }
      return {
        name: item.name,
        description: item.description,
        price: item.price,
        category: categoryId,
        image: { url: item.image, publicId: "" },
        isVeg: item.isVeg,
        isAvailable: true,
        isFeatured: false,
        prepTimeMinutes: 12
      };
    });
    
    // 4. Insert Menu Items
    const seededMenuItems = await MenuItem.insertMany(preparedMenuItems);
    console.log("Seeded " + seededMenuItems.length + " menu items successfully.");
    
  } catch (err) {
    console.error("Error Seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

if (require.main === module) {
  seed();
}

module.exports = { categoriesToSeed, menuItemsToSeed };
