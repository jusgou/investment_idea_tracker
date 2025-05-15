import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    }}>
      <h1 style={{ color: '#1a73e8', fontSize: '2.5rem' }}>Investment Ideas Tracker</h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>React is working!</p>
      <button
        style={{
          backgroundColor: '#1a73e8',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '20px',
        }}
      >
        Click me!
      </button>
    </div>
  );
};

export default TestComponent;
