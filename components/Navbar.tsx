
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.5 } },
    open: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-paper/95 dark:bg-black/95 backdrop-blur-md border-b border-ink/5 dark:border-white/5' : 'py-8 border-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo - Textual & Minimal */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')} 
            className="flex items-center gap-3 z-[60] text-ink dark:text-ink-dark"
          >
             <div className="w-6 h-6">
                <Logo className="w-full h-full dark:invert dark:hue-rotate-180" />
             </div>
             <span className="font-display font-bold uppercase tracking-widest text-sm">
                 Ginbar
             </span>
          </a>

          {/* Desktop Nav - Invisible Authority */}
          <div className="hidden md:flex gap-12">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-[60] p-2"
            aria-label="Toggle Menu"
          >
             <div className="space-y-1.5">
                <span className={`block w-6 h-[1px] bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-[1px] bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-[1px] bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
             </div>
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[45] bg-paper dark:bg-black flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="font-display font-medium text-4xl uppercase tracking-tight text-ink dark:text-white hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
