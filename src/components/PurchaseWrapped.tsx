import React, { useState, useEffect } from 'react';
import { useMinisQuery, Box, Text, Spinner } from '@shopify/shop-minis-platform-sdk';
import WrappedSlides from './WrappedSlides';
import ProductRecommendations from './ProductRecommendations';
import { calculateWrappedStats } from '../utils/wrappedCalculations';
import type { WrappedData } from '../types';

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
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="purple700">
        <Spinner size="large" />
        <Text variant="bodyLargeBold" color="white" marginTop="m">
          Generating your 2024 Shopping Wrapped...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="red500" padding="l">
        <Text variant="headingLarge" color="white" marginBottom="m" textAlign="center">
          Oops! Something went wrong
        </Text>
        <Text variant="bodyLarge" color="white" textAlign="center">
          We couldn't load your shopping data right now.
        </Text>
      </Box>
    );
  }

  if (!wrappedData) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="blue500" padding="l">
        <Text variant="headingLarge" color="white" marginBottom="m" textAlign="center">
          No purchases found
        </Text>
        <Text variant="bodyLarge" color="white" textAlign="center">
          Start shopping to see your 2024 wrapped!
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1}>
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
    </Box>
  );
}