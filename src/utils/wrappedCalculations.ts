import type { WrappedData, Order } from '../types';

export function calculateWrappedStats(orders: Order[]): WrappedData {
  // Filter orders for current year (2024)
  const currentYear = new Date().getFullYear();
  const yearOrders = orders.filter(order => {
    const orderYear = new Date(order.processedAt).getFullYear();
    return orderYear === currentYear;
  });

  if (yearOrders.length === 0) {
    return {
      totalSpent: 0,
      orderCount: 0,
      favoriteCategory: 'No purchases yet',
      topBrand: 'No purchases yet',
      mostExpensiveItem: null,
      averageOrderValue: 0,
      shoppingStreak: 0,
      personalityType: 'New Shopper',
      monthlyBreakdown: {}
    };
  }

  // Calculate total spent
  const totalSpent = yearOrders.reduce((sum, order) => {
    return sum + parseFloat(order.totalPrice.amount);
  }, 0);

  // Track categories, brands, and monthly spending
  const categories: { [key: string]: number } = {};
  const brands: { [key: string]: number } = {};
  const monthlySpending: { [key: string]: number } = {};
  let mostExpensiveItem = null;
  let maxPrice = 0;

  yearOrders.forEach(order => {
    const month = new Date(order.processedAt).toLocaleDateString('en-US', { month: 'long' });
    monthlySpending[month] = (monthlySpending[month] || 0) + parseFloat(order.totalPrice.amount);

    order.lineItems.edges.forEach(({ node: item }) => {
      // Track categories
      const category = item.product.productType || 'Other';
      categories[category] = (categories[category] || 0) + item.quantity;

      // Track brands
      const brand = item.product.vendor || 'Unknown Brand';
      brands[brand] = (brands[brand] || 0) + item.quantity;

      // Find most expensive item
      const itemPrice = parseFloat(item.variant.price.amount) * item.quantity;
      if (itemPrice > maxPrice) {
        maxPrice = itemPrice;
        mostExpensiveItem = item;
      }
    });
  });

  // Get favorite category and top brand
  const favoriteCategory = Object.keys(categories).length > 0 
    ? Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b)
    : 'No category';

  const topBrand = Object.keys(brands).length > 0
    ? Object.keys(brands).reduce((a, b) => brands[a] > brands[b] ? a : b)
    : 'No brand';

  // Calculate shopping streak
  const shoppingStreak = new Set(
    yearOrders.map(order => new Date(order.processedAt).toISOString().slice(0, 7))
  ).size;

  // Determine personality type
  const personalityType = determineShoppingPersonality(yearOrders, categories, totalSpent);

  return {
    totalSpent,
    orderCount: yearOrders.length,
    favoriteCategory,
    topBrand,
    mostExpensiveItem,
    averageOrderValue: totalSpent / yearOrders.length,
    shoppingStreak,
    personalityType,
    monthlyBreakdown: monthlySpending
  };
}

function determineShoppingPersonality(orders: Order[], categories: { [key: string]: number }, totalSpent: number): string {
  const orderCount = orders.length;
  const avgOrderValue = totalSpent / orderCount;
  
  const topCategory = Object.keys(categories).length > 0
    ? Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b)
    : '';

  if (orderCount > 50 && avgOrderValue < 50) return "The Frequent Finder";
  if (avgOrderValue > 200) return "The Luxury Lover";
  if (topCategory.toLowerCase().includes('home')) return "The Nest Builder";
  if (topCategory.toLowerCase().includes('clothing')) return "The Style Seeker";
  if (orderCount < 5) return "The Mindful Shopper";
  if (avgOrderValue > 100 && orderCount < 20) return "The Quality Curator";
  if (topCategory.toLowerCase().includes('electronics')) return "The Tech Enthusiast";
  
  return "The Balanced Buyer";
}