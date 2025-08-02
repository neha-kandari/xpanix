import { HeroParallax } from '../components/HeroParallax';
import AllProjectsSection from '../components/AllProjectsSection';

const imageFiles = [
  "/Desktop - 1.png",
  "/Desktop - 2.png",
  "/Desktop - 3.png",
  "/Desktop - 4.png",
  "/Desktop - 5.png",
  "/Desktop - 6.png",
];

// Example titles and links for demonstration
const titles = [
  "E-Commerce Platform",
  "Mobile Banking App",
  "Healthcare Dashboard",
  "Real Estate Platform",
  "Education Management System",
  "Restaurant Ordering System",
  "Travel Booking Platform",
  "Fitness Tracking App",
  "Social Media Dashboard",
  "Inventory Management System",
  "CRM Software",
  "Project Management Tool",
  "Analytics Dashboard",
  "Content Management System",
  "AI-Powered Chatbot",
];

// Generate portfolio items, repeating images
const portfolioItems = titles.map((title, idx) => ({
  title,
  link: `/portfolio/${title.toLowerCase().replace(/ /g, "-")}`,
  thumbnail: imageFiles[idx % imageFiles.length],
}));

export default function Portfolio() {
  return (
    <div className="bg-black">
      <HeroParallax products={portfolioItems} />
      <AllProjectsSection />
    </div>
  );
} 