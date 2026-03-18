import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ServiceBooking from "@/models/ServiceBooking";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const booking = await ServiceBooking.create(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const bookings = await ServiceBooking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
