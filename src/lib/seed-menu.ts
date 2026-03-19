import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env");
  process.exit(1);
}

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  type: { type: String, default: "dish" },
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const sampleDishes = [
  {
    title: "Signature Jollof Rice",
    description: "Our award-winning smoky jollof rice, slow-cooked in rich tomato and pepper base. Served with plantain and coleslaw.",
    price: 18.50,
    category: "rice",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop",
    isFeatured: true,
    isAvailable: true,
  },
  {
    title: "Suya Grilled Chicken",
    description: "Tender chicken marinated in our secret suya spice blend, chargrilled to perfection. Served with pepper sauce.",
    price: 22.00,
    category: "grills",
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2069&auto=format&fit=crop",
    isFeatured: true,
    isAvailable: true,
  },
  {
    title: "Egusi Soup & Pounded Yam",
    description: "Rich melon seed soup with assorted meats and stockfish, paired with smooth pounded yam. A true Nigerian classic.",
    price: 24.00,
    category: "soups",
    imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true,
    isAvailable: true,
  },
  {
    title: "Pepper Soup",
    description: "Fiery, aromatic broth slow-simmered with catfish and traditional spices. Perfect for cold evenings.",
    price: 16.00,
    category: "soups",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=2034&auto=format&fit=crop",
    isFeatured: false,
    isAvailable: true,
  },
  {
    title: "Fried Rice & Chicken",
    description: "Nigerian-style fried rice with mixed vegetables, liver, and a generous portion of fried chicken.",
    price: 19.50,
    category: "rice",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    isFeatured: false,
    isAvailable: true,
  },
  {
    title: "Asun (Spicy Goat Meat)",
    description: "Tender goat meat grilled and tossed in fiery pepper sauce with onions. A party favourite.",
    price: 26.00,
    category: "grills",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    isFeatured: false,
    isAvailable: true,
  },
  {
    title: "Owambe Party Platter",
    description: "A grand selection of jollof rice, fried rice, grilled chicken, plantain, and moi moi. Serves 4-6 guests.",
    price: 65.00,
    category: "platters",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2087&auto=format&fit=crop",
    isFeatured: false,
    isAvailable: true,
  },
  {
    title: "Zobo Drink",
    description: "Refreshing hibiscus flower drink infused with ginger, pineapple, and cloves. Served chilled.",
    price: 5.50,
    category: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=2487&auto=format&fit=crop",
    isFeatured: false,
    isAvailable: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB...");

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`${existingCount} products already exist. Skipping seed.`);
      console.log("To re-seed, delete existing products first.");
      process.exit(0);
    }

    await Product.insertMany(sampleDishes);
    console.log(`✅ Successfully seeded ${sampleDishes.length} menu items!`);
    console.log("Featured dishes: Signature Jollof Rice, Suya Grilled Chicken, Egusi Soup & Pounded Yam");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu:", error);
    process.exit(1);
  }
}

seed();
