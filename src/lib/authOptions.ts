import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Create user in MongoDB on first Google login
      try {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            username: user.name || user.email?.split("@")[0] || "Google User",
            email: user.email,
            isVerified: true,
          });
          console.log("✅ New Google user saved to DB:", user.email);
        }
      } catch (error) {
        console.error("❌ Error saving Google user to DB:", error);
        // Don't block sign-in even if DB save fails
      }
      return true; // Allow sign-in
    },
  },
};
