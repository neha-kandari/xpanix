"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCounter from "@/components/StatsCounter";
import WaveGlow from "@/components/WaveGlow";

const words = ["stand out", "lead", "grow", "scale", "succeed"];

function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold">
      {words[index].substring(0, subIndex)}
    </span>
  );
}

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.remove();
          clearInterval(interval);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    router.push('/contact');
  };

  const handleSeeProjects = () => {
    router.push('/portfolio');
  };

  return (
    <section className="relative w-full min-h-[400px] min-h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Overlayed Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-2 sm:px-4 pointer-events-none">
        {/* Pill Label */}
        <div className="mb-4 sm:mb-6">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 text-white text-xs sm:text-sm font-medium border border-white/10 shadow-lg backdrop-blur-md">
            Crafting Unique Brand Identities
          </span>
        </div>
        {/* Main Heading */}
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 sm:mb-6 drop-shadow-lg leading-tight whitespace-nowrap">
          Empowering Brands to <TypingEffect /> 
        </h1>
        {/* Subheading */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 text-center max-w-xs sm:max-w-md md:max-w-xl mb-6 sm:mb-8">
        Smart IT solutions that power your growth — from web and app development to design and digital ads.
        </p>
        {/* Buttons */}
        <div className="flex flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center justify-center mb-10">
          <button 
            onClick={handleGetStarted}
            className="glow-btn px-5 py-2 rounded-lg bg-black/80 text-white font-semibold border border-white/10 shadow pointer-events-auto text-base relative overflow-hidden hover:bg-black/90 transition-colors"
          >
            Get Started Now
          </button>
          <button 
            onClick={handleSeeProjects}
            className="glow-btn px-5 py-2 rounded-lg bg-black/80 text-white font-semibold border border-white/10 shadow pointer-events-auto text-base relative overflow-hidden hover:bg-black/90 transition-colors"
          >
            See Projects
          </button>
        </div>
        {/* Stats Counter */}
        <div className="w-full max-w-3xl mx-auto">
          <StatsCounter />
        </div>
      </div>
      {/* Spline or children go here */}
      {children && (
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center px-2 sm:px-4">
          <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
            {/* Responsive Spline container */}
            <div className="w-full h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      )}
      <WaveGlow />
    </section>
  );
}
