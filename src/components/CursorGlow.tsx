"use client";
import React, { useEffect, useRef } from "react";

export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  // Store the current and target positions
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      target.current.x = e.clientX - 15; // center outer circle (30px)
      target.current.y = e.clientY - 15;
    };

    const animate = () => {
      // Lerp towards the target position
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (outerRef.current) {
        outerRef.current.style.left = `${pos.current.x}px`;
        outerRef.current.style.top = `${pos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x + 11}px`;
        dotRef.current.style.top = `${pos.current.y + 11}px`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="cursor-glow">
      <div
        ref={outerRef}
        className="pointer-events-none fixed z-[9999] left-0 top-0 w-[30px] h-[30px] rounded-full border border-white"
        style={{ transition: "none" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] left-0 top-0 w-[8px] h-[8px] rounded-full bg-white"
        style={{ transition: "none" }}
      />
    </div>
  );
} 