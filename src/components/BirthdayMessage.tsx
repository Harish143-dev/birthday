import React from 'react';

const BirthdayMessage: React.FC = () => {
  return (
    <div className="glass pop-in" style={{
      padding: '3rem',
      maxWidth: '600px',
      textAlign: 'center',
      marginTop: '2rem',
      color: 'var(--text-main)',
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        background: 'linear-gradient(45deg, #FF69B4, #FFA07A)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Happy Birthday!
      </h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        Wishing you a day filled with happiness, cute moments, and lots of Shinchan-style fun! 
        May all your dreams come true. Keep smiling and shining! ✨🎉
      </p>
    </div>
  );
};

export default BirthdayMessage;
