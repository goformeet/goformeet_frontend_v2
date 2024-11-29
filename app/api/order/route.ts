import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

console.log(process.env.RAZORPAY_LIVE_KEY_ID, process.env.RAZORPAY_LIVE_KEY_SECRET);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_LIVE_KEY_ID!,
  key_secret: process.env.RAZORPAY_LIVE_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency } = (await request.json()) as {
      amount: string;
      currency: string;
    };

    const options = {
      amount, // Convert amount to smallest currency unit (e.g., paise for INR)
      currency,
      receipt: `rcp_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order", message: error, },
      { status: 500 }
    );
  }
}
