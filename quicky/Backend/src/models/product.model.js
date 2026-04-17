import mongoose, { Schema } from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: Number,
            enum: ["USD", "EUR", "GBP", "PKR", "INR", "JPY"],
            default: "PKR"
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: [
        {
            url:{
                type: String,
                required: true,
            },
            alt:{
                type: String,
                required: true,
            }

        }
    ]
},{timestamps:true})

const productModel = mongoose.model("product", productSchema)

export default productModel