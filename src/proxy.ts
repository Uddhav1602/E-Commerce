import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

// Edge-compatible JWT verification helper
async function verifyToken(token: string) {
  try {
    const rawSecret = process.env.TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
    if (!rawSecret) return null;
    const secret = new TextEncoder().encode(rawSecret);
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 1. Check custom JWT
  let user: { id?: string; username?: string; email?: string; isAdmin?: boolean } | null = token
    ? await verifyToken(token)
    : null;

  // 2. If no custom JWT, check NextAuth session token
  if (!user) {
    try {
      const secret = process.env.NEXTAUTH_SECRET || process.env.TOKEN_SECRET;
      const isSecure =
        request.nextUrl.protocol === "https:" ||
        request.headers.get("x-forwarded-proto") === "https" ||
        request.cookies.has("__Secure-next-auth.session-token") ||
        request.cookies.has("__Secure-next-auth.session-token.0");

      let nextAuthToken = null;

      if (isSecure) {
        nextAuthToken = await getToken({
          req: request,
          secret,
          secureCookie: true,
        });
      }

      if (!nextAuthToken) {
        nextAuthToken = await getToken({
          req: request,
          secret,
          secureCookie: false,
        });
      }

      if (!nextAuthToken && !isSecure) {
        nextAuthToken = await getToken({
          req: request,
          secret,
          secureCookie: true,
        });
      }

      if (nextAuthToken) {
        user = {
          id: nextAuthToken.sub,
          username: nextAuthToken.name ?? undefined,
          email: nextAuthToken.email ?? undefined,
          isAdmin: Boolean(nextAuthToken.isAdmin),
        };
      }
    } catch {}
  }

  // ─────────────────────────────────────────────
  // 1. Redirect authenticated users away from /auth
  // ─────────────────────────────────────────────
  if (pathname === "/auth") {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 2. Protect /admin/setup — requires login only
  // ─────────────────────────────────────────────
  if (pathname === "/admin/setup") {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (user.isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 3. Protect /admin/* routes
  // ─────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    // Let logged-in users proceed; /admin and /admin/products use live DB checks via useUser() & APIs
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
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Next.js 16 deprecated "middleware" in favor of "proxy"
export { proxy as middleware };

// Only run proxy on these paths
export const config = {
  matcher: [
    "/auth",
    "/admin/:path*",
    "/api/products/:path*",
  ],
};
