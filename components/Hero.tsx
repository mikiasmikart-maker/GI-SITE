
import React from 'react';
import { motion, Variants } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const accentVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 // Slight extra delay to ensure it punctuates the sentence
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col pt-48 pb-24 px-6 md:px-12 border-b border-ink/10 dark:border-white/10">
      <motion.div 
        className="flex-1 flex flex-col justify-end max-w-[1800px] mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Meta / Label */}
        <div className="overflow-hidden mb-12">
            <motion.div variants={itemVariants} className="flex items-center gap-6">
                <span className="w-12 h-[1px] bg-accent"></span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-ink/50 dark:text-ink-dark/50">
                    Ginbar Media PLC
                </span>
            </motion.div>
        </div>

        {/* Main Architectural Statement */}
        <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-10">
                <h1 className="font-display font-medium text-[8vw] leading-[0.85] tracking-[-0.02em] uppercase text-ink dark:text-ink-dark mb-16">
                    {/* Line 1 */}
                    <div className="overflow-hidden">
                        <motion.div variants={itemVariants}>
                            We Design Stories
                        </motion.div>
                    </div>
                    
                    {/* Line 2 - Split for Accent */}
                    <div className="flex flex-wrap gap-x-[0.25em] overflow-hidden">
                        <div className="overflow-hidden">
                             <motion.div variants={itemVariants} className="text-ink/30 dark:text-white/30">
                                That Move
                             </motion.div>
                        </div>
                        <div className="overflow-hidden">
                             <motion.div variants={accentVariants} className="text-accent">
                                Culture.
                             </motion.div>
                        </div>
                    </div>
                </h1>
            </div>
        </div>

        {/* Executive Overview - Grid Aligned */}
        <div className="grid grid-cols-12 gap-x-6 mt-12 border-t border-ink/10 dark:border-white/10 pt-12">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 overflow-hidden">
                <motion.div variants={itemVariants}>
                    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                        Leading Marketing Consultancy
                    </h2>
                    <p className="text-xl leading-relaxed text-ink dark:text-ink-dark font-light mb-8">
                    Ginbar Media PLC is Ethiopia’s premier marketing consultancy. We provide end-to-end, insight-driven solutions that combine strategy, creativity, technology, and flawless execution.
                    </p>
                    <div className="flex gap-6 text-sm font-mono uppercase tracking-wider">
                        <a href="#work" className="border-b border-ink/20 hover:border-accent hover:text-accent transition-colors pb-1">View Portfolio</a>
                        <a href="#contact" className="border-b border-ink/20 hover:border-accent hover:text-accent transition-colors pb-1">Partner With Us</a>
                    </div>
                </motion.div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:mt-0 overflow-hidden">
                 <motion.div variants={itemVariants} className="w-full flex justify-between items-end">
                     {/* Empty spacer for grid alignment */}
                     <div className="hidden lg:block"></div>

                     <div className="flex gap-16">
                        <div>
                            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 dark:text-white/40 mb-2">G1 Identity</span>
                            <span className="block font-display text-3xl">Pioneering</span>
                        </div>
                        <div>
                            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 dark:text-white/40 mb-2">Established</span>
                            <span className="block font-display text-3xl">2013</span>
                        </div>
                        <div>
                            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 dark:text-white/40 mb-2">Location</span>
                            <span className="block font-display text-3xl">ADDIS</span>
                        </div>
                     </div>
                 </motion.div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};
