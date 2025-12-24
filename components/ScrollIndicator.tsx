import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * An ultra-minimal vertical scroll progress indicator.
 * Displays only a single hairline that grows as the user scrolls.
 * Color palette: Mid-tone gray with 80% opacity.
 */
export const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smoothing for that premium editorial feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-32 right-6 md:right-12 z-[55] flex flex-col items-center pointer-events-none">
      {/* The Hairline Track */}
      <div className="relative w-[1px] h-48 bg-ink/10 dark:bg-white/5 overflow-hidden">
        {/* The Growing Line - Set to mid-tone gray with 80% opacity */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gray-500/80 origin-top"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Subtle Aesthetic Detail: Bottom Dot */}
      <div className="mt-2 w-[3px] h-[3px] bg-gray-500/80 rounded-full"></div>

      {/* Decorative details - floating hairline segments */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-gray-500/40"></div>
    </div>
  );
};