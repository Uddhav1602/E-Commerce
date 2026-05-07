import mongoose from "mongoose";

// Connect to MongoDB (uses --env-file flag, no dotenv needed)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Simple User model definition for this script
const userSchema = new mongoose.Schema({
    email: String,
    isAdmin: Boolean,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

const makeAdmin = async (email) => {
    await connectDB();

    if (!email) {
        console.log("Usage: node --env-file=.env make-admin.js <user-email>");
        process.exit(1);
    }

    try {
        const result = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { $set: { isAdmin: true } },
            { new: true }
        );

        if (result) {
            console.log(`✅ Successfully updated ${email} to admin!`);
            console.log("Updated user:", result);
        } else {
            console.log(`❌ User with email ${email} not found.`);
        }
    } catch (error) {
        console.error("Error updating user:", error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

const emailArg = process.argv[2];
makeAdmin(emailArg);
