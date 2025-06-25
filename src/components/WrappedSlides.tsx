import React, { useState, useEffect, useRef } from 'react';
import type { WrappedData } from '../types';

interface WrappedSlidesProps {
  wrappedData: WrappedData;
  onComplete: () => void;
}

export default function WrappedSlides({ wrappedData, onComplete }: WrappedSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  const slides = [
    {
      title: '2024 Shopping Wrapped',
      description: 'Your year in purchases ✨',
      backgroundColor: '#7c3aed',
      emoji: '🛍️'
    },
    {
      title: 'You spent',
      value: `$${wrappedData.totalSpent.toFixed(2)}`,
      description: 'this year',
      backgroundColor: '#ec4899',
      emoji: '💰'
    },
    {
      title: 'Across',
      value: wrappedData.orderCount,
      description: wrappedData.orderCount === 1 ? 'order' : 'orders',
      backgroundColor: '#3b82f6',
      emoji: '📦'
    },
    {
      title: 'Your obsession',
      value: wrappedData.favoriteCategory,
      description: 'was your most shopped category',
      backgroundColor: '#10b981',
      emoji: '❤️'
    },
    {
      title: 'Brand loyalty',
      value: wrappedData.topBrand,
      description: 'was your go-to brand',
      backgroundColor: '#f59e0b',
      emoji: '⭐'
    },
    {
      title: 'You are',
      value: wrappedData.personalityType,
      description: 'based on your shopping patterns',
      backgroundColor: '#06b6d4',
      emoji: '🎭'
    },
    {
      title: "That's a wrap!",
      description: 'Ready for some recommendations?',
      backgroundColor: '#6366f1',
      emoji: '✨'
    }
  ];

  useEffect(() => {
    if (isStarted && currentSlide < slides.length - 1) {
      autoAdvanceRef.current = setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
      }, 3500);

      return () => {
        if (autoAdvanceRef.current) {
          clearTimeout(autoAdvanceRef.current);
        }
      };
    } else if (currentSlide === slides.length - 1) {
      autoAdvanceRef.current = setTimeout(() => {
        onComplete();
      }, 3000);
    }
  }, [currentSlide, isStarted]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const startWrapped = () => {
    setIsStarted(true);
    setCurrentSlide(0);
  };

  if (!isStarted) {
    return (
      <div 
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '20px',
          cursor: 'pointer'
        }}
        onClick={startWrapped}
      >
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛍️</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
          Your 2024 Shopping Wrapped
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, textAlign: 'center' }}>
          Discover your year in purchases
        </p>
        <div style={{
          padding: '16px 32px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '25px',
          fontWeight: 'bold'
        }}>
          Let's Go! ✨
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: currentSlideData.backgroundColor,
        color: 'white',
        cursor: 'pointer',
        position: 'relative'
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
        gap: '4px'
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
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        {currentSlideData.emoji && (
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
            {currentSlideData.emoji}
          </div>
        )}

        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {currentSlideData.title}
        </h1>

        {currentSlideData.value && (
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            margin: '20px 0',
            textAlign: 'center'
          }}>
            {currentSlideData.value}
          </div>
        )}

        {currentSlideData.description && (
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center', 
            opacity: 0.9,
            maxWidth: '80%',
            margin: '0 auto'
          }}>
            {currentSlideData.description}
          </p>
        )}
      </div>

      {/* Next indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '12px 24px',
        borderRadius: '20px',
        fontSize: '0.9rem'
      }}>
        {currentSlide === slides.length - 1 ? 'Tap to see recommendations' : 'Tap to continue'}
      </div>
    </div>
  );
}