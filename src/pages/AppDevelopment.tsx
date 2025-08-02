import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGlassMorphismGrid from '../components/InteractiveGlassMorphismGrid';

export default function AppDevelopment() {
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
              App Development
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Mobile App
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We develop innovative mobile applications that engage users and drive business growth across iOS and Android platforms.
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
          {/* iOS Development */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">iOS Development</h3>
            <p className="text-gray-300 mb-6">
              Native iOS applications built with Swift and SwiftUI, optimized for performance and user experience.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Swift & SwiftUI</li>
              <li>• iOS 14+ Support</li>
              <li>• App Store Optimization</li>
              <li>• Performance Tuning</li>
            </ul>
          </div>

          {/* Android Development */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Android Development</h3>
            <p className="text-gray-300 mb-6">
              Native Android applications using Kotlin and Jetpack Compose, designed for modern Android devices.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Kotlin & Jetpack Compose</li>
              <li>• Material Design 3</li>
              <li>• Google Play Optimization</li>
              <li>• Multi-device Support</li>
            </ul>
          </div>

          {/* Cross-Platform */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Cross-Platform</h3>
            <p className="text-gray-300 mb-6">
              React Native and Flutter applications that work seamlessly across iOS and Android with native performance.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• React Native</li>
              <li>• Flutter Development</li>
              <li>• Single Codebase</li>
              <li>• Native Performance</li>
            </ul>
          </div>

          {/* UI/UX Design */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
            <p className="text-gray-300 mb-6">
              Intuitive and engaging user interfaces designed to provide exceptional user experiences.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• User Research</li>
              <li>• Wireframing & Prototyping</li>
              <li>• Visual Design</li>
              <li>• Usability Testing</li>
            </ul>
          </div>

          {/* Backend Integration */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Backend Integration</h3>
            <p className="text-gray-300 mb-6">
              Robust backend systems and APIs that power your mobile applications with scalable architecture.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• RESTful APIs</li>
              <li>• Real-time Features</li>
              <li>• Cloud Integration</li>
              <li>• Data Synchronization</li>
            </ul>
          </div>

          {/* App Testing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">App Testing</h3>
            <p className="text-gray-300 mb-6">
              Comprehensive testing and quality assurance to ensure your app meets the highest standards before delivery.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Functional Testing</li>
              <li>• Performance Testing</li>
              <li>• User Experience Testing</li>
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
            Our App Development
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a comprehensive development methodology to create high-quality mobile applications that users love.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Discovery', desc: 'Understanding your app requirements and target audience' },
            { number: '02', title: 'Design', desc: 'Creating wireframes, prototypes, and visual designs' },
            { number: '03', title: 'Development', desc: 'Building your app with modern technologies and best practices' },
            { number: '04', title: 'Launch', desc: 'Testing, app store submission, and final delivery' }
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
            Ready to Build Your
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent"> Mobile App?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your app idea and create a mobile solution that engages users and drives business growth.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
          >
            Start Your App Project
          </button>
        </motion.div>
      </div> */}
    </InteractiveGlassMorphismGrid>
  );
} 