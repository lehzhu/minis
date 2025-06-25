export interface WrappedData {
    totalSpent: number;
    orderCount: number;
    favoriteCategory: string;
    topBrand: string;
    mostExpensiveItem: any;
    averageOrderValue: number;
    shoppingStreak: number;
    personalityType: string;
    monthlyBreakdown: { [key: string]: number };
  }
  
  export interface Order {
    id: string;
    processedAt: string;
    totalPrice: {
      amount: string;
      currencyCode: string;
    };
    lineItems: {
      edges: Array<{
        node: LineItem;
      }>;
    };
  }
  
  export interface LineItem {
    id: string;
    title: string;
    quantity: number;
    product: Product;
    variant: ProductVariant;
  }
  
  export interface Product {
    id: string;
    title: string;
    productType: string;
    vendor: string;
    tags: string[];
  }
  
  export interface ProductVariant {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  }