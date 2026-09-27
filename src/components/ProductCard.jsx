import React, { useState } from 'react';
import { 
  Eye, 
  Heart, 
  ShoppingBag, 
  Star, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function ProductCard({
  product,
  currency,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  layoutMode = 'masonry'
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Switch image on mouse hover to secondary image if available
  const activeImage = isHovered && product.images.length > 1 
    ? product.images[1] 
    : product.images[currentImageIndex];

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isLowStock = product.stock <= 3 && product.stock > 0;

  return (
    <article 
      className={`group relative bg-white dark:bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800/90 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${
        layoutMode === 'masonry' ? 'masonry-item' : 'h-full'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Top Media & Image Container */}
      <div className={`relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 ${
        layoutMode === 'masonry' ? product.aspectRatio || 'aspect-[4/5]' : 'aspect-[4/5]'
      }`}>
        
        {/* Main Product Thumbnail Image */}
        <img
          src={activeImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isExclusive && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-stone-900/90 text-amber-300 dark:bg-stone-100 dark:text-stone-900 px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5" />
              Exclusive
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider bg-amber-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
              New Arrival
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-rose-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
              <AlertCircle className="w-2.5 h-2.5" />
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Top Right Wishlist Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 shadow-md scale-110'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 shadow-xs hover:scale-110 backdrop-blur-md'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Hover Button (Pill at bottom of image) */}
        <div className="absolute inset-x-3 bottom-3 z-10 transition-all duration-300 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            type="button"
            className="flex-1 py-2.5 px-4 frosted-glass text-stone-900 dark:text-stone-100 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:bg-white dark:hover:bg-stone-900 transition-all active:scale-[0.98] border border-white/40 dark:border-stone-700/40"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            type="button"
            title="Quick Add to Bag"
            className="p-2.5 frosted-glass text-stone-900 dark:text-stone-100 rounded-xl hover:bg-white dark:hover:bg-stone-900 transition-all active:scale-[0.98] border border-white/40 dark:border-stone-700/40"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Atelier / Designer & Category */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono mb-1">
            <span>{product.designer}</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-lg text-stone-900 dark:text-stone-100 font-medium group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Client Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
              {product.rating}
            </span>
            <span className="text-[11px] text-stone-400 font-mono">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Bottom Row: Colour Dot Swatch & Price */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          
          {/* Tone Swatch Preview */}
          <div className="flex items-center gap-1.5">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-stone-700 shadow-2xs"
              style={{ backgroundColor: product.colourHex }}
              title={product.colour}
            />
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              {product.colour}
            </span>
          </div>

          {/* Price Readout */}
          <div className="flex items-baseline gap-1.5">
            {hasDiscount && (
              <span className="text-xs text-stone-400 dark:text-stone-500 line-through font-mono">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
            <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              {formatPrice(product.price, currency)}
            </span>
          </div>

        </div>

      </div>

    </article>
  );
}
