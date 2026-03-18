import mongoose from "mongoose";

const serviceBookingSchema = new mongoose.Schema(
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
    serviceType: {
      type: String,
      enum: ["catering", "event_platters", "meal_prep", "private_chef", "custom_menu"],
      required: true,
    },
    eventDate: Date,
    guestCount: Number,
    details: String,
    status: {
      type: String,
      enum: ["inquiry", "quoted", "confirmed", "completed", "cancelled"],
      default: "inquiry",
    },
    quotedAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.models.ServiceBooking || mongoose.model("ServiceBooking", serviceBookingSchema);
