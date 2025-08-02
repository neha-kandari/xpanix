import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PerformanceInit from './components/PerformanceInit'
import ScrollToTop from './components/ScrollToTop'
import ContactUsPopup from './components/ContactUsPopup'
import useContactPopup from './hooks/useContactPopup'

// Pages
import Home from './pages/Home'
import Services from './pages/Services'
import WebDevelopment from './pages/WebDevelopment'
import AppDevelopment from './pages/AppDevelopment'
import DigitalMarketing from './pages/DigitalMarketing'
import ProductListing from './pages/ProductListing'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Contact popup hook - shows after 3 seconds
  const { isPopupOpen, closePopup } = useContactPopup(3);

  return (
    <div className="antialiased bg-black min-h-screen">
      <PerformanceInit />
      <ScrollToTop />
      {!isAuthPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/app-development" element={<AppDevelopment />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
      
      {/* Contact Us Popup */}
      <ContactUsPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  )
}

export default App 
