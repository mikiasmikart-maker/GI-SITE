
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './Reveal';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawImgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const smoothImgY = useSpring(rawImgY, {
    stiffness: 25,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="about" className="py-32 md:py-48 px-6 md:px-12 bg-paper dark:bg-paper-dark relative overflow-hidden border-b border-ink/5 dark:border-white/5 transition-colors duration-500">
      
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-24 items-start">
          
          <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <span className="font-mono text-xs text-accent mb-6 block font-bold tracking-[0.4em] uppercase">About Us</span>
                <h2 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tighter mb-12 text-ink dark:text-ink-dark">
                  The Architecture<br/>
                  of <span className="font-light text-ink/50 dark:text-white/50">Marketing.</span>
                </h2>
              </Reveal>

              <div className="space-y-16">
                <Reveal delay={200}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">Our Vision</h3>
                    <p className="text-ink/80 dark:text-ink-dark/80 text-lg md:text-2xl leading-relaxed font-light">
                       To be the leading marketing consultancy in Africa, empowering brands to connect meaningfully through insight-driven and ethically grounded solutions.
                    </p>
                </Reveal>
                
                <Reveal delay={300}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">Operational Capacity</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-t border-ink/10 dark:border-white/10 border-b">
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">2016</span>
                            <span className="text-[10px] uppercase tracking-widest text-ink/50 dark:text-ink-dark/50">Workshop Est.</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">65+</span>
                            <span className="text-[10px] uppercase tracking-widest text-ink/50 dark:text-ink-dark/50">Professionals</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-medium mb-1">300+</span>
                            <span className="text-[10px] uppercase tracking-widest text-ink/50 dark:text-ink-dark/50">Promoters</span>
                        </div>
                    </div>
                    <p className="mt-6 text-sm text-ink/60 dark:text-ink-dark/60 max-w-lg leading-relaxed">
                        Full Integration: Strategy → Creative → Production → Execution. We manage the entire lifecycle in-house to maintain absolute creative fidelity.
                    </p>
                </Reveal>

                <Reveal delay={400}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">Growth Roadmap (2025–2035)</h3>
                    <ul className="space-y-6">
                        <li className="flex gap-6 items-baseline">
                            <span className="font-mono text-sm font-bold text-ink dark:text-white min-w-[100px]">2025–2027</span>
                            <span className="font-light text-ink/70 dark:text-white/70">Expand digital analytics and enhance the largest mobile experiential fleet in East Africa.</span>
                        </li>
                        <li className="flex gap-6 items-baseline">
                            <span className="font-mono text-sm font-bold text-ink dark:text-white min-w-[100px]">2028–2030</span>
                            <span className="font-light text-ink/70 dark:text-white/70">Launch regional hubs in Dire Dawa and Mekelle; diversify into Djibouti, Somalia, and Sudan.</span>
                        </li>
                        <li className="flex gap-6 items-baseline">
                            <span className="font-mono text-sm font-bold text-ink dark:text-white min-w-[100px]">2031–2035</span>
                            <span className="font-light text-ink/70 dark:text-white/70">Establish Ginbar as a Pan-African consultancy; build a 2,000sqm sustainability-certified facility.</span>
                        </li>
                    </ul>
                </Reveal>
              </div>
          </div>

          <div className="col-span-12 lg:col-span-5 mt-12 lg:mt-0 lg:sticky lg:top-32">
             <Reveal delay={400} className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-ink/5 dark:bg-white/5 relative shadow-sm">
                    <motion.img 
                        style={{ y: smoothImgY, scale: 1.1, willChange: 'transform' }}
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                        alt="Corporate Architecture" 
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover grayscale transition-all duration-1000 ease-editorial ${imgLoaded ? 'opacity-100' : 'opacity-0 scale-105'}`}
                        loading="lazy"
                        decoding="async"
                    />
                    
                    {/* Minimal Loading State */}
                    {!imgLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-[1px] bg-ink/20 dark:bg-white/20 animate-pulse"></div>
                      </div>
                    )}
                </div>
                
                <div className="mt-6 flex justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-ink/30 dark:text-ink-dark/30">
                  <span>Full CNC Production</span>
                  <span>Addis Ababa</span>
                </div>
             </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
