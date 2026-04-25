import React, { useEffect } from 'react'
import { useProduct } from "../hooks/useProduct"
import { useSelector } from 'react-redux'

const Home = () => {

    const products = useSelector(state => state.product.products)
    console.log(products);

    const { handleGetAllProducts } = useProduct()

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home