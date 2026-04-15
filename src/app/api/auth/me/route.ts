import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as any;

    return NextResponse.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch {
    // Token expired or invalid — return null user (not an error)
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
