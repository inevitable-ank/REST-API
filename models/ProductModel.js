import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: [true,"price must be included"],
    },
    featured: {
        type:Boolean,
        default: false,
    },
    rating : {
        type: Number,
        default: false,
    },
    createdAT: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ["Apple", "Samsung", "dell", "MI"],
            message: `{VALUE} is not supported`
        }
    }
    
     
})

const Product = mongoose.model("Product", productSchema)


export default Product;