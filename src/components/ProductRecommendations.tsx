import React from 'react';
import type { WrappedData } from '../types';

interface ProductRecommendationsProps {
  wrappedData: WrappedData;
  onBack: () => void;
}

export default function ProductRecommendations({ wrappedData, onBack }: ProductRecommendationsProps) {
  // Mock recommendations for now
  const mockRecommendations = [
    { id: '1', title: 'Trending Item 1', price: '29.99' },
    { id: '2', title: 'Popular Product', price: '49.99' },
    { id: '3', title: 'Bestseller', price: '19.99' },
    { id: '4', title: 'New Arrival', price: '39.99' }
  ];

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#7c3aed',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ←
        </button>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          Perfect for a {wrappedData.personalityType} like you
        </h1>
        <p style={{ opacity: 0.9 }}>
          Based on your love for {wrappedData.favoriteCategory}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {mockRecommendations.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '100%',
              height: '120px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              🛍️
            </div>

            <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px' }}>
              {product.title}
            </h3>

            <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}