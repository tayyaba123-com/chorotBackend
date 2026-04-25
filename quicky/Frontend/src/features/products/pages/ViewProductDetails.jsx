import React from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams } from 'react-router'
import { useEffect } from 'react'

const ViewProductDetails = () => {
    const { handleGetProductById } = useProduct()
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        handleGetProductById(id)
    }, [id])
    return (
        <div>ViewProductDetails</div>
    )
}

export default ViewProductDetails