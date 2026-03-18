import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: String,
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      line1: String,
      line2: String,
      city: String,
      postcode: String,
    },
    dietaryRequirements: String,
    specialInstructions: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    stripeSessionId: String,
    stripePaymentIntentId: String,
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "out_for_delivery", "completed", "cancelled"],
      default: "pending",
    },
    estimatedDeliveryTime: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
