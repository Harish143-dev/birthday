import React, { useState } from 'react';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const HiddenHearts: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, top: '20%', left: '80%' },
    { id: 2, top: '70%', left: '15%' },
    { id: 3, top: '80%', left: '75%' },
    { id: 4, top: '10%', left: '40%' },
  ]);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 40,
      origin: { x, y },
      colors: ['#FDFD96', '#FFD700', '#FFA500']
    });

    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="pulse-anim"
          onClick={(e) => handleItemClick(e, item.id)}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            cursor: 'pointer',
            padding: '10px',
            pointerEvents: 'auto',
          }}
        >
          <Star size={32} color="#FFD700" fill="#FFD700" opacity={0.8} />
        </div>
      ))}
    </>
  );
};

export default HiddenHearts;
