'use client';

type EasingFunction = (t: number) => number;

interface LenisOptions {
  wrapper?: HTMLElement | Window;
  content?: HTMLElement;
  duration?: number;
  easing?: EasingFunction;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

export default function smoothScroll() {
  // Only run on client-side
  if (typeof window !== 'undefined') {
    // Dynamically import Lenis to avoid SSR issues
    import('lenis').then((LenisModule) => {
      const Lenis = LenisModule.default || LenisModule;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      } as LenisOptions);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup function
      return () => {
        lenis.destroy();
      };
    }).catch(error => {
      console.error('Failed to initialize smooth scrolling:', error);
    });
  }
}
