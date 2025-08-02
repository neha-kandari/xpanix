import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGlassMorphismGrid from '../components/InteractiveGlassMorphismGrid';

export default function DigitalMarketing() {
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
              Digital Marketing
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Digital Growth
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Strategies</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We create data-driven digital marketing campaigns that increase brand visibility, drive traffic, and generate qualified leads for your business.
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
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* SEO */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-black rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">SEO</h3>
            <p className="text-gray-300 mb-6">
              Boost your website's visibility and rank higher in search engines with our comprehensive SEO strategies.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Technical SEO Audit</li>
              <li>• Keyword Research & Optimization</li>
              <li>• On-Page & Off-Page SEO</li>
              <li>• Local SEO</li>
            </ul>
          </div>

          {/* Meta Ads */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-black rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M7 8h10m-10 4h10m-10 4h7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Meta Ads</h3>
            <p className="text-gray-300 mb-6">
              Drive targeted traffic and conversions with strategic Facebook and Instagram advertising campaigns.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Facebook Ads Management</li>
              <li>• Instagram Story & Feed Ads</li>
              <li>• Remarketing Campaigns</li>
              <li>• Conversion Optimization</li>
            </ul>
          </div>

          {/* Precise Targeting */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-black rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Precise Targeting</h3>
            <p className="text-gray-300 mb-6">
              Reach your ideal customers with laser-focused targeting strategies that maximize ROI and conversions.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Audience Research & Analysis</li>
              <li>• Custom Audience Creation</li>
              <li>• Behavioral Targeting</li>
              <li>• Lookalike Audiences</li>
            </ul>
          </div>

          {/* Social Media Handling */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-white p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-black rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Social Media Handling</h3>
            <p className="text-gray-300 mb-6">
              Complete social media management to build your brand presence and engage with your audience effectively.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Content Creation & Planning</li>
              <li>• Community Management</li>
              <li>• Social Media Strategy</li>
              <li>• Engagement & Growth</li>
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
            Our Marketing
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a strategic approach to digital marketing that delivers measurable results and drives business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Research', desc: 'Analyzing your market, competitors, and target audience' },
            { number: '02', title: 'Strategy', desc: 'Developing comprehensive marketing strategies and campaigns' },
            { number: '03', title: 'Execution', desc: 'Implementing campaigns across multiple channels' },
            { number: '04', title: 'Optimization', desc: 'Monitoring performance and final campaign delivery' }
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
            Ready to Grow Your
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your marketing goals and create a digital strategy that drives real results for your business.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all"
          >
            Start Your Marketing Campaign
          </button>
        </motion.div>
      </div> */}
    </InteractiveGlassMorphismGrid>
  );
} 