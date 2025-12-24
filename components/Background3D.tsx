
import React, { useEffect, useRef } from 'react';

/**
 * Background3D - A structural wireframe mesh background.
 * Uses a perspective projection of a 3D grid with wave undulation.
 */
export const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Grid Settings
    const COLS = 24;
    const ROWS = 24;
    const SPACING = 120;
    const PERSPECTIVE = 800;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDarkMode ? 'rgba(244, 241, 232, 0.05)' : 'rgba(17, 17, 17, 0.04)';
      ctx.lineWidth = 0.5;

      const scrollOffset = scrollRef.current * 0.1;
      const t = time * 0.0005;

      const project = (x: number, y: number, z: number) => {
        // Rotate around X based on scroll
        const angleX = 0.5 + (scrollRef.current * 0.0002);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Perspective projection
        const scale = PERSPECTIVE / (PERSPECTIVE + z1);
        const px = x * scale + width / 2;
        const py = y1 * scale + height / 2;
        
        return { x: px, y: py, scale };
      };

      const getZ = (i: number, j: number) => {
        // Wave function
        const dist = Math.sqrt(Math.pow(i - COLS / 2, 2) + Math.pow(j - ROWS / 2, 2));
        return Math.sin(dist * 0.3 - t) * 40 + Math.cos(i * 0.5 + t) * 20;
      };

      // Draw Grid Lines - Vertical
      for (let i = 0; i < COLS; i++) {
        ctx.beginPath();
        for (let j = 0; j < ROWS; j++) {
          const x = (i - COLS / 2) * SPACING;
          const y = (j - ROWS / 2) * SPACING;
          const z = getZ(i, j);
          
          const p = project(x, y, z);
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw Grid Lines - Horizontal
      for (let j = 0; j < ROWS; j++) {
        ctx.beginPath();
        for (let i = 0; i < COLS; i++) {
          const x = (i - COLS / 2) * SPACING;
          const y = (j - ROWS / 2) * SPACING;
          const z = getZ(i, j);
          
          const p = project(x, y, z);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 0.8 }}
    />
  );
};
