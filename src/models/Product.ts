import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: String,
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    category: {
      type: String,
      enum: ["rice", "soups", "grills", "sides", "drinks", "desserts", "platters"],
      required: true,
    },
    type: {
      type: String,
      enum: ["dish", "service"],
      default: "dish",
    },
    imageUrl: String,
    imagePublicId: String,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    servingSize: String,
    allergens: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
