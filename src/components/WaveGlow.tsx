"use client";

export default function WaveGlow() {
  return (
    <div className="absolute left-0 right-0 bottom-0 w-full h-[220px] pointer-events-none z-10">
      {/* Main wave */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Animated wave path */}
        <g filter="url(#glow)">
          <path>
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,160 Q360,80 720,160 T1440,160 V220 H0Z;
                M0,160 Q360,200 720,120 T1440,160 V220 H0Z;
                M0,160 Q360,80 720,160 T1440,160 V220 H0Z
              "
            />
          </path>
        </g>
        {/* Reflection */}
        <g>
          <path
            d="M0,160 Q360,80 720,160 T1440,160 V220 H0Z"
            fill="url(#wave-gradient)"
            opacity="0.5"
            filter="url(#glow)"
            transform="scale(1,-1) translate(0,-320)"
          />
        </g>
      </svg>
    </div>
  );
} 