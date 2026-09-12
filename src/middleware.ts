import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Edge-compatible JWT verification helper
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Decode token (may be null if not logged in)
  const user = token ? await verifyToken(token) : null;

  // ─────────────────────────────────────────────
  // 1. Redirect authenticated users away from /auth
  // ─────────────────────────────────────────────
  if (pathname === "/auth") {
    if (user) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 2. Protect /admin/setup — requires login only (not admin)
  //    Any logged-in user can attempt the setup page
  // ─────────────────────────────────────────────
  if (pathname === "/admin/setup") {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    // Already admin? Redirect to admin dashboard
    if (user.isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 3. Protect /admin/* routes — admin only
  // ─────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (!user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 4. Protect admin API routes (POST/PUT/DELETE on /api/products)
  // ─────────────────────────────────────────────
  if (pathname.startsWith("/api/products") && request.method !== "GET") {
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required. Please log in." },
        { status: 401 }
      );
    }
    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Admin privileges required." },
        { status: 403 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
  matcher: [
    "/auth",
    "/admin/:path*",
    "/api/products/:path*",
  ],
};
