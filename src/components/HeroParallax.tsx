import React, { useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// Helper function to scroll to all projects section
const scrollToAllProjects = () => {
  const element = document.getElementById('all-projects');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 200]),
    springConfig,
  );

  const firstRowMemo = useMemo(() => firstRow, [firstRow]);
  const secondRowMemo = useMemo(() => secondRow, [secondRow]);
  const thirdRowMemo = useMemo(() => thirdRow, [thirdRow]);

  return (
    <div
      ref={ref}
      className="h-[100vh] md:h-[200vh] pt-20 pb-0 md:pt-24 md:pb-0 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Parallax Images - Behind everything */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="absolute inset-0 z-0 mt-8 md:mt-12"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-4 md:mb-16">
          {firstRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-4 md:mb-16 space-x-8 md:space-x-20">
          {secondRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
          {thirdRowMemo.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
              </motion.div>
      
      {/* Header Text - Overlaying the parallax */}
      <div className="relative z-40">
        <Header />
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-4 md:px-10 py-3 md:py-6 relative">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 bg-[#181f2a] border border-[#25304a] rounded-full text-white text-sm md:text-lg font-semibold mb-3 md:mb-4 shadow-lg">
        <span className="text-amber-400 text-lg md:text-xl">★</span>
        Partnership Excellence Since 2020
      </div>
      {/* Main Title */}
      <h1 className="text-3xl md:text-7xl font-extrabold mb-3 md:mb-4 tracking-tight text-white drop-shadow-lg">
        Our Portfolio
      </h1>
      {/* Subtitle */}
      <p className="text-sm md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed font-normal drop-shadow-md">
        Four years of collaborative excellence, delivering innovative digital solutions as <span className="font-bold text-white">trusted partners</span>
      </p>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-6">
        <div className="text-center">
          <div className="text-2xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1 drop-shadow-md">99%</div>
          <div className="text-xs md:text-lg text-gray-300 drop-shadow-sm">Partnership Success</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1 drop-shadow-md">50+</div>
          <div className="text-xs md:text-lg text-gray-300 drop-shadow-sm">Trusted Clients</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-5xl font-extrabold text-[#a6b3c9] mb-1 drop-shadow-md">4+</div>
          <div className="text-xs md:text-lg text-gray-300 drop-shadow-sm">Years Partnership</div>
        </div>
      </div>
      {/* CTA Button */}
      <button
        onClick={scrollToAllProjects}
        className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#3b4861] hover:bg-[#4a5a7a] text-white rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 group shadow-xl border border-gray-600/50"
      >
                Explore Our Work
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
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
      className="group/product h-48 md:h-96 w-[18rem] md:w-[30rem] relative flex-shrink-0"
    >
      <div
        onClick={scrollToAllProjects}
        className="block group-hover/product:shadow-2xl cursor-pointer"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
}; 