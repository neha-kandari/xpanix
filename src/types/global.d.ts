// Global type definitions for window extensions and browser APIs

declare global {
  interface Window {
    __allowCoverAnimations?: boolean;
    __emergencyOptimizations?: boolean;
    __allowHeroSpline?: boolean;
    __performanceOptimized?: boolean;
    __optimizedScheduler?: boolean;
    scheduler?: {
      postTask: (callback: () => void, options?: { priority: string }) => void;
    };
  }

  interface Navigator {
    deviceMemory?: number;
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  }

  interface IntersectionObserverInit {
    trackVisibility?: boolean;
    delay?: number;
  }
}

export {}; 