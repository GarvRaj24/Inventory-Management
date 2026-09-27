import React from 'react';
import { Sparkles, CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const icons = {
    cart: <ShoppingBag className="w-4 h-4 text-emerald-500" />,
    wishlist: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
    success: <CheckCircle2 className="w-4 h-4 text-amber-500" />,
    info: <Sparkles className="w-4 h-4 text-stone-400" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="frosted-glass border border-stone-200/90 dark:border-stone-800/90 shadow-2xl rounded-2xl p-4 flex items-center gap-3 text-stone-900 dark:text-stone-100">
        <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 flex-shrink-0">
          {icons[type] || icons.info}
        </div>
        <div className="flex-1 text-xs">
          <p className="font-semibold">{message.title}</p>
          {message.desc && <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">{message.desc}</p>}
        </div>
        <button
          onClick={onClose}
          type="button"
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
