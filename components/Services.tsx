
import React from 'react';
import { SERVICES } from '../constants';
import { Reveal } from './Reveal';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 md:py-48 px-6 md:px-12 bg-paper dark:bg-paper-dark">
      <div className="max-w-[1800px] mx-auto">
          
          <div className="grid grid-cols-12 gap-6 mb-24 items-end">
              <div className="col-span-12 md:col-span-6">
                 <Reveal>
                   <span className="font-mono text-xs text-accent mb-4 block tracking-[0.2em] uppercase">Capabilities</span>
                   <h3 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tight text-ink dark:text-ink-dark leading-none">
                     Through-The-Line<br/>Systems
                   </h3>
                 </Reveal>
              </div>
              <div className="col-span-12 md:col-span-6 border-b border-ink/10 dark:border-white/10 pb-4">
                  <Reveal delay={200}>
                    <p className="font-mono text-xs text-ink/40 dark:text-white/40 uppercase tracking-[0.1em] text-right">
                        Integrated Solutions Architecture
                    </p>
                  </Reveal>
              </div>
          </div>

          <div className="flex flex-col border-t border-ink/10 dark:border-white/10">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 50} className="w-full">
                <div className="group grid grid-cols-12 gap-6 py-12 border-b border-ink/10 dark:border-white/10 hover:bg-ink/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500">
                    
                    {/* ID / Index */}
                    <div className="col-span-2 md:col-span-1 pt-1">
                        <span className="font-mono text-xs text-accent">
                            {service.number}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="col-span-10 md:col-span-4">
                        <h4 className="text-3xl md:text-4xl font-display font-medium uppercase text-ink dark:text-ink-dark mb-2">
                            {service.title}
                        </h4>
                    </div>

                    {/* Description */}
                    <div className="col-span-12 md:col-span-3 lg:col-span-4 pl-0 md:pl-6 pt-2 md:pt-1">
                        <p className="text-ink/60 dark:text-white/60 text-base leading-relaxed max-w-sm">
                            {service.description}
                        </p>
                    </div>

                    {/* Features - Technical List */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 pt-6 md:pt-1">
                        {service.features && (
                            <ul className="grid grid-cols-1 gap-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-accent/40 rounded-full"></span>
                                        <span className="text-[11px] font-mono uppercase tracking-wider text-ink/40 dark:text-white/40">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
};
