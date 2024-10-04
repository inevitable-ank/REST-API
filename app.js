import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import Product from "./models/ProductModel.js"
import productsData from "./Product.json" assert { type: "json" };
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURI;

// const products_routes = require("./routes/ProductRoute.js")
import products_routes from "./routes/ProductRoute.js"


try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology : true
    });
    console.log("Connected to MongoDB")
    console.log("Data successfully imported to MongoDB");
} catch (error) {
    console.log("Error:",error)
}

app.use("/api/products", products_routes)

app.get("/", (req, res) => {
    res.send("Hi, I am live")
});

const start = async() => {
    try {
        app.listen(PORT,() => 
            {console.log(`${PORT} Connected to this port`)
     });
    } catch (error) {
        console.log(error)
    }
}

start();