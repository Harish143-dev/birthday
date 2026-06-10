import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ShinchanProps {
  state: string;
}

const FUNNY_MESSAGES = [
  "Oooooh! You look amazing today!",
  "Are you getting older or just more awesome?",
  "Don't steal my chocolates!"
];

const ShinchanCharacter: React.FC<ShinchanProps> = ({ state }) => {
  const characterRef = useRef<HTMLImageElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  // 3D Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      gsap.to(characterRef.current, {
        rotationY: deltaX * 30,
        rotationX: -deltaY * 30,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 500
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // State-based animations
  useEffect(() => {
    if (!characterRef.current) return;

    // Reset any previous dances
    gsap.killTweensOf(characterRef.current);

    if (state === 'SCENE2_CHALLENGE') {
      // Jump animation
      gsap.fromTo(characterRef.current,
        { y: 0, scaleY: 1 },
        { y: -100, scaleY: 1.1, duration: 0.4, yoyo: true, repeat: 1, ease: 'power1.out' }
      );
    } else if (state === 'SCENE6_BIRTHDAY_REVEAL' || state === 'SCENE7_SECRET_LETTER') {
      // Dancing
      gsap.to(characterRef.current, { y: -30, rotationZ: 5, yoyo: true, repeat: -1, duration: 0.3, ease: 'sine.inOut' });
      gsap.to(characterRef.current, { rotationZ: -5, yoyo: true, repeat: -1, duration: 0.3, delay: 0.15, ease: 'sine.inOut' });
    } else {
      // Default float
      gsap.to(characterRef.current, { y: -10, yoyo: true, repeat: -1, duration: 2, ease: 'sine.inOut' });
    }
  }, [state]);

  const handleMouseEnter = () => {
    if (state === 'SCENE1_INTRO') return;
    setMessage(FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)]);
    gsap.to(tooltipRef.current, { opacity: 1, y: -20, duration: 0.3, ease: 'back.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 0, duration: 0.2 });
  };

  return (
    <div style={{ perspective: '1000px', position: 'relative' }}>
      <div
        ref={tooltipRef}
        className="glass"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          opacity: 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          color: '#FF69B4',
          zIndex: 50,
          fontFamily: "'Fredoka', sans-serif"
        }}
      >
        {message}
      </div>
      <img
        ref={characterRef}
        src={(state === 'SCENE6_BIRTHDAY_REVEAL' || state === 'SCENE7_SECRET_LETTER') ? '/img_2.png' : '/img_1.png'}
        alt="Shinchan"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          maxHeight: '40vh',
          maxWidth: '90vw',
          height: 'auto',
          width: 'auto',
          mixBlendMode: 'multiply',
          filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))',
          willChange: 'transform',
          cursor: state !== 'SCENE1_INTRO' ? 'pointer' : 'default',
          display: (state === 'SCENE4_PHOTO_REVEAL' || state === 'SCENE5_EMOTIONAL_MSG') ? 'none' : 'block'
        }}
      />
    </div>
  );
};

export default ShinchanCharacter;
