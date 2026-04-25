import React, { useState, useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const ViewProductDetails = () => {
    const { handleGetProductById } = useProduct()
    const { id } = useParams()
    const navigate = useNavigate()
    const product = useSelector(state => state.product.currentProduct)
    console.log(product)
    const [activeImage, setActiveImage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            await handleGetProductById(id)
            setLoading(false)
        }
        fetchProduct()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#f97316]/20 border-t-[#f97316] rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Curating your selection...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Product Not Found</h2>
                    <p className="text-slate-500 leading-relaxed">The product you're looking for might have been moved or is no longer available.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#f8f9ff] min-h-screen font-sans text-[#0b1c30]">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-[#f97316] font-bold text-sm transition-colors group"
                    >
                        <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back
                    </button>
                    <div className="text-xl font-black tracking-tighter text-slate-800">
                        quicky<span className="text-[#f97316]">.</span>
                    </div>
                    <div className="w-10"></div> {/* Spacer for symmetry */}
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-[60%] space-y-6">
                        {/* Main Image Slot */}
                        <div className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-dashed border-[#8c7164]/30 p-4 group">
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 relative">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[activeImage]?.url || product.images[activeImage]}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        <span className="text-lg italic">Perspective pending...</span>
                                    </div>
                                )}

                                {/* Image Overlay Badges */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 shadow-sm">
                                        New Arrival
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Strip */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide text-white">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative flex-shrink-0 w-20 md:w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-[#f97316] scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                                    >
                                        <img
                                            src={img.url || img}
                                            alt={`${product.title} view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="w-full lg:w-[40%] flex flex-col">
                        <div className="sticky top-28 space-y-10">
                            {/* Header Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#f97316]">
                                        {product.category || 'Quicky Select'}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    {product.title}
                                </h1>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900">
                                        <span className="text-sm font-bold text-slate-400 mr-1.5 uppercase">{product.price?.currency || 'INR'}</span>
                                        {product.price?.amount || product.price}
                                    </span>
                                    <span className="text-sm text-slate-400 font-medium line-through decoration-slate-300">
                                        {Math.round((product.price?.amount || product.price) * 1.2)}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 inline-block">Description</h3>
                                <p className="text-lg text-slate-500 leading-relaxed font-normal">
                                    {product.description || "A masterfully crafted piece that blends contemporary design with timeless functionality. Each element has been curated to ensure the highest standard of quality and aesthetic appeal."}
                                </p>
                            </div>

                            {/* Options/Actions */}
                            <div className="space-y-6 pt-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-gradient-to-br from-[#9d4300] to-[#f97316] text-white py-5 rounded-full text-base font-black transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(157,67,0,0.4)] active:scale-95 flex items-center justify-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                        Add to Cart
                                    </button>
                                    <button className="flex-1 bg-[#0b1c30] text-white py-5 rounded-full text-base font-black transition-all hover:bg-slate-800 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(11,28,48,0.3)] active:scale-95 flex items-center justify-center">
                                        Buy Now
                                    </button>
                                </div>

                                {/* Delivery Info Tonal Block */}
                                <div className="bg-[#eff4ff] rounded-2xl p-6 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#f97316] shadow-sm flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Free Express Delivery</p>
                                        <p className="text-xs text-slate-500 mt-1">Expected delivery: 2-4 business days. Returns accepted within 30 days.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold overflow-hidden border-2 border-white shadow-sm">
                                        {product.seller?.name?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Curated by</p>
                                        <p className="text-sm font-bold text-slate-800">{product.seller?.name || 'Artisan Seller'}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-[#f97316] hover:underline decoration-2 underline-offset-4">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Section Placeholder */}
                <section className="mt-32 pt-20 border-t border-slate-100">
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">You May Also Like</h2>
                            <p className="text-slate-500 font-medium italic">Handpicked alternatives based on your aesthetic.</p>
                        </div>
                        <button className="text-sm font-bold text-[#f97316] hover:text-[#9d4300] transition-colors">
                            Explore All
                        </button>
                    </div>
                    {/* Placeholder for similar products */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[3/4] bg-slate-100 rounded-2xl border border-dashed border-slate-200"></div>
                                <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
                                <div className="h-3 w-1/3 bg-slate-100 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer Copy */}
            <footer className="bg-[#0b1c30] text-white py-10 px-6 text-center mt-20">
                <p className="text-slate-500 text-xs tracking-widest uppercase font-bold">&copy; 2026 QUICKY. ALL RIGHTS RESERVED.</p>
            </footer>
        </div>
    )
}

export default ViewProductDetails