
import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WORK_ITEMS } from '../constants';
import { Reveal } from './Reveal';

export const Work: React.FC = () => {
  const originalTitle = useRef<string>(document.title);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isViewerImageLoaded, setIsViewerImageLoaded] = useState(false);

  const selectedWork = selectedIndex !== null ? WORK_ITEMS[selectedIndex] : null;

  useEffect(() => {
    originalTitle.current = document.title;
    return () => { document.title = originalTitle.current; };
  }, []);

  useEffect(() => {
    if (selectedWork) setIsViewerImageLoaded(false);
  }, [selectedWork]);

  const handleMouseEnter = (title: string) => {
    document.title = `${title} — Ginbar Output`;
  };

  const handleMouseLeave = () => {
    document.title = originalTitle.current;
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    setIsViewerImageLoaded(false);
    document.title = originalTitle.current;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section id="work" className="relative bg-paper dark:bg-paper-dark py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="grid grid-cols-12 mb-32 gap-6 items-end border-b border-ink/10 dark:border-white/10 pb-12">
            <div className="col-span-12 md:col-span-8">
               <Reveal>
                   <span className="font-mono text-xs text-accent mb-6 block tracking-[0.2em] uppercase">Selected Works</span>
                   <h2 className="font-display font-medium text-6xl md:text-8xl uppercase tracking-tighter text-ink dark:text-ink-dark leading-none">
                      Output.
                   </h2>
               </Reveal>
            </div>
            <div className="col-span-12 md:col-span-4 text-left md:text-right">
                 <Reveal delay={200}>
                     <p className="text-ink/50 dark:text-white/50 text-base md:text-lg font-light">
                         2023 — 2025
                     </p>
                 </Reveal>
            </div>
        </div>

        {/* Strict Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
           {WORK_ITEMS.map((item, index) => (
             <Reveal key={item.id} delay={index * 100} className="group cursor-pointer" cascade>
                <div 
                  className="flex flex-col"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedIndex(index)}
                >
                    {/* Image Container with Accent Overlay */}
                    <div className="relative overflow-hidden mb-8 bg-ink/5 aspect-[4/3]">
                        <div className="absolute inset-0 bg-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
                        <motion.img 
                            initial={{ scale: 1, filter: "grayscale(100%)" }}
                            whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            src={item.image} 
                            alt={item.title} 
                            className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>

                    {/* Metadata Line */}
                    <div className="flex justify-between items-baseline border-t border-ink/10 dark:border-white/10 pt-4 group-hover:border-accent transition-colors duration-500">
                        <h3 className="text-3xl font-display font-medium uppercase text-ink dark:text-ink-dark">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[10px] text-ink/40 dark:text-white/40 uppercase tracking-[0.2em]">
                            {item.category} / {item.year}
                        </span>
                    </div>
                </div>
             </Reveal>
           ))}
        </div>
      </div>

      {/* Viewer Portal */}
      {createPortal(
        <AnimatePresence>
          {selectedWork && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[200] bg-paper dark:bg-black flex items-center justify-center p-0 md:p-12 overflow-hidden"
              onClick={closeViewer}
            >
              {/* Image Container */}
              <motion.div 
                key={selectedWork.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
              >
                <img 
                  src={selectedWork.image} 
                  onLoad={() => setIsViewerImageLoaded(true)}
                  className={`max-w-[90%] max-h-[80vh] w-auto h-auto object-contain shadow-2xl ${isViewerImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  alt={selectedWork.title}
                />
                
                {/* Loader Bar */}
                <AnimatePresence>
                    {!isViewerImageLoaded && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-50 bg-paper dark:bg-black"
                    >
                        <div className="w-64 h-[1px] bg-ink/10 dark:bg-white/10 overflow-hidden relative">
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-accent w-1/3"
                                animate={{ left: ["-33%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">
                            Loading Asset
                        </span>
                    </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
              
              {/* Clean Caption */}
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0 }}
                 transition={{ delay: 0.3, duration: 0.5 }}
                 className="absolute bottom-12 left-12 max-w-md pointer-events-none"
              >
                 <h3 className="font-display font-medium text-4xl text-ink dark:text-white uppercase tracking-tight mb-2">
                     {selectedWork.title}
                 </h3>
                 <p className="font-light text-ink/60 dark:text-white/60 text-sm leading-relaxed">
                     {selectedWork.description}
                 </p>
              </motion.div>

              <div className="absolute top-12 right-12 cursor-pointer pointer-events-auto group" onClick={closeViewer}>
                 <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 dark:text-white/40 group-hover:text-accent transition-colors">Close</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
