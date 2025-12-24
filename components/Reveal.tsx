import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // in ms
  threshold?: number;
  className?: string;
  direction?: 'up' | 'none'; // 'up' adds translateY
  cascade?: boolean; // if true, children are staggered (requires specific structure)
}

/**
 * A lightweight alternative to Framer Motion for scroll reveals.
 * Uses IntersectionObserver to toggle opacity and transform.
 */
export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  threshold = 0.1, 
  className = '',
  direction = 'up',
  cascade = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const transitionStyle = {
    transitionProperty: 'opacity, transform',
    transitionDuration: '1000ms',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', // The "Editorial" ease
    transitionDelay: `${delay}ms`,
  };

  const getTransform = () => {
    if (isVisible) return 'translateY(0)';
    if (direction === 'up') return 'translateY(24px)'; // Subtle 24px lift, not bouncy
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...transitionStyle,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

interface StaggerTextProps {
  text: string;
  className?: string;
  delayBase?: number;
}

// Splits text by words and staggers them
export const StaggerText: React.FC<StaggerTextProps> = ({ text, className = "", delayBase = 0 }) => {
    const words = text.split(' ');
    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <Reveal 
                    key={i} 
                    delay={delayBase + (i * 40)} 
                    direction="up" 
                    className="inline-block mr-[0.25em]" // Use spacing for words
                >
                    {word}
                </Reveal>
            ))}
        </span>
    )
}
