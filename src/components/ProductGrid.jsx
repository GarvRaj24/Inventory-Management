import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  products,
  currency,
  onQuickView,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  layoutMode = 'masonry',
  onResetFilters,
  totalVaultCount
}) {

  // If no products match the current filters
  if (products.length === 0) {
    return (
      <div className="min-h-[480px] flex flex-col items-center justify-center p-8 text-center bg-white/50 dark:bg-stone-900/40 rounded-3xl border border-stone-200/80 dark:border-stone-800/80 transition-all duration-300">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 text-stone-400">
          <SlidersHorizontal className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
          No Boutique Creations Found
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
          We could not find any pieces matching your current filter criteria. Consider widening your price tier or clearing selected hues.
        </p>
        <button
          onClick={onResetFilters}
          type="button"
          className="px-6 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 dark:hover:bg-stone-200 shadow-sm transition-all active:scale-[0.98]"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Boutique Inventory Grid">
      
      {/* Dynamic Grid Container with CSS Opacity Transitions */}
      {layoutMode === 'masonry' ? (
        /* Responsive Masonry-style image grid using multi-column masonry */
        <div className="columns-1 sm:columns-2 lg:columns-2 xl:columns-3 2xl:columns-4 gap-6 transition-all duration-500 ease-out">
          {products.map((product, idx) => (
            <div 
              key={product.id}
              className="break-inside-avoid mb-6 transition-all duration-500 ease-out animate-fadeIn"
              style={{
                animationDelay: `${idx * 40}ms`
              }}
            >
              <ProductCard
                product={product}
                currency={currency}
                onQuickView={onQuickView}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                layoutMode="masonry"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Advanced CSS Grid Layout with auto-adaptive columns */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 transition-all duration-500 ease-out">
          {products.map((product, idx) => (
            <div 
              key={product.id}
              className="transition-all duration-500 ease-out animate-fadeIn"
              style={{
                animationDelay: `${idx * 40}ms`
              }}
            >
              <ProductCard
                product={product}
                currency={currency}
                onQuickView={onQuickView}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                layoutMode="grid"
              />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
