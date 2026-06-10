import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorSparkles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastTime = 0;
    const createSparkle = (x: number, y: number) => {
      if (!containerRef.current) return;
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      containerRef.current.appendChild(sparkle);

      gsap.to(sparkle, {
        y: y + 20 + Math.random() * 30,
        x: x + (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 180,
        duration: 0.8 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => {
          if (containerRef.current && sparkle.parentNode === containerRef.current) {
            containerRef.current.removeChild(sparkle);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 40) { // Limit sparkle creation rate
        createSparkle(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} />;
};

export default CursorSparkles;
