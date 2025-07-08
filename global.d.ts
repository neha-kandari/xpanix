import React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "spline-viewer": {
      url?: string;
      "loading-anim"?: boolean;
      style?: React.CSSProperties;
    };
  }
}

export {}; 