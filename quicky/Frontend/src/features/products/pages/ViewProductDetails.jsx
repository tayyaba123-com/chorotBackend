import React, { useState, useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const ViewProductDetails = () => {
    const { handleGetProductById } = useProduct()
    const { id } = useParams()
    const navigate = useNavigate()
    const product = useSelector(state => state.product.currentProduct)
    const [activeImage, setActiveImage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            await handleGetProductById(id)
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-[1.5px] border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
                <div className="space-y-8 max-w-md">
                    <h2 className="text-3xl font-light text-zinc-900 tracking-tight">Object Not Found</h2>
                    <p className="text-zinc-500 font-light leading-relaxed">The item you are looking for is no longer available in our curation.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 border border-zinc-200 text-zinc-900 text-xs font-semibold tracking-widest uppercase hover:border-zinc-900 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
            {/* Top Navigation Bar - Ultra Minimal */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100/50">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 text-xs font-semibold tracking-widest uppercase transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back
                    </button>
                    <div className="text-xs font-black tracking-[0.3em] uppercase text-zinc-900 absolute left-1/2 -translate-x-1/2">
                        Quicky
                    </div>
                    <div className="w-20"></div> {/* Spacer to balance absolute centered logo */}
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-32">
                    
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Main Image */}
                        <div className="w-full aspect-[4/5] bg-zinc-50 relative overflow-hidden group">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[activeImage]?.url || product.images[activeImage]}
                                    alt={product.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-4">
                                    <svg className="w-8 h-8 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <span className="font-light tracking-widest uppercase text-[10px]">Image Unavailable</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative flex-shrink-0 w-20 md:w-24 aspect-[4/5] overflow-hidden transition-all duration-500 ease-out ${activeImage === idx ? 'opacity-100 ring-1 ring-zinc-900 ring-offset-2' : 'opacity-40 hover:opacity-80'}`}
                                    >
                                        <img
                                            src={img.url || img}
                                            alt={`${product.title} view ${idx + 1}`}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start lg:py-12">
                        <div className="lg:sticky lg:top-40 space-y-12">
                            
                            {/* Header Info */}
                            <div className="space-y-6">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                                    {product.category || 'Curated Object'}
                                </p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 leading-[1.05] tracking-tight">
                                    {product.title}
                                </h1>
                                <div className="flex items-baseline gap-4 pt-2">
                                    <span className="text-2xl font-normal text-zinc-900 tracking-tight">
                                        {product.price?.currency || 'INR'} {product.price?.amount || product.price}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-zinc prose-base text-zinc-500 font-light leading-relaxed">
                                <p>
                                    {product.description || "A masterfully crafted piece that blends contemporary design with timeless functionality. Each element has been curated to ensure the highest standard of quality and aesthetic appeal."}
                                </p>
                            </div>

                            {/* Options/Actions */}
                            <div className="pt-8 space-y-3 border-t border-zinc-100">
                                <button className="w-full bg-zinc-900 text-white py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98] flex items-center justify-center gap-3">
                                    Add to Cart
                                </button>
                                <button className="w-full bg-white text-zinc-900 border border-zinc-200 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-zinc-900 active:scale-[0.98] flex items-center justify-center">
                                    Buy Now
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="pt-8 space-y-6">
                                <div className="flex items-start gap-5">
                                    <svg className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                    <div>
                                        <p className="text-xs font-bold tracking-widest uppercase text-zinc-900 mb-2">Complimentary Shipping</p>
                                        <p className="text-sm text-zinc-500 font-light leading-relaxed">Delivery within 2-4 business days. Returns accepted within 30 days of receipt.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            {/* Footer Copy */}
            <footer className="border-t border-zinc-100 py-16 px-6 text-center">
                <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase font-bold">&copy; 2026 QUICKY. DESIGNED FOR DISCOVERY.</p>
            </footer>
        </div>
    )
}

export default ViewProductDetails