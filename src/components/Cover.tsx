"use client";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/libs/utils";
import { SparklesCore } from "@/components/ui/sparkles";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  // Direct DOM manipulation for zoom effect
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      
      // Force the zoom effect with direct DOM manipulation
      if (hovered) {
        element.style.setProperty('transform', 'scale(0.8)', 'important');
        element.style.setProperty('transition', 'transform 2.5s ease-out', 'important');
        element.style.setProperty('transform-origin', 'center center', 'important');
        console.log('Applied zoom: scale(0.8)');
      } else {
        element.style.setProperty('transform', 'scale(1)', 'important');
        element.style.setProperty('transition', 'transform 2.5s ease-out', 'important');
        element.style.setProperty('transform-origin', 'center center', 'important');
        console.log('Applied zoom: scale(1)');
      }
    }
  }, [hovered]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10); // Adjust the divisor to control the spacing
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1)),
      );
      setBeamPositions(positions);
    }
    
    // Ensure Cover component animations are always allowed
    window.__allowCoverAnimations = true;
  }, []);

  return (
    <div
      onMouseEnter={() => {
        console.log('Cover hover: true');
        setHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Cover hover: false');
        setHovered(false);
      }}
      ref={ref}
      className="relative hover:bg-neutral-900 group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 transition duration-200 rounded-sm cover-zoom-container"
      style={{
        transformOrigin: "center",
        willChange: "transform",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="h-full w-full overflow-hidden absolute inset-0"
          >
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              transition={{
                translateX: {
                  duration: 12,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="w-[200%] h-full flex"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={containerWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}
      <motion.span
        ref={textRef}
        key={String(hovered)}
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{
          scale: hovered ? 0.8 : 1, // Zoom out effect
          x: hovered ? [0, -8, 8, -8, 8, 0] : 0,
          y: hovered ? [0, 6, -6, 6, -6, 0] : 0,
        }}
        whileHover={{
          scale: 0.8, // Backup hover animation
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 2.5, // Much slower, more gradual
          ease: "easeOut",
          x: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.25, 0.46, 0.45, 0.94],
          },
          y: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.25, 0.46, 0.45, 0.94],
          },
          scale: {
            duration: 2.5, // Much slower zoom
            ease: "easeOut",
            type: "tween",
          },
          filter: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
        style={{
          transformOrigin: "center center",
          display: "inline-block",
          willChange: "transform",
          // Force the transform with higher specificity
          transform: hovered ? "scale(0.8) !important" : "scale(1) !important",
          transition: "transform 2.5s ease-out !important",
        }}
        className={cn(
          "dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200 cover-zoom-text",
          className,
        )}
        onMouseEnter={() => {
          console.log('Span hover: true');
        }}
        onMouseLeave={() => {
          console.log('Span hover: false');
        }}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px]" />
      <CircleIcon className="absolute -left-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" />
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.8 : (duration ?? 2.5),
            ease: hovered ? [0.25, 0.46, 0.45, 0.94] : "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (0.8 - 0.3) + 0.3 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : (delay ?? 1),
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

export const CircleIcon = ({
  className
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white`,
        className,
      )}
    ></div>
  );
};
