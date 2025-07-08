import ServiceDetailsSection from '../../components/ServiceDetailsSection';
import ServiceSpline from '@/components/ServiceSpline';

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Hero Text */}
      <div className="text-center pt-20 md:pt-28 pb-4 md:pb-8 relative z-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Scale Your Business at the</h1>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Speed of Tech</h1>
        <p className="max-w-2xl mx-auto text-center text-sm md:text-base">
          From websites and mobile apps to digital marketing and Shopify solutions —
          we deliver IT services that launch your business forward at lightning speed.
        </p>
      </div>

      {/* Main content area with Spline and cards */}
      <div className="relative w-full">
        {/* Mobile view - stacked cards */}
        <div className="md:hidden flex flex-col items-center gap-4 px-4 pb-10 z-10 relative">
          <div className="h-[300px] w-full relative mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
            <ServiceSpline />
            </div>
          </div>
          
          <ServiceCard 
            title="APP DEVELOPMENT" 
            description="We develop modern apps with tech that can help your business grow" 
          />
          <ServiceCard 
            title="WEB DEVELOPMETN" 
            description="Responsive, high-performance websites tailored to your brand" 
          />
          <ServiceCard 
            title="DIGITAL MARKETING" 
            description="Targeted Facebook & Instagram ads to grow your reach and revenue" 
          />
          <ServiceCard 
            title="SHOPIFY ECOMMERCE" 
            description="We build modern apps that can help your business grow" 
          />
          <ServiceCard 
            title="PRODUCT LISTING" 
            description="We develop modern apps, tech that can help your business grow" 
          />
          <ServiceCard 
            title="SEO" 
            description="Result-driven SEO strategies to boost your ranking and organic traffic" 
          />
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
            />
          </div>
          
          <div className="absolute top-0 right-[15%] z-10 lg:right-[20%]">
            <ServiceCard 
              title="WEB DEVELOPMETN" 
              description="Responsive, high-performance websites tailored to your brand" 
            />
          </div>
          
          <div className="absolute top-[40%] left-[5%] z-10 lg:left-[10%]">
            <ServiceCard 
              title="DIGITAL MARKETING" 
              description="Targeted Facebook & Instagram ads to grow your reach and revenue" 
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
      {/* Service Details Section */}
      <ServiceDetailsSection />
    </main>
  );
} 

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-5 rounded-lg w-full md:w-[220px] hover:bg-white hover:text-black transition-all duration-300 group">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-80 group-hover:opacity-100">{description}</p>
    </div>
  );
}

export const metadata = {
  title: 'Services |  Expanix',
  description: 'Discover the range of services offered by  Expanix, including web development, design, and more.',
};