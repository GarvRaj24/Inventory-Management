import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, COLOR_PALETTE } from './data/products';
import { useDarkMode } from './hooks/useDarkMode';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SidebarFilter from './components/SidebarFilter';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Toast from './components/Toast';
import { SlidersHorizontal, X, ArrowUp } from 'lucide-react';

export default function App() {
  // 1. Persistent Dark Mode Hook (updates <body> tag and localStorage)
  const { isDark, toggleDarkMode } = useDarkMode();

  // 2. Currency State
  const [currency, setCurrency] = useState('USD');

  // 3. Search & Layout State
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState('masonry'); // 'masonry' or 'grid'

  // 4. Filtering States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  
  // Calculate price bounds from products
  const minPriceLimit = useMemo(() => {
    return Math.min(...PRODUCTS.map(p => p.price));
  }, []);

  const maxPriceLimit = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price));
  }, []);

  const [maxPrice, setMaxPrice] = useState(5000);

  // Additional filter toggles
  const [inStockOnly, setInStockOnly] = useState(false);
  const [exclusiveOnly, setExclusiveOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  // 5. Interactive UI States: Modals, Drawers & Mobile Drawer
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 6. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (title, desc = '', type = 'info') => {
    setToast({ title, desc, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Reset all filters function
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedColours([]);
    setMaxPrice(maxPriceLimit);
    setInStockOnly(false);
    setExclusiveOnly(false);
    setOnSaleOnly(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
    showToast('Filters Cleared', 'Displaying all boutique creations', 'info');
  };

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedColours.length > 0) count += selectedColours.length;
    if (maxPrice < maxPriceLimit) count += 1;
    if (inStockOnly) count += 1;
    if (exclusiveOnly) count += 1;
    if (onSaleOnly) count += 1;
    if (minRating > 0) count += 1;
    if (searchQuery.trim().length > 0) count += 1;
    return count;
  }, [
    selectedCategories,
    selectedColours,
    maxPrice,
    maxPriceLimit,
    inStockOnly,
    exclusiveOnly,
    onSaleOnly,
    minRating,
    searchQuery
  ]);

  // Dynamic Category item counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(c => { counts[c] = 0; });
    PRODUCTS.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Dynamic Colour counts
  const colourCounts = useMemo(() => {
    const counts = {};
    COLOR_PALETTE.forEach(c => { counts[c.name] = 0; });
    PRODUCTS.forEach(p => {
      if (counts[p.colour] !== undefined) {
        counts[p.colour]++;
      }
    });
    return counts;
  }, []);

  // REAL-TIME INSTANT CLIENT-SIDE FILTERING & SORTING
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Keyword search (name, SKU, designer, description, materials)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.designer.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q) ||
        p.colour.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 3. Colour Filter
    if (selectedColours.length > 0) {
      result = result.filter(p => selectedColours.includes(p.colour));
    }

    // 4. Price slider filter
    result = result.filter(p => p.price <= maxPrice);

    // 5. In stock only (≥ 3 stock)
    if (inStockOnly) {
      result = result.filter(p => p.stock >= 3);
    }

    // 6. Exclusive only
    if (exclusiveOnly) {
      result = result.filter(p => p.isExclusive);
    }

    // 7. On sale / special privilege
    if (onSaleOnly) {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }

    // 8. Rating threshold
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 9. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
    });

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedColours,
    maxPrice,
    inStockOnly,
    exclusiveOnly,
    onSaleOnly,
    minRating,
    sortBy
  ]);

  // Quick View Handler
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some(i => i.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(i => i.id !== product.id));
      showToast('Removed from Wishlist', product.name, 'wishlist');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Saved to Wishlist', product.name, 'wishlist');
    }
  };

  const handleRemoveWishlist = (product) => {
    setWishlist(prev => prev.filter(i => i.id !== product.id));
    showToast('Removed from Wishlist', product.name, 'wishlist');
  };

  // Cart / Bag Handlers
  const handleAddToCart = (product, quantity = 1, size = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === chosenSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(product.stock, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        return [...prev, { product, quantity, size: chosenSize }];
      }
    });
    showToast('Added to Boutique Bag', `${quantity}x ${product.name}`, 'cart');
  };

  const handleUpdateCartQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        (item.product.id === productId && item.size === size)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
    showToast('Item Removed', 'Updated boutique bag contents', 'info');
  };

  const handleCheckout = () => {
    showToast('Private Concierge Contacted', 'Our VIP concierge will reach out to fulfill your order.', 'success');
    setIsCartOpen(false);
  };

  // Scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfb] dark:bg-[#0c0a09] transition-colors duration-300">
      
      {/* 1. Global Boutique Header */}
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        activeFilterCount={activeFilterCount}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        totalProductsCount={PRODUCTS.length}
      />

      {/* 2. Main Page Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Editorial Hero & Metrics Banner */}
        <HeroBanner
          totalProductsCount={PRODUCTS.length}
          inStockCount={PRODUCTS.filter(p => p.stock >= 3).length}
          filteredCount={filteredProducts.length}
          currency={currency}
          activeFilterCount={activeFilterCount}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedColours={selectedColours}
          setSelectedColours={setSelectedColours}
          maxPrice={maxPrice}
          maxPriceLimit={maxPriceLimit}
          setMaxPrice={setMaxPrice}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          exclusiveOnly={exclusiveOnly}
          setExclusiveOnly={setExclusiveOnly}
          onResetFilters={handleResetFilters}
        />

        {/* Dynamic Showcase Body: Sidebar + Advanced CSS Grid / Masonry */}
        <div className="flex gap-8 items-start">
          
          {/* Desktop Sidebar Filtering */}
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-28 bg-white/60 dark:bg-stone-900/60 p-5 rounded-3xl border border-stone-200/90 dark:border-stone-800/90 backdrop-blur-sm shadow-xs transition-colors duration-300">
            <SidebarFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedColours={selectedColours}
              setSelectedColours={setSelectedColours}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minPriceLimit={minPriceLimit}
              maxPriceLimit={maxPriceLimit}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              exclusiveOnly={exclusiveOnly}
              setExclusiveOnly={setExclusiveOnly}
              onSaleOnly={onSaleOnly}
              setOnSaleOnly={setOnSaleOnly}
              minRating={minRating}
              setMinRating={setMinRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
              categoryCounts={categoryCounts}
              colourCounts={colourCounts}
              currency={currency}
              totalFilteredCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            
            {/* Grid Status Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/60 dark:border-stone-800/60">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                Showing <strong className="text-stone-900 dark:text-stone-100">{filteredProducts.length}</strong> of {PRODUCTS.length} vault creations
              </div>

              {/* Mobile Filter Toggle pill */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-700 dark:text-stone-200"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter ({activeFilterCount})</span>
                </button>
              </div>
            </div>

            {/* Masonry / Grid Display */}
            <ProductGrid
              products={filteredProducts}
              currency={currency}
              onQuickView={handleOpenQuickView}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(product) => handleAddToCart(product, 1)}
              layoutMode={layoutMode}
              onResetFilters={handleResetFilters}
              totalVaultCount={PRODUCTS.length}
            />

          </div>

        </div>

      </main>

      {/* Floating Mobile Filter Trigger Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          type="button"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Refine Selection</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-900 text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Sidebar Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-stone-900 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800">
                <span className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Filter Vault
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <SidebarFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedColours={selectedColours}
                setSelectedColours={setSelectedColours}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minPriceLimit={minPriceLimit}
                maxPriceLimit={maxPriceLimit}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                exclusiveOnly={exclusiveOnly}
                setExclusiveOnly={setExclusiveOnly}
                onSaleOnly={onSaleOnly}
                setOnSaleOnly={setOnSaleOnly}
                minRating={minRating}
                setMinRating={setMinRating}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
                categoryCounts={categoryCounts}
                colourCounts={colourCounts}
                currency={currency}
                totalFilteredCount={filteredProducts.length}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Quick View Modal (Frosted Glass Effect) */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlist.some(i => i.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        onCheckout={handleCheckout}
      />

      {/* 5. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onQuickView={handleOpenQuickView}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
        currency={currency}
      />

      {/* 6. Toast Notification */}
      <Toast
        message={toast}
        type={toast?.type}
        onClose={() => setToast(null)}
      />

      {/* 7. Boutique Footer */}
      <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-serif text-xl tracking-[0.2em] font-semibold text-stone-900 dark:text-stone-100 uppercase">
                Maison Étoile
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm">
                Fine craftsmanship, hand-finished leatherware, and haute horlogerie for discerning patrons worldwide.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400 font-mono">
              <span>Client Concierge</span>
              <span>Bespoke Authenticity</span>
              <span>Vault Insurance</span>
              <button
                onClick={scrollToTop}
                type="button"
                className="p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Return to top"
              >
                <ArrowUp className="w-4 h-4 text-stone-600 dark:text-stone-300" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-900 text-center text-[11px] font-mono text-stone-400">
            © {new Date().getFullYear()} MAISON ÉTOILE. All Rights Reserved. Dynamic Inventory Display & Showcase Platform.
          </div>
        </div>
      </footer>

    </div>
  );
}
