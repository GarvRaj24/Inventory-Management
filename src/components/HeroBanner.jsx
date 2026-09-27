import React from 'react';
import { Sparkles, Gem, Clock, ShieldCheck, X } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function HeroBanner({
  totalProductsCount,
  inStockCount,
  filteredCount,
  currency,
  activeFilterCount,
  selectedCategories,
  setSelectedCategories,
  selectedColours,
  setSelectedColours,
  maxPrice,
  maxPriceLimit,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  exclusiveOnly,
  setExclusiveOnly,
  onResetFilters
}) {
  return (
    <div className="relative mb-8 sm:mb-12">
      {/* Decorative Editorial Header */}
      <div className="py-6 sm:py-10 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[11px] font-mono tracking-widest uppercase mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Atelier Showcase 2026 • Private Client Preview</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 dark:text-stone-100 tracking-tight leading-[1.1] mb-4">
          Timeless Elegance, <br className="hidden sm:inline" />
          <span className="italic font-light text-amber-800 dark:text-amber-400">Curated For Connoisseurs</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed font-light">
          Explore our real-time interactive inventory of artisanal leatherware, Swiss haute horlogerie, fine gemstones, and pure cashmere.
        </p>
      </div>

      {/* Boutique Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4 mb-6">
        <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs text-center backdrop-blur-sm">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono block">Vault Total</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">{totalProductsCount}</span>
          <span className="text-[10px] text-stone-500 block">Boutique Masterpieces</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs text-center backdrop-blur-sm">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono block">Vault Status</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">{inStockCount}</span>
          <span className="text-[10px] text-stone-500 block">Immediately Dispatchable</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs text-center backdrop-blur-sm">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono block">Active Match</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-amber-700 dark:text-amber-400">{filteredCount}</span>
          <span className="text-[10px] text-stone-500 block">Filtered in Viewport</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs text-center backdrop-blur-sm">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono block">Origin Verified</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">100%</span>
          <span className="text-[10px] text-stone-500 block">Certificates Included</span>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-100/80 dark:bg-stone-900/80 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
            <span className="font-semibold text-stone-500 text-[11px] uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {/* Selected Categories */}
            {selectedCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400 transition-colors"
              >
                <span>{cat}</span>
                <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
              </button>
            ))}

            {/* Selected Colours */}
            {selectedColours.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setSelectedColours(prev => prev.filter(c => c !== col))}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400 transition-colors"
              >
                <span>Tone: {col}</span>
                <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
              </button>
            ))}

            {/* Price Cap */}
            {maxPrice < maxPriceLimit && (
              <button
                type="button"
                onClick={() => setMaxPrice(maxPriceLimit)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400 transition-colors"
              >
                <span>Max: {formatPrice(maxPrice, currency)}</span>
                <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
              </button>
            )}

            {/* In stock only */}
            {inStockOnly && (
              <button
                type="button"
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400 transition-colors"
              >
                <span>In Stock Only</span>
                <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
              </button>
            )}

            {/* Exclusive only */}
            {exclusiveOnly && (
              <button
                type="button"
                onClick={() => setExclusiveOnly(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400 transition-colors"
              >
                <span>Exclusive Only</span>
                <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
              </button>
            )}

            {/* Clear All */}
            <button
              onClick={onResetFilters}
              type="button"
              className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:underline ml-auto pr-1"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
