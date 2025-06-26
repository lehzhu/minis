import { useState, useEffect } from 'react';

// Mock hooks with Shop Wrapped data
const useCurrentUser = () => ({
  user: {
    firstName: 'Alex',
    lastName: 'Smith',
    email: 'alex@example.com',
    memberSince: '2022-03-15',
    totalSpent: 2847.50,
    ordersCount: 23,
    favoriteCategories: ['Electronics', 'Fashion', 'Home & Garden']
  },
  loading: false
});

const useShopWrappedData = () => ({
  year: 2024,
  stats: {
    totalOrders: 23,
    totalSpent: 2847.50,
    avgOrderValue: 123.80,
    topCategory: 'Electronics',
    favoriteShop: 'TechHub Electronics',
    biggestSplurge: 399.99,
    savingsFromDeals: 234.50,
    mostActiveMonth: 'November',
    shoppingStreak: 5, // consecutive months with purchases
    eco_friendly_purchases: 7
  },
  monthlySpending: [
    { month: 'Jan', amount: 145.99, orders: 2 },
    { month: 'Feb', amount: 89.50, orders: 1 },
    { month: 'Mar', amount: 234.99, orders: 3 },
    { month: 'Apr', amount: 178.25, orders: 2 },
    { month: 'May', amount: 299.99, orders: 2 },
    { month: 'Jun', amount: 156.75, orders: 1 },
    { month: 'Jul', amount: 345.50, orders: 4 },
    { month: 'Aug', amount: 189.99, orders: 2 },
    { month: 'Sep', amount: 267.80, orders: 2 },
    { month: 'Oct', amount: 298.75, orders: 2 },
    { month: 'Nov', amount: 445.99, orders: 3 },
    { month: 'Dec', amount: 395.00, orders: 2 }
  ],
  topProducts: [
    {
      id: '1',
      title: 'Wireless Noise-Cancelling Headphones',
      category: 'Electronics',
      price: 249.99,
      timesOrdered: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Smart Fitness Watch Pro',
      category: 'Electronics',
      price: 399.99,
      timesOrdered: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Organic Cotton T-Shirt Set',
      category: 'Fashion',
      price: 89.99,
      timesOrdered: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
    }
  ],
  categoryBreakdown: [
    { category: 'Electronics', amount: 1245.50, percentage: 44, orders: 8 },
    { category: 'Fashion', amount: 678.25, percentage: 24, orders: 6 },
    { category: 'Home & Garden', amount: 456.75, percentage: 16, orders: 4 },
    { category: 'Health & Beauty', amount: 234.50, percentage: 8, orders: 3 },
    { category: 'Books & Media', amount: 232.50, percentage: 8, orders: 2 }
  ],
  topShops: [
    { name: 'TechHub Electronics', orders: 8, spent: 1245.50, logo: '🔌' },
    { name: 'Urban Fashion Co.', orders: 6, spent: 678.25, logo: '👕' },
    { name: 'Home Essentials', orders: 4, spent: 456.75, logo: '🏠' },
    { name: 'Wellness Store', orders: 3, spent: 234.50, logo: '💚' },
    { name: 'Book Corner', orders: 2, spent: 232.50, logo: '📚' }
  ],
  personality: {
    type: 'The Tech Enthusiast',
    description: 'You love cutting-edge gadgets and aren\'t afraid to invest in quality technology.',
    traits: ['Early Adopter', 'Quality Seeker', 'Deal Hunter'],
    shoppingStyle: 'Research-driven and tech-focused'
  },
  achievements: [
    { id: 'big_spender', title: 'Big Spender', description: 'Spent over $2000 this year', icon: '💎' },
    { id: 'loyal_customer', title: 'Loyal Customer', description: '5+ orders from the same shop', icon: '🏆' },
    { id: 'deal_hunter', title: 'Deal Hunter', description: 'Saved $200+ with deals', icon: '🎯' },
    { id: 'eco_warrior', title: 'Eco Warrior', description: '7 eco-friendly purchases', icon: '🌱' },
    { id: 'trend_setter', title: 'Trend Setter', description: 'First to try new products', icon: '⭐' }
  ]
});

const useErrorToast = () => (message: string, type: 'success' | 'error' | 'warning' = 'error') => {
  const colors = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500' };
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  
  const toast = document.createElement('div');
  toast.innerHTML = `${icons[type]} ${message}`;
  toast.className = `fixed top-4 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg z-50`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
};

const useShare = () => ({
  share: async (data: any) => {
    console.log('📤 Sharing Shop Wrapped:', data);
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard?.writeText(data.url || data.text);
    }
  }
});

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Chart component for spending over time
const SpendingChart = ({ data }: { data: any[] }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="h-64 flex items-end gap-2 bg-gradient-to-t from-purple-50 to-transparent p-4 rounded-lg">
      {data.map((month, index) => (
        <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md transition-all duration-1000 delay-100 w-full min-h-[4px]"
            style={{
              height: `${(month.amount / maxAmount) * 200}px`
            }}
          />
          <div className="text-xs text-gray-600 font-medium">{month.month}</div>
          <div className="text-xs text-gray-500">${month.amount}</div>
        </div>
      ))}
    </div>
  );
};

// Category donut chart component
const CategoryChart = ({ data }: { data: any[] }) => {
  let cumulativePercentage = 0;
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {data.map((category, index) => {
            const startPercentage = cumulativePercentage;
            cumulativePercentage += category.percentage;
            
            const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
            const color = colors[index % colors.length];
            
            return (
              <circle
                key={category.category}
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={`${category.percentage} ${100 - category.percentage}`}
                strokeDashoffset={-startPercentage}
                className="transition-all duration-1000"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">$2,847</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shop Wrapped Component
export function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { user } = useCurrentUser();
  const wrappedData = useShopWrappedData();
  const showToast = useErrorToast();
  const { share } = useShare();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handle edge tap navigation
  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tapX = event.clientX - rect.left;
    const screenWidth = rect.width;
    
    // Left third of screen = previous
    if (tapX < screenWidth / 3) {
      prevSlide();
    }
    // Right two-thirds of screen = next
    else if (tapX > screenWidth / 3) {
      nextSlide();
    }
  };

  const handleShare = async () => {
    try {
      await share({
        title: `${user.firstName}'s Shop Wrapped ${wrappedData.year}`,
        text: `I spent $${wrappedData.stats.totalSpent} across ${wrappedData.stats.totalOrders} orders this year! Check out my Shop Wrapped.`,
        url: 'https://shop.app/wrapped'
      });
      showToast('Shop Wrapped shared! 📤', 'success');
    } catch (error) {
      showToast('Copied to clipboard! 📋', 'success');
    }
  };

  const slides = [
    // Welcome Slide
    {
      id: 'welcome',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Shop Wrapped
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {wrappedData.year}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your year in shopping, wrapped up with insights, achievements, and surprises
          </p>
          <div className="pt-4">
            <div className="text-xl font-medium text-gray-700">
              Hey {user.firstName}! 👋
            </div>
            <div className="text-gray-600">
              Ready to see your shopping journey?
            </div>
          </div>
        </div>
      )
    },

    // Total Orders Slide
    {
      id: 'orders',
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-3xl font-bold text-gray-800">
            You placed
          </h2>
          <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            <AnimatedCounter end={wrappedData.stats.totalOrders} />
          </div>
          <div className="text-2xl font-semibold text-gray-700">
            orders this year
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto">
            <div className="text-sm text-gray-600">That's one order every</div>
            <div className="text-lg font-bold text-gray-800">
              {Math.round(365 / wrappedData.stats.totalOrders)} days
            </div>
          </div>
        </div>
      )
    },

    // Total Spending Slide
    {
      id: 'spending',
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-3xl font-bold text-gray-800">
            You spent
          </h2>
          <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            $<AnimatedCounter end={wrappedData.stats.totalSpent} />
          </div>
          <div className="text-xl font-semibold text-gray-700">
            across all your purchases
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-gray-600">Average order</div>
              <div className="text-lg font-bold text-gray-800">
                ${wrappedData.stats.avgOrderValue}
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-gray-600">Biggest purchase</div>
              <div className="text-lg font-bold text-gray-800">
                ${wrappedData.stats.biggestSplurge}
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Top Category Slide
    {
      id: 'category',
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-4">🔌</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your top category was
          </h2>
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {wrappedData.stats.topCategory}
          </div>
          <div className="text-xl text-gray-700">
            You're clearly a tech enthusiast! 🤓
          </div>
          <div className="max-w-md mx-auto">
            <CategoryChart data={wrappedData.categoryBreakdown} />
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {wrappedData.categoryBreakdown.map((cat, index) => {
              const colors = ['bg-purple-500', 'bg-cyan-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
              return (
                <div key={cat.category} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                  <span className="text-gray-700">{cat.category}</span>
                </div>
              );
            })}
          </div>
        </div>
      )
    },

    // Spending Timeline Slide
    {
      id: 'timeline',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your spending timeline
          </h2>
          <div className="text-xl text-gray-700">
            November was your biggest shopping month
          </div>
          <div className="max-w-4xl mx-auto">
            <SpendingChart data={wrappedData.monthlySpending} />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto">
            <div className="text-sm text-gray-600">Peak spending month</div>
            <div className="text-lg font-bold text-gray-800">
              {wrappedData.stats.mostActiveMonth}: $445.99
            </div>
          </div>
        </div>
      )
    },

    // Top Products Slide
    {
      id: 'products',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your favorite purchases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {wrappedData.topProducts.map((product, index) => (
              <div key={product.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.title}</h3>
                <div className="text-lg font-bold text-green-600">${product.price}</div>
                <div className="text-xs text-gray-600">{product.category}</div>
                {index === 0 && (
                  <div className="mt-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                    #1 Purchase
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Shopping Personality Slide
    {
      id: 'personality',
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your shopping personality
          </h2>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {wrappedData.personality.type}
          </div>
          <p className="text-lg text-gray-700 max-w-md mx-auto">
            {wrappedData.personality.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {wrappedData.personality.traits.map(trait => (
              <div key={trait} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                {trait}
              </div>
            ))}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <div className="text-sm text-gray-600">Shopping style</div>
            <div className="font-semibold text-gray-800">
              {wrappedData.personality.shoppingStyle}
            </div>
          </div>
        </div>
      )
    },

    // Achievements Slide
    {
      id: 'achievements',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your achievements
          </h2>
          <div className="text-lg text-gray-700">
            You unlocked {wrappedData.achievements.length} badges this year!
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {wrappedData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="font-semibold text-gray-800">{achievement.title}</div>
                </div>
                <div className="text-sm text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Share Slide
    {
      id: 'share',
      content: (
        <div className="text-center space-y-8">
          <div className="text-6xl mb-4">📤</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Share your Shop Wrapped
          </h2>
          <div className="text-lg text-gray-700">
            Show off your shopping stats with friends!
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <div className="text-sm text-gray-600 mb-4">Your {wrappedData.year} highlights</div>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-700">Total orders:</span>
                <span className="font-bold">{wrappedData.stats.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Amount spent:</span>
                <span className="font-bold">${wrappedData.stats.totalSpent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Top category:</span>
                <span className="font-bold">{wrappedData.stats.topCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Personality:</span>
                <span className="font-bold text-sm">{wrappedData.personality.type}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleShare}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
          >
            Share My Shop Wrapped 📤
          </button>

          <div className="text-sm text-gray-600">
            Thanks for an amazing shopping year, {user.firstName}! 🎉
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Story-style progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 safe-area-inset-top">
        <div className="flex gap-1 p-2">
          {slides.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white transition-all duration-300 ${
                  index < currentSlide ? 'w-full' : 
                  index === currentSlide ? 'w-full animate-pulse' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Full screen with tap navigation */}
      <div 
        className="pt-8 pb-20 min-h-screen cursor-pointer select-none"
        onClick={handleTap}
      >
        <div className="max-w-4xl mx-auto px-3">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            <div className="min-h-[80vh] flex items-center justify-center">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>
        
        {/* Invisible tap zones for visual feedback */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute left-0 top-0 w-1/3 h-full opacity-0" />
          <div className="absolute right-0 top-0 w-2/3 h-full opacity-0" />
        </div>
      </div>

      {/* Navigation Controls - iPhone mini friendly */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto px-3 py-3">
          {/* Main navigation buttons */}
          <div className="flex justify-center items-center gap-4 mb-3">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center justify-center gap-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[100px] text-sm font-medium"
            >
              ← Prev
            </button>
            
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-600 mr-2">
                {currentSlide + 1} of {slides.length}
              </span>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={currentSlide === slides.length - 1 ? handleShare : nextSlide}
              disabled={false}
              className="flex items-center justify-center gap-1 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all min-w-[100px] text-sm font-medium"
            >
              {currentSlide === slides.length - 1 ? 'Share' : 'Next'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
