
import React from 'react';
import { Reveal } from './Reveal';

export const Manifesto: React.FC = () => {
  const principles = [
    {
      title: 'Decisive',
      desc: 'We communicate intentions directly to foster trust. Direct communication is the foundation of effective strategy.'
    },
    {
      title: 'Clear',
      desc: 'We ensure audiences understand brand values through streamlined experiences. Clarity reinforces brand loyalty.'
    },
    {
      title: 'Restrained',
      desc: 'We use intentional design to keep the focus purely on the message. Disciplined design removes noise.'
    }
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-ink text-paper border-b border-white/5">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="grid grid-cols-12 gap-12 mb-32">
            <div className="col-span-12 md:col-span-6">
                 <Reveal>
                    <span className="font-mono text-xs text-accent mb-6 block tracking-[0.2em] uppercase">The Manifesto Principle</span>
                    <h2 className="font-display font-medium text-6xl md:text-8xl uppercase tracking-[-0.02em] leading-[0.9]">
                        Strategic<br/>Filters.
                    </h2>
                 </Reveal>
            </div>
            <div className="col-span-12 md:col-span-6 flex items-end justify-end">
                <Reveal delay={200}>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-md text-right leading-relaxed">
                        Our communication is governed by a disciplined framework ensuring every message is decisive, clear, and restrained.
                    </p>
                </Reveal>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-16">
            {principles.map((p, i) => (
                <Reveal key={i} delay={i * 100} className="group">
                    <div className="mb-8 flex items-center justify-between">
                         <span className="font-mono text-xs text-white/20">0{i+1}</span>
                         <div className="w-full h-[1px] bg-white/10 ml-4 group-hover:bg-accent transition-colors duration-700"></div>
                    </div>
                    <h3 className="font-display text-4xl text-white mb-6 uppercase tracking-tight">{p.title}</h3>
                    <p className="text-white/60 font-light leading-relaxed text-sm md:text-base max-w-xs">
                        {p.desc}
                    </p>
                </Reveal>
            ))}
        </div>

      </div>
    </section>
  );
};
