import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export async function createProduct(formData) {

    const responce = await productApiInstance.post("/", formData)

    return responce.data;
}


export async function getSellerProducts() {

    const responce = await productApiInstance.get("/seller")

    return responce.data;
}

export async function getAllProducts() {

    const responce = await productApiInstance.get("/")

    return responce.data
}

export async function getProductById(id) {

    const responce = await productApiInstance.get(`/${id}`)

    return responce.data
}
