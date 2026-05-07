import { NextRequest, NextResponse } from "next/server";
import { getTokenUser } from "@/lib/authHelpers";

export async function GET(request: NextRequest) {
  try {
    const user = await getTokenUser(request);
    
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch {
    // Token expired or invalid — return null user (not an error)
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
