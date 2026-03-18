import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  role: { type: String, default: "customer" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB...");

    const adminEmail = "admin@abimbolaskitchen.co.uk";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    const admin = new User({
      name: "Abimbola Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Email: " + adminEmail);
    console.log("Password: Admin123!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seed();
