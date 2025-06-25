import React, { useState, useEffect } from 'react';
import { 
  useMinisQuery, 
  Box, 
  Text, 
  Spinner
} from '@shopify/shop-minis-platform-sdk';
import type { WrappedData } from '../types';

interface ProductRecommendationsProps {
  wrappedData: WrappedData;
  onBack: () => void;
}

const PRODUCT_SEARCH_QUERY = `
  query ProductSearch($query: String!, $first: Int = 8) {
    search(query: $query, first: $first) {
      edges {
        node {
          ... on MarketplaceProduct {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            vendor
          }
        }
      }
    }
  }
`;

export default function ProductRecommendations({ wrappedData, onBack }: ProductRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (wrappedData.favoriteCategory && wrappedData.favoriteCategory !== 'No category') {
      setSearchQuery(`${wrappedData.favoriteCategory}`);
    } else {
      setSearchQuery('trending');
    }
  }, [wrappedData]);

  const { loading, data } = useMinisQuery(PRODUCT_SEARCH_QUERY, {
    variables: { 
      query: searchQuery,
      first: 8 
    }
  });

  const recommendations = data?.search?.edges?.map((edge: any) => edge.node) || [];

  return (
    <Box flex={1} backgroundColor="purple700">
      <Box padding="l" paddingTop="xl">
        <Box 
          position="absolute"
          top={20}
          left={20}
          backgroundColor="whiteAlpha200"
          width={40}
          height={40}
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          onPress={onBack}
        >
          <Text variant="bodyLargeBold" color="white">←</Text>
        </Box>
        
        <Text variant="headingLarge" color="white" textAlign="center" marginBottom="s">
          Perfect for a {wrappedData.personalityType} like you
        </Text>
        <Text variant="bodyLarge" color="whiteAlpha700" textAlign="center">
          Based on your love for {wrappedData.favoriteCategory}
        </Text>
      </Box>

      {loading && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" />
          <Text variant="bodyLarge" color="white" marginTop="m">
            Finding perfect products for you...
          </Text>
        </Box>
      )}

      {!loading && recommendations.length > 0 && (
        <Box padding="l" flex={1}>
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {recommendations.map((product: any) => (
              <Box 
                key={product.id}
                width="48%" 
                backgroundColor="whiteAlpha100" 
                borderRadius="m" 
                padding="m" 
                marginBottom="m"
              >
                <Box 
                  width="100%" 
                  height={120} 
                  backgroundColor="whiteAlpha200" 
                  borderRadius="s" 
                  marginBottom="m"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text variant="headingMedium">🛍️</Text>
                </Box>

                <Text 
                  variant="bodyMediumBold" 
                  color="white" 
                  numberOfLines={2}
                  marginBottom="xs"
                >
                  {product.title}
                </Text>

                <Text variant="bodyLargeBold" color="white">
                  ${product.priceRange.minVariantPrice.amount}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {!loading && recommendations.length === 0 && (
        <Box flex={1} justifyContent="center" alignItems="center" padding="l">
          <Text variant="bodyLarge" color="white" textAlign="center">
            No recommendations found. Try exploring the Shop app!
          </Text>
        </Box>
      )}
    </Box>
  );
}