export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About Xpanix</h1>
        <p className="text-xl text-gray-300 mb-8">
          We are a team of passionate developers and designers committed to delivering 
          innovative digital solutions that help businesses thrive in the digital age.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To empower businesses through cutting-edge technology solutions and 
              exceptional digital experiences.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-300">
              To be the leading technology partner that transforms ideas into 
              successful digital products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 