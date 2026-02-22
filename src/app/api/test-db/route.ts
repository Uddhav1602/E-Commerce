// app/api/test-db/route.ts
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing database connection...");

    // Connect
    await connectDB();
    console.log("✅ Connected to database");

    // Check connection state
    const connectionState = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    console.log(`📡 Connection state: ${states[connectionState]}`);

    // Get database name - with null check
    const dbName = mongoose.connection.db?.databaseName || "Unknown";
    console.log(`📦 Database name: ${dbName}`);

    // Count users
    const userCount = await User.countDocuments();
    console.log(`👥 Total users in database: ${userCount}`);

    // Get all users (just for testing - remove in production!)
    const allUsers = await User.find({}, { password: 0 }); // Exclude password
    console.log(`📋 Users:`, allUsers);

    // Try creating a test user
    const testUser = await User.create({
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: "hashedpassword123",
    });
    console.log(`✅ Test user created: ${testUser._id}`);

    // Verify it exists
    const foundUser = await User.findById(testUser._id);
    console.log(`🔍 Found test user: ${foundUser ? "YES" : "NO"}`);

    // Delete test user
    await User.findByIdAndDelete(testUser._id);
    console.log(`🗑️ Test user deleted`);

    return NextResponse.json({
      success: true,
      connectionState: states[connectionState],
      databaseName: dbName,
      userCount,
      users: allUsers,
      testResult: "Database is working correctly!",
    });
  } catch (error: any) {
    console.error("❌ Database test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
