import { Router } from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct ,getSellerProducts } from '../contollers/product.controller.js';
import { createProductValidationRules } from '../validators/product.validator.js';
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

productRouter.post("/", authenticateSeller, upload.array('images', 7), createProduct)

productRouter.get("/seller",authenticateSeller,getSellerProducts)


export default productRouter;


