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
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_2",
    "name": "Adrak Elaichi Chai",
    "price": 30,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_3",
    "name": "Chocolate Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_4",
    "name": "Pudina Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_5",
    "name": "Kesar Chai",
    "price": 50,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_6",
    "name": "Regular Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_7",
    "name": "Black Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_8",
    "name": "Bournvita Old School",
    "price": 89,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_9",
    "name": "Hot Chocolate",
    "price": 99,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_10",
    "name": "Hazelnut Premium",
    "price": 159,
    "description": "Rich and creamy whipped cold coffee served chilled. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_11",
    "name": "Vanilla Milkshake",
    "price": 149,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_12",
    "name": "Strawberry Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_13",
    "name": "Pineapple Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_14",
    "name": "Mango Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_15",
    "name": "Chocolate Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_16",
    "name": "Oreo Milkshake",
    "price": 179,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_17",
    "name": "KitKat Milkshake",
    "price": 189,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_18",
    "name": "Brownie Milkshake",
    "price": 199,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_19",
    "name": "Masala Lemonade",
    "price": 89,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_20",
    "name": "Mojito",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_21",
    "name": "Lemon Ice Tea",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_22",
    "name": "Virgin Mojito",
    "price": 109,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_23",
    "name": "Chilli Cheese Toast Bread",
    "price": 139,
    "description": "Freshly baked bread infused with rich garlic butter and herbs. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_24",
    "name": "Plain Fries",
    "price": 89,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_25",
    "name": "Masala French Fries",
    "price": 99,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_26",
    "name": "Peri Peri Fries",
    "price": 109,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_27",
    "name": "Cheese French Fries",
    "price": 119,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_28",
    "name": "Aloo Burger",
    "price": 89,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_29",
    "name": "Veg Burger",
    "price": 99,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_30",
    "name": "Cheese Burger",
    "price": 129,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_31",
    "name": "Veg Spicy Burger",
    "price": 139,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_32",
    "name": "Black Pepper Burger",
    "price": 149,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_33",
    "name": "Peri Peri Burger",
    "price": 159,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "/images/old_monk_burger.png",
    "isVeg": true
  },
  {
    "id": "item_34",
    "name": "Margherita Pizza",
    "price": 189,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_35",
    "name": "Corn & Cheese Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_36",
    "name": "Pasta Pizza",
    "price": 209,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_37",
    "name": "Garden Fresh Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_38",
    "name": "Exotic Veg Pizza",
    "price": 219,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_39",
    "name": "Tandoori Paneer Pizza",
    "price": 249,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_40",
    "name": "Paneer Chilli Pizza",
    "price": 259,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_41",
    "name": "Mexican Cheese Pizza",
    "price": 269,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_42",
    "name": "B.B.Q Paneer Pizza",
    "price": 289,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/old_monk_pizza.png",
    "isVeg": true
  },
  {
    "id": "item_43",
    "name": "Cheese Grilled Sandwich",
    "price": 119,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_44",
    "name": "Veg Cheese Grilled Sandwich",
    "price": 139,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_45",
    "name": "Tandoori Paneer Sandwich",
    "price": 159,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_46",
    "name": "Junglee Paneer Sandwich",
    "price": 169,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_47",
    "name": "Mushroom Mood Sandwich",
    "price": 179,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_48",
    "name": "Desi Maggie",
    "price": 89,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612966608997-30d939b978d0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_49",
    "name": "Amul Butter Maggie",
    "price": 99,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612966608997-30d939b978d0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_50",
    "name": "Corn Cheese Maggie",
    "price": 109,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612966608997-30d939b978d0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_51",
    "name": "Chatori Maggie",
    "price": 119,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612966608997-30d939b978d0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_52",
    "name": "Chilli Potato Burger",
    "price": 149,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_53",
    "name": "Palak Patta Chaat",
    "price": 159,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_54",
    "name": "Chilli Idli",
    "price": 169,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_55",
    "name": "Bread Cheese Roll",
    "price": 179,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_56",
    "name": "Cheese Corn Ball",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_57",
    "name": "Baby Corn Finger",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_58",
    "name": "Cheese Paneer Dosa",
    "price": 229,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_59",
    "name": "Bold Biryani",
    "price": 239,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_60",
    "name": "Hot Chilli Garlic Paneer Burger",
    "price": 249,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_61",
    "name": "Veg Steam Momos",
    "price": 119,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_62",
    "name": "Veg Fried Momos",
    "price": 129,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_63",
    "name": "Paneer Steam Momos",
    "price": 139,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_64",
    "name": "Paneer Fried Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_65",
    "name": "Corn Cheese Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_66",
    "name": "Kurkure Momos",
    "price": 159,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/old_monk_momos.png",
    "isVeg": true
  },
  {
    "id": "item_67",
    "name": "White Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_68",
    "name": "Red Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_69",
    "name": "Pink Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_70",
    "name": "Veg Roll",
    "price": 109,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_71",
    "name": "Paneer Chilli Roll",
    "price": 129,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_72",
    "name": "Mushroom Chilli Roll",
    "price": 139,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_73",
    "name": "Paneer 65 Roll",
    "price": 149,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_74",
    "name": "Chilli Potato",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_75",
    "name": "Crispy Corn",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_76",
    "name": "Honey Chilli Potato",
    "price": 149,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_77",
    "name": "Crispy Baby Corn",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_78",
    "name": "Paneer Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_79",
    "name": "Veg Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_80",
    "name": "Chilli Paneer (Dry)",
    "price": 169,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_81",
    "name": "Veg Manchurian (Gravy)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_82",
    "name": "Mushroom Chilli (Dry)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_83",
    "name": "Mushroom Chilli (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_84",
    "name": "Paneer Manchurian (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_85",
    "name": "Paneer 65 (Dry)",
    "price": 199,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_86",
    "name": "Chilli Paneer (Gravy)",
    "price": 209,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_87",
    "name": "Paneer 65 (Gravy)",
    "price": 219,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "/images/chilli_potato.png",
    "isVeg": true
  },
  {
    "id": "item_88",
    "name": "Matar Paneer",
    "price": 199,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_89",
    "name": "Paneer Do Pyaza",
    "price": 229,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_90",
    "name": "Paneer Butter Masala",
    "price": 249,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_91",
    "name": "Kadai Paneer",
    "price": 259,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_92",
    "name": "Paneer Handi",
    "price": 269,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_93",
    "name": "Paneer Punjabi",
    "price": 279,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_94",
    "name": "Shahi Paneer",
    "price": 289,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_95",
    "name": "Mushroom Matar Masala",
    "price": 199,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_96",
    "name": "Mushroom Do Pyaza",
    "price": 229,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_97",
    "name": "Mushroom Butter Masala",
    "price": 249,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_98",
    "name": "Mushroom Kadai",
    "price": 259,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_99",
    "name": "Mushroom Handi",
    "price": 269,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_100",
    "name": "Tawa Roti",
    "price": 12,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_101",
    "name": "Butter Tawa Roti",
    "price": 15,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_102",
    "name": "Steam Rice",
    "price": 89,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_103",
    "name": "Jeera Rice",
    "price": 99,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_104",
    "name": "Dal Fry",
    "price": 119,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_105",
    "name": "Idli",
    "price": 79,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_106",
    "name": "Plain Dosa",
    "price": 99,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_107",
    "name": "Vada Sambhar",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_108",
    "name": "Plain Uttapam",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_109",
    "name": "Onion Uttapam",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_110",
    "name": "Onion Dosa",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_111",
    "name": "Mix Veg Uttapam",
    "price": 139,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_112",
    "name": "Masala Uttapam",
    "price": 149,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_113",
    "name": "Masala Dosa",
    "price": 159,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_114",
    "name": "Butter Masala Dosa",
    "price": 169,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_115",
    "name": "Paneer Dosa",
    "price": 199,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_116",
    "name": "Hot Gulab Jamun",
    "price": 69,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_117",
    "name": "Gulab Jamun with Ice Cream",
    "price": 109,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400",
    "isVeg": true
  },
  {
    "id": "item_118",
    "name": "Brownie with Ice Cream",
    "price": 149,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400",
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

seed();
