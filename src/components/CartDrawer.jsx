import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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
              <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                Your Boutique Bag
              </h2>
              <span className="text-xs font-mono text-stone-400">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
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

          {/* Item List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-serif text-lg text-stone-700 dark:text-stone-300">Your bag is empty</p>
                <p className="text-xs mt-1">Explore our atelier collection to select timeless creations.</p>
              </div>
            ) : (
              cartItems.map(({ product, quantity, size }) => (
                <div 
                  key={`${product.id}-${size}`}
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
                          onClick={() => onRemoveItem(product.id, size)}
                          type="button"
                          className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                        Tone: {product.colour} {size && `• Size: ${size}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800">
                        <button
                          onClick={() => onUpdateQuantity(product.id, size, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-stone-900 dark:text-stone-100">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, size, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                        {formatPrice(product.price * quantity, currency)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-stone-500">Estimated Total</span>
                <span className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 flex items-center gap-1 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Complimentary insured courier delivery included
              </p>
              <button
                onClick={onCheckout}
                type="button"
                className="w-full py-3.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-stone-800 transition-all active:scale-[0.98]"
              >
                <span>Proceed to Private Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
