import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Tilt from "react-parallax-tilt";
// import FadeInOnScroll from "@/components/FadeInOnScroll";
import { BarChart3, Clock, Zap } from "lucide-react";
import { Cover } from "./Cover";

const features = [
  {
    icon: <BarChart3 className="w-5 h-5" />, title: "100K+ Design & Dev Hours Logged", desc: "Building powerful and intuitive digital interfaces across devices."
  },
  {
    icon: <Clock className="w-5 h-5" />, title: "1000+ Hours Invested in Dev & Design", desc: "Our growing team is actively building innovative and custom digital solutions."
  },
  {
    icon: <Zap className="w-5 h-5" />, title: "100% Client Satisfaction", desc: "Every client we've worked with has seen real value — and we're just getting started."
  },
];

export default function WhatWeDoSection() {
  const timelineDuration = 2.5; // seconds
  const dotDelays = [0.13, 0.5, 0.87]; // as fraction of timelineDuration
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "-100px", // Adjust as needed
        threshold: 0.1, // Adjust as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full py-16 flex flex-col items-center justify-center">
      {/* About Us Pill */}
      <div className="mb-4">
        <span className="px-4 py-1.5 rounded-full bg-black/80 text-white text-sm font-medium shadow border border-white/10">
          About Us
        </span>
      </div>
      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-2 drop-shadow-lg leading-tight">
        We don&apos;t wait. We fix.
      </h2>
      <div className="text-lg md:text-2xl font-semibold text-white text-center mb-4">
        at <Cover className="inline-block align-middle">lightning speed.</Cover>
      </div>
      {/* Subheading */}
      <div className="text-gray-300 text-center max-w-2xl mx-auto mb-10 text-base md:text-lg">
        We empower businesses to thrive in the digital age through modern IT solutions —<br />
        from custom websites and mobile apps to engaging UI/UX design and optimized product listings.
      </div>

      {/* Timeline Features */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center mt-12 mb-20">
        {/* Mobile: Classic vertical timeline (left line, right cards) */}
        <div className="w-full flex md:hidden relative" style={{ minHeight: 300 }}>
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-white/60 to-white/10 z-0"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: timelineDuration, ease: [0.4, 0, 0.2, 1] }}
          />
          <div className="flex flex-col w-full pl-16">
            {features.map((feature, i) => (
              <div key={i} className="relative flex items-center mb-16 min-h-[120px]">
                {/* Dot */}
                <motion.div
                  className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{
                    delay: timelineDuration * dotDelays[i],
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                />
                {/* Animated connector line from dot to card */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/30 z-0"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '2rem' } : { width: 0 }}
                  transition={{
                    delay: timelineDuration * dotDelays[i],
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{ marginLeft: 'calc(1.5rem + 2px)' }} // 1.5rem for dot (w-6), 2px for border
                />
                {/* Card */}
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  transition={{
                    delay: timelineDuration * dotDelays[i] + 0.05,
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.15}
                    scale={1.04}
                    tiltMaxAngleX={12}
                    tiltMaxAngleY={12}
                    transitionSpeed={250}
                    className="w-full h-full"
                  >
                    <div className="bg-gradient-to-br from-black/80 to-gray-900/80 rounded-xl border border-white/10 shadow-lg p-6 w-full min-w-[220px] max-w-xs flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-2 text-white font-semibold text-base">
                        {feature.icon}
                        <span className="text-xs font-medium">{feature.title}</span>
                      </div>
                      <div className="text-gray-300 text-sm font-normal">
                        {feature.desc}
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: Horizontal timeline (md+) */}
        <div className="hidden md:block w-full">
          <div className="relative w-full flex flex-row items-center justify-center" style={{ minHeight: 80 }}>
            {/* Timeline line animation */}
            <motion.div
              ref={timelineRef}
              className="absolute top-1/2 left-0 right-0 h-0.5 w-full bg-gradient-to-r from-white/60 to-white/10"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: timelineDuration, ease: [0.4, 0, 0.2, 1] }}
              style={{ right: 0 }}
            />
            <div className="flex flex-row w-full justify-between items-center relative z-10">
              {features.map((_, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center w-1/3 relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{
                    delay: timelineDuration * dotDelays[i],
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  style={{ minHeight: 60 }}
                >
                  {/* Dot */}
                  <div className="w-6 h-6 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg z-10" />
                  {/* Vertical connector: always render, always visible */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-white/30 z-0" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-start gap-6 mt-0">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="w-[320px] flex flex-col items-center"
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                  delay: timelineDuration * dotDelays[i] + 0.05,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  scale={1.04}
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  transitionSpeed={250}
                  className="w-full h-full"
                >
                  <div className="bg-gradient-to-br from-black/80 to-gray-900/80 rounded-xl border border-white/10 shadow-lg p-6 w-full h-[180px] flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-2 text-white font-semibold text-base">
                      {feature.icon}
                      <span className="text-xs md:text-sm font-medium">{feature.title}</span>
                    </div>
                    <div className="text-gray-300 text-sm md:text-base font-normal">
                      {feature.desc}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="w-full flex flex-col items-center justify-center mt-24 px-2 sm:px-0">
        <div className="mb-4">
          <span className="px-4 py-1.5 rounded-full bg-black/80 text-white text-sm font-medium shadow border border-white/10">
            Our Values
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg leading-tight">
          The Values Behind Xtract
        </h2>
        <div className="text-gray-300 text-center max-w-2xl mx-auto mb-10 text-base md:text-lg">
          We bring passion and precision to every solution. From idea to execution,<br />
          we partner with clients to build digital products that last.
        </div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 gap-y-8">
          {/* Card 1 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-4 sm:p-6 border border-white/10 flex flex-col items-start transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <div className="mb-3 text-white font-bold text-lg sm:text-xl flex items-center gap-2">
              <span className="text-xl sm:text-2xl">💡</span>
              Driving Digital Innovation
            </div>
            <div className="text-gray-300 text-sm sm:text-base mb-2">We use the latest tech stacks and design tools to deliver modern, scalable, and high-performing solutions.</div>
          </div>
          {/* Card 2 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-4 sm:p-6 border border-white/10 flex flex-col items-start transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <div className="mb-3 text-white font-bold text-lg sm:text-xl flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🤝</span>
              Integrity in Everything We Build
            </div>
            <div className="text-gray-300 text-sm sm:text-base mb-2">Honesty, transparency, and quality are the foundation of our client relationships.</div>
          </div>
          {/* Card 3 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-4 sm:p-6 border border-white/10 flex flex-col items-start transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <div className="mb-3 text-white font-bold text-lg sm:text-xl flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🚀</span>
              Empowering Brands to Grow
            </div>
            <div className="text-gray-300 text-sm sm:text-base mb-2">We don&apos;t just build — we create long-term digital ecosystems that evolve with your business.</div>
          </div>
          {/* Card 4 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-4 sm:p-6 border border-white/10 flex flex-col items-start transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <div className="mb-3 text-white font-bold text-lg sm:text-xl flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🎯</span>
              Clients First, Always
            </div>
            <div className="text-gray-300 text-sm sm:text-base mb-2">We listen, adapt, and deliver — prioritizing your goals at every stage of the process.</div>
          </div>
        </div>
      </div>
    </section>
  );
} 