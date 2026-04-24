import { useState } from "react"


const ProductCard = ({ product }) => {

    const { title, description, price, images } = product
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (images && images.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }
    }

    const prevImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (images && images.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
    }

    return (
        <div className="group bg-white rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100/50">
            {/* Image Swiper Slot */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed border-slate-200 group-hover:border-orange-300 transition-colors bg-slate-50 relative">
                {images && images.length > 0 ? (
                    <div className="w-full h-full relative overflow-hidden">
                        {/* Images Container */}
                        <div
                            className="flex w-full h-full transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={`${title} - ${idx + 1}`}
                                    className="w-full h-full object-cover flex-shrink-0"
                                />
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        {images.length > 1 && (
                            <>
                                {/* Left Arrow */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white text-slate-800 hover:text-orange-600 z-10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white text-slate-800 hover:text-orange-600 z-10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Pagination Dots */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-4 bg-orange-500" : "w-1.5 bg-white/60"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Badge for multiple images (only show if not hovering or if single image) */}
                {images?.length > 1 && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white shadow-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                        {currentIndex + 1} / {images.length}
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

export default ProductCard
