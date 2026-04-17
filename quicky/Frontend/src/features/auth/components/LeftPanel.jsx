import React from 'react'

const LeftPanel = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#fff7ed] via-[#FAFBFF] to-[#eef2ff] items-center justify-center p-12">

            {/* Brand Logo */}
            <div className="absolute top-8 left-8 xl:top-12 xl:left-16 z-20">
                <span className="text-3xl font-extrabold tracking-tighter text-slate-800">
                    quicky<span className="text-orange-500">.</span>
                </span>
            </div>

            {/* Decorative background circles */}
            <div className="absolute top-1/4 -left-16 w-72 h-72 rounded-full bg-orange-100 opacity-50 blur-3xl" />
            <div className="absolute bottom-1/4 -right-16 w-72 h-72 rounded-full bg-indigo-100 opacity-50 blur-3xl" />

            {/* Hand-crafted inline SVG — zero AI, zero external images */}
            <svg
                viewBox="0 0 480 520"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-sm drop-shadow-xl z-10"
                aria-label="Quicky fashion shopping illustration"
            >
                {/* ── Background card ── */}
                <rect x="40" y="60" width="400" height="400" rx="32" fill="white" opacity="0.7" />

                {/* ── Large shopping bag ── */}
                <g transform="translate(140, 130)">
                    {/* bag body */}
                    <rect x="0" y="40" width="130" height="130" rx="14" fill="#f97316" />
                    {/* bag top strip */}
                    <rect x="0" y="40" width="120" height="22" rx="6" fill="#ea580c" />
                    {/* bag handle left */}
                    <path d="M30 40 Q30 8 45 8 Q60 8 60 40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
                    {/* bag handle right */}
                    <path d="M60 40 Q60 8 75 8 Q90 8 90 40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
                    {/* quicky brand on bag */}
                    <text x="24" y="116" fontFamily="sans-serif" fontWeight="800" fontSize="17" fill="white" letterSpacing="1">Trending</text>
                    {/* shine */}
                    <ellipse cx="90" cy="70" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-30 90 70)" />
                </g>

                {/* ── Small shopping bag (top-right) ── */}
                <g transform="translate(290, 90)">
                    <rect x="0" y="26" width="76" height="82" rx="10" fill="#fbbf24" />
                    <rect x="0" y="26" width="76" height="14" rx="5" fill="#f59e0b" />
                    <path d="M18 26 Q18 5 28 5 Q38 5 38 26" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M38 26 Q38 5 48 5 Q58 5 58 26" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <text x="15" y="80" fontFamily="sans-serif" fontWeight="800" fontSize="10" fill="white" letterSpacing="0.5">Quality</text>
                </g>

                {/* ── Clothing tag ── */}
                <g transform="translate(84, 160)">
                    <rect x="0" y="0" width="64" height="96" rx="8" fill="#e0e7ff" />
                    <circle cx="32" cy="10" r="5" fill="#6366f1" />
                    <line x1="32" y1="0" x2="32" y2="10" stroke="#6366f1" strokeWidth="2" />
                    {/* tag lines */}
                    <rect x="12" y="26" width="40" height="4" rx="2" fill="#a5b4fc" />
                    <rect x="12" y="38" width="28" height="4" rx="2" fill="#c7d2fe" />
                    <rect x="12" y="50" width="34" height="4" rx="2" fill="#a5b4fc" />
                    {/* price badge */}
                    <rect x="8" y="66" width="48" height="20" rx="6" fill="#6366f1" />
                    <text x="32" y="80" fontFamily="sans-serif" fontWeight="700" fontSize="10" fill="white" textAnchor="middle">Brand</text>
                </g>

                {/* ── Dress / clothing silhouette ── */}
                <g transform="translate(188, 270)">
                    {/* hanger */}
                    <path d="M52 0 Q52 -10 42 -16 Q32 -22 22 -16 Q12 -10 12 0" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                    <line x1="52" y1="0" x2="92" y2="0" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="12" y1="0" x2="-28" y2="0" stroke="#94a3b8" strokeWidth="3" />
                    {/* dress body */}
                    <path d="M12 0 L0 30 L-10 90 Q32 110 74 90 L64 30 Z" fill="#fda4af" />
                    {/* collar */}
                    <path d="M32 0 Q22 14 12 14 L12 0 Z" fill="#fb7185" />
                    <path d="M32 0 Q42 14 52 14 L52 0 Z" fill="#fb7185" />
                    {/* dress pattern dots */}
                    <circle cx="20" cy="44" r="3" fill="white" opacity="0.6" />
                    <circle cx="36" cy="56" r="3" fill="white" opacity="0.6" />
                    <circle cx="50" cy="44" r="3" fill="white" opacity="0.6" />
                    <circle cx="28" cy="68" r="3" fill="white" opacity="0.6" />
                    <circle cx="44" cy="74" r="3" fill="white" opacity="0.6" />
                </g>

                {/* ── Stars / sparkles ── */}
                {/* Star 1 */}
                <g transform="translate(72, 108)">
                    <polygon points="10,0 12,7 19,7 13,11 16,18 10,14 4,18 7,11 1,7 8,7" fill="#fbbf24" opacity="0.9" />
                </g>
                {/* Star 2 */}
                <g transform="translate(380, 200)">
                    <polygon points="8,0 10,5.5 16,5.5 11,9 13,14.5 8,11 3,14.5 5,9 0,5.5 6,5.5" fill="#818cf8" opacity="0.85" />
                </g>
                {/* Star 3 */}
                <g transform="translate(100, 370)">
                    <polygon points="6,0 7.5,4 12,4 8.5,6.5 10,10.5 6,8 2,10.5 3.5,6.5 0,4 4.5,4" fill="#f97316" opacity="0.7" />
                </g>

                {/* ── Floating dots ── */}
                <circle cx="390" cy="140" r="6" fill="#fda4af" opacity="0.7" />
                <circle cx="408" cy="322" r="9" fill="#fbbf24" opacity="0.5" />
                <circle cx="68" cy="290" r="7" fill="#818cf8" opacity="0.5" />
                <circle cx="420" cy="390" r="5" fill="#f97316" opacity="0.6" />

                {/* ── Bottom tagline ── */}
                <text x="240" y="490" fontFamily="sans-serif" fontWeight="700" fontSize="14" fill="#64748b" textAnchor="middle" letterSpacing="2">STYLE. SPEED. SAVINGS.</text>
            </svg>


        </div>

    )
}

export default LeftPanel