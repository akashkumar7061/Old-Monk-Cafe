require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const imageUpdates = [
  { name: "Espresso Shot", url: "/images/espresso_shot.png" },
  { name: "Watermelon Cooler", url: "/images/watermelon_cooler.png" },
  { name: "Paneer Tikka Pizza", url: "/images/paneer_tikka_pizza.png" },
  { name: "Veg Steam Momos (6 Pcs)", url: "/images/veg_steam_momos.png" },
  { name: "Fried Momos (6 Pcs)", url: "/images/fried_momos.png" },
  { name: "Veg Fried Rice", url: "/images/veg_fried_rice.png" },
  { name: "Chilli Potato", url: "/images/chilli_potato.png" },
  { name: "Momos + Cold Coffee Combo", url: "/images/momos_coffee_combo.png" },
  { name: "Momos + Cold Coffee", url: "/images/momos_coffee_combo.png" }
];

const updateDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/oldmonkcafe');
    console.log('Connected!');

    for (const update of imageUpdates) {
      const item = await MenuItem.findOne({ 
        name: { $regex: new RegExp('^' + update.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') } 
      });
      if (item) {
        console.log(`Updating ${item.name} image to ${update.url}`);
        item.image = { url: update.url, publicId: '' };
        await item.save();
      } else {
        console.log(`Item not found in DB: ${update.name}`);
      }
    }

    console.log('All updates applied successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  }
};

updateDB();
