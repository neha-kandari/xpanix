import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGlassMorphismGrid from '../components/InteractiveGlassMorphismGrid';

export default function ProductListing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  return (
    <InteractiveGlassMorphismGrid className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Product Listing
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              E-commerce
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We help businesses create compelling product listings that drive sales and enhance customer experience across all major e-commerce platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-white text-black px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors max-w-xs sm:max-w-none mx-auto sm:mx-0"
              >
                Get Started Now
              </button>
              <button
                onClick={handleBackToServices}
                className="border border-white text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors max-w-xs sm:max-w-none mx-auto sm:mx-0"
              >
                Back to Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Amazon Listing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Amazon Product Listing</h3>
            <p className="text-gray-300 mb-6">
              Optimized Amazon product listings with compelling titles, descriptions, and images to increase visibility and sales.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Keyword Research & Optimization</li>
              <li>• Compelling Product Titles</li>
              <li>• Enhanced Product Descriptions</li>
              <li>• Professional Product Images</li>
            </ul>
          </div>

          {/* Shopify Listing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Shopify Product Setup</h3>
            <p className="text-gray-300 mb-6">
              Complete Shopify store setup with optimized product listings, categories, and inventory management.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Store Setup & Configuration</li>
              <li>• Product Catalog Management</li>
              <li>• SEO-Optimized Listings</li>
              <li>• Inventory Tracking</li>
            </ul>
          </div>

          {/* Flipkart Listing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Flipkart Product Listing</h3>
            <p className="text-gray-300 mb-6">
              Optimized Flipkart product listings with compelling titles, descriptions, and competitive pricing for the Indian market.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Indian Market Optimization</li>
              <li>• Competitive Pricing Strategy</li>
              <li>• Localized Product Descriptions</li>
              <li>• Flipkart SEO Optimization</li>
            </ul>
          </div>

          {/* Product Description Writing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Product Description Writing</h3>
            <p className="text-gray-300 mb-6">
              Compelling, SEO-optimized product descriptions that highlight features, benefits, and drive customer conversions.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• SEO-Optimized Content</li>
              <li>• Feature & Benefit Focus</li>
              <li>• Conversion-Driven Copy</li>
              <li>• Brand Voice Consistency</li>
            </ul>
          </div>

          {/* Product Photography */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Product Photography</h3>
            <p className="text-gray-300 mb-6">
              Professional product photography services to showcase your products in the best light and increase sales.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Professional Product Shots</li>
              <li>• Lifestyle Photography</li>
              <li>• Image Editing & Optimization</li>
              <li>• Multi-Angle Shots</li>
            </ul>
          </div>

          {/* Listing Optimization */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Listing Optimization</h3>
            <p className="text-gray-300 mb-6">
              Optimize your product listings for maximum visibility and sales across all major e-commerce platforms.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• SEO Optimization</li>
              <li>• Conversion Rate Optimization</li>
              <li>• A/B Testing</li>
              <li>• Final Delivery</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Product Listing
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a systematic approach to create compelling product listings that drive sales and enhance customer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Research', desc: 'Analyzing market trends, competitors, and target audience' },
            { number: '02', title: 'Optimization', desc: 'Creating SEO-optimized titles, descriptions, and keywords' },
            { number: '03', title: 'Visual Design', desc: 'Professional product photography and visual presentation' },
            { number: '04', title: 'Launch', desc: 'Publishing listings and final delivery' }
          ].map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Boost Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Sales?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your product listing needs and create compelling listings that drive sales across all major e-commerce platforms.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all"
          >
            Start Your Product Listing
          </button>
        </motion.div>
      </div> */}
    </InteractiveGlassMorphismGrid>
  );
} 