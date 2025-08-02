import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Moon, User, Settings, LogOut } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If already on home page, just scroll to the section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on a different page, navigate to home and then scroll
      navigate('/');
      // Use setTimeout to wait for navigation to complete
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between py-1 px-4 sm:px-10">
        {/* Logo and Brand */}
                  <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="XPANIX Logo" className="h-20 w-20 object-contain" />
              {/* <span className="text-lg font-bold text-white font-mokoto tracking-tight ml-1">PANIX</span> */}
            </Link>
          </div>
        {/* Desktop Nav (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4 md:gap-6 xl:gap-10">
          <ul className="flex items-center gap-2 md:gap-4 xl:gap-8 text-white font-mono text-xs md:text-sm xl:text-base tracking-widest uppercase">
            <li className="group relative px-1">
              <Link to="/" className="relative z-10 px-3 py-1 transition-colors duration-300">
                <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Home</span>
              </Link>
            </li>
            <li className="group relative px-1">
              <a 
                href="#about" 
                onClick={handleAboutClick}
                className="relative z-10 px-3 py-1 transition-colors duration-300 cursor-pointer"
              >
                <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">About</span>
              </a>
            </li>
            {/* Services Dropdown */}
            <li className="group relative px-1">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="relative z-10 px-3 py-1 transition-colors duration-300 flex items-center gap-1"
              >
                <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">SERVICES</span>
                <svg 
                  className={`w-4 h-4 relative z-10 group-hover:text-black transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-black/90 border border-white/10 rounded-lg shadow-xl z-50"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <div className="py-2">
                    <Link 
                      to="/services" 
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      All Services
                    </Link>
                    <Link 
                      to="/web-development" 
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      Web Development
                    </Link>
                    <Link 
                      to="/app-development" 
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      App Development
                    </Link>
                    <Link 
                      to="/digital-marketing" 
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      Digital Marketing
                    </Link>
                    <Link 
                      to="/product-listing" 
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      Product Listing
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li className="group relative px-1">
              <Link to="/portfolio" className="relative z-10 px-3 py-1 transition-colors duration-300">
                <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Portfolio</span>
              </Link>
            </li>
            <li className="group relative px-1">
              <Link to="/contact" className="relative z-10 px-3 py-1 transition-colors duration-300">
                <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contact us</span>
              </Link>
            </li>
          </ul>
          <div className="ml-2 flex gap-1 md:gap-2 xl:ml-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 xl:px-5 xl:py-2 bg-white text-black font-mono rounded hover:bg-gray-200 transition-all tracking-widest uppercase text-xs md:text-sm xl:text-base shadow-md backdrop-blur duration-300"
                >
                  <User className="w-4 h-4" />
                  {user.displayName || user.email?.split('@')[0] || 'Profile'}
                </button>
                {profileDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-64 bg-black/90 border border-white/10 rounded-lg shadow-xl z-50"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-white font-medium">{user.displayName || 'User'}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/contact"
                        className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Support
                      </Link>
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <button
                          onClick={async () => { 
                            await signOut(auth); 
                            window.location.href = "/login"; 
                            setProfileDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-3 py-1 md:px-4 md:py-1.5 xl:px-5 xl:py-2 bg-white text-black font-mono rounded hover:bg-gray-200 transition-all tracking-widest uppercase text-xs md:text-sm xl:text-base shadow-md backdrop-blur duration-300">
                    log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-3 py-1 md:px-4 md:py-1.5 xl:px-5 xl:py-2 bg-black text-white font-mono rounded border border-white hover:bg-white hover:text-black transition-all tracking-widest uppercase text-xs md:text-sm xl:text-base shadow-md backdrop-blur duration-300">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>
      {/* Mobile Modal Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60">
          {/* Modal */}
          <div className="relative mt-8 w-[95vw] max-w-md rounded-2xl bg-black shadow-2xl flex flex-col items-stretch p-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="XPANIX Logo" className="h-12 w-12 object-contain" />
                
              </div>
              <button
                className="text-white p-2 rounded hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            {/* Modal Content */}
            <div className="flex flex-col gap-2 px-6 py-6">
              <Link to="/" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
              <a 
                href="#about" 
                onClick={(e) => {
                  setMenuOpen(false);
                  handleAboutClick(e);
                }}
                className="text-white text-lg py-1 hover:text-blue-400 transition cursor-pointer"
              >
                About
              </a>
              {/* Mobile Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="text-white text-lg py-1 hover:text-blue-400 transition flex items-center justify-between w-full"
                >
                  Services
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-1">
                    <Link 
                      to="/services" 
                      className="block text-white text-base py-1 hover:text-blue-400 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      All Services
                    </Link>
                    <Link 
                      to="/web-development" 
                      className="block text-white text-base py-1 hover:text-blue-400 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      Web Development
                    </Link>
                    <Link 
                      to="/app-development" 
                      className="block text-white text-base py-1 hover:text-blue-400 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      App Development
                    </Link>
                    <Link 
                      to="/digital-marketing" 
                      className="block text-white text-base py-1 hover:text-blue-400 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      Digital Marketing
                    </Link>
                    <Link 
                      to="/product-listing" 
                      className="block text-white text-base py-1 hover:text-blue-400 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      Product Listing
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/portfolio" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Portfolio</Link>
              <Link to="/contact" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Contact us</Link>
              <div className="py-2" />
              {user ? (
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <p className="text-white font-medium">{user.displayName || 'User'}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <Link to="/profile" className="block" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                  </Link>
                  <Link to="/contact" className="block" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-lg bg-gray-600 text-white font-semibold text-base shadow hover:bg-gray-700 transition flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" />
                      Support
                    </button>
                  </Link>
                  <button
                    className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold text-base shadow hover:bg-red-700 transition flex items-center justify-center gap-2"
                    onClick={async () => { await signOut(auth); window.location.href = "/login"; setMenuOpen(false); }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link to="/login" className="w-1/2" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-lg bg-white text-black font-semibold text-base shadow hover:bg-gray-200 transition">
                      log in
                    </button>
                  </Link>
                  <Link to="/signup" className="w-1/2" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-lg bg-black text-white font-semibold text-base border border-white shadow hover:bg-white hover:text-black transition">
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}