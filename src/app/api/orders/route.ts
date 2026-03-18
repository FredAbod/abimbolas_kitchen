import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  try {
    const { orderId, fulfillmentStatus } = await req.json();
    const order = await Order.findByIdAndUpdate(
      orderId,
      { fulfillmentStatus },
      { new: true }
    );
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
