import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

// =======================
// PROMOTE USER TO ADMIN
// =======================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminKey } = body;

    // Validate input
    if (!adminKey) {
      return NextResponse.json(
        { error: "Admin secret key is required" },
        { status: 400 }
      );
    }

    // Verify admin secret key
    const validKey = process.env.ADMIN_SECRET_KEY;
    if (!validKey) {
      return NextResponse.json(
        { error: "Admin setup is not configured on this server" },
        { status: 500 }
      );
    }

    if (adminKey !== validKey) {
      return NextResponse.json(
        { error: "Invalid admin secret key" },
        { status: 403 }
      );
    }

    // Get the logged-in user from the JWT cookie
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired session. Please log in again." },
        { status: 401 }
      );
    }

    // Connect to DB and promote user
    await connectDB();
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: { isAdmin: true } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Issue a new JWT with isAdmin: true
    const newTokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: true,
    };

    const newToken = jwt.sign(newTokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "You are now an admin!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: true,
      },
    });

    // Update the cookie with the new token containing isAdmin: true
    response.cookies.delete("token");
    response.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Promote admin error:", error);
    return NextResponse.json(
      { error: "An error occurred while promoting to admin" },
      { status: 500 }
    );
  }
}
