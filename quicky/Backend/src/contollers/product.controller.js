import { uploadFIle } from "../services/storage.services.js";
import productModel from "../models/product.model.js";

export async function createProduct(req, res) {

    const { title, description, priceAmount, priceCurrency } = req.body;
    const user = req.user;
    console.log(req.files)
    


    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFIle(
            {
                buffer: file.buffer,
                fileName: file.originalname
            }
        )

    }))



    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency  || "PKR",
        },
        seller: user._id,
        images
    })

    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
} 