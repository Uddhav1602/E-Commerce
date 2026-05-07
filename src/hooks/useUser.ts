// Custom hook that unifies NextAuth (Google) and custom JWT cookie auth
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface AppUser {
  username?: string;
  email?: string;
  image?: string;
  isAdmin?: boolean;
  source: "nextauth" | "jwt";
}

export function useUser() {
  const { data: session, status } = useSession();
  const [apiUser, setApiUser] = useState<AppUser | null>(null);
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    // Always check /api/auth/me to get the real isAdmin status from DB
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setApiUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setApiLoading(false));
  }, []);

  const isLoading = status === "loading" || apiLoading;

  // NextAuth session — merge with API data (which has real isAdmin from DB)
  if (session?.user) {
    return {
      user: {
        username: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image ?? undefined,
        isAdmin: apiUser?.isAdmin ?? false, // Use real DB value from /api/auth/me
        source: "nextauth" as const,
      },
      isLoading,
    };
  }

  // JWT cookie user
  if (apiUser) {
    return {
      user: { ...apiUser, source: "jwt" as const },
      isLoading,
    };
  }

  return {
    user: null,
    isLoading,
  };
}
