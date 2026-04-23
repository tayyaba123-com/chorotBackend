import React, { useEffect, useState } from 'react'
import { useProduct } from "../hooks/useProduct"
import { Link } from 'react-router'

const ProductCard = ({ product }) => {
    // console.log(product)
    const { title, description, price, images } = product
    const coverImage = images && images.length > 0 ? images[0] : null
    console.log(images)
    // console.log(coverImage)

    // console.log(title, description, price, images)
    return (
        <div className="group bg-white rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100/50">
            {/* Image Slot - 1px dashed border as per design system */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed border-slate-200 group-hover:border-orange-300 transition-colors bg-slate-50 relative">
                {coverImage ? (
                    <img
                        src={coverImage.url}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {/* Badge for multiple images */}

                {images?.length > 1 && (
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-800 shadow-sm">
                        +{images.length - 1} photos
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="mt-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-1">{title}</h3>
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block">{price.amount}</span>
                        <span className="text-sm font-black text-orange-600">{price.currency}</span>
                    </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-4 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Hover Action */}
            <div className="mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full py-2.5 text-xs font-bold text-orange-600 hover:text-white hover:bg-orange-600 rounded-lg border border-orange-200 hover:border-orange-600 transition-all duration-200">
                    View Details
                </button>
            </div>
        </div>
    )
}

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
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-extrabold tracking-tighter text-slate-800">
                                quicky<span className="text-orange-500">.</span>
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Products</h1>
                        <p className="text-slate-500">Manage and track your active listings</p>
                    </div>

                    <Link
                        to="/create-product"
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