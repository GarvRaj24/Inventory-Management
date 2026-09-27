import React from 'react';
import { 
  RotateCcw, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Filter
} from 'lucide-react';
import { CATEGORIES, COLOR_PALETTE } from '../data/products';
import { formatPrice } from '../utils/formatters';

export default function SidebarFilter({
  selectedCategories,
  setSelectedCategories,
  selectedColours,
  setSelectedColours,
  maxPrice,
  setMaxPrice,
  minPriceLimit,
  maxPriceLimit,
  inStockOnly,
  setInStockOnly,
  exclusiveOnly,
  setExclusiveOnly,
  onSaleOnly,
  setOnSaleOnly,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  onResetFilters,
  activeFilterCount,
  categoryCounts,
  colourCounts,
  currency,
  totalFilteredCount,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {

  // Toggle category helper
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle colour helper
  const handleColourToggle = (colourName) => {
    setSelectedColours(prev =>
      prev.includes(colourName)
        ? prev.filter(c => c !== colourName)
        : [...prev, colourName]
    );
  };

  return (
    <aside className={`w-full text-stone-900 dark:text-stone-100 ${isMobileDrawer ? 'p-6' : 'py-2 pr-4'}`}>
      
      {/* Top Filter Header & Reset */}
      <div className="flex items-center justify-between pb-5 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="text-base font-serif font-semibold tracking-wide uppercase">
            Curated Filters
          </h2>
          {activeFilterCount > 0 && (
            <span className="text-[11px] font-mono bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-2 py-0.5 rounded-full font-bold">
              {activeFilterCount} active
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            type="button"
            className="text-xs text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Sorting Control */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800">
        <label htmlFor="sort-select" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
          Sort Inventory
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-stone-400 focus:outline-none cursor-pointer"
        >
          <option value="featured">Featured / Atelier Curated</option>
          <option value="price-asc">Price: Ascending (Lowest)</option>
          <option value="price-desc">Price: Descending (Highest)</option>
          <option value="rating-desc">Customer Rating (Highest)</option>
          <option value="newest">Newest Acquisitions</option>
          <option value="name-asc">Title: Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="price-range" className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Maximum Price
          </label>
          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
            {formatPrice(maxPrice, currency)}
          </span>
        </div>

        {/* Range Slider with native JavaScript event listener */}
        <input
          id="price-range"
          type="range"
          min={minPriceLimit}
          max={maxPriceLimit}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
          aria-label="Filter products by maximum price"
        />

        <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1.5">
          <span>{formatPrice(minPriceLimit, currency)}</span>
          <span>{formatPrice(maxPriceLimit, currency)}</span>
        </div>

        {/* Quick Price Buttons */}
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {[1000, 2000, maxPriceLimit].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setMaxPrice(tier)}
              className={`py-1 px-1.5 text-[10px] font-mono rounded border transition-colors ${
                maxPrice === tier 
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100'
                  : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
              }`}
            >
              ≤ {formatPrice(tier, currency)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter (Custom Checkboxes) */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3.5">
          Atelier Categories
        </h3>
        <div className="space-y-2.5">
          {CATEGORIES.map((category) => {
            const isChecked = selectedCategories.includes(category);
            const count = categoryCounts[category] || 0;
            return (
              <label
                key={category}
                className="flex items-center justify-between group cursor-pointer select-none py-0.5"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(category)}
                    className="boutique-checkbox"
                    aria-label={`Filter by ${category}`}
                  />
                  <span className={`text-xs transition-colors ${
                    isChecked 
                      ? 'font-semibold text-stone-900 dark:text-stone-100' 
                      : 'text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200'
                  }`}>
                    {category}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Colour Palette Swatches & Checkboxes */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Shade & Tone
          </h3>
          {selectedColours.length > 0 && (
            <button
              onClick={() => setSelectedColours([])}
              type="button"
              className="text-[10px] text-amber-700 dark:text-amber-400 hover:underline"
            >
              Reset tones
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {COLOR_PALETTE.map((c) => {
            const isSelected = selectedColours.includes(c.name);
            const count = colourCounts[c.name] || 0;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => handleColourToggle(c.name)}
                className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800/80 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800/70 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
                title={`${c.name} (${count} available)`}
              >
                <span 
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border border-stone-300/40 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check className={`w-2.5 h-2.5 ${
                      c.name === 'Ivory' || c.name === 'Rose Gold' || c.name === 'Champagne'
                        ? 'text-stone-900' 
                        : 'text-white'
                    }`} />
                  )}
                </span>
                <span className="text-[11px] truncate text-stone-700 dark:text-stone-300">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Status & Exclusive Toggles */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
          Inventory Availability
        </h3>

        {/* In-Stock Only */}
        <label className="flex items-center justify-between group cursor-pointer select-none">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="boutique-checkbox"
            />
            <span className="text-xs text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              In Stock Only (≥ 3 items)
            </span>
          </div>
        </label>

        {/* Exclusive Boutique Masterpieces */}
        <label className="flex items-center justify-between group cursor-pointer select-none">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={exclusiveOnly}
              onChange={(e) => setExclusiveOnly(e.target.checked)}
              className="boutique-checkbox"
            />
            <span className="text-xs text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Exclusive & Bespoke Pieces
            </span>
          </div>
        </label>

        {/* On Sale / Special Privilege */}
        <label className="flex items-center justify-between group cursor-pointer select-none">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={(e) => setOnSaleOnly(e.target.checked)}
              className="boutique-checkbox"
            />
            <span className="text-xs text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-rose-500" />
              Special Atelier Privilege
            </span>
          </div>
        </label>
      </div>

      {/* Customer Rating Filter */}
      <div className="py-5 border-b border-stone-200 dark:border-stone-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
          Client Appraisal
        </h3>
        <div className="flex gap-2">
          {[0, 4.8, 5.0].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              className={`flex-1 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                minRating === rating
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100'
                  : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
              }`}
            >
              {rating === 0 ? 'All' : `${rating} ★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Live Result Counter Summary */}
      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 dark:bg-stone-900/80 border border-amber-200/50 dark:border-stone-800 text-center">
        <p className="text-xs text-stone-600 dark:text-stone-300 font-serif">
          Displaying <span className="font-bold text-amber-900 dark:text-amber-400">{totalFilteredCount}</span> of our finest curated creations
        </p>
      </div>

      {/* Mobile Drawer Done Button */}
      {isMobileDrawer && (
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            Show {totalFilteredCount} Items
          </button>
        </div>
      )}

    </aside>
  );
}
