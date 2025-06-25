import React from 'react';
import { Box } from '@shopify/shop-minis-platform-sdk';
import PurchaseWrapped from './components/PurchaseWrapped';

function App() {
  return (
    <Box flex={1}>
      <PurchaseWrapped />
    </Box>
  );
}

export default App;