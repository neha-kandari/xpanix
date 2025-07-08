"use client";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              <span className="text-blue-400">Xpanix</span>
            </h2>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Empowering businesses through innovative digital solutions and cutting-edge technology services.
          </p>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition duration-300" 
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition duration-300" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative">
            Quick Links
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></div>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white transition duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-300 hover:text-white transition duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-gray-300 hover:text-white transition duration-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative">
            Our Services
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></div>
          </h3>
          <ul className="space-y-3">
            <li className="text-gray-300">Web Development</li>
            <li className="text-gray-300">App Development</li>
            <li className="text-gray-300">Digital Marketing</li>
            <li className="text-gray-300">Product Listing</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative">
            Contact Info
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></div>
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300 leading-relaxed">
                2, Eadgah Road Model Town Panipat<br />
                Haryana
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <a 
                href="mailto:we.siteweaverz@gmail.com" 
                className="text-gray-300 hover:text-white transition duration-300"
              >
                info.xpanix@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <a 
                href="tel:+918930005190" 
                className="text-gray-300 hover:text-white transition duration-300"
              >
                +91 8930005190
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 px-6">
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Xpanix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}