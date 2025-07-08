"use client";
import React, { useMemo, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Ensure proper initialization on client-side navigation
  useEffect(() => {
    // Reset scroll position to top on component mount
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Force a reflow to ensure scroll is properly reset
    void document.body.offsetHeight;
    
    // Small delay to ensure DOM is ready and scroll is reset
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);

    // Also listen for route changes in case of client-side navigation
    const handleRouteChange = () => {
      setIsReady(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setIsReady(true), 150);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Only initialize transforms when component is ready
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], isReady ? [0, 1000] : [0, 0]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], isReady ? [0, -1000] : [0, 0]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isReady ? [15, 0] : [0, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isReady ? [0.2, 1] : [1, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isReady ? [20, 0] : [0, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isReady ? [-700, 500] : [0, 0]),
    springConfig,
  );

  const firstRowMemo = useMemo(() => firstRow, [firstRow]);
  const secondRowMemo = useMemo(() => secondRow, [secondRow]);
  const thirdRowMemo = useMemo(() => thirdRow, [thirdRow]);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#181f2a] border border-[#25304a] rounded-full text-white text-lg font-semibold mb-8 shadow-lg">
        <span className="text-amber-400 text-xl">★</span>
        Partnership Excellence Since 2020
      </div>
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-white">
        Our Portfolio
      </h1>
      {/* Subtitle */}
      <p className="text-2xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-normal">
        Four years of collaborative excellence, delivering innovative digital solutions as <span className="font-bold text-white">trusted partners</span>
      </p>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1">100+</div>
          <div className="text-lg text-gray-300">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1">99%</div>
          <div className="text-lg text-gray-300">Partnership Success</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1">50+</div>
          <div className="text-lg text-gray-300">Trusted Clients</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1">4+</div>
          <div className="text-lg text-gray-300">Years Partnership</div>
        </div>
      </div>
      {/* CTA Button */}
      <a
        href="#all-projects"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#3b4861] hover:bg-[#4a5a7a] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 group shadow-lg"
      >
        Explore Our Work
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </a>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
}; 
