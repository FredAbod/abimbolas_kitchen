import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { ICartItem } from "@/types";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { items, customerDetails } = await req.json() as {
      items: ICartItem[];
      customerDetails: {
        name: string;
        email: string;
        phone: string;
        address: { line1: string; line2: string; city: string; postcode: string };
      };
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.title,
          images: item.imageUrl ? [item.imageUrl] : [],
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in pence
      },
      quantity: item.quantity,
    }));

    // Create a pending order in our database first
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const order = await Order.create({
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      items: items.map(item => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount,
      deliveryAddress: customerDetails.address,
      paymentStatus: "pending",
      fulfillmentStatus: "pending",
    });

    // Create Stripe Checkout Session
    const origin = req.headers.get("origin");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      customer_email: customerDetails.email,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    // Update order with session ID
    order.stripeSessionId = session.id;
    await order.save();

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
