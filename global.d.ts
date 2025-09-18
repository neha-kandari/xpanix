import React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "spline-viewer": {
      url?: string;
      "loading-anim"?: boolean;
      "loading-anim-type"?: string;
      "pixel-ratio"?: string;
      "render-on-demand"?: string;
      "quality"?: string;
      "auto-play"?: string;
      "interaction-policy"?: string;
      "preload"?: string;
      style?: React.CSSProperties;
    };
  }
}

export {}; 