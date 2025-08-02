import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGlassMorphismGrid from '../components/InteractiveGlassMorphismGrid';

export default function WebDevelopment() {
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
        <div className="absolute inset-0 "></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Web Development
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Modern Web
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We build responsive, high-performance websites that drive results and elevate your brand presence in the digital world.
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
          {/* Frontend Development */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Frontend Development</h3>
            <p className="text-gray-300 mb-6">
              Modern, responsive interfaces built with React, Vue, and Angular. Pixel-perfect designs that work seamlessly across all devices.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• React & Next.js Applications</li>
              <li>• Responsive Design</li>
              <li>• Progressive Web Apps</li>
              <li>• Performance Optimization</li>
            </ul>
          </div>

          {/* Backend Development */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Backend Development</h3>
            <p className="text-gray-300 mb-6">
              Robust server-side solutions with scalable architectures and secure APIs that power your web applications.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Node.js & Express</li>
              <li>• Python & Django</li>
              <li>• RESTful APIs</li>
              <li>• Database Design</li>
            </ul>
          </div>

          {/* E-commerce */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">E-commerce Solutions</h3>
            <p className="text-gray-300 mb-6">
              Complete online store solutions with secure payment processing and inventory management systems.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Custom E-commerce Platforms</li>
              <li>• Payment Integration</li>
              <li>• Inventory Management</li>
              <li>• Order Processing</li>
            </ul>
          </div>

          {/* CMS Development */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7V9a2 2 0 002 2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">CMS Development</h3>
            <p className="text-gray-300 mb-6">
              Custom content management systems that give you full control over your website content and updates.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• WordPress Development</li>
              <li>• Custom CMS</li>
              <li>• Content Management</li>
              <li>• SEO Optimization</li>
            </ul>
          </div>

          {/* Performance Optimization */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Performance Optimization</h3>
            <p className="text-gray-300 mb-6">
              Speed optimization and technical SEO to ensure your website loads fast and ranks well in search engines.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Speed Optimization</li>
              <li>• SEO Implementation</li>
              <li>• Core Web Vitals</li>
              <li>• Technical SEO</li>
            </ul>
          </div>

          {/* Quality Assurance */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
            <p className="text-gray-300 mb-6">
              Comprehensive testing and quality assurance to ensure your website meets the highest standards before delivery.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Cross-browser Testing</li>
              <li>• Performance Testing</li>
              <li>• Security Audits</li>
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
            Our Development
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a proven development methodology to deliver high-quality web solutions on time and within budget.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Discovery', desc: 'Understanding your requirements and project scope' },
            { number: '02', title: 'Planning', desc: 'Creating detailed project roadmap and architecture' },
            { number: '03', title: 'Development', desc: 'Building your website with modern technologies' },
            { number: '04', title: 'Launch', desc: 'Testing, deployment, and final delivery' }
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

      {/* CTA Section
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Website?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom web solution that drives results for your business.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Start Your Project
          </button>
        </motion.div>
      </div> */}
    </InteractiveGlassMorphismGrid>
  );
} 