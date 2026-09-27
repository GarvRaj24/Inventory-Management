import React from 'react';
import { 
  Moon, 
  Sun, 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  Sparkles,
  Grid,
  Columns
} from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function Header({
  isDark,
  toggleDarkMode,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenMobileFilter,
  activeFilterCount,
  layoutMode,
  setLayoutMode,
  totalProductsCount
}) {
  return (
    <header className="sticky top-0 z-30 frosted-glass border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      {/* Top Boutique Announcement Ticker */}
      <div className="bg-stone-900 text-stone-300 dark:bg-stone-950 dark:text-stone-400 py-1.5 px-4 text-xs tracking-widest text-center flex items-center justify-center gap-2 border-b border-stone-800">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="font-medium tracking-wider uppercase">
          Private Atelier Showcase • Complimentary Global Insured Delivery & Bespoke Courier
        </span>
        <span className="hidden md:inline-block text-stone-500">•</span>
        <span className="hidden md:inline-block text-amber-300/90 font-mono text-[11px]">
          {totalProductsCount} Curated Masterpieces in Vault
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Filter Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onOpenMobileFilter}
              type="button"
              className="relative p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              aria-label="Open Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Boutique Brand Identity */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-semibold text-stone-900 dark:text-stone-100 uppercase">
                Maison Étoile
              </span>
              <span className="text-[10px] font-mono tracking-widest bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                1894
              </span>
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 font-sans hidden sm:block">
              Dynamic Inventory Display & Atelier Showcase
            </span>
          </div>

          {/* Quick Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, SKU, cashmere, watch..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-stone-100/80 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 text-stone-900 dark:text-stone-100 placeholder-stone-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Layout, Currency, Theme, Wishlist, Bag */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* View Layout Mode Switcher (Grid vs Masonry) */}
            <div className="hidden sm:flex items-center bg-stone-100 dark:bg-stone-900 p-1 rounded-lg border border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setLayoutMode('masonry')}
                title="Masonry Dynamic Showcase"
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-all ${
                  layoutMode === 'masonry'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden lg:inline">Masonry</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                title="Structured CSS Grid"
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden lg:inline">Grid</span>
              </button>
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select Currency"
              className="bg-transparent text-xs font-mono font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
            >
              {Object.entries(CURRENCIES).map(([key, val]) => (
                <option key={key} value={key} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                  {val.label}
                </option>
              ))}
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              type="button"
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 border border-stone-200/80 dark:border-stone-800 transition-all"
              title={isDark ? "Switch to Daytime Luxe (Light)" : "Switch to Nocturne Luxe (Dark)"}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 rotate-0 transition-transform duration-300" />
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              type="button"
              className="relative p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 border border-stone-200/80 dark:border-stone-800 transition-colors"
              title="Saved Masterpieces"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Boutique Bag Trigger */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-sm"
              title="Boutique Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-stone-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Input Row */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search boutique items, SKU, atelier..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-stone-100/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
