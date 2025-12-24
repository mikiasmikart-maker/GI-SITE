import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Technical Minimalist Preloader.
 * Positions brand identity and progress metrics on a single extended horizontal axis.
 * The bar width has been increased for a more dramatic, wide-screen editorial presence.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 2200; 
    const interval = 16; 
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFinished(true), 150);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
        >
          {/* Extended Minimalist Horizontal Layout */}
          <div className="w-full max-w-2xl px-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-8 md:gap-12"
            >
              {/* Brand String */}
              <div className="shrink-0 flex items-center gap-2">
                <span className="font-display font-bold text-[10px] uppercase tracking-[0.4em] text-paper">
                  Ginbar
                </span>
                <span className="font-display font-light text-[10px] uppercase tracking-[0.4em] text-accent">
                  Media
                </span>
              </div>

              {/* Precision Loading Bar - Flex-1 makes it as long as the container allows */}
              <div className="flex-1 h-[1px] bg-paper/10 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Numeric Progress */}
              <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 w-10 text-right tabular-nums">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>

          {/* System status tag */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-12 font-mono text-[7px] uppercase tracking-[0.8em] text-paper/10"
          >
            Initializing System Strategy
          </motion.div>

          {/* Grain overlay for depth */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-overlay"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};