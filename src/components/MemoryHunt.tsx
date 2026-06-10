import React, { useState } from 'react';
import gsap from 'gsap';

interface MemoryHuntProps {
  onComplete: () => void;
}

const clues = [
  { id: 1, text: "Someone who always smiles 😊" },
  { id: 2, text: "Someone who loves Shinchan 📺" },
  { id: 3, text: "Someone very special ✨" }
];

const MemoryHunt: React.FC<MemoryHuntProps> = ({ onComplete }) => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const handleStarClick = (id: number) => {
    if (revealed.includes(id)) return;

    const newRevealed = [...revealed, id];
    setRevealed(newRevealed);

    // Animate the star burst
    gsap.to(`#star-${id}`, {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Animate the text coming in
    gsap.fromTo(`#clue-${id}`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
    );

    if (newRevealed.length === clues.length) {
      setTimeout(() => {
        onComplete();
      }, 2500); // wait a bit after the last clue
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {clues.map((clue) => (
          <div key={clue.id} style={{ position: 'relative', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!revealed.includes(clue.id) && (
              <div
                id={`star-${clue.id}`}
                className="float-star-anim pulse-anim"
                style={{
                  fontSize: '4rem',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 0 10px var(--accent))'
                }}
                onClick={() => handleStarClick(clue.id)}
              >
                ⭐
              </div>
            )}
            <div
              id={`clue-${clue.id}`}
              className="glass"
              style={{
                position: 'absolute',
                opacity: revealed.includes(clue.id) ? 1 : 0,
                pointerEvents: 'none',
                padding: '1rem',
                textAlign: 'center',
                color: 'var(--text-main)',
                fontWeight: 500,
                width: '100%'
              }}
            >
              {clue.text}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--text-main)', opacity: 0.7, marginTop: '2rem' }}>
        {revealed.length < clues.length ? "Find all the hidden memories..." : "All memories found! ✨"}
      </p>
    </div>
  );
};

export default MemoryHunt;
