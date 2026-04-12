import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [accountType, setAccountType] = useState('buyer');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', { ...formData, isSeller: accountType === 'supplier' });
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Left Panel: Hand-crafted SVG illustration */}
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
            <rect x="0" y="40" width="150" height="130" rx="14" fill="#f97316" />
            {/* bag top strip */}
            <rect x="0" y="40" width="120" height="22" rx="6" fill="#ea580c" />
            {/* bag handle left */}
            <path d="M30 40 Q30 8 45 8 Q60 8 60 40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
            {/* bag handle right */}
            <path d="M60 40 Q60 8 75 8 Q90 8 90 40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
            {/* quicky brand on bag */}
            <text x="28" y="116" fontFamily="sans-serif" fontWeight="800" fontSize="17" fill="white" letterSpacing="1">Trending</text>
            {/* shine */}
            <ellipse cx="90" cy="70" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-30 90 70)" />
          </g>

          {/* ── Small shopping bag (top-right) ── */}
          <g transform="translate(290, 90)">
            <rect x="0" y="26" width="76" height="82" rx="10" fill="#fbbf24" />
            <rect x="0" y="26" width="76" height="14" rx="5" fill="#f59e0b" />
            <path d="M18 26 Q18 5 28 5 Q38 5 38 26" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M38 26 Q38 5 48 5 Q58 5 58 26" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <text x="10" y="80" fontFamily="sans-serif" fontWeight="800" fontSize="10" fill="white" letterSpacing="0.5">Quality</text>
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

      {/* Right Panel: Clean white registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-white relative shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] z-20">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            {/* Mobile-only logo */}
            <div className="lg:hidden mb-6">
              <span className="text-3xl font-extrabold tracking-tighter text-slate-800">
                quicky<span className="text-orange-500">.</span>
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-slate-500 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Segmented Toggle for Buyer/Supplier */}
            <div className="flex p-1 space-x-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setAccountType('buyer')}
                className={`w-1/2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${accountType === 'buyer'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setAccountType('supplier')}
                className={`w-1/2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${accountType === 'supplier'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                Supplier
              </button>
            </div>

            {/* Form Fields: Ant Design Aesthetic with Floating Labels */}
            <div className="space-y-5">

              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="fullname"
                  className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="contactNumber"
                  className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Contact Number
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Password
                </label>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-3 my-6">
            <div className="h-px bg-slate-200 w-full"></div>
            <span className="text-slate-400 text-sm font-medium">OR</span>
            <div className="h-px bg-slate-200 w-full"></div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-1  justify-items-left">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Log in</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
