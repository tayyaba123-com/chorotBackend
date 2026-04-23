import React, { useEffect, useState } from 'react'
import { useProduct } from "../hooks/useProduct"
import { Link } from 'react-router'
import ProductCard from "../components/ProductCard"


const ViewProducts = () => {

    const { handleGetSellerProducts } = useProduct()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await handleGetSellerProducts()
                setProducts(data || [])
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-[#f8f9ff] font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Products</h1>
                        <p className="text-slate-500">Manage and track your active listings</p>
                    </div>

                    <Link
                        to={"/seller/create-product"}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        List New Product
                    </Link>
                </div>

                {/* Main Content Area */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border border-slate-100">
                                <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-4" />
                                <div className="h-5 bg-slate-100 rounded-full w-3/4 mb-3" />
                                <div className="h-4 bg-slate-50 rounded-full w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                        <p className="text-slate-500 text-center max-w-sm mb-8">
                            You haven't listed any products yet. Start selling by adding your first item to the marketplace.
                        </p>
                        <Link
                            to="/create-product"
                            className="px-8 py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                            Create Your First Listing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewProducts