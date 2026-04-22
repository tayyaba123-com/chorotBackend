import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export async function createProduct({ title, description, priceAmount, priceCurrency, images }) {
    console.log(images)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("priceAmount", priceAmount)
    formData.append("priceCurrency", priceCurrency)
    for (const image of images) {
        formData.append("images", image)
    }

    const responce = await productApiInstance.post("/", formData)

    return responce.data;
}


export async function getSellerProducts() {

    const responce = await productApiInstance.get("/seller")

    return responce.data;
}
