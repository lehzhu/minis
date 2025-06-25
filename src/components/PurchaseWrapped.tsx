import React, { useState, useEffect } from 'react';
import WrappedSlides from './WrappedSlides';
import ProductRecommendations from './ProductRecommendations';
import { calculateWrappedStats } from '../utils/wrappedCalculations';
import type { WrappedData } from '../types';

// Try the SDK import, fallback to mock if not available
let useMinisQuery: any;
try {
  const sdk = require('@shopify/shop-minis-platform-sdk');
  useMinisQuery = sdk.useMinisQuery;
} catch (e) {
  console.log('SDK not available, using mock data');
  // Mock hook for development
  useMinisQuery = (query: string, options: any) => ({
    loading: false,
    error: null,
    data: {
      buyer: {
        id: 'mock-buyer',
        orders: {
          edges: [
            {
              node: {
                id: '1',
                processedAt: '2024-03-15T10:00:00Z',
                totalPrice: { amount: '150.00', currencyCode: 'USD' },
                lineItems: {
                  edges: [
                    {
                      node: {
                        id: '1',
                        title: 'Cool Product',
                        quantity: 1,
                        product: {
                          id: '1',
                          title: 'Cool Product',
                          productType: 'Clothing',
                          vendor: 'Cool Brand',
                          tags: ['fashion']
                        },
                        variant: {
                          id: '1',
                          title: 'Default',
                          price: { amount: '150.00', currencyCode: 'USD' }
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  });
}

const BUYER_ORDERS_QUERY = `
  query BuyerOrdersWrapped($first: Int = 100) {
    buyer {
      id
      orders(first: $first) {
        edges {
          node {
            id
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 20) {
              edges {
                node {
                  id
                  title
                  quantity
                  product {
                    id
                    title
                    productType
                    vendor
                    tags
                  }
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function PurchaseWrapped() {
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const { loading, error, data } = useMinisQuery(BUYER_ORDERS_QUERY, {
    variables: { first: 100 }
  });

  useEffect(() => {
    if (data?.buyer?.orders) {
      try {
        const orders = data.buyer.orders.edges.map((edge: any) => edge.node);
        const calculated = calculateWrappedStats(orders);
        setWrappedData(calculated);
      } catch (err) {
        console.error('Error calculating wrapped stats:', err);
      }
    }
  }, [data]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#7c3aed',
        color: 'white'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.3)',
          borderTop: '3px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <h2>Generating your 2024 Shopping Wrapped...</h2>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>Oops! Something went wrong</h2>
        <p>We couldn't load your shopping data right now.</p>
      </div>
    );
  }

  if (!wrappedData) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>No purchases found</h2>
        <p>Start shopping to see your 2024 wrapped!</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {showRecommendations ? (
        <ProductRecommendations 
          wrappedData={wrappedData}
          onBack={() => setShowRecommendations(false)}
        />
      ) : (
        <WrappedSlides 
          wrappedData={wrappedData}
          onComplete={() => setShowRecommendations(true)}
        />
      )}
    </div>
  );
}