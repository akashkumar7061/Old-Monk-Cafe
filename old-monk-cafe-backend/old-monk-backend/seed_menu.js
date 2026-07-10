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
    "image": "https://images.unsplash.com/photo-1669905375164-388815c9dcf6?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_old_monk_special_chai",
    "name": "Old Monk Special Chai",
    "price": 30,
    "description": "Our signature special spiced tea, slow-brewed to rich creamy perfection. Freshly handcrafted with authentic premium ingredients.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1575739263357-efe1118edb47?auto=format&fit=crop&q=80&w=400&h=300&sig=2",
    "isVeg": true
  },
  {
    "id": "item_2",
    "name": "Adrak Elaichi Chai",
    "price": 30,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1683533698664-12ee473e8c9d?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_3",
    "name": "Chocolate Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1671379529629-6480c4953d14?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_4",
    "name": "Pudina Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1619581073186-5b4ae1b0caad?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_5",
    "name": "Kesar Chai",
    "price": 50,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1759782177037-ea0b0879fb03?auto=format&fit=crop&q=80&w=400&h=300&sig=6",
    "isVeg": true
  },
  {
    "id": "item_6",
    "name": "Regular Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1675435644687-562e8042b9db?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_7",
    "name": "Black Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_8",
    "name": "Bournvita Old School",
    "price": 89,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1508768088800-43c68b8ea271?auto=format&fit=crop&q=80&w=400&h=300&sig=9",
    "isVeg": true
  },
  {
    "id": "item_9",
    "name": "Hot Chocolate",
    "price": 99,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1675237625510-e484acc4816d?auto=format&fit=crop&q=80&w=400&h=300&sig=10",
    "isVeg": true
  },
  {
    "id": "item_classic_cold_coffee",
    "name": "Classic Cold Coffee",
    "price": 149,
    "description": "Smooth, creamy blended coffee, served ice-cold to refresh your senses. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1677607237294-b041e4b57391?auto=format&fit=crop&q=80&w=400&h=300&sig=11",
    "isVeg": true
  },
  {
    "id": "item_10",
    "name": "Hazelnut Premium",
    "price": 159,
    "description": "Rich and creamy whipped cold coffee served chilled. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1673138254242-e0261eb4de2d?auto=format&fit=crop&q=80&w=400&h=300&sig=12",
    "isVeg": true
  },
  {
    "id": "item_11",
    "name": "Vanilla Milkshake",
    "price": 149,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1695868328902-b8a3b093da74?auto=format&fit=crop&q=80&w=400&h=300&sig=13",
    "isVeg": true
  },
  {
    "id": "item_12",
    "name": "Strawberry Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=300&sig=14",
    "isVeg": true
  },
  {
    "id": "item_13",
    "name": "Pineapple Milkshake",
    "price": 159,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1596392301391-e8622b210bd4?auto=format&fit=crop&q=80&w=400&h=300&sig=15",
    "isVeg": true
  },
  {
    "id": "item_14",
    "name": "Mango Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1575159240102-4331f59433ac?auto=format&fit=crop&q=80&w=400&h=300&sig=16",
    "isVeg": true
  },
  {
    "id": "item_15",
    "name": "Chocolate Milkshake",
    "price": 169,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1669687173644-21c1381f9183?auto=format&fit=crop&q=80&w=400&h=300&sig=17",
    "isVeg": true
  },
  {
    "id": "item_16",
    "name": "Oreo Milkshake",
    "price": 179,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1695927469061-4c307d53c7a5?auto=format&fit=crop&q=80&w=400&h=300&sig=18",
    "isVeg": true
  },
  {
    "id": "item_17",
    "name": "KitKat Milkshake",
    "price": 189,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1695035006916-bb85c139c70c?auto=format&fit=crop&q=80&w=400&h=300&sig=19",
    "isVeg": true
  },
  {
    "id": "item_18",
    "name": "Brownie Milkshake",
    "price": 199,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400&h=300&sig=20",
    "isVeg": true
  },
  {
    "id": "item_19",
    "name": "Masala Lemonade",
    "price": 89,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1695456065067-45cabcf25e8f?auto=format&fit=crop&q=80&w=400&h=300&sig=21",
    "isVeg": true
  },
  {
    "id": "item_20",
    "name": "Mojito",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1722194069219-16ec49c08625?auto=format&fit=crop&q=80&w=400&h=300&sig=22",
    "isVeg": true
  },
  {
    "id": "item_21",
    "name": "Lemon Ice Tea",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1664392087859-815b337c3324?auto=format&fit=crop&q=80&w=400&h=300&sig=23",
    "isVeg": true
  },
  {
    "id": "item_22",
    "name": "Virgin Mojito",
    "price": 109,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1687354232206-778ddd5d929f?auto=format&fit=crop&q=80&w=400&h=300&sig=24",
    "isVeg": true
  },
  {
    "id": "item_cheese_garlic_bread",
    "name": "Cheese Garlic Bread",
    "price": 99,
    "description": "Toasted artisan bread topped with melted mozzarella cheese, garlic butter, and fresh herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1711752902734-a36167479983?auto=format&fit=crop&q=80&w=400&h=300&sig=25",
    "isVeg": true
  },
  {
    "id": "item_chilli_cheese_garlic_bread",
    "name": "Chilli Cheese Garlic Bread",
    "price": 109,
    "description": "Toasted artisan bread topped with melted mozzarella, fiery green chillies, garlic butter, and herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&q=80&w=400&h=300&sig=26",
    "isVeg": true
  },
  {
    "id": "item_23",
    "name": "Chilli Cheese Toast Bread",
    "price": 139,
    "description": "Freshly baked bread infused with rich garlic butter and herbs. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1739906794633-71adada97314?auto=format&fit=crop&q=80&w=400&h=300&sig=27",
    "isVeg": true
  },
  {
    "id": "item_24",
    "name": "Plain Fries",
    "price": 89,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1672774750509-bc9ff226f3e8?auto=format&fit=crop&q=80&w=400&h=300&sig=28",
    "isVeg": true
  },
  {
    "id": "item_25",
    "name": "Masala French Fries",
    "price": 99,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=400&h=300&sig=29",
    "isVeg": true
  },
  {
    "id": "item_26",
    "name": "Peri Peri Fries",
    "price": 109,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1714651620426-1ae32ca6b418?auto=format&fit=crop&q=80&w=400&h=300&sig=30",
    "isVeg": true
  },
  {
    "id": "item_27",
    "name": "Cheese French Fries",
    "price": 119,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400&h=300&sig=31",
    "isVeg": true
  },
  {
    "id": "item_addon_cheese",
    "name": "Add-on Cheese",
    "price": 25,
    "description": "Extra slice of melted cheddar cheese to customize your burger. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1691939610797-aba18030c15f?auto=format&fit=crop&q=80&w=400&h=300&sig=32",
    "isVeg": true
  },
  {
    "id": "item_28",
    "name": "Aloo Burger",
    "price": 89,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1684534125391-9e01a39570d2?auto=format&fit=crop&q=80&w=400&h=300&sig=33",
    "isVeg": true
  },
  {
    "id": "item_29",
    "name": "Veg Burger",
    "price": 99,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1683619761468-b06992704398?auto=format&fit=crop&q=80&w=400&h=300&sig=34",
    "isVeg": true
  },
  {
    "id": "item_30",
    "name": "Cheese Burger",
    "price": 129,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1683619761492-639240d29bb5?auto=format&fit=crop&q=80&w=400&h=300&sig=35",
    "isVeg": true
  },
  {
    "id": "item_31",
    "name": "Veg Spicy Burger",
    "price": 139,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1675252369719-dd52bc69c3df?auto=format&fit=crop&q=80&w=400&h=300&sig=36",
    "isVeg": true
  },
  {
    "id": "item_32",
    "name": "Black Pepper Burger",
    "price": 149,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=37",
    "isVeg": true
  },
  {
    "id": "item_33",
    "name": "Peri Peri Burger",
    "price": 159,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1683655058728-415f4f2674bf?auto=format&fit=crop&q=80&w=400&h=300&sig=38",
    "isVeg": true
  },
  {
    "id": "item_addon_cheese_pizza",
    "name": "Add-on Cheese (Pizza)",
    "price": 35,
    "description": "Extra loading of premium mozzarella cheese to customize your pizza. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?auto=format&fit=crop&q=80&w=400&h=300&sig=39",
    "isVeg": true
  },
  {
    "id": "item_34",
    "name": "Margherita Pizza",
    "price": 189,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1673439304183-8840bd0dc1bf?auto=format&fit=crop&q=80&w=400&h=300&sig=40",
    "isVeg": true
  },
  {
    "id": "item_35",
    "name": "Corn & Cheese Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&q=80&w=400&h=300&sig=41",
    "isVeg": true
  },
  {
    "id": "item_36",
    "name": "Pasta Pizza",
    "price": 209,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1552580715-4d9bc27f1e2f?auto=format&fit=crop&q=80&w=400&h=300&sig=42",
    "isVeg": true
  },
  {
    "id": "item_37",
    "name": "Garden Fresh Pizza",
    "price": 199,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1625004675351-72f8e3b547a5?auto=format&fit=crop&q=80&w=400&h=300&sig=43",
    "isVeg": true
  },
  {
    "id": "item_38",
    "name": "Exotic Veg Pizza",
    "price": 219,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400&h=300&sig=44",
    "isVeg": true
  },
  {
    "id": "item_39",
    "name": "Tandoori Paneer Pizza",
    "price": 249,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1733306588881-0411931d4fed?auto=format&fit=crop&q=80&w=400&h=300&sig=45",
    "isVeg": true
  },
  {
    "id": "item_40",
    "name": "Paneer Chilli Pizza",
    "price": 259,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1690056321981-dfe9e75e0247?auto=format&fit=crop&q=80&w=400&h=300&sig=46",
    "isVeg": true
  },
  {
    "id": "item_41",
    "name": "Mexican Cheese Pizza",
    "price": 269,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&q=80&w=400&h=300&sig=47",
    "isVeg": true
  },
  {
    "id": "item_42",
    "name": "B.B.Q Paneer Pizza",
    "price": 289,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1665033628673-7de125eb6b12?auto=format&fit=crop&q=80&w=400&h=300&sig=48",
    "isVeg": true
  },
  {
    "id": "item_43",
    "name": "Cheese Grilled Sandwich",
    "price": 119,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400&h=300&sig=49",
    "isVeg": true
  },
  {
    "id": "item_44",
    "name": "Veg Cheese Grilled Sandwich",
    "price": 139,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=400&h=300&sig=50",
    "isVeg": true
  },
  {
    "id": "item_45",
    "name": "Tandoori Paneer Sandwich",
    "price": 159,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1738802845911-809a01acfa50?auto=format&fit=crop&q=80&w=400&h=300&sig=51",
    "isVeg": true
  },
  {
    "id": "item_46",
    "name": "Junglee Paneer Sandwich",
    "price": 169,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=400&h=300&sig=52",
    "isVeg": true
  },
  {
    "id": "item_47",
    "name": "Mushroom Mood Sandwich",
    "price": 179,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1724014999928-e58f8d999ac3?auto=format&fit=crop&q=80&w=400&h=300&sig=53",
    "isVeg": true
  },
  {
    "id": "item_48",
    "name": "Desi Maggie",
    "price": 89,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1674654419438-3720f0b71087?auto=format&fit=crop&q=80&w=400&h=300&sig=54",
    "isVeg": true
  },
  {
    "id": "item_49",
    "name": "Amul Butter Maggie",
    "price": 99,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1694547926001-f2151e4a476b?auto=format&fit=crop&q=80&w=400&h=300&sig=55",
    "isVeg": true
  },
  {
    "id": "item_50",
    "name": "Corn Cheese Maggie",
    "price": 109,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1602833280958-1657662ccc58?auto=format&fit=crop&q=80&w=400&h=300&sig=56",
    "isVeg": true
  },
  {
    "id": "item_51",
    "name": "Chatori Maggie",
    "price": 119,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400&h=300&sig=57",
    "isVeg": true
  },
  {
    "id": "item_52",
    "name": "Chilli Potato Burger",
    "price": 149,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1668618295237-f1d8666812c9?auto=format&fit=crop&q=80&w=400&h=300&sig=58",
    "isVeg": true
  },
  {
    "id": "item_53",
    "name": "Palak Patta Chaat",
    "price": 159,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1695293743884-0fc9d206ad14?auto=format&fit=crop&q=80&w=400&h=300&sig=59",
    "isVeg": true
  },
  {
    "id": "item_54",
    "name": "Chilli Idli",
    "price": 169,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1675864033264-cb9db758422d?auto=format&fit=crop&q=80&w=400&h=300&sig=60",
    "isVeg": true
  },
  {
    "id": "item_55",
    "name": "Bread Cheese Roll",
    "price": 179,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1693086421089-847b0a2724f8?auto=format&fit=crop&q=80&w=400&h=300&sig=61",
    "isVeg": true
  },
  {
    "id": "item_56",
    "name": "Cheese Corn Ball",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1714256635057-2a831a5c7e8d?auto=format&fit=crop&q=80&w=400&h=300&sig=62",
    "isVeg": true
  },
  {
    "id": "item_57",
    "name": "Baby Corn Finger",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1661290330578-9d37c11ace73?auto=format&fit=crop&q=80&w=400&h=300&sig=63",
    "isVeg": true
  },
  {
    "id": "item_58",
    "name": "Cheese Paneer Dosa",
    "price": 229,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1775113885062-74aa7e2b500a?auto=format&fit=crop&q=80&w=400&h=300&sig=64",
    "isVeg": true
  },
  {
    "id": "item_59",
    "name": "Bold Biryani",
    "price": 239,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1694141252774-c937d97641da?auto=format&fit=crop&q=80&w=400&h=300&sig=65",
    "isVeg": true
  },
  {
    "id": "item_60",
    "name": "Hot Chilli Garlic Paneer Burger",
    "price": 249,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1683121323997-37c33730ede8?auto=format&fit=crop&q=80&w=400&h=300&sig=66",
    "isVeg": true
  },
  {
    "id": "item_61",
    "name": "Veg Steam Momos",
    "price": 119,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1673769108070-580fe90b8de7?auto=format&fit=crop&q=80&w=400&h=300&sig=67",
    "isVeg": true
  },
  {
    "id": "item_62",
    "name": "Veg Fried Momos",
    "price": 129,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1667807521884-e25207a0555b?auto=format&fit=crop&q=80&w=400&h=300&sig=68",
    "isVeg": true
  },
  {
    "id": "item_63",
    "name": "Paneer Steam Momos",
    "price": 139,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1723730426108-1bb37a500d5c?auto=format&fit=crop&q=80&w=400&h=300&sig=69",
    "isVeg": true
  },
  {
    "id": "item_64",
    "name": "Paneer Fried Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1674601033631-79eeffaac6f9?auto=format&fit=crop&q=80&w=400&h=300&sig=70",
    "isVeg": true
  },
  {
    "id": "item_65",
    "name": "Corn Cheese Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1775581773993-d49ec225d27b?auto=format&fit=crop&q=80&w=400&h=300&sig=71",
    "isVeg": true
  },
  {
    "id": "item_66",
    "name": "Kurkure Momos",
    "price": 159,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1589047133481-02b4a5327d89?auto=format&fit=crop&q=80&w=400&h=300&sig=72",
    "isVeg": true
  },
  {
    "id": "item_67",
    "name": "White Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1701013638882-7de4115131fc?auto=format&fit=crop&q=80&w=400&h=300&sig=73",
    "isVeg": true
  },
  {
    "id": "item_68",
    "name": "Red Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1664478288635-b9703a502393?auto=format&fit=crop&q=80&w=400&h=300&sig=74",
    "isVeg": true
  },
  {
    "id": "item_69",
    "name": "Pink Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1709201417401-5c72ed84f191?auto=format&fit=crop&q=80&w=400&h=300&sig=75",
    "isVeg": true
  },
  {
    "id": "item_70",
    "name": "Veg Roll",
    "price": 109,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1677619680748-002bc2414d4e?auto=format&fit=crop&q=80&w=400&h=300&sig=76",
    "isVeg": true
  },
  {
    "id": "item_71",
    "name": "Paneer Chilli Roll",
    "price": 129,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1679287668532-f55fdc58e01f?auto=format&fit=crop&q=80&w=400&h=300&sig=77",
    "isVeg": true
  },
  {
    "id": "item_72",
    "name": "Mushroom Chilli Roll",
    "price": 139,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1712949140529-203336f93d17?auto=format&fit=crop&q=80&w=400&h=300&sig=78",
    "isVeg": true
  },
  {
    "id": "item_73",
    "name": "Paneer 65 Roll",
    "price": 149,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1663850684986-b9d15f1de6bc?auto=format&fit=crop&q=80&w=400&h=300&sig=79",
    "isVeg": true
  },
  {
    "id": "item_74",
    "name": "Chilli Potato",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1725001313899-5bae5e20a535?auto=format&fit=crop&q=80&w=400&h=300&sig=80",
    "isVeg": true
  },
  {
    "id": "item_75",
    "name": "Crispy Corn",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1725282495491-ac18e3c11edb?auto=format&fit=crop&q=80&w=400&h=300&sig=81",
    "isVeg": true
  },
  {
    "id": "item_76",
    "name": "Honey Chilli Potato",
    "price": 149,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1672498193267-4f0e8c819bc8?auto=format&fit=crop&q=80&w=400&h=300&sig=82",
    "isVeg": true
  },
  {
    "id": "item_77",
    "name": "Crispy Baby Corn",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1590005176489-db2e714711fc?auto=format&fit=crop&q=80&w=400&h=300&sig=83",
    "isVeg": true
  },
  {
    "id": "item_78",
    "name": "Paneer Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1695865414376-451436dfeba0?auto=format&fit=crop&q=80&w=400&h=300&sig=84",
    "isVeg": true
  },
  {
    "id": "item_79",
    "name": "Veg Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1726862874540-531140b04f62?auto=format&fit=crop&q=80&w=400&h=300&sig=85",
    "isVeg": true
  },
  {
    "id": "item_80",
    "name": "Chilli Paneer (Dry)",
    "price": 169,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8?auto=format&fit=crop&q=80&w=400&h=300&sig=86",
    "isVeg": true
  },
  {
    "id": "item_81",
    "name": "Veg Manchurian (Gravy)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1642520078772-0a26120c92b2?auto=format&fit=crop&q=80&w=400&h=300&sig=87",
    "isVeg": true
  },
  {
    "id": "item_82",
    "name": "Mushroom Chilli (Dry)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1696617441771-161a5dc2433f?auto=format&fit=crop&q=80&w=400&h=300&sig=88",
    "isVeg": true
  },
  {
    "id": "item_83",
    "name": "Mushroom Chilli (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1676879544633-975c480ae98f?auto=format&fit=crop&q=80&w=400&h=300&sig=89",
    "isVeg": true
  },
  {
    "id": "item_84",
    "name": "Paneer Manchurian (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1708782340354-f77e721d1ef8?auto=format&fit=crop&q=80&w=400&h=300&sig=90",
    "isVeg": true
  },
  {
    "id": "item_85",
    "name": "Paneer 65 (Dry)",
    "price": 199,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1726072357095-1c897ce4c08e?auto=format&fit=crop&q=80&w=400&h=300&sig=91",
    "isVeg": true
  },
  {
    "id": "item_86",
    "name": "Chilli Paneer (Gravy)",
    "price": 209,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1723708871094-2c02cf5f5394?auto=format&fit=crop&q=80&w=400&h=300&sig=92",
    "isVeg": true
  },
  {
    "id": "item_87",
    "name": "Paneer 65 (Gravy)",
    "price": 219,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1629115918385-b0256a232511?auto=format&fit=crop&q=80&w=400&h=300&sig=93",
    "isVeg": true
  },
  {
    "id": "item_88",
    "name": "Matar Paneer",
    "price": 199,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1687487403829-0e4512710138?auto=format&fit=crop&q=80&w=400&h=300&sig=94",
    "isVeg": true
  },
  {
    "id": "item_89",
    "name": "Paneer Do Pyaza",
    "price": 229,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1712920284077-c6ad9c260795?auto=format&fit=crop&q=80&w=400&h=300&sig=95",
    "isVeg": true
  },
  {
    "id": "item_90",
    "name": "Paneer Butter Masala",
    "price": 249,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400&h=300&sig=96",
    "isVeg": true
  },
  {
    "id": "item_91",
    "name": "Kadai Paneer",
    "price": 259,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1652545296893-ff9227b3512e?auto=format&fit=crop&q=80&w=400&h=300&sig=97",
    "isVeg": true
  },
  {
    "id": "item_92",
    "name": "Paneer Handi",
    "price": 269,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400&h=300&sig=98",
    "isVeg": true
  },
  {
    "id": "item_93",
    "name": "Paneer Punjabi",
    "price": 279,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&q=80&w=400&h=300&sig=99",
    "isVeg": true
  },
  {
    "id": "item_94",
    "name": "Shahi Paneer",
    "price": 289,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400&h=300&sig=100",
    "isVeg": true
  },
  {
    "id": "item_95",
    "name": "Mushroom Matar Masala",
    "price": 199,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400&h=300&sig=101",
    "isVeg": true
  },
  {
    "id": "item_96",
    "name": "Mushroom Do Pyaza",
    "price": 229,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1674575495214-4bac16cd25a3?auto=format&fit=crop&q=80&w=400&h=300&sig=102",
    "isVeg": true
  },
  {
    "id": "item_97",
    "name": "Mushroom Butter Masala",
    "price": 249,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1667428304126-52e44e315dab?auto=format&fit=crop&q=80&w=400&h=300&sig=103",
    "isVeg": true
  },
  {
    "id": "item_98",
    "name": "Mushroom Kadai",
    "price": 259,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1674575415644-3dcf6b288855?auto=format&fit=crop&q=80&w=400&h=300&sig=104",
    "isVeg": true
  },
  {
    "id": "item_99",
    "name": "Mushroom Handi",
    "price": 269,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=400&h=300&sig=105",
    "isVeg": true
  },
  {
    "id": "item_100",
    "name": "Tawa Roti",
    "price": 12,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1780907084874-14d202d39bf1?auto=format&fit=crop&q=80&w=400&h=300&sig=106",
    "isVeg": true
  },
  {
    "id": "item_101",
    "name": "Butter Tawa Roti",
    "price": 15,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1722239312666-84328fce4c6f?auto=format&fit=crop&q=80&w=400&h=300&sig=107",
    "isVeg": true
  },
  {
    "id": "item_102",
    "name": "Steam Rice",
    "price": 89,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1675814316651-3ce3c6409922?auto=format&fit=crop&q=80&w=400&h=300&sig=108",
    "isVeg": true
  },
  {
    "id": "item_103",
    "name": "Jeera Rice",
    "price": 99,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1647577931985-e0c3e8fb815c?auto=format&fit=crop&q=80&w=400&h=300&sig=109",
    "isVeg": true
  },
  {
    "id": "item_104",
    "name": "Dal Fry",
    "price": 119,
    "description": "Fresh hot tawa bread or premium long grain steam rice. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "roti_rice",
    "image": "https://images.unsplash.com/photo-1674498559663-da58647b1834?auto=format&fit=crop&q=80&w=400&h=300&sig=110",
    "isVeg": true
  },
  {
    "id": "item_105",
    "name": "Idli",
    "price": 79,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=111",
    "isVeg": true
  },
  {
    "id": "item_106",
    "name": "Plain Dosa",
    "price": 99,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1743517894265-c86ab035adef?auto=format&fit=crop&q=80&w=400&h=300&sig=112",
    "isVeg": true
  },
  {
    "id": "item_107",
    "name": "Vada Sambhar",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1661963385126-11fa577925d3?auto=format&fit=crop&q=80&w=400&h=300&sig=113",
    "isVeg": true
  },
  {
    "id": "item_108",
    "name": "Plain Uttapam",
    "price": 119,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1736239091911-2e46d86cdc2d?auto=format&fit=crop&q=80&w=400&h=300&sig=114",
    "isVeg": true
  },
  {
    "id": "item_109",
    "name": "Onion Uttapam",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1723708958105-09e29205e551?auto=format&fit=crop&q=80&w=400&h=300&sig=115",
    "isVeg": true
  },
  {
    "id": "item_110",
    "name": "Onion Dosa",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1725483990685-820291c0fca1?auto=format&fit=crop&q=80&w=400&h=300&sig=116",
    "isVeg": true
  },
  {
    "id": "item_111",
    "name": "Mix Veg Uttapam",
    "price": 139,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1691030658353-d223db8307ca?auto=format&fit=crop&q=80&w=400&h=300&sig=117",
    "isVeg": true
  },
  {
    "id": "item_112",
    "name": "Masala Uttapam",
    "price": 149,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=400&h=300&sig=118",
    "isVeg": true
  },
  {
    "id": "item_113",
    "name": "Masala Dosa",
    "price": 159,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1674764004341-0cc45c963ee1?auto=format&fit=crop&q=80&w=400&h=300&sig=119",
    "isVeg": true
  },
  {
    "id": "item_114",
    "name": "Butter Masala Dosa",
    "price": 169,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1694849789325-914b71ab4075?auto=format&fit=crop&q=80&w=400&h=300&sig=120",
    "isVeg": true
  },
  {
    "id": "item_115",
    "name": "Paneer Dosa",
    "price": 199,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1777392913742-ac98998d6afe?auto=format&fit=crop&q=80&w=400&h=300&sig=121",
    "isVeg": true
  },
  {
    "id": "item_116",
    "name": "Hot Gulab Jamun",
    "price": 69,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1696947876408-b44887114553?auto=format&fit=crop&q=80&w=400&h=300&sig=122",
    "isVeg": true
  },
  {
    "id": "item_117",
    "name": "Gulab Jamun with Ice Cream",
    "price": 109,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1671559020860-5e8e7a05c4ac?auto=format&fit=crop&q=80&w=400&h=300&sig=123",
    "isVeg": true
  },
  {
    "id": "item_118",
    "name": "Brownie with Ice Cream",
    "price": 149,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1675237626067-f57f628f76f7?auto=format&fit=crop&q=80&w=400&h=300&sig=124",
    "isVeg": true
  },
  {
    "id": "item_veg_noodles",
    "name": "Veg Noodles",
    "price": 139,
    "description": "Stir-fried noodles tossed with fresh garden vegetables and savory Chinese sauces. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1694670234085-4f38b261ce5b?auto=format&fit=crop&q=80&w=400&h=300&sig=125",
    "isVeg": true
  },
  {
    "id": "item_garlic_noodles",
    "name": "Garlic Noodles",
    "price": 149,
    "description": "Flavorful noodles wok-tossed with aromatic minced garlic and light seasoning. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1661445014453-784cd6c59ac8?auto=format&fit=crop&q=80&w=400&h=300&sig=126",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_noodles",
    "name": "Mix Veg Noodles",
    "price": 159,
    "description": "Stir-fried noodles loaded with an assortment of crisp vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=127",
    "isVeg": true
  },
  {
    "id": "item_paneer_noodles",
    "name": "Paneer Noodles",
    "price": 169,
    "description": "Stir-fried noodles tossed with soft paneer cubes and mild spices. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1634864572865-1cf8ff8bd23d?auto=format&fit=crop&q=80&w=400&h=300&sig=128",
    "isVeg": true
  },
  {
    "id": "item_schezwan_fried_noodles",
    "name": "Schezwan Fried Noodles",
    "price": 169,
    "description": "Spicy stir-fried noodles tossed in hot and fiery Schezwan sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1617622141675-d3005b9067c5?auto=format&fit=crop&q=80&w=400&h=300&sig=129",
    "isVeg": true
  },
  {
    "id": "item_veg_hakka_noodles",
    "name": "Veg Hakka Noodles",
    "price": 179,
    "description": "Classic Indo-Chinese style Hakka noodles, wok-tossed to perfection. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1607328874071-45a9cd600644?auto=format&fit=crop&q=80&w=400&h=300&sig=130",
    "isVeg": true
  },
  {
    "id": "item_paneer_singapuri_noodles",
    "name": "Paneer Singapuri Noodles",
    "price": 189,
    "description": "Exotic stir-fried noodles cooked with paneer, curry powder, and a touch of sweetness. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1733907557463-915a34237e8e?auto=format&fit=crop&q=80&w=400&h=300&sig=131",
    "isVeg": true
  },
  {
    "id": "item_veg_fried_rice",
    "name": "Veg Fried Rice",
    "price": 149,
    "description": "Fluffy basmati rice wok-tossed with finely chopped fresh vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400&h=300&sig=132",
    "isVeg": true
  },
  {
    "id": "item_schezwan_fried_rice",
    "name": "Schezwan Fried Rice",
    "price": 159,
    "description": "Spicy and flavorful fried rice tossed in zesty Schezwan sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1664391895725-ed1819010135?auto=format&fit=crop&q=80&w=400&h=300&sig=133",
    "isVeg": true
  },
  {
    "id": "item_mix_fried_rice",
    "name": "Mix Fried Rice",
    "price": 169,
    "description": "Basmati rice tossed with a loaded assortment of vegetables and mild spices. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1664717698774-84f62382613b?auto=format&fit=crop&q=80&w=400&h=300&sig=134",
    "isVeg": true
  },
  {
    "id": "item_paneer_fried_rice",
    "name": "Paneer Fried Rice",
    "price": 179,
    "description": "Wok-tossed basmati rice with pan-seared paneer cubes and veggies. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1694141252026-3df1de888a21?auto=format&fit=crop&q=80&w=400&h=300&sig=135",
    "isVeg": true
  },
  {
    "id": "item_triple_fried_rice",
    "name": "Triple Fried Rice",
    "price": 189,
    "description": "A combination of fried rice, crispy fried noodles, and a rich spicy Chinese gravy. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1751618646882-4221d5e3b1c2?auto=format&fit=crop&q=80&w=400&h=300&sig=136",
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
    "image": "https://images.unsplash.com/photo-1675727579542-ad785e1cee41?auto=format&fit=crop&q=80&w=400&h=300&sig=137",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_soup",
    "name": "Mix Veg Soup",
    "price": 109,
    "description": "Healthy and comforting clear soup loaded with finely chopped garden vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1700673590238-a0e3a3795ae2?auto=format&fit=crop&q=80&w=400&h=300&sig=138",
    "isVeg": true
  },
  {
    "id": "item_veg_manchow_soup",
    "name": "Veg Manchow Soup",
    "price": 119,
    "description": "Spicy and tangy Indo-Chinese soup served with crispy fried noodles. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1675707499311-726434ce10fc?auto=format&fit=crop&q=80&w=400&h=300&sig=139",
    "isVeg": true
  },
  {
    "id": "item_pav_bhaji",
    "name": "Pav Bhaji",
    "price": 119,
    "description": "Spiced mashed vegetable gravy served with hot butter-toasted pav buns. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1691030922124-c6a81c377234?auto=format&fit=crop&q=80&w=400&h=300&sig=140",
    "isVeg": true
  },
  {
    "id": "item_vada_pav",
    "name": "Vada Pav",
    "price": 129,
    "description": "Classic Mumbai street food style spicy potato vada sandwiched in soft pav. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1669260111243-713927460506?auto=format&fit=crop&q=80&w=400&h=300&sig=141",
    "isVeg": true
  },
  {
    "id": "item_chilli_o_virgin_sandwich",
    "name": "Chilli-O-Virgin Sandwich",
    "price": 149,
    "description": "Spicy and zesty sandwich stuffed with signature chilly toppings and cheese. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=400&h=300&sig=142",
    "isVeg": true
  },
  {
    "id": "item_tax_max_sandwich",
    "name": "Tax-Max Sandwich",
    "price": 159,
    "description": "Ultimate loaded sandwich packed with max veggies and signature tangy sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1739389293711-626ff36acde4?auto=format&fit=crop&q=80&w=400&h=300&sig=143",
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
