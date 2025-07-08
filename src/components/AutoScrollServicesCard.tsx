"use client";

import { useEffect, useRef } from "react";
import { User, Calendar, Menu, Clock, DollarSign, Check } from "lucide-react";

const services = [
  { icon: <User size={20} />, title: "App Development" },
  { icon: <Calendar size={20} />, title: "UI/UX" },
  { icon: <Menu size={20} />, title: "Meta Ads" },
  { icon: <Clock size={20} />, title: "Product Listing" },
  { icon: <DollarSign size={20} />, title: "Web Development" },
];

export default function AutoScrollServicesCard() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    let scrollAmount = 0;

    function animate() {
      if (!scrollContainer) return;
      scrollAmount += 0.5; // speed
      if (scrollAmount >= scrollContainer.scrollHeight / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTop = scrollAmount;
      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate the list for seamless infinite scroll
  const items = [...services, ...services];

  return (
    <div className="relative w-full max-w-md mx-auto rounded-3xl bg-black/60 shadow-2xl p-6 flex items-center justify-center">
      <div className="w-full rounded-2xl bg-black/90 p-0" style={{ height: 340, overflow: "hidden" }}>
        {/* Top Bar */}
        <div className="flex items-center h-11 px-4 bg-black/70 rounded-t-2xl border border-white/10 border-b-0 mb-1 mt-2 ml-2 mr-2" style={{boxShadow: '0 1px 6px 0 #0008', fontWeight: 400}}>
          <span className="text-gray-300 text-base font-normal">Services We offer</span>
        </div>
        <div
          ref={scrollRef}
          className="flex flex-col gap-0 px-2 pb-2"
          style={{
            height: 288,
            overflow: "hidden",
            scrollBehavior: "auto",
          }}
        >
          {items.map((service, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-white/10 last:border-b-0"
              style={{ minHeight: 56 }}
            >
              {/* Icon */}
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/60 shadow-inner border border-white/10 mr-2">
                  {service.icon}
                </span>
                <span className="text-white font-light text-base tracking-wide">
                  {service.title}
                </span>
              </div>
              {/* Checkmark */}
              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-black/80 border border-white/10 shadow-[0_0_6px_0_rgba(128,90,213,0.25)]">
                <Check size={16} className="text-violet-300" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 