
import React from 'react';
import { Reveal } from './Reveal';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-ink text-paper pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
            
            <div className="grid grid-cols-12 gap-12 border-b border-white/10 pb-24 mb-12">
                <div className="col-span-12 lg:col-span-6">
                    <Reveal>
                        <h2 className="font-display font-medium text-[5vw] uppercase tracking-[-0.02em] leading-none mb-12">
                            Dialogue.
                        </h2>
                        <a 
                            href="mailto:hello@ginbar.media" 
                            className="inline-block text-xl md:text-2xl font-light border-b border-white/20 pb-1 hover:border-accent hover:text-accent transition-colors"
                        >
                            Contact our team
                        </a>
                    </Reveal>
                </div>

                <div className="col-span-12 lg:col-span-6 flex flex-col md:flex-row gap-16 md:justify-end items-start md:items-end">
                    <Reveal delay={200}>
                        <div className="space-y-6">
                            <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">Regional HQ</h4>
                            <p className="font-light text-lg">Addis Ababa, Ethiopia</p>
                        </div>
                    </Reveal>
                    <Reveal delay={300}>
                         <div className="space-y-6">
                            <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">Active Hubs</h4>
                            <ul className="font-light text-sm space-y-2 text-white/80">
                                <li>Bishoftu / Sheger</li>
                                <li>West Oromia / Mekelle</li>
                                <li>Bahir Dar / Hawassa</li>
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                <p>&copy; 2025 Ginbar Media PLC. All Rights Reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                </div>
            </div>

        </div>
    </footer>
  );
};
