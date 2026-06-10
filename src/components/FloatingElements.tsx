import React from 'react';
import { Cloud } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Cloud 1 */}
      <div className="float-anim" style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.8 }}>
        <Cloud size={100} color="#ffffff" fill="#ffffff" />
      </div>
      {/* Cloud 2 */}
      <div className="float-anim" style={{ position: 'absolute', top: '30%', right: '15%', animationDelay: '1s', opacity: 0.7 }}>
        <Cloud size={140} color="#ffffff" fill="#ffffff" />
      </div>
      {/* Cloud 3 */}
      <div className="float-anim" style={{ position: 'absolute', bottom: '20%', left: '25%', animationDelay: '2s', opacity: 0.6 }}>
        <Cloud size={80} color="#ffffff" fill="#ffffff" />
      </div>

      {/* Balloons (simple SVG balloons) */}
      <div className="float-anim" style={{ position: 'absolute', top: '40%', left: '5%', animationDelay: '0.5s' }}>
        <svg width="60" height="80" viewBox="0 0 60 80">
          <ellipse cx="30" cy="30" rx="25" ry="30" fill="#FFB6C1" />
          <path d="M30 60 L 25 70 L 35 70 Z" fill="#FFB6C1" />
          <path d="M30 70 Q 20 80 30 90" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="20" cy="20" rx="4" ry="8" fill="rgba(255,255,255,0.5)" transform="rotate(30 20 20)" />
        </svg>
      </div>

      <div className="float-anim" style={{ position: 'absolute', top: '20%', right: '5%', animationDelay: '1.5s' }}>
        <svg width="60" height="80" viewBox="0 0 60 80">
          <ellipse cx="30" cy="30" rx="25" ry="30" fill="#AEC6CF" />
          <path d="M30 60 L 25 70 L 35 70 Z" fill="#AEC6CF" />
          <path d="M30 70 Q 40 80 30 90" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="20" cy="20" rx="4" ry="8" fill="rgba(255,255,255,0.5)" transform="rotate(30 20 20)" />
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;
