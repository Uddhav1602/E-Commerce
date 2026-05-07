import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          // enforce 1..4 images
          return Array.isArray(val) && val.length >= 1 && val.length <= 4;
        },
        message: "Product must have between 1 and 4 images",
      },
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js dev/hot reload
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;