import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";

// =======================
// GET ALL ORDERS (History)
// =======================
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

// =======================
// CREATE NEW ORDER (Checkout)
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { customerName, address, phone, items, totalAmount } = body;

    // Validate request
    if (!customerName || !address || !phone || !items || !items.length) {
      return NextResponse.json(
        { message: "Missing required order details" },
        { status: 400 }
      );
    }

    // Create Order
    const newOrder = await Order.create({
      customerName,
      address,
      phone,
      items,
      totalAmount,
      status: "Pending" // Default status
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json(
      { message: "Failed to place order", error: error.message },
      { status: 500 }
    );
  }
}
