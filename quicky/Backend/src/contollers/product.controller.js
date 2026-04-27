import { uploadFIle } from "../services/storage.services.js";
import productModel from "../models/product.model.js";

export async function createProduct(req, res) {

    const { title, description, priceAmount, priceCurrency } = req.body;
    const user = req.user;
  
  


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

export async function getSellerProducts(req, res) {

    const seller = req.user;

    const products = await productModel.find({seller: seller._id})

    if(!products){
        return res.status(404).json({
            message: "No products found for this seller",
            success: false
        })
    }

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function getAllProducts(req,res){
    try{

        const products = await productModel.find({})

        if(!products){
            return res.status(200).json({
                message:"No Product found",
                success:false
            })
        }

        return res.status(200).json({
            message:"product Fetched Successfuly",
            success:true,
            products
        })


    }catch(error){
        success:false;
        error:error.message
    }
  

}

export async function getProductById(req,res){
    const productId = req.params.id

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            message:"Product Not Found",
            success:false
        })
    }

    return res.status(200).json({
        message:"Product Fetched Successfuly",
        success:true,
        product
    })
}