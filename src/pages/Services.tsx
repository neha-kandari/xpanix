import { useNavigate } from 'react-router-dom';
import ServiceSpline from '../components/ServiceSpline';

function ServiceCard({ title, description, path }: { title: string; description: string; path?: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-black/30 backdrop-blur-sm border border-gray-800 p-5 rounded-lg w-full md:w-[220px] hover:bg-white hover:text-black transition-all duration-300 group pointer-events-auto cursor-pointer"
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-80 group-hover:opacity-100">{description}</p>
    </div>
  );
}

export default function Services() {
  return (
    <main className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Hero Text */}
      <div className="text-center pt-20 md:pt-28 pb-4 md:pb-8 relative z-30 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">Scale Your Business at the</h1>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">Speed of Tech</h1>
        <p className="max-w-2xl mx-auto text-center text-sm md:text-base drop-shadow-md">
          From websites and mobile apps to digital marketing and Shopify solutions —
          we deliver IT services that launch your business forward at lightning speed.
        </p>
      </div>

      {/* Main content area with Spline and cards */}
      <div className="relative w-full">
        {/* Mobile view - Spline background with overlaid cards */}
        <div className="md:hidden relative">
          {/* Spline Animation - Top portion with better sizing */}
          <div className="absolute top-0 left-0 right-0 h-[220px] xs:h-[250px] sm:h-[300px] z-10 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full relative bg-transparent">
              <ServiceSpline />
            </div>
          </div>
          
          {/* Service Cards - Below Spline animation with proper spacing */}
          <div className="relative z-20 flex flex-col items-center gap-4 px-4 pb-10 pt-[160px] xs:pt-[180px] sm:pt-[220px] pointer-events-none">
            <ServiceCard 
              title="APP DEVELOPMENT" 
              description="We develop modern apps with tech that can help your business grow" 
              path="/app-development"
            />
            <ServiceCard 
              title="WEB DEVELOPMENT" 
              description="Responsive, high-performance websites tailored to your brand" 
              path="/web-development"
            />
            <ServiceCard 
              title="DIGITAL MARKETING" 
              description="Targeted Facebook & Instagram ads to grow your reach and revenue" 
              path="/digital-marketing"
            />
            <ServiceCard 
              title="SHOPIFY ECOMMERCE" 
              description="We build modern apps that can help your business grow" 
            />
            <ServiceCard 
              title="PRODUCT LISTING" 
              description="We develop modern apps, tech that can help your business grow" 
              path="/product-listing"
            />
            <ServiceCard 
              title="SEO" 
              description="Result-driven SEO strategies to boost your ranking and organic traffic" 
            />
          </div>
        </div>
        
        {/* Desktop view - positioned cards */}
        <div className="hidden md:block relative h-[600px]">
          {/* Spline Animation - Centered */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <ServiceSpline/>
          </div>
          
          {/* Service Cards positioned around the Spline animation */}
          <div className="absolute top-0 left-[15%] z-10 lg:left-[20%]">
            <ServiceCard 
              title="APP DEVELOPMENT" 
              description="We develop modern apps with tech that can help your business grow" 
              path="/app-development"
            />
          </div>
          
          <div className="absolute top-0 right-[15%] z-10 lg:right-[20%]">
            <ServiceCard 
              title="WEB DEVELOPMENT" 
              description="Responsive, high-performance websites tailored to your brand" 
              path="/web-development"
            />
          </div>
          
          <div className="absolute top-[40%] left-[5%] z-10 lg:left-[10%]">
            <ServiceCard 
              title="DIGITAL MARKETING" 
              description="Targeted Facebook & Instagram ads to grow your reach and revenue" 
              path="/digital-marketing"
            />
          </div>
          
          <div className="absolute top-[40%] right-[5%] z-10 lg:right-[10%]">
            <ServiceCard 
              title="SHOPIFY ECOMMERCE" 
              description="We build modern apps that can help your business grow" 
            />
          </div>
          
          <div className="absolute bottom-[5%] left-[15%] z-10 lg:left-[20%]">
            <ServiceCard 
              title="PRODUCT LISTING" 
              description="We develop modern apps, tech that can help your business grow" 
              path="/product-listing"
            />
          </div>
          
          <div className="absolute bottom-[5%] right-[15%] z-10 lg:right-[20%]">
            <ServiceCard 
              title="SEO" 
              description="Result-driven SEO strategies to boost your ranking and organic traffic" 
            />
          </div>
        </div>
      </div>
      
      {/* Spacing before footer */}
      <div className="h-20 md:h-32"></div>
    </main>
  );
} 
