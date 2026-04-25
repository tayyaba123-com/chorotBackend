import { Router } from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct ,getSellerProducts , getAllProducts, getAProduct} from '../contollers/product.controller.js';
import { createProductValidation } from '../validators/product.validator.js';

import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } //5MB
    
});

const productRouter = Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 * @body { title: string, description: string, priceAmount: number, priceCurrency?: string, images: File[] }
 */

productRouter.post("/", authenticateSeller, upload.array('images', 7),createProductValidation, createProduct)

/**
 * @route Get /api/products/seller
 * @desc Returs All product of requested seller
 * @access Private (Seller only)
 */

productRouter.get("/seller",authenticateSeller,getSellerProducts)

/**
 * @route Get /api/products/
 * @desc Gets all products
 * @access Publics
 */

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getAProduct)


export default productRouter;


