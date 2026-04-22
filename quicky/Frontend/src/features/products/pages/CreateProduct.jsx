import { useState, useRef } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useNavigate } from 'react-router'

const CURRENCIES = ["USD", "EUR", "GBP", "PKR", "INR", "JPY"]
const MAX_IMAGES = 7

// Floating label input — matches Login/Register style exactly
const FloatingInput = ({ id, name, type = 'text', value, onChange, label, required, ...rest }) => (
    <div className="relative">
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
            placeholder=" "
            required={required}
            {...rest}
        />
        <label
            htmlFor={id}
            className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
        >
            {label}
        </label>
    </div>
)

// Individual image slot — supports click AND drag-and-drop
const ImageSlot = ({ index, file, onAdd, onRemove }) => {
    const inputRef = useRef(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!file) setIsDragOver(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        if (file) return // slot already filled
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            onAdd(index, droppedFile)
        }
    }

    if (file) {
        return (
            <div
                className={`relative group aspect-square rounded-2xl overflow-hidden border-2 shadow-sm transition-all duration-200
                    ${isDragOver
                        ? 'border-orange-500 scale-[1.03] shadow-md shadow-orange-200'
                        : 'border-slate-200'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsDragOver(false)
                    const droppedFile = e.dataTransfer.files?.[0]
                    if (droppedFile && droppedFile.type.startsWith('image/')) {
                        onAdd(index, droppedFile)
                    }
                }}
            >
                <img
                    src={URL.createObjectURL(file)}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                />

                {/* Drag-over replace overlay */}
                {isDragOver && (
                    <div className="absolute inset-0 bg-orange-500/70 flex flex-col items-center justify-center gap-1 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span className="text-[10px] font-bold text-white">Replace</span>
                    </div>
                )}

                {/* Hover remove overlay (hidden while dragging) */}
                {!isDragOver && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-white transition-colors shadow-md"
                            title="Remove image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Slot number badge */}
                <span className="absolute top-1.5 left-1.5 text-[10px] font-bold text-white bg-black/50 rounded-md px-1.5 py-0.5">
                    {index + 1}
                </span>
            </div>
        )
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files[0]) onAdd(index, e.target.files[0]) }}
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`aspect-square rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1.5 group
                    ${isDragOver
                        ? 'border-orange-500 bg-orange-50 text-orange-500 scale-[1.03] shadow-md shadow-orange-200'
                        : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50/40 text-slate-400 hover:text-orange-500'
                    }`}
            >
                {isDragOver ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform group-hover:scale-110 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                )}
                <span className="text-[10px] font-semibold leading-none">
                    {isDragOver ? 'Drop here' : (index === 0 ? 'Cover' : `Photo ${index + 1}`)}
                </span>
            </button>
        </>
    )
}

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'USD',
    })
    const [images, setImages] = useState(Array(MAX_IMAGES).fill(null))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddImage = (index, file) => {
        const updated = [...images]
        updated[index] = file
        setImages(updated)
    }

    const handleRemoveImage = (index) => {
        const updated = [...images]
        updated[index] = null
        setImages(updated)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const filledImages = images.filter(Boolean)
        if (filledImages.length === 0) {
            setError('Please add at least one product image.')
            return
        }



        try {
            setIsSubmitting(true)
            await handleCreateProduct({
                ...formData,

                images: filledImages,
            })
            navigate('/')
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const filledCount = images.filter(Boolean).length

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl">

                {/* Header */}
                <div className="mb-10">
                    <span className="text-3xl font-extrabold tracking-tighter text-slate-800">
                        quicky<span className="text-orange-500">.</span>
                    </span>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight mt-6">List a Product</h1>
                    <p className="text-slate-500 mt-2">Fill in the details below to publish your listing.</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 sm:p-10 space-y-8">

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* ── Basic Info ─────────────────────── */}
                        <section className="space-y-5">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Basic Info</h2>

                            <FloatingInput
                                id="title"
                                name="title"
                                label="Product Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                            {/* Description — textarea with floating label */}
                            <div className="relative">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="block px-3.5 pb-2.5 pt-5 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors resize-none"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="description"
                                    className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                                >
                                    Description
                                </label>
                            </div>
                        </section>

                        {/* ── Pricing ────────────────────────── */}
                        <section className="space-y-5">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Pricing</h2>

                            <div className="flex gap-3">
                                {/* Currency selector */}
                                <div className="relative min-w-[120px]">
                                    <select
                                        id="priceCurrency"
                                        name="priceCurrency"
                                        value={formData.priceCurrency}
                                        onChange={handleChange}
                                        className="block px-3.5 pb-2.5 pt-5 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors cursor-pointer"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="priceCurrency"
                                        className="absolute text-xs font-semibold text-slate-400 top-1.5 left-3.5 z-10"
                                    >
                                        Currency
                                    </label>
                                    {/* chevron icon */}
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="flex-1">
                                    <FloatingInput
                                        id="priceAmount"
                                        name="priceAmount"
                                        type="number"
                                        label="Amount"
                                        value={formData.priceAmount}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ── Images ─────────────────────────── */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Photos</h2>
                                <span className="text-xs text-slate-400 font-medium">
                                    {filledCount} / {MAX_IMAGES} added
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                                    style={{ width: `${(filledCount / MAX_IMAGES) * 100}%` }}
                                />
                            </div>

                            <p className="text-xs text-slate-400">First photo will be the cover. Up to {MAX_IMAGES} photos.</p>

                            {/* Grid of individual slots */}
                            <div className="grid grid-cols-4 gap-3">
                                {images.map((file, i) => (
                                    <ImageSlot
                                        key={i}
                                        index={i}
                                        file={file}
                                        onAdd={handleAddImage}
                                        onRemove={handleRemoveImage}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* ── Error ──────────────────────────── */}
                        {error && (
                            <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* ── Submit ─────────────────────────── */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Publishing…
                                </>
                            ) : (
                                'Publish Listing'
                            )}
                        </button>

                    </form>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    Your listing will be reviewed before going live.
                </p>
            </div>
        </div>
    )
}

export default CreateProduct