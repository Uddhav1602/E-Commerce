import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { getTokenUser } from "@/lib/authHelpers";

// =======================
// GET ALL ORDERS (History)
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await getTokenUser(req);
    
    // If not logged in, return empty array. Or maybe show all orders for guest testing?
    // Let's allow guest to fetch if guestIds are passed, but Next.js server component doesn't read localStorage.
    // For now, if no user, return empty. It's standard.
    if (!user) {
      return NextResponse.json([], { status: 200 });
    }

    let query = {};
    if (!user.isAdmin) {
      query = { userId: user.id };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
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
    const user = await getTokenUser(req);
    
    const body = await req.json();
    const { customerName, address, phone, items, totalAmount } = body;

    if (!customerName || !address || !phone || !items || !items.length) {
      return NextResponse.json(
        { message: "Missing required order details" },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      userId: user ? user.id : null,
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

