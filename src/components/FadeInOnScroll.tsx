"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let observer: IntersectionObserver;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay } });
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
    } else {
      // Fallback for environments without IntersectionObserver
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay } });
    }
    return () => observer && observer.disconnect();
  }, [controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
} 