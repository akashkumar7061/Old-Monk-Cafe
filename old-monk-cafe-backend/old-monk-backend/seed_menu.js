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
    "image": "https://images.unsplash.com/photo-1683533698664-12ee473e8c9d?auto=format&fit=crop&q=80&w=400&h=300&sig=1",
    "isVeg": true
  },
  {
    "id": "item_old_monk_special_chai",
    "name": "Old Monk Special Chai",
    "price": 30,
    "description": "Our signature special spiced tea, slow-brewed to rich creamy perfection. Freshly handcrafted with authentic premium ingredients.",
    "categorySlug": "kadak_chai",
    "image": "/images/old_monk_special_chai.jpg",
    "isVeg": true
  },
  {
    "id": "item_2",
    "name": "Adrak Elaichi Chai",
    "price": 30,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1619581073186-5b4ae1b0caad?auto=format&fit=crop&q=80&w=400&h=300&sig=3",
    "isVeg": true
  },
  {
    "id": "item_3",
    "name": "Chocolate Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=400&h=300&sig=4",
    "isVeg": true
  },
  {
    "id": "item_4",
    "name": "Pudina Chai",
    "price": 35,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "https://images.unsplash.com/photo-1683533699004-7f6b9e5a073f?auto=format&fit=crop&q=80&w=400&h=300&sig=5",
    "isVeg": true
  },
  {
    "id": "item_5",
    "name": "Kesar Chai",
    "price": 50,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "kadak_chai",
    "image": "/images/kesar_chai.jpg",
    "isVeg": true
  },
  {
    "id": "item_6",
    "name": "Regular Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400&h=300&sig=7",
    "isVeg": true
  },
  {
    "id": "item_7",
    "name": "Black Coffee",
    "price": 50,
    "description": "Freshly brewed classic hot coffee to kickstart your day. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_coffee",
    "image": "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=400&h=300&sig=8",
    "isVeg": true
  },
  {
    "id": "item_8",
    "name": "Bournvita Old School",
    "price": 89,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "/images/bournvita_old_school.jpg",
    "isVeg": true
  },
  {
    "id": "item_9",
    "name": "Hot Chocolate",
    "price": 99,
    "description": "Classic hot milk blend, comforting and healthy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "hot_milk",
    "image": "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?auto=format&fit=crop&q=80&w=400&h=300&sig=10",
    "isVeg": true
  },
  {
    "id": "item_classic_cold_coffee",
    "name": "Classic Cold Coffee",
    "price": 149,
    "description": "Smooth, creamy blended coffee, served ice-cold to refresh your senses. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400&h=300&sig=11",
    "isVeg": true
  },
  {
    "id": "item_10",
    "name": "Hazelnut Premium",
    "price": 159,
    "description": "Rich and creamy whipped cold coffee served chilled. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "cold_coffee",
    "image": "/images/hazelnut_premium_cold_coffee.jpg",
    "isVeg": true
  },
  {
    "id": "item_11",
    "name": "Vanilla Milkshake",
    "price": 149,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "/images/vanilla_milkshake.jpg",
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
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400&h=300&sig=17",
    "isVeg": true
  },
  {
    "id": "item_16",
    "name": "Oreo Milkshake",
    "price": 179,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1641665271888-575e46923776?auto=format&fit=crop&q=80&w=400&h=300&sig=18",
    "isVeg": true
  },
  {
    "id": "item_17",
    "name": "KitKat Milkshake",
    "price": 189,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1714799263245-4fc7cc21911e?auto=format&fit=crop&q=80&w=400&h=300&sig=19",
    "isVeg": true
  },
  {
    "id": "item_18",
    "name": "Brownie Milkshake",
    "price": 199,
    "description": "Decadent, creamy blended milkshake topped with rich flavors. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "milk_shake",
    "image": "https://images.unsplash.com/photo-1619158403521-ed9795026d47?auto=format&fit=crop&q=80&w=400&h=300&sig=20",
    "isVeg": true
  },
  {
    "id": "item_19",
    "name": "Masala Lemonade",
    "price": 89,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1634542764159-ed0a416ddaf0?auto=format&fit=crop&q=80&w=400&h=300&sig=21",
    "isVeg": true
  },
  {
    "id": "item_20",
    "name": "Mojito",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1653542772393-71ffa417b1c4?auto=format&fit=crop&q=80&w=400&h=300&sig=22",
    "isVeg": true
  },
  {
    "id": "item_21",
    "name": "Lemon Ice Tea",
    "price": 99,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400&h=300&sig=23",
    "isVeg": true
  },
  {
    "id": "item_22",
    "name": "Virgin Mojito",
    "price": 109,
    "description": "Refreshing iced cooler blend with sweet and tangy elements. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "coolers",
    "image": "https://images.unsplash.com/photo-1634496064950-02f043806b09?auto=format&fit=crop&q=80&w=400&h=300&sig=24",
    "isVeg": true
  },
  {
    "id": "item_cheese_garlic_bread",
    "name": "Cheese Garlic Bread",
    "price": 99,
    "description": "Toasted artisan bread topped with melted mozzarella cheese, garlic butter, and fresh herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&q=80&w=400&h=300&sig=25",
    "isVeg": true
  },
  {
    "id": "item_chilli_cheese_garlic_bread",
    "name": "Chilli Cheese Garlic Bread",
    "price": 109,
    "description": "Toasted artisan bread topped with melted mozzarella, fiery green chillies, garlic butter, and herbs. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=400&h=300&sig=26",
    "isVeg": true
  },
  {
    "id": "item_23",
    "name": "Chilli Cheese Toast Bread",
    "price": 139,
    "description": "Freshly baked bread infused with rich garlic butter and herbs. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "garlic_bread",
    "image": "https://images.unsplash.com/photo-1649765640770-c0a3961bdc93?auto=format&fit=crop&q=80&w=400&h=300&sig=27",
    "isVeg": true
  },
  {
    "id": "item_24",
    "name": "Plain Fries",
    "price": 89,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=400&h=300&sig=28",
    "isVeg": true
  },
  {
    "id": "item_25",
    "name": "Masala French Fries",
    "price": 99,
    "description": "Crispy golden fried potatoes seasoned to perfection. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "french_fries",
    "image": "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?auto=format&fit=crop&q=80&w=400&h=300&sig=29",
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
    "image": "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?auto=format&fit=crop&q=80&w=400&h=300&sig=32",
    "isVeg": true
  },
  {
    "id": "item_28",
    "name": "Aloo Burger",
    "price": 89,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?auto=format&fit=crop&q=80&w=400&h=300&sig=33",
    "isVeg": true
  },
  {
    "id": "item_29",
    "name": "Veg Burger",
    "price": 99,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300&sig=34",
    "isVeg": true
  },
  {
    "id": "item_30",
    "name": "Cheese Burger",
    "price": 129,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400&h=300&sig=35",
    "isVeg": true
  },
  {
    "id": "item_31",
    "name": "Veg Spicy Burger",
    "price": 139,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=400&h=300&sig=36",
    "isVeg": true
  },
  {
    "id": "item_32",
    "name": "Black Pepper Burger",
    "price": 149,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400&h=300&sig=37",
    "isVeg": true
  },
  {
    "id": "item_33",
    "name": "Peri Peri Burger",
    "price": 159,
    "description": "Gourmet grilled patty with signature sauces in soft buns. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "burgers",
    "image": "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&q=80&w=400&h=300&sig=38",
    "isVeg": true
  },
  {
    "id": "item_addon_cheese_pizza",
    "name": "Add-on Cheese (Pizza)",
    "price": 35,
    "description": "Extra loading of premium mozzarella cheese to customize your pizza. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1683314573424-b0da0c795a07?auto=format&fit=crop&q=80&w=400&h=300&sig=39",
    "isVeg": true
  },
  {
    "id": "item_34",
    "name": "Margherita Pizza",
    "price": 189,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "/images/margherita_pizza.jpg",
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
    "image": "/images/garden_fresh_pizza.jpg",
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
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300&sig=45",
    "isVeg": true
  },
  {
    "id": "item_40",
    "name": "Paneer Chilli Pizza",
    "price": 259,
    "description": "Fresh artisanal hand-tossed stone-baked pizza loaded with cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pizza",
    "image": "https://images.unsplash.com/photo-1615719413546-198b25453f85?auto=format&fit=crop&q=80&w=400&h=300&sig=46",
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
    "image": "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&q=80&w=400&h=300&sig=51",
    "isVeg": true
  },
  {
    "id": "item_46",
    "name": "Junglee Paneer Sandwich",
    "price": 169,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1716535232833-a58b93c9b134?auto=format&fit=crop&q=80&w=400&h=300&sig=52",
    "isVeg": true
  },
  {
    "id": "item_47",
    "name": "Mushroom Mood Sandwich",
    "price": 179,
    "description": "Gourmet toasted sandwich filled with premium cheese and veggies. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1655279562015-047c3da9a271?auto=format&fit=crop&q=80&w=400&h=300&sig=53",
    "isVeg": true
  },
  {
    "id": "item_48",
    "name": "Desi Maggie",
    "price": 89,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1602833280958-1657662ccc58?auto=format&fit=crop&q=80&w=400&h=300&sig=54",
    "isVeg": true
  },
  {
    "id": "item_49",
    "name": "Amul Butter Maggie",
    "price": 99,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400&h=300&sig=55",
    "isVeg": true
  },
  {
    "id": "item_cheese_maggie",
    "name": "Cheese Maggie",
    "price": 99,
    "description": "Old school comfort noodles loaded with premium melted cheese. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "/images/cheese_maggie.jpg",
    "isVeg": true
  },
  {
    "id": "item_50",
    "name": "Corn Cheese Maggie",
    "price": 109,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "/images/cheese_corn_maggie.jpg",
    "isVeg": true
  },
  {
    "id": "item_51",
    "name": "Chatori Maggie",
    "price": 119,
    "description": "Old school comfort noodles tossed in special spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "maggie",
    "image": "/images/chatori_maggie.jpg",
    "isVeg": true
  },
  {
    "id": "item_52",
    "name": "Chilli Potato Burger",
    "price": 149,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&q=80&w=400&h=300&sig=58",
    "isVeg": true
  },
  {
    "id": "item_53",
    "name": "Palak Patta Chaat",
    "price": 159,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "/images/palak_patta_chaat.jpg",
    "isVeg": true
  },
  {
    "id": "item_54",
    "name": "Chilli Idli",
    "price": 169,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400&h=300&sig=60",
    "isVeg": true
  },
  {
    "id": "item_55",
    "name": "Bread Cheese Roll",
    "price": 179,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1772223460178-409a9ae69c99?auto=format&fit=crop&q=80&w=400&h=300&sig=61",
    "isVeg": true
  },
  {
    "id": "item_56",
    "name": "Cheese Corn Ball",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "/images/cheese_corn_ball.jpg",
    "isVeg": true
  },
  {
    "id": "item_57",
    "name": "Baby Corn Finger",
    "price": 189,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "/images/baby_corn_finger.jpg",
    "isVeg": true
  },
  {
    "id": "item_58",
    "name": "Cheese Paneer Dosa",
    "price": 229,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "/images/cheese_paneer_dosa.jpg",
    "isVeg": true
  },
  {
    "id": "item_59",
    "name": "Bold Biryani",
    "price": 239,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "/images/bold_biryani.jpg",
    "isVeg": true
  },
  {
    "id": "item_60",
    "name": "Hot Chilli Garlic Paneer Burger",
    "price": 249,
    "description": "Old Monk exclusive gourmet creation, prepared fresh. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "special",
    "image": "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&q=80&w=400&h=300&sig=66",
    "isVeg": true
  },
  {
    "id": "item_61",
    "name": "Veg Steam Momos",
    "price": 119,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa?auto=format&fit=crop&q=80&w=400&h=300&sig=67",
    "isVeg": true
  },
  {
    "id": "item_62",
    "name": "Veg Fried Momos",
    "price": 129,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "https://images.unsplash.com/photo-1738608084602-f9543952188e?auto=format&fit=crop&q=80&w=400&h=300&sig=68",
    "isVeg": true
  },
  {
    "id": "item_63",
    "name": "Paneer Steam Momos",
    "price": 139,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/paneer_steam_momos.jpg",
    "isVeg": true
  },
  {
    "id": "item_64",
    "name": "Paneer Fried Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/paneer_fried_momos.jpg",
    "isVeg": true
  },
  {
    "id": "item_65",
    "name": "Corn Cheese Momos",
    "price": 149,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/corn_cheese_momos.jpg",
    "isVeg": true
  },
  {
    "id": "item_66",
    "name": "Kurkure Momos",
    "price": 159,
    "description": "Steamed thin wrappers loaded with signature delicious fillings. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "momos",
    "image": "/images/kurkure_momos.jpg",
    "isVeg": true
  },
  {
    "id": "item_67",
    "name": "White Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?auto=format&fit=crop&q=80&w=400&h=300&sig=73",
    "isVeg": true
  },
  {
    "id": "item_68",
    "name": "Red Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "https://images.unsplash.com/photo-1709201417401-5c72ed84f191?auto=format&fit=crop&q=80&w=400&h=300&sig=74",
    "isVeg": true
  },
  {
    "id": "item_69",
    "name": "Pink Cheese Sauce Pasta",
    "price": 179,
    "description": "Tender penne pasta tossed in rich, flavorful gourmet sauce. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "pasta",
    "image": "/images/pink_cheese_sauce_pasta.jpg",
    "isVeg": true
  },
  {
    "id": "item_70",
    "name": "Veg Roll",
    "price": 109,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1621427017787-e726cad02a1e?auto=format&fit=crop&q=80&w=400&h=300&sig=76",
    "isVeg": true
  },
  {
    "id": "item_71",
    "name": "Paneer Chilli Roll",
    "price": 129,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?auto=format&fit=crop&q=80&w=400&h=300&sig=77",
    "isVeg": true
  },
  {
    "id": "item_72",
    "name": "Mushroom Chilli Roll",
    "price": 139,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1626028937276-825810a384b1?auto=format&fit=crop&q=80&w=400&h=300&sig=78",
    "isVeg": true
  },
  {
    "id": "item_73",
    "name": "Paneer 65 Roll",
    "price": 149,
    "description": "Warm flatbread wrap loaded with delicious spiced filling. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "rolls",
    "image": "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?auto=format&fit=crop&q=80&w=400&h=300&sig=79",
    "isVeg": true
  },
  {
    "id": "item_74",
    "name": "Chilli Potato",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1708771862265-f54741c65a89?auto=format&fit=crop&q=80&w=400&h=300&sig=80",
    "isVeg": true
  },
  {
    "id": "item_75",
    "name": "Crispy Corn",
    "price": 139,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1578652903016-b78571b87410?auto=format&fit=crop&q=80&w=400&h=300&sig=81",
    "isVeg": true
  },
  {
    "id": "item_76",
    "name": "Honey Chilli Potato",
    "price": 149,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1565310022184-f23a884f29da?auto=format&fit=crop&q=80&w=400&h=300&sig=82",
    "isVeg": true
  },
  {
    "id": "item_77",
    "name": "Crispy Baby Corn",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1559631526-5716df3cfacd?auto=format&fit=crop&q=80&w=400&h=300&sig=83",
    "isVeg": true
  },
  {
    "id": "item_78",
    "name": "Paneer Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1565310022152-79c62f598627?auto=format&fit=crop&q=80&w=400&h=300&sig=84",
    "isVeg": true
  },
  {
    "id": "item_79",
    "name": "Veg Manchurian (Dry)",
    "price": 159,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1773904023771-3c91086035d2?auto=format&fit=crop&q=80&w=400&h=300&sig=85",
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
    "image": "https://images.unsplash.com/photo-1622629111578-d2312c53cde9?auto=format&fit=crop&q=80&w=400&h=300&sig=87",
    "isVeg": true
  },
  {
    "id": "item_82",
    "name": "Mushroom Chilli (Dry)",
    "price": 179,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1761545832843-f551732204fb?auto=format&fit=crop&q=80&w=400&h=300&sig=88",
    "isVeg": true
  },
  {
    "id": "item_83",
    "name": "Mushroom Chilli (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=400&h=300&sig=89",
    "isVeg": true
  },
  {
    "id": "item_84",
    "name": "Paneer Manchurian (Gravy)",
    "price": 189,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1565310022174-df1ff17791e1?auto=format&fit=crop&q=80&w=400&h=300&sig=90",
    "isVeg": true
  },
  {
    "id": "item_85",
    "name": "Paneer 65 (Dry)",
    "price": 199,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1596560981701-bfadc91c47ce?auto=format&fit=crop&q=80&w=400&h=300&sig=91",
    "isVeg": true
  },
  {
    "id": "item_86",
    "name": "Chilli Paneer (Gravy)",
    "price": 209,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=400&h=300&sig=92",
    "isVeg": true
  },
  {
    "id": "item_87",
    "name": "Paneer 65 (Gravy)",
    "price": 219,
    "description": "Spicy wok-tossed indo-chinese appetizer, cooked dry or gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "chinese_snacks",
    "image": "https://images.unsplash.com/photo-1658951870170-95e4744abdc4?auto=format&fit=crop&q=80&w=400&h=300&sig=93",
    "isVeg": true
  },
  {
    "id": "item_88",
    "name": "Matar Paneer",
    "price": 199,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400&h=300&sig=94",
    "isVeg": true
  },
  {
    "id": "item_89",
    "name": "Paneer Do Pyaza",
    "price": 229,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1642821369314-100fece91d3c?auto=format&fit=crop&q=80&w=400&h=300&sig=95",
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
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400&h=300&sig=98",
    "isVeg": true
  },
  {
    "id": "item_93",
    "name": "Paneer Punjabi",
    "price": 279,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1690403160225-3db8cc8babd5?auto=format&fit=crop&q=80&w=400&h=300&sig=99",
    "isVeg": true
  },
  {
    "id": "item_94",
    "name": "Shahi Paneer",
    "price": 289,
    "description": "Smoky cottage cheese cubes cooked in rich tandoori gravy. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desi_paneer",
    "image": "https://images.unsplash.com/photo-1680359871262-de06d71490b7?auto=format&fit=crop&q=80&w=400&h=300&sig=100",
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
    "image": "https://images.unsplash.com/photo-1597701655287-2ea251d9c447?auto=format&fit=crop&q=80&w=400&h=300&sig=102",
    "isVeg": true
  },
  {
    "id": "item_97",
    "name": "Mushroom Butter Masala",
    "price": 249,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=300&sig=103",
    "isVeg": true
  },
  {
    "id": "item_98",
    "name": "Mushroom Kadai",
    "price": 259,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1624968814155-236efede1cec?auto=format&fit=crop&q=80&w=400&h=300&sig=104",
    "isVeg": true
  },
  {
    "id": "item_99",
    "name": "Mushroom Handi",
    "price": 269,
    "description": "Gourmet button mushrooms slow-cooked in aromatic spices. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "mushroom",
    "image": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=400&h=300&sig=105",
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
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=300&sig=108",
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
    "image": "/images/dal_fry.jpg",
    "isVeg": true
  },
  {
    "id": "item_105",
    "name": "Idli",
    "price": 79,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1632104667384-06f58cb7ad44?auto=format&fit=crop&q=80&w=400&h=300&sig=111",
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
    "image": "/images/vada_sambhar.jpg",
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
    "image": "https://images.unsplash.com/photo-1736239093054-cad840ebea0e?auto=format&fit=crop&q=80&w=400&h=300&sig=115",
    "isVeg": true
  },
  {
    "id": "item_110",
    "name": "Onion Dosa",
    "price": 129,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "/images/onion_dosa.jpg",
    "isVeg": true
  },
  {
    "id": "item_111",
    "name": "Mix Veg Uttapam",
    "price": 139,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1709053685779-d550f79d7acf?auto=format&fit=crop&q=80&w=400&h=300&sig=117",
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
    "image": "https://images.unsplash.com/photo-1694849789325-914b71ab4075?auto=format&fit=crop&q=80&w=400&h=300&sig=119",
    "isVeg": true
  },
  {
    "id": "item_114",
    "name": "Butter Masala Dosa",
    "price": 169,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&q=80&w=400&h=300&sig=120",
    "isVeg": true
  },
  {
    "id": "item_115",
    "name": "Paneer Dosa",
    "price": 199,
    "description": "Traditional steamed rice cakes or crispy dosas served with sambhar. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "south_indian",
    "image": "https://images.unsplash.com/photo-1751560455942-f859f1215826?auto=format&fit=crop&q=80&w=400&h=300&sig=121",
    "isVeg": true
  },
  {
    "id": "item_116",
    "name": "Hot Gulab Jamun",
    "price": 69,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "/images/hot_gulab_jamun.jpg",
    "isVeg": true
  },
  {
    "id": "item_117",
    "name": "Gulab Jamun with Ice Cream",
    "price": 109,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "/images/gulab_jamun_with_ice_cream.jpg",
    "isVeg": true
  },
  {
    "id": "item_118",
    "name": "Brownie with Ice Cream",
    "price": 149,
    "description": "Decadent sweet dessert to end your meal on a perfect note. Freshly handcrafted with authentic premium ingredients and signature Old Monk recipe.",
    "categorySlug": "desserts",
    "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400&h=300&sig=124",
    "isVeg": true
  },
  {
    "id": "item_veg_noodles",
    "name": "Veg Noodles",
    "price": 139,
    "description": "Stir-fried noodles tossed with fresh garden vegetables and savory Chinese sauces. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400&h=300&sig=125",
    "isVeg": true
  },
  {
    "id": "item_garlic_noodles",
    "name": "Garlic Noodles",
    "price": 149,
    "description": "Flavorful noodles wok-tossed with aromatic minced garlic and light seasoning. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1553621043-f607bfbf6640?auto=format&fit=crop&q=80&w=400&h=300&sig=126",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_noodles",
    "name": "Mix Veg Noodles",
    "price": 159,
    "description": "Stir-fried noodles loaded with an assortment of crisp vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "noodles",
    "image": "https://images.unsplash.com/photo-1607328874071-45a9cd600644?auto=format&fit=crop&q=80&w=400&h=300&sig=127",
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
    "image": "https://images.unsplash.com/photo-1716535232835-6d56282dfe8a?auto=format&fit=crop&q=80&w=400&h=300&sig=130",
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
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400&h=300&sig=133",
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
    "image": "https://images.unsplash.com/photo-1751618646882-4221d5e3b1c2?auto=format&fit=crop&q=80&w=400&h=300&sig=135",
    "isVeg": true
  },
  {
    "id": "item_triple_fried_rice",
    "name": "Triple Fried Rice",
    "price": 189,
    "description": "A combination of fried rice, crispy fried noodles, and a rich spicy Chinese gravy. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "fried_rice",
    "image": "https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?auto=format&fit=crop&q=80&w=400&h=300&sig=136",
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
    "image": "https://images.unsplash.com/photo-1620791144170-8a443bf37a33?auto=format&fit=crop&q=80&w=400&h=300&sig=137",
    "isVeg": true
  },
  {
    "id": "item_mix_veg_soup",
    "name": "Mix Veg Soup",
    "price": 109,
    "description": "Healthy and comforting clear soup loaded with finely chopped garden vegetables. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1665594051407-7385d281ad76?auto=format&fit=crop&q=80&w=400&h=300&sig=138",
    "isVeg": true
  },
  {
    "id": "item_veg_manchow_soup",
    "name": "Veg Manchow Soup",
    "price": 119,
    "description": "Spicy and tangy Indo-Chinese soup served with crispy fried noodles. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "soup",
    "image": "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=400&h=300&sig=139",
    "isVeg": true
  },
  {
    "id": "item_pav_bhaji",
    "name": "Pav Bhaji",
    "price": 119,
    "description": "Spiced mashed vegetable gravy served with hot butter-toasted pav buns. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1753357303396-704b5abe8945?auto=format&fit=crop&q=80&w=400&h=300&sig=140",
    "isVeg": true
  },
  {
    "id": "item_vada_pav",
    "name": "Vada Pav",
    "price": 129,
    "description": "Classic Mumbai street food style spicy potato vada sandwiched in soft pav. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "pav",
    "image": "https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?auto=format&fit=crop&q=80&w=400&h=300&sig=141",
    "isVeg": true
  },
  {
    "id": "item_chilli_o_virgin_sandwich",
    "name": "Chilli-O-Virgin Sandwich",
    "price": 149,
    "description": "Spicy and zesty sandwich stuffed with signature chilly toppings and cheese. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1709689156424-16fe0e05b47b?auto=format&fit=crop&q=80&w=400&h=300&sig=142",
    "isVeg": true
  },
  {
    "id": "item_tax_max_sandwich",
    "name": "Tax-Max Sandwich",
    "price": 159,
    "description": "Ultimate loaded sandwich packed with max veggies and signature tangy sauce. Handcrafted with signature Old Monk recipe.",
    "categorySlug": "sandwich",
    "image": "https://images.unsplash.com/photo-1496113269490-84ffe1a410cb?auto=format&fit=crop&q=80&w=400&h=300&sig=143",
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
