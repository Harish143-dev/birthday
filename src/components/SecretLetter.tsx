import React from 'react';

interface SecretLetterProps {
  onClose: () => void;
  name: string;
}

const SecretLetter: React.FC<SecretLetterProps> = ({ onClose, name }) => {
  return (
    <div 
      className="pop-in"
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="glass"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '500px',
          width: '100%',
          padding: '3rem 2rem',
          borderRadius: '15px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem', right: '1.5rem',
            background: 'none', border: 'none',
            fontSize: '1.5rem', cursor: 'pointer',
            color: '#888'
          }}
        >
          ✖
        </button>
        
        <div className="handwriting" style={{ fontSize: '2rem', color: '#333', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1rem' }}>Dear {name},</p>
          <p style={{ marginBottom: '1rem' }}>
            I made this little surprise because you're special to me.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            I hope today becomes one of your happiest birthdays.
          </p>
          <p style={{ textAlign: 'right', marginTop: '2rem', color: '#FF69B4', fontWeight: 'bold' }}>
            Happy Birthday 🎂
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretLetter;
