"use client";
import { useEffect } from 'react';
import { HeroParallax } from './HeroParallax';
import AllProjectsSection from './AllProjectsSection';

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

export default function PortfolioClient() {
  useEffect(() => {
    // Ensure animations are enabled for portfolio page
    const body = document.body;
    
    // Remove emergency performance class if present to allow animations
    if (body.classList.contains('emergency-performance')) {
      body.classList.remove('emergency-performance');
      body.setAttribute('data-portfolio-page', 'true');
    }
    
    // Clean up on unmount
    return () => {
      body.removeAttribute('data-portfolio-page');
    };
  }, []);

  return (
    <div className="bg-black">
      <HeroParallax products={portfolioItems} />
      <AllProjectsSection />
    </div>
  );
} 