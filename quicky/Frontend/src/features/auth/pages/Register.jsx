import { useState } from 'react';
import { useAuth } from '../hook/useAuth.js';
import { useNavigate, Link } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle.jsx';
import LeftPanel from '../components/LeftPanel.jsx';

const Register = () => {
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
  });

  const [accountType, setAccountType] = useState('buyer');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, isSeller: accountType === 'seller' };
    await handleRegister({
      ...payload,
      isSeller: accountType === 'seller'
    })

    navigate("/")
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Left Panel: Hand-crafted SVG illustration */}
      <LeftPanel />


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
                onClick={() => setAccountType('seller')}
                className={`w-1/2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${accountType === 'seller'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                Seller
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
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-800 bg-transparent rounded-xl border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer transition-colors"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="contact"
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

          {/* Google Auth */}
          <ContinueWithGoogle />

          <p className="text-center text-sm text-slate-500 mt-8" >
            Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login in</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
