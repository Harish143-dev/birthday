import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TypewriterTextProps {
  text: string | string[];
  onComplete?: () => void;
  speed?: number;
  color?: string;
  textShadow?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, speed = 0.05, color = 'var(--text-main)', textShadow = '2px 2px 4px rgba(255,255,255,0.8)' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const lines = Array.isArray(text) ? text : [text];
    containerRef.current.innerHTML = '';
    
    // Create elements
    lines.forEach((line) => {
      const p = document.createElement('p');
      p.style.margin = '0.5rem 0';
      const chars = line.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Keep spaces
        span.style.opacity = '0';
        p.appendChild(span);
      });
      containerRef.current?.appendChild(p);
    });

    const spans = containerRef.current.querySelectorAll('span');

    // Create a timeline to ensure it waits slightly between lines or just stagger all chars
    const tl = gsap.timeline({ onComplete });
    
    // Animate all characters one by one with stagger
    tl.to(spans, {
      opacity: 1,
      stagger: speed,
      duration: 0.1,
      ease: 'power1.in'
    });

  }, [text, onComplete, speed]);

  return (
    <div ref={containerRef} style={{
      fontSize: '2rem',
      color: color,
      textAlign: 'center',
      textShadow: textShadow,
      fontFamily: "'Fredoka', sans-serif"
    }}>
      {/* Content injected here */}
    </div>
  );
};

export default TypewriterText;
