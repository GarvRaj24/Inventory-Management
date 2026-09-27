import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onQuickView,
  onAddToCart,
  currency
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Frosted Glass Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                Saved Masterpieces
              </h2>
              <span className="text-xs font-mono text-stone-400">
                ({wishlist.length} saved)
              </span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-serif text-lg text-stone-700 dark:text-stone-300">No saved items</p>
                <p className="text-xs mt-1">Click the heart icon on any product to save it to your bespoke wishlist.</p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl border border-stone-200/70 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product)}
                          type="button"
                          className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {product.designer} • {product.colour}
                      </p>
                      <p className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-1">
                        {formatPrice(product.price, currency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        type="button"
                        className="flex-1 py-1.5 px-2 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 hover:bg-stone-300"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        type="button"
                        className="py-1.5 px-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 hover:bg-stone-800"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={onClose}
              type="button"
              className="w-full py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              Continue Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
