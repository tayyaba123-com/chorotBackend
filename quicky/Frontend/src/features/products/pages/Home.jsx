import React, { useEffect, useState } from 'react'
import { useProduct } from "../hooks/useProduct"
import { useSelector } from 'react-redux'

const HomeProductCard = ({ product }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    console.log(product)

    const nextImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (product.images && product.images.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % product.images.length)
        }
    }

    const prevImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (product.images && product.images.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
        }
    }

    return (
        <div className="group relative">
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group-hover:border-[#f97316]/30 transition-colors">
                {product.images && product.images.length > 0 ? (
                    <div className="w-full h-full relative">
                        <div
                            className="flex w-full h-full transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img?.url || img}
                                    alt={`${product.title} - ${idx + 1}`}
                                    className="w-full h-full object-cover object-center flex-shrink-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            ))}
                        </div>

                        {/* Swiper Controls */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-[#f97316] z-20 shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-[#f97316] z-20 shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                {/* Pagination */}
                                <div className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {product.images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-4 bg-[#f97316]" : "w-1.5 bg-white/70"}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <span className="text-sm font-medium italic">No Image</span>
                    </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-[#f97316] shadow-md hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-[#f97316] shadow-md hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2.5-9 5 18 2.5-9h5"></path></svg>
                    </button>
                </div>

                {/* Quick Add Button */}
                <a href={`/product/${product._id}`} className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <button className="w-full bg-white/95 backdrop-blur text-slate-900 py-3 rounded-xl font-bold shadow-lg hover:bg-[#f97316] hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        View Details
                    </button>
                </a>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 block">{product.category || 'Apparel'}</span>
                <h3 className="text-base font-bold text-slate-800 hover:text-[#f97316] transition-colors truncate">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-[#0b1c30]">
                        <span className="text-xs font-semibold text-slate-500 mr-1">{product.price?.currency || '$'}</span>
                        {product.price?.amount || product.price}
                    </span>
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    const products = useSelector(state => state.product.products)
    const { handleGetAllProducts } = useProduct()

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    return (
        <div className="bg-[#f8f9ff] min-h-screen font-sans text-[#0b1c30]">
            {/* Promo Banner */}
            <div className="bg-[#0b1c30] text-white text-xs font-semibold text-center py-2 tracking-wide">
                FREE EXPRESS SHIPPING ON ALL ORDERS OVER $150
            </div>

            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-black tracking-tighter text-slate-800 flex-shrink-0">
                        quicky<span className="text-[#f97316]">.</span>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more..."
                            className="w-full bg-slate-100/80 text-sm px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all border border-transparent focus:bg-white"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#f97316]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>

                    {/* Navigation & Icons */}
                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex space-x-6 text-sm font-bold text-slate-600 mr-2">
                            <a href="#" className="hover:text-[#f97316] transition-colors">Shop</a>
                            <a href="#" className="hover:text-[#f97316] transition-colors">Men</a>
                            <a href="#" className="hover:text-[#f97316] transition-colors">Women</a>
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="text-slate-600 hover:text-[#f97316] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </button>
                            <button className="text-slate-600 hover:text-[#f97316] transition-colors relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </button>
                            <button className="text-slate-600 hover:text-[#f97316] transition-colors relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                <span className="absolute -top-1.5 -right-2 bg-[#f97316] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - Ecommerce Style */}
            <section className="relative bg-slate-50 overflow-hidden">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 px-6 md:px-10 py-16 md:py-24 z-10">
                        <span className="text-[#f97316] font-bold tracking-widest uppercase text-sm mb-4 block">New Collection 2026</span>
                        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black leading-[1.1] tracking-tighter text-[#0b1c30] mb-6">
                            Elevate Your <br /> Everyday Style.
                        </h1>
                        <p className="text-lg text-slate-500 mb-10 max-w-md leading-relaxed">
                            Discover premium quality essentials designed to make you look and feel your absolute best.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gradient-to-br from-[#9d4300] to-[#f97316] text-white px-8 py-4 rounded-full text-base font-bold transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(157,67,0,0.6)] flex items-center justify-center gap-2">
                                Shop Collection
                            </button>
                            <button className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full text-base font-bold transition-all hover:border-slate-800 flex items-center justify-center">
                                View Trends
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full md:w-1/2 h-[400px] md:h-[650px] relative">
                        <img
                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200"
                            alt="Fashion Collection"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent md:hidden"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent md:hidden"></div>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="border-y border-slate-200 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="flex flex-col items-center justify-center py-4">
                            <svg className="text-[#f97316] mb-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <h4 className="font-bold text-slate-800">Free Express Shipping</h4>
                            <p className="text-sm text-slate-500 mt-1">On all orders over $150</p>
                        </div>
                        <div className="flex flex-col items-center justify-center py-4">
                            <svg className="text-[#f97316] mb-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <h4 className="font-bold text-slate-800">Secure Payments</h4>
                            <p className="text-sm text-slate-500 mt-1">100% safe & encrypted</p>
                        </div>
                        <div className="flex flex-col items-center justify-center py-4">
                            <svg className="text-[#f97316] mb-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                            <h4 className="font-bold text-slate-800">24/7 Support</h4>
                            <p className="text-sm text-slate-500 mt-1">Dedicated team ready to help</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Pills */}
            <section className="pt-20 max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {['All Products', 'Apparel', 'Accessories', 'Electronics', 'Home & Living'].map((cat, i) => (
                        <button key={cat} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${i === 0 ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#f97316] hover:text-[#f97316]'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid Section */}
            <main className="py-16 md:py-20 max-w-[1400px] mx-auto">
                <div className="px-6 md:px-10 mb-10 flex justify-between items-end">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Trending Now</h2>
                    <button className="text-sm font-bold text-[#f97316] hover:text-[#9d4300] transition-colors flex items-center gap-1 group">
                        View All
                        <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-10">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <HomeProductCard key={product._id || index} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
                            <p className="text-slate-500 max-w-sm">We are currently updating our catalog. Please check back later for new arrivals.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Newsletter Section */}
            <section className="bg-slate-800 text-white py-16 md:py-24 px-6 mt-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Join Our Newsletter</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered directly to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-5 py-4 rounded-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/50"
                        />
                        <button type="submit" className="bg-[#f97316] text-white px-8 py-4 rounded-full font-bold hover:bg-[#9d4300] transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0b1c30] text-white py-16 px-6 md:px-10 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1 space-y-6">
                            <div className="text-3xl font-black tracking-tighter">
                                quicky<span className="text-[#f97316]">.</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Redefining the digital marketplace with speed, elegance, and intentionality.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-300">Shop</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Men's Clothing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Women's Clothing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-300">Company</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-300">Support</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-xs">
                            &copy; 2026 Quicky Inc. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-slate-500">
                            {/* Social Icons mini */}
                            <a href="#" className="hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                            <a href="#" className="hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home