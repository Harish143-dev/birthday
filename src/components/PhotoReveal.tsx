import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import TypewriterText from './TypewriterText';
import childImage from '../assets/j.jpeg';

interface PhotoRevealProps {
  onComplete: () => void;
}

const PhotoReveal: React.FC<PhotoRevealProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Sequence
    const tl = gsap.timeline();
    
    // 1. Fade in the frame and blur-reveal the photo
    tl.to('.photo-frame', { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' })
      .to('.childhood-photo', { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power2.inOut' }, "+=0.5")
      .call(() => setStep(1)); // Show first question

    // 2. Wait, then move photo up
    tl.to('.photo-frame', { y: -50, duration: 1, ease: 'power2.inOut', delay: 4 })
      .call(() => setStep(2)); // Show emotional message
      
  }, []);

  const handleEmotionalMessageComplete = () => {
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '1rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      
      <div 
        className="photo-frame glass"
        style={{ 
          padding: '1rem', 
          opacity: 0, 
          scale: 0.8,
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
          background: 'rgba(255,255,255,0.8)'
        }}
      >
        <img 
          className="childhood-photo"
          src={childImage} 
          alt="Childhood" 
          style={{ 
            width: '250px', 
            height: '250px', 
            objectFit: 'cover', 
            borderRadius: '10px',
            filter: 'blur(20px)',
            opacity: 0
          }} 
        />
      </div>

      <div style={{ minHeight: '150px', textAlign: 'center', width: '100%' }}>
        {step === 1 && (
          <h2 className="pop-in" style={{ color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.5)', fontSize: '1.8rem' }}>
            Do you recognize this little cutie?
          </h2>
        )}

        {step === 2 && (
          <div style={{ color: '#fff', fontSize: '1.4rem', textShadow: '1px 1px 4px rgba(0,0,0,0.5)', lineHeight: '1.8' }}>
            <TypewriterText 
              text={[
                "From this little kid...",
                "To the amazing person you are today...",
                "Your smile still makes people happy."
              ]}
              onComplete={handleEmotionalMessageComplete}
              color="#fff"
              textShadow="1px 1px 6px rgba(0,0,0,0.8)"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default PhotoReveal;
