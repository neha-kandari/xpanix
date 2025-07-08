"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthUser();

  return (
    <header className="w-full fixed top-0 left-0 z-30 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-10">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-white rounded w-8 h-8 flex items-center justify-center">
            <span className="text-black text-lg font-bold font-mono">X</span>
          </div>
          <span className="text-lg font-bold text-white font-mono tracking-widest">Xpanix</span>
        </div>
        {/* Desktop Nav (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4 md:gap-6 xl:gap-10">
          <ul className="flex items-center gap-2 md:gap-4 xl:gap-8 text-white font-mono text-xs md:text-sm xl:text-base tracking-widest uppercase">
            {[
              { href: "/", label: "Home" },
              { href: "/#about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/contact", label: "Contact us" },
            ].map((link) => (
              <li key={link.href} className="group relative px-1">
                <Link href={link.href} className="relative z-10 px-3 py-1 transition-colors duration-300">
                  <span className="absolute inset-0 bg-white rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-2 flex gap-1 md:gap-2 xl:ml-4">
            {user ? (
              <button
                onClick={async () => { await signOut(auth); window.location.href = "/login"; }}
                className="px-3 py-1 md:px-4 md:py-1.5 xl:px-5 xl:py-2 bg-red-600 text-white font-mono rounded hover:bg-red-700 transition-all tracking-widest uppercase text-xs md:text-sm xl:text-base shadow-md backdrop-blur duration-300"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-3 py-1 md:px-4 md:py-1.5 xl:px-5 xl:py-2 bg-white text-black font-mono rounded hover:bg-gray-200 transition-all tracking-widest uppercase text-xs md:text-sm xl:text-base shadow-md backdrop-blur duration-300">
                    log in
                  </button>
                </Link>
                <Link href="/signup">
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
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60">
          {/* Modal */}
          <div className="relative mt-8 w-[95vw] max-w-md rounded-2xl bg-black shadow-2xl flex flex-col items-stretch p-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded w-8 h-8 flex items-center justify-center">
                  <span className="text-black text-lg font-bold font-mono">X</span>
                </div>
                <span className="text-base font-bold text-white font-mono tracking-widest">Xpanix</span>
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
              <Link href="/" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
              <a href="#about" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>About</a>
              <Link href="/services" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link href="/portfolio" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Portfolio</Link>
              <Link href="/contact" className="text-white text-lg py-1 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Contact us</Link>
              <div className="py-2" />
              <div className="flex gap-2 mt-2">
                {user ? (
                  <button
                    className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold text-base shadow hover:bg-red-700 transition"
                    onClick={async () => { await signOut(auth); window.location.href = "/login"; setMenuOpen(false); }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="w-1/2" onClick={() => setMenuOpen(false)}>
                      <button className="w-full py-3 rounded-lg bg-white text-black font-semibold text-base shadow hover:bg-gray-200 transition">
                        log in
                      </button>
                    </Link>
                    <Link href="/signup" className="w-1/2" onClick={() => setMenuOpen(false)}>
                      <button className="w-full py-3 rounded-lg bg-black text-white font-semibold text-base border border-white shadow hover:bg-white hover:text-black transition">
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
