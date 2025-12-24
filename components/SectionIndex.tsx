
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

export const SectionIndex: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  // Derive section IDs from NAV_ITEMS to ensure synchronization with the menu
  const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries.reduce((max, entry) => {
        return entry.intersectionRatio > max.intersectionRatio ? entry : max;
      }, entries[0]);

      if (visibleSection && visibleSection.isIntersecting) {
         const index = sections.indexOf(visibleSection.target.id);
         if (index !== -1) {
           setCurrentIndex(index + 1);
         }
      }
    }, {
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
      rootMargin: "-20% 0px -40% 0px"
    });

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleJumpToSection = (index: number) => {
    const targetId = sections[index - 1];
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-8 right-6 md:right-12 z-50 pointer-events-auto mix-blend-difference text-paper select-none">
        <div className="flex flex-col items-end font-mono">
             <div className="flex flex-col items-end gap-1">
                <div className="h-8 overflow-hidden relative w-12 flex justify-end">
                    <AnimatePresence mode="wait">
                        <motion.button 
                            key={currentIndex}
                            onClick={() => handleJumpToSection(currentIndex)}
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{ 
                                duration: 0.7, 
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="text-3xl font-bold leading-none block hover:text-accent transition-colors"
                        >
                            {String(currentIndex).padStart(2, '0')}
                        </motion.button>
                    </AnimatePresence>
                </div>
                
                <div className="w-full h-[3px] bg-current opacity-100"></div>
                
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => handleJumpToSection(currentIndex)}>
                    <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold group-hover:opacity-100 transition-opacity">Index</span>
                    <span className="text-sm leading-none font-bold">
                        {String(sections.length).padStart(2, '0')}
                    </span>
                </div>
             </div>

             {/* Hidden List for Quick Navigation (Shown on larger screens/Hover) */}
             <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-500 flex flex-col items-end gap-2">
                {sections.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleJumpToSection(i + 1)}
                    className={`text-xs hover:text-accent transition-colors ${currentIndex === i + 1 ? 'text-accent font-bold' : 'text-paper/40'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
             </div>
        </div>
    </div>
  );
};
