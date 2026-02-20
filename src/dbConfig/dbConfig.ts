import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

// Validate environment variable
if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Global cache to prevent multiple connections (critical for Next.js)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Return cached connection if exists
  if (cached.conn) {
    console.log("✅ Using cached database connection");
    return cached.conn;
  }

  // Create new connection promise if doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
        cached.promise = null; // Reset to allow retry
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}

// Connection event listeners for monitoring
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
  // Don't exit - just log the error
});

mongoose.connection.on("disconnected", () => {
  console.log("📡 Mongoose disconnected");
});

// Graceful shutdown handling
if (process.env.NODE_ENV !== 'production') {
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed through app termination");
    process.exit(0);
  });
}