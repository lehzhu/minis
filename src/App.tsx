import React, { useState } from 'react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { title: "2024 Shopping Wrapped", emoji: "🛍️", bg: "#7c3aed" },
    { title: "You spent $1,234.56", emoji: "💰", bg: "#ec4899" },
    { title: "Across 15 orders", emoji: "📦", bg: "#3b82f6" },
    { title: "You're a Style Seeker!", emoji: "🎭", bg: "#10b981" }
  ];

  const currentSlideData = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Add CSS reset for fullscreen
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.margin = '0';
      root.style.padding = '0';
      root.style.height = '100vh';
      root.style.width = '100vw';
    }
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh', 
        width: '100vw',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: currentSlideData.bg,
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '20px',
        margin: 0,
        boxSizing: 'border-box',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
      onClick={nextSlide}
    >
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '20px',
        right: '20px',
        display: 'flex',
        gap: '4px',
        zIndex: 10
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: '3px',
              backgroundColor: index <= currentSlide ? 'white' : 'rgba(255,255,255,0.3)',
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      {/* Slide content */}
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
        {currentSlideData.emoji}
      </div>
      
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '10px',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        {currentSlideData.title}
      </h1>
      
      {/* Next indicator */}
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '12px 24px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        backdropFilter: 'blur(10px)'
      }}>
        Tap to continue ({currentSlide + 1}/{slides.length})
      </div>
    </div>
  );
}