export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: "rice" | "soups" | "grills" | "sides" | "drinks" | "desserts" | "platters";
  type: "dish" | "service";
  imageUrl?: string;
  imagePublicId?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  servingSize?: string;
  allergens?: string[];
  createdAt?: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IOrder {
  _id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: {
    product: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  deliveryAddress?: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
  };
  dietaryRequirements?: string;
  specialInstructions?: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  fulfillmentStatus: "pending" | "confirmed" | "processing" | "out_for_delivery" | "completed" | "cancelled";
  estimatedDeliveryTime?: string;
  createdAt?: string;
}
