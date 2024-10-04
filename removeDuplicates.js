import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/ProductModel.js";

dotenv.config();  // Load environment variables

const URI = process.env.MongoDBURI;

const removeDuplicates = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Find all products
        const allProducts = await Product.find();

        // Create a map to track unique products
        const uniqueProducts = new Map();

        // Loop through products and detect duplicates
        for (const product of allProducts) {
            if (uniqueProducts.has(product.name)) {
                // If a product with the same name exists, delete the duplicate
                await Product.deleteOne({ _id: product._id });
                console.log(`Deleted duplicate product with ID: ${product._id}`);
            } else {
                // If it's a unique product, add it to the map
                uniqueProducts.set(product.name, product._id);
            }
        }

        console.log("Duplicate entries removed!");
        process.exit();  // Exit the process
    } catch (error) {
        console.error("Error with removing duplicates:", error);
        process.exit(1);  // Exit with failure code
    }
};

removeDuplicates();
