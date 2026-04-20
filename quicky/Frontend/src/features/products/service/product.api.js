import axios from "axios";

const productApiInstance = axios.create({
    baseURL:"/api/products",
    withCredentials: true
})


export async function createProduct({title, description, priceAmount, priceCurrency, images}){

    const responce = await productApiInstance.post("/",{
        title,
        description,
        priceAmount,
        priceCurrency,
        images
    })

    return responce.data;
}


export async function getSellerProducts(){

    const responce = await productApiInstance.get("/seller")

    return responce.data;
}
