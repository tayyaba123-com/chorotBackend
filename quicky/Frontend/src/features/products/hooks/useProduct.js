import { createProduct, getSellerProducts } from "../service/product.api.js"
import { useDispatch } from "react-redux"
import { setSellerProducts } from "../state/product.slice.js"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct({ title, description, priceAmount, priceCurrency, images = [] }) {

        const data = await createProduct({ title, description, priceAmount, priceCurrency, images })

        return data.product

    }

    async function handleGetSellerProducts() {

        const data = await getSellerProducts()

        dispatch(setSellerProducts(data.products))
        return data.products
    }

    return { handleCreateProduct, handleGetSellerProducts }
}