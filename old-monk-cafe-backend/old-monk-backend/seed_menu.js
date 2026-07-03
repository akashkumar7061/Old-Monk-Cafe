require('dotenv').config();
const mongoose = require('mongoose');

const categoriesToSeed = [
  { name: "Coffee & Beverages", slug: "coffee", displayOrder: 1 },
  { name: "Signature Mocktails", slug: "mocktails", displayOrder: 2 },
  { name: "Burgers & Slides", slug: "burgers", displayOrder: 3 },
  { name: "Stone-baked Pizza", slug: "pizza", displayOrder: 4 },
  { name: "Gourmet Pasta", slug: "pasta", displayOrder: 5 },
  { name: "Steaming Momos", slug: "momos", displayOrder: 6 },
  { name: "Chinese Mains", slug: "chinese", displayOrder: 7 },
  { name: "Desserts & Sweets", slug: "desserts", displayOrder: 8 },
  { name: "Value Combos", slug: "combos", displayOrder: 9 }
];

const menuItemsToSeed = [
  // COFFEE & BEVERAGES
  { id: "c1", name: "Espresso Shot", price: 89, description: "Strong and bold shot of premium extracted espresso.", categorySlug: "coffee", image: "/images/espresso_shot.png", isVeg: true },
  { id: "c2", name: "Americano", price: 99, description: "Espresso shots topped with hot water for a smooth black coffee.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400", isVeg: true },
  { id: "c3", name: "Cappuccino", price: 129, description: "Classic espresso with steamed milk and thick foam layer.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400", isVeg: true },
  { id: "c4", name: "Café Latte", price: 139, description: "Mild coffee made of espresso and creamy steamed milk.", categorySlug: "coffee", image: "/images/coffee_art.png", isVeg: true },
  { id: "c5", name: "Café Mocha", price: 149, description: "Rich chocolate coupled with espresso shot and steamed milk.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400", isVeg: true },
  { id: "c6", name: "Classic Cold Coffee", price: 159, description: "Creamy whipped milk, vanilla ice cream, and espresso blended with ice.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400", isVeg: true },
  { id: "c7", name: "Irish Coffee", price: 179, description: "Artisanal espresso flavored with rich Irish syrup and fresh cream.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400", isVeg: true },
  { id: "c8", name: "Hazelnut Cold Coffee", price: 189, description: "Specialty cold brew infused with premium sweet hazelnut extracts.", categorySlug: "coffee", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400", isVeg: true },

  // MOCKTAILS
  { id: "m1", name: "Virgin Mojito", price: 149, description: "Refreshing blend of fresh mint, lime slices, sugar syrup, and soda.", categorySlug: "mocktails", image: "/images/old_monk_mojito.png", isVeg: true },
  { id: "m2", name: "Blue Lagoon Cooler", price: 169, description: "Exotic blue curacao mixed with tangy lemon juice, mint, and sprite.", categorySlug: "mocktails", image: "/images/premium_mocktail.png", isVeg: true },
  { id: "m3", name: "Green Apple Fizz", price: 169, description: "Tangy-sweet green apple syrup topped with soda and mint leaves.", categorySlug: "mocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400", isVeg: true },
  { id: "m4", name: "Watermelon Cooler", price: 159, description: "Freshly muddled sweet watermelon with a pinch of black salt and lime.", categorySlug: "mocktails", image: "/images/watermelon_cooler.png", isVeg: true },
  { id: "m5", name: "Tropical Fruit Punch", price: 189, description: "Assorted tropical juices shaken with cream and grenadine syrup.", categorySlug: "mocktails", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=400", isVeg: true },

  // BURGERS
  { id: "b1", name: "Veg Burger", price: 139, description: "Crispy vegetable patty topped with lettuce, tomato, onions, and mayo.", categorySlug: "burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", isVeg: true },
  { id: "b2", name: "Paneer Burger", price: 179, description: "Grilled marinated paneer slab loaded with cheese and spicy house sauces.", categorySlug: "burgers", image: "/images/old_monk_burger.png", isVeg: true },
  { id: "b3", name: "Crispy Cheese Burger", price: 189, description: "Double layered crispy veg patty with melting cheddar cheese slice.", categorySlug: "burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400", isVeg: true },
  { id: "b4", name: "Mushroom Cheese Burger", price: 229, description: "Sautéed garlic mushrooms with melting swiss cheese slice and herbs.", categorySlug: "burgers", image: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=400", isVeg: true },

  // PIZZA
  { id: "p1", name: "Margherita Pizza", price: 249, description: "Classic stone-baked pizza topped with fresh tomato sauce, mozzarella, and basil.", categorySlug: "pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400", isVeg: true },
  { id: "p2", name: "Farmhouse Pizza", price: 299, description: "Loaded with crunchy capsicum, onions, golden corn, mushrooms, and tomatoes.", categorySlug: "pizza", image: "/images/old_monk_pizza.png", isVeg: true },
  { id: "p3", name: "Paneer Tikka Pizza", price: 329, description: "Fusion pizza topped with smoky tandoori paneer tikka cubes and coriander.", categorySlug: "pizza", image: "/images/paneer_tikka_pizza.png", isVeg: true },
  { id: "p4", name: "Tandoori Mushroom Pizza", price: 369, description: "Delicious stone-baked pizza loaded with spicy marinated button mushrooms, onions, and cheese.", categorySlug: "pizza", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400", isVeg: true },

  // PASTA
  { id: "pas1", name: "White Sauce Pasta", price: 229, description: "Penne pasta tossed in rich, velvety cheese cream sauce with garlic bread.", categorySlug: "pasta", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400", isVeg: true },
  { id: "pas2", name: "Red Sauce Pasta", price: 219, description: "Penne pasta in spicy, tangy tomato arrabbiata sauce with Italian herbs.", categorySlug: "pasta", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400", isVeg: true },
  { id: "pas3", name: "Mix Sauce Pasta", price: 249, description: "Creamy pink sauce pasta - best of both cream and rich tomato flavors.", categorySlug: "pasta", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=400", isVeg: true },
  { id: "pas4", name: "Creamy Mushroom Pasta", price: 289, description: "Tender button mushroom slices tossed in rich garlic alfredo sauce with penne.", categorySlug: "pasta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400", isVeg: true },

  // MOMOS
  { id: "mo1", name: "Veg Steam Momos (6 Pcs)", price: 99, description: "Thin wrap loaded with minced fresh garden vegetables and served with hot dip.", categorySlug: "momos", image: "/images/old_monk_momos.png", isVeg: true },
  { id: "mo2", name: "Paneer Momos (6 Pcs)", price: 129, description: "Stuffed with minced spicy paneer and served with red momo chutney.", categorySlug: "momos", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400", isVeg: true },
  { id: "mo3", name: "Veg Cheese Corn Momos (6 Pcs)", price: 149, description: "Steaming hot momos stuffed with sweet corn kernels and melting mozzarella cheese.", categorySlug: "momos", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400", isVeg: true },
  { id: "mo4", name: "Fried Momos (6 Pcs)", price: 159, description: "Golden fried crispy momos (Veg or Paneer options available).", categorySlug: "momos", image: "/images/fried_momos.png", isVeg: true },
  { id: "mo5", name: "Tandoori Momos (6 Pcs)", price: 189, description: "Momos marinated in tandoori paste, chargrilled in tandoor to perfection.", categorySlug: "momos", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400", isVeg: true },

  // CHINESE
  { id: "ch1", name: "Veg Hakka Noodles", price: 169, description: "Stir-fried noodles with crunchy cabbage, capsicum, carrots, and spring onions.", categorySlug: "chinese", image: "/images/veg_noodles.jpg", isVeg: true },
  { id: "ch2", name: "Paneer Chilli Noodles", price: 199, description: "Stir-fried noodles loaded with spicy soy-glazed paneer cubes.", categorySlug: "chinese", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=400", isVeg: true },
  { id: "ch3", name: "Schezwan Noodles", price: 229, description: "Spicy stir-fried noodles tossed in rich garlic Schezwan sauce and vegetables.", categorySlug: "chinese", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=400", isVeg: true },
  { id: "ch4", name: "Veg Fried Rice", price: 179, description: "Wok-tossed rice with fresh seasonal vegetables and soy-garlic.", categorySlug: "chinese", image: "/images/veg_fried_rice.png", isVeg: true },
  { id: "ch5", name: "Chilli Potato", price: 179, description: "Crispy french fries tossed in spicy honey-chilli soy glaze.", categorySlug: "chinese", image: "/images/chilli_potato.png", isVeg: true },
  { id: "ch6", name: "Veg Manchurian Gravy", price: 199, description: "Deep fried vegetable balls cooked in rich spicy garlic manchurian sauce.", categorySlug: "chinese", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400", isVeg: true },

  // DESSERTS
  { id: "d1", name: "Brownie with Ice Cream", price: 179, description: "Warm sizzling chocolate fudge brownie topped with vanilla scoop and hot fudge.", categorySlug: "desserts", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=400", isVeg: true },
  { id: "d2", name: "Chocolate Lava Cake", price: 199, description: "Soft baked chocolate cake with a molten liquid chocolate core.", categorySlug: "desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400", isVeg: true },
  { id: "d3", name: "Fudge Hot Sundae", price: 189, description: "Triple scoop ice cream topped with waffle pieces, nuts, and chocolate fudge.", categorySlug: "desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400", isVeg: true },
  { id: "d4", name: "Premium Pastry Slice", price: 99, description: "Decadent slice of fresh cream butter pastry (Black Forest / Red Velvet).", categorySlug: "desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400", isVeg: true },

  // COMBOS
  { id: "co1", name: "Coffee + Burger Combo", price: 249, description: "Classic cold coffee paired with crisp Veg Burger - save 15%!", categorySlug: "combos", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", isVeg: true },
  { id: "co2", name: "Pizza + Mocktail Combo", price: 449, description: "Farmhouse pizza paired with refreshing Virgin Mojito.", categorySlug: "combos", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400", isVeg: true },
  { id: "co3", name: "Momos + Cold Coffee Combo", price: 249, description: "Veg Steam Momos (6 Pcs) with classic rich Cold Coffee.", categorySlug: "combos", image: "/images/momos_coffee_combo.png", isVeg: true },
  { id: "co4", name: "Couple Special Feast Combo", price: 799, description: "1 Pizza, 1 Pasta, 2 Mocktails, and 1 Chocolate Lava Cake - the ultimate date night feast!", categorySlug: "combos", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", isVeg: true }
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
      console.log("Index drop skipped (might not exist yet):", indexErr.message);
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
        isFeatured: item.id.startsWith("co") || item.id === "c6" || item.id === "m1" || item.id === "p2",
        prepTimeMinutes: 15
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
