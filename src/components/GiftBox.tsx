import React, { useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!containerRef.current || !lidRef.current || !boxRef.current) return;

    // Disable further clicks
    containerRef.current.style.pointerEvents = 'none';

    // Shake sequence
    gsap.to(containerRef.current, {
      x: 10, yoyo: true, repeat: 5, duration: 0.05,
      onComplete: () => {
        // Lid flies off
        gsap.to(lidRef.current, {
          y: -100,
          rotation: 45,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        
        // Fireworks effect
        const duration = 1500;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FFB6C1', '#AEC6CF', '#FDFD96'] });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FFB6C1', '#AEC6CF', '#FDFD96'] });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

        // Reveal the message shortly after
        setTimeout(onOpen, 1500);
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="shake-anim float-anim" 
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginTop: '2rem'
      }}
    >
      <div 
        ref={lidRef}
        style={{
          width: '120px',
          height: '30px',
          backgroundColor: '#FF69B4',
          borderRadius: '5px',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '20px', height: '100%', backgroundColor: '#FDFD96' }} />
      </div>
      <div 
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#FFB6C1',
          borderRadius: '0 0 10px 10px',
          position: 'relative',
          marginTop: '-5px',
          zIndex: 1,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '20px', height: '100%', backgroundColor: '#FDFD96' }} />
      </div>
    </div>
  );
};

export default GiftBox;
