"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Success Rate" },
  { value: 4, suffix: "+", label: "Years Experience" },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    function update() {
      start += step;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(start);
      ref.current = setTimeout(update, 16);
    }
    update();
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [target, duration]);

  return count;
}

export default function StatsCounter() {
  const statsMemo = useMemo(() => stats, []);
  // Only create as many counters as there are stats
  const counts = statsMemo.map((stat, i) => useCountUp(stat.value, 1200 + i * 200));
  return (
    <div className="relative w-full py-2 bg-transparent overflow-hidden">
      <div className="relative z-10 flex flex-row items-center justify-between gap-2 sm:gap-6 md:gap-10 px-1 sm:px-2 md:px-4">
        {statsMemo.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center flex-1 min-w-[60px]">
            <span className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-100 mb-1">
              {counts[i]}
              {stat.suffix}
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
