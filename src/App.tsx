import { useEffect, useState } from 'react';
import gsap from 'gsap';
import './App.css';
import ShinchanCharacter from './components/ShinchanCharacter';
import GiftBox from './components/GiftBox';
import FloatingElements from './components/FloatingElements';
import CursorSparkles from './components/CursorSparkles';
import TypewriterText from './components/TypewriterText';
import MemoryHunt from './components/MemoryHunt';
import PhotoReveal from './components/PhotoReveal';
import SecretLetter from './components/SecretLetter';
import confetti from 'canvas-confetti';

type FlowState = 
  | 'SCENE1_INTRO' 
  | 'SCENE2_CHALLENGE' 
  | 'SCENE3_MEMORY_HUNT' 
  | 'SCENE4_PHOTO_REVEAL' 
  | 'SCENE6_BIRTHDAY_REVEAL' 
  | 'SCENE7_SECRET_LETTER';

function App() {
  const [appState, setAppState] = useState<FlowState>('SCENE1_INTRO');
  const [showHeart, setShowHeart] = useState(false);
  const birthdayName = "Janani";

  // Parallax background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to('.parallax-bg', { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
      gsap.to('.parallax-fg', { x: -xPos * 2, y: -yPos * 2, duration: 1, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGlobalClick = () => {
    if (appState === 'SCENE1_INTRO') {
      setAppState('SCENE2_CHALLENGE');
    }
  };

  const handleGiftOpened = () => {
    setAppState('SCENE3_MEMORY_HUNT');
  };

  const handleMemoryHuntComplete = () => {
    setAppState('SCENE4_PHOTO_REVEAL');
  };

  const handlePhotoRevealComplete = () => {
    setAppState('SCENE6_BIRTHDAY_REVEAL');
    
    // Grand celebration
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 15, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#FFB6C1', '#AEC6CF', '#FDFD96', '#FF69B4'] });
      confetti({ particleCount: 15, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#FFB6C1', '#AEC6CF', '#FDFD96', '#FF69B4'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Spawn secret heart after 5s
    setTimeout(() => {
      setShowHeart(true);
      gsap.fromTo('.secret-heart', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' });
    }, 5000);
  };

  const openSecretLetter = () => {
    setAppState('SCENE7_SECRET_LETTER');
  };

  const closeSecretLetter = () => {
    setAppState('SCENE6_BIRTHDAY_REVEAL');
  };

  return (
    <div 
      className={`app-container ${(appState === 'SCENE4_PHOTO_REVEAL') ? 'darken-bg' : ''}`} 
      onClick={handleGlobalClick}
    >
      <CursorSparkles />
      
      <div className="background-layer parallax-bg">
        <FloatingElements />
      </div>

      <main className="hero-section parallax-fg" style={{ zIndex: 10 }}>
        
        {appState === 'SCENE1_INTRO' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <ShinchanCharacter state={appState} />
            <div style={{ maxWidth: '600px' }}>
              <TypewriterText text={["Heyyy! 👋", "I have a surprise for someone special..."]} speed={0.03} />
            </div>
            <p className="pulse-anim" style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
              Click anywhere to begin the adventure ✨
            </p>
          </div>
        )}

        {appState === 'SCENE2_CHALLENGE' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <ShinchanCharacter state={appState} />
            <div style={{ maxWidth: '600px' }}>
              <TypewriterText text={["Wait! Before I show the surprise...", "Can you help me find something special? 🎁"]} speed={0.03} />
            </div>
            <GiftBox onOpen={handleGiftOpened} />
          </div>
        )}

        {appState === 'SCENE3_MEMORY_HUNT' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <ShinchanCharacter state={appState} />
            <div style={{ maxWidth: '600px' }}>
              <TypewriterText text={["I found some memories...", "But they're hidden! 🕵️"]} speed={0.03} />
            </div>
            <MemoryHunt onComplete={handleMemoryHuntComplete} />
          </div>
        )}

        {appState === 'SCENE4_PHOTO_REVEAL' && (
          <PhotoReveal onComplete={handlePhotoRevealComplete} />
        )}

        {(appState === 'SCENE6_BIRTHDAY_REVEAL' || appState === 'SCENE7_SECRET_LETTER') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <ShinchanCharacter state={appState} />
            
            <div className="glass pop-in" style={{ padding: '2rem 3rem', textAlign: 'center', maxWidth: '700px' }}>
              <h1 style={{ fontSize: '3rem', color: '#FF69B4', marginBottom: '1rem', textShadow: '2px 2px 0px #fff' }}>
                🎉 Happy Birthday {birthdayName} 🎉
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8', marginTop: '1rem' }}>
                Thank you for being such an amazing person.<br/>
                May this year bring you happiness, success, and countless beautiful memories.<br/><br/>
                Keep smiling 😊
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Secret Heart - Only visible after BIRTHDAY_REVEAL */}
      {showHeart && (appState === 'SCENE6_BIRTHDAY_REVEAL' || appState === 'SCENE7_SECRET_LETTER') && (
        <div 
          className="secret-heart float-anim"
          onClick={(e) => { e.stopPropagation(); openSecretLetter(); }}
          style={{
            position: 'absolute', top: '15%', right: '15%', 
            fontSize: '4rem', cursor: 'pointer', zIndex: 30, filter: 'drop-shadow(0 0 15px #FF69B4)'
          }}
        >
          🌟
        </div>
      )}

      {/* Audio Modal / Secret Letter */}
      {appState === 'SCENE7_SECRET_LETTER' && (
        <SecretLetter onClose={closeSecretLetter} name={birthdayName} />
      )}
    </div>
  );
}

export default App;
