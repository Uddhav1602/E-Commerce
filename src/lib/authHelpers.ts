import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export interface TokenPayload {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

// ─────────────────────────────────────────────
// Read + verify the JWT cookie. Returns the
// decoded user payload or null (no error thrown).
// ─────────────────────────────────────────────
export async function getTokenUser(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const token = request.cookies.get("token")?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;
        // Refresh isAdmin from DB so changes via make-admin.js take effect immediately
        await connectDB();
        const dbUser = await User.findById(decoded.id).select("isAdmin");
        if (dbUser) {
          decoded.isAdmin = dbUser.isAdmin;
        }
        return decoded;
      } catch (e) {
        console.error("JWT verification failed:", e instanceof Error ? e.message : e);
        // Fall back to NextAuth
      }
    }

    // Try NextAuth
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          return {
            id: dbUser._id.toString(),
            username: dbUser.username,
            email: dbUser.email,
            isAdmin: dbUser.isAdmin,
          };
        } else {
          return {
            id: session.user.email,
            username: session.user.name || "OAuth User",
            email: session.user.email,
            isAdmin: false,
          };
        }
      }
    } catch (sessionError) {
      console.error("NextAuth getServerSession failed:", sessionError instanceof Error ? sessionError.message : sessionError);
    }

    return null;
  } catch (error) {
    console.error("getTokenUser unexpected error:", error instanceof Error ? error.message : error);
    return null;
  }
}

// ─────────────────────────────────────────────
// Admin guard — returns the user if admin,
// otherwise returns an error NextResponse.
// Callers should check:
//   const result = await requireAdmin(req);
//   if (result instanceof NextResponse) return result;
//   // result is now the TokenPayload
// ─────────────────────────────────────────────
export async function requireAdmin(
  request: NextRequest
): Promise<TokenPayload | NextResponse> {
  const user = await getTokenUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Authentication required. Please log in." },
      { status: 401 }
    );
  }

  // Refresh isAdmin from DB in case it changed since the JWT was signed
  try {
    await connectDB();
    const dbUser = await User.findById(user.id).select("isAdmin");
    if (!dbUser || !dbUser.isAdmin) {
      return NextResponse.json(
        { message: "Admin privileges required." },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Failed to verify admin status." },
      { status: 500 }
    );
  }

  return user;
}
