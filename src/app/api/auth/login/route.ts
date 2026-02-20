import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        // ✅ CRITICAL: Await the database connection INSIDE the route handler
        await connectDB();

        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" }, // Don't reveal if user exists
                { status: 401 }
            );
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" }, // Same message for security
                { status: 401 }
            );
        }

        // Create Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create Token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

        // Set Cookie with security options
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "strict", // CSRF protection
            maxAge: 60 * 60 * 24, // 1 day in seconds
            path: "/", // Available across entire site
        });

        return response;

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}