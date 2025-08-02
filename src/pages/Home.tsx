import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import WhatWeDoSection from "../components/WhatWeDoSection";
import BenefitsSection from '../components/BenefitsSection';
import ThreeJSHero from '../components/ThreeJSHero';
import LazyWrapper from '../components/LazyWrapper';

export default function Home() {
  return (
    <>
      <HeroSection>
        <ThreeJSHero />
      </HeroSection>
      <LazyWrapper rootMargin="200px" className="min-h-screen">
        <WhatWeDoSection />
      </LazyWrapper>
      <LazyWrapper rootMargin="200px" className="min-h-screen">
        <BenefitsSection/>
      </LazyWrapper>
    </>
  );
} 