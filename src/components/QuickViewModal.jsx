import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initialize defaults whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  // Handle keyboard ESC to close and arrow keys to navigate images
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && product?.images?.length) {
        setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
      } else if (e.key === 'ArrowLeft' && product?.images?.length) {
        setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, product]);

  if (!isOpen || !product) return null;

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Frosted Glass Backdrop Overlay with backdrop-filter */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-md -webkit-backdrop-blur-md transition-opacity duration-300"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-stone-800/90 overflow-hidden z-10 transition-all duration-300 max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-700 shadow-md backdrop-blur-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-stone-100 dark:bg-stone-800/50 p-6 flex flex-col justify-between">
          
          {/* Main Display Image */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 mb-4 shadow-inner">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Gallery Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-800 dark:text-stone-200 shadow-md hover:scale-105 backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev + 1) % product.images.length)}
                  type="button"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-800 dark:text-stone-200 shadow-md hover:scale-105 backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Photo Counter Pill */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest uppercase bg-stone-900/75 text-stone-100 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {selectedImageIndex + 1} / {product.images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-stone-900 dark:border-stone-100 ring-2 ring-amber-500/40 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Product Inspection & Purchase Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          
          <div>
            {/* Category, Atelier & Provenance */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 font-mono mb-2">
              <span>{product.designer} • {product.category}</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{product.origin}</span>
            </div>

            {/* Title */}
            <h2 id="modal-product-title" className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100 tracking-tight mb-2">
              {product.name}
            </h2>

            {/* SKU & Star Reviews */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="text-[11px] font-mono text-stone-400">
                SKU: <strong className="text-stone-700 dark:text-stone-300">{product.sku}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} verified client appraisals)</span>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="mb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {formatPrice(product.price, currency)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-stone-400 line-through font-mono">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Duties & Taxes Included
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Or 4 interest-free concierge payments of {formatPrice(Math.round(product.price / 4), currency)}
              </p>
            </div>

            {/* Craftsmanship Narrative */}
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Materials Breakdown */}
            <div className="mb-5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-800 text-xs">
              <span className="font-semibold text-stone-900 dark:text-stone-100">Artisan Materials: </span>
              <span className="text-stone-600 dark:text-stone-300">{product.materials}</span>
            </div>

            {/* Color Swatch & Stock Status */}
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[11px]">
                  Tone: <span className="font-bold text-stone-900 dark:text-stone-100">{product.colour}</span>
                </span>
                <span className={`text-[11px] font-mono ${
                  product.stock > 3 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-rose-500 font-bold'
                }`}>
                  {product.stock > 0 ? `${product.stock} units available in vault` : 'Sold out'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-stone-900 dark:border-stone-100 shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: product.colourHex }}
                >
                  <Check className={`w-3 h-3 ${product.colour === 'Ivory' ? 'text-stone-900' : 'text-white'}`} />
                </div>
              </div>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[11px]">
                    Select Specification / Size
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === sz
                          ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-sm'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications & Bullet Details */}
            <div className="mb-6 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Atelier Notes & Dimensions
              </h4>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1 list-disc list-inside">
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Action Footer: Quantity & Add to Bag */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3">
            
            {/* Quantity Counter */}
            <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-800">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30"
              >
                -
              </button>
              <span className="px-3 text-xs font-mono font-bold text-stone-900 dark:text-stone-100">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Add to Bag CTA Button */}
            <button
              onClick={handleAddToCartClick}
              type="button"
              className={`flex-1 py-3 px-5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedAnimation ? 'Acquired to Bag!' : `Acquire For ${formatPrice(product.price * quantity, currency)}`}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product)}
              type="button"
              aria-label="Add to Wishlist"
              className={`p-3 rounded-xl border transition-all ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/80 dark:text-rose-400 dark:border-rose-900'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
