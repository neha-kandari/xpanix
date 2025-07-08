"use client";

import { motion } from "framer-motion";
import { useMemo } from 'react';

export default function FloatingElements() {
  const twentyArray = useMemo(() => [...Array(20)], []);
  const fiveArray = useMemo(() => [...Array(5)], []);
  const eightArray = useMemo(() => [...Array(8)], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating dots */}
      {twentyArray.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating lines */}
      {fiveArray.map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating squares */}
      {eightArray.map((_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute w-4 h-4 border border-blue-300 opacity-20"
          style={{
            left: `${70 + i * 3}%`,
            top: `${30 + i * 8}%`,
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
} 