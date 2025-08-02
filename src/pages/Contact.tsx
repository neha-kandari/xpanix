import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase tracking-wider">
              CONTACT US
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-white">
              Skip the Middlemen – Talk Directly to the Developer!
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              We believe in clear, fast, and honest communication. That's why when you reach out to us, you won't be passed through layers of sales person and managers.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              {/* Get in touch heading */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Get in touch
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Have questions or ready to transform your business with AI automation?
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <a 
                  href="mailto:info.xpanix@gmail.com?subject=Contact%20Inquiry&body=Hello,%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
                  className="block bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email us</h3>
                      <p className="text-gray-400">info.xpanix@gmail.com</p>
                    </div>
                    <div className="ml-auto">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Call Card */}
                <a 
                  href="https://wa.me/+918930005190?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Call us</h3>
                      <p className="text-gray-400">+91 8930005190</p>
                    </div>
                    <div className="ml-auto">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Location Card */}
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Our locations</h3>
                    </div>
                  </div>
                  
                  {/* Delhi Location */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=D-91+West+Patel+Nagar+Patel+Nagar+New+Delhi+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-white">Delhi Office</h4>
                        <p className="text-gray-400 text-sm">D-91 West Patel Nagar, Patel Nagar, New Delhi</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>

                  {/* Panipat Location */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=2+Eadgah+Road+Model+Town+Panipat+Haryana+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-white">Panipat Office</h4>
                        <p className="text-gray-400 text-sm">2, Eadgah Road Model Town Panipat Haryana</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:pl-8 pt-8 lg:pt-12">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 