import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from '@shopify/shop-minis-platform-sdk';
import type { WrappedData } from '../types';

interface WrappedSlidesProps {
  wrappedData: WrappedData;
  onComplete: () => void;
}

export default function WrappedSlides({ wrappedData, onComplete }: WrappedSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>('');
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  const slides = [
    {
      title: '2024 Shopping Wrapped',
      description: 'Your year in purchases ✨',
      backgroundColor: 'purple700',
      emoji: '🛍️'
    },
    {
      title: 'You spent',
      value: `$${wrappedData.totalSpent.toFixed(2)}`,
      description: 'this year',
      backgroundColor: 'pink500',
      emoji: '💰'
    },
    {
      title: 'Across',
      value: wrappedData.orderCount,
      description: wrappedData.orderCount === 1 ? 'order' : 'orders',
      backgroundColor: 'blue500',
      emoji: '📦'
    },
    {
      title: 'Your obsession',
      value: wrappedData.favoriteCategory,
      description: 'was your most shopped category',
      backgroundColor: 'green500',
      emoji: '❤️'
    },
    {
      title: 'Brand loyalty',
      value: wrappedData.topBrand,
      description: 'was your go-to brand',
      backgroundColor: 'orange500',
      emoji: '⭐'
    },
    {
      title: 'You are',
      value: wrappedData.personalityType,
      description: 'based on your shopping patterns',
      backgroundColor: 'cyan500',
      emoji: '🎭'
    },
    {
      title: "That's a wrap!",
      description: 'Ready for some recommendations?',
      backgroundColor: 'indigo500',
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
      <Box 
        flex={1} 
        justifyContent="center" 
        alignItems="center" 
        backgroundColor="purple700"
        padding="l"
        onPress={startWrapped}
      >
        <Text variant="displayLarge" textAlign="center" marginBottom="m">
          🛍️
        </Text>
        <Text variant="headingLarge" color="white" textAlign="center" marginBottom="s">
          Your 2024 Shopping Wrapped
        </Text>
        <Text variant="bodyLarge" color="whiteAlpha700" textAlign="center" marginBottom="xl">
          Discover your year in purchases
        </Text>
        <Box 
          backgroundColor="whiteAlpha200" 
          paddingHorizontal="xl" 
          paddingVertical="m" 
          borderRadius="full"
        >
          <Text variant="bodyLargeBold" color="white">
            Let's Go! ✨
          </Text>
        </Box>
      </Box>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <Box 
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={currentSlideData.backgroundColor}
      onPress={nextSlide}
    >
      {/* Progress bar */}
      <Box 
        position="absolute"
        top={60}
        left={20}
        right={20}
        flexDirection="row"
        gap="xs"
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            flex={1}
            height={3}
            backgroundColor={index <= currentSlide ? "white" : "whiteAlpha300"}
            borderRadius="xs"
          />
        ))}
      </Box>

      {/* Slide content */}
      <Box alignItems="center" paddingHorizontal="l">
        {currentSlideData.emoji && (
          <Text variant="displayLarge" textAlign="center" marginBottom="m">
            {currentSlideData.emoji}
          </Text>
        )}

        <Text 
          variant="headingLarge" 
          color="white"
          textAlign="center"
          marginBottom="m"
        >
          {currentSlideData.title}
        </Text>

        {currentSlideData.value && (
          <Text 
            variant="displayMedium" 
            color="white"
            textAlign="center"
            marginVertical="m"
          >
            {currentSlideData.value}
          </Text>
        )}

        {currentSlideData.description && (
          <Text 
            variant="bodyLarge" 
            color="white"
            textAlign="center"
            opacity={0.9}
          >
            {currentSlideData.description}
          </Text>
        )}
      </Box>

      {/* Next indicator */}
      <Box 
        position="absolute"
        bottom={40}
        backgroundColor="whiteAlpha200"
        paddingHorizontal="l"
        paddingVertical="m"
        borderRadius="full"
      >
        <Text variant="bodyMedium" color="white">
          {currentSlide === slides.length - 1 ? 'Tap to see recommendations' : 'Tap to continue'}
        </Text>
      </Box>
    </Box>
  );
}