import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/ProductModel.js";
import productsData from "./Product.json" assert { type: "json" };

dotenv.config();  // Load environment variables from .env file

const URI = process.env.MongoDBURI;

const importData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if data already exists in the collection
        const productCount = await Product.countDocuments();

        if (productCount === 0) {
            // Insert JSON data if no products exist
            await Product.insertMany(productsData);
            console.log("Data successfully imported to MongoDB");
        } else {
            console.log("Data already exists, skipping import");
        }

        // Exit the process after successful data import
        process.exit();
    } catch (error) {
        console.error("Error with data import:", error);
        process.exit(1); // Exit with failure code
    }
};

importData();
