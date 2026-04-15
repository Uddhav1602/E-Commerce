// Custom hook that unifies NextAuth (Google) and custom JWT cookie auth
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface AppUser {
  username?: string;
  email?: string;
  image?: string;
  source: "nextauth" | "jwt";
}

export function useUser() {
  const { data: session, status } = useSession();
  const [jwtUser, setJwtUser] = useState<AppUser | null>(null);
  const [jwtLoading, setJwtLoading] = useState(true);

  useEffect(() => {
    // Check for custom JWT cookie by calling the /api/auth/me endpoint
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setJwtUser({ ...data.user, source: "jwt" });
        }
      })
      .catch(() => {})
      .finally(() => setJwtLoading(false));
  }, []);

  const isLoading = status === "loading" || jwtLoading;

  // NextAuth session takes priority
  if (session?.user) {
    return {
      user: {
        username: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image ?? undefined,
        source: "nextauth" as const,
      },
      isLoading,
    };
  }

  return {
    user: jwtUser,
    isLoading,
  };
}
