import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { headers } from "next/headers";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;

  try {
    if (!webhookSecret || !signature) {
      throw new Error("Missing stripe webhook secret or signature");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  await dbConnect();

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any;
      const orderId = session.metadata.orderId;

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: "paid",
          stripePaymentIntentId: session.payment_intent as string,
          fulfillmentStatus: "confirmed",
        });
        console.log(`Order ${orderId} marked as paid`);
      }
      break;
    
    case "payment_intent.payment_failed":
      const failedSession = event.data.object as any;
      console.log(`Payment failed for intent: ${failedSession.id}`);
      // Optionally update order status to failed if metadata is available
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

