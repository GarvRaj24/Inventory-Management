# Maison Étoile — Dynamic Inventory Display & Showcase Platform

An ultra-fast, client-side dynamic inventory showcase platform tailored for luxury boutique storefronts, fine jewelers, watchmakers, and artisanal ateliers.

Built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## ✨ Highlights & Key Features

### 1. 🖼️ Responsive Masonry & Advanced CSS Grid
* **Masonry Flow Layout**: Utilizes multi-column CSS masonry with staggered aspect ratios (`aspect-[3/4]`, `aspect-[4/5]`, `aspect-[1/1]`) to showcase varied product dimensions naturally.
* **Structured Grid Switcher**: Seamlessly toggle between "Masonry Flow" and balanced auto-responsive CSS Grid layout.
* **Adaptive Breakpoints**: Fluid scaling across mobile (1 column), tablet (2 columns), and high-resolution desktop displays (3–4 columns).
* **Hover Micro-interactions**: Smooth card scaling, secondary angle image swap on mouse-over, and floating quick-action pills.

### 2. 🎛️ Real-Time Sidebar Filtering (Zero Page Reloads)
* **Atelier Categories**: Multi-select filter with custom boutique-styled checkboxes (`.boutique-checkbox`) and live inventory counters.
* **Tone & Shade Swatches**: Visual color palette swatches with check indicators and active filters.
* **Interactive Price Slider**: Dynamic range slider featuring custom CSS track and thumb styling, with instant price display in the active currency and quick price tier buttons.
* **Stock & Privilege Filters**: Toggle "In Stock Only (≥ 3 units)", "Bespoke / Exclusive Only", and "Special Privilege (On Sale)".
* **Customer Appraisal Filter**: Filter by star rating (4.8+ stars, 5.0 stars).
* **Instant Keyword Search**: Debounced search matching product titles, SKU codes, designers, and material descriptions.
* **Active Filter Chips & Reset**: Instantly clear individual filters or reset the entire collection with one click.

### 3. 💫 Smooth Visual Transitions
* Real-time JavaScript event handling on all sidebar inputs.
* CSS opacity and transform transitions (`animate-fadeIn`, `opacity-100`, `transition-all duration-500`) providing smooth DOM element filtering and state transitions.

### 4. 🔍 Interactive Frosted-Glass Quick View Modal
* Styled with `backdrop-filter: blur(16px)` and `-webkit-backdrop-filter: blur(16px)` for a glassmorphism frosted aesthetic.
* **Multi-Angle Gallery**: High-res image viewer with clickable thumbnail strip and previous/next navigation.
* **Keyboard Navigation**: Press <kbd>Esc</kbd> to close, or <kbd>←</kbd> / <kbd>→</kbd> arrow keys to browse photos.
* **Boutique Specifications**: Artisan provenance, SKU, materials breakdown, dimension bullet points, and client review appraisals.
* **Interactive Options**: Specification / size picker, color swatches, and quantity selector with live stock boundary enforcement.

### 5. 🌙 Persistent Dark Mode
* Global theme toggle (Daytime Luxe ☀️ / Nocturne Luxe 🌙) applying a `.dark` class directly to the `<body>` and `<html>` tags.
* Saves user theme preference to `localStorage` (`boutique_theme`) for persistent multi-session restoration.
* Automatically syncs with the user's OS color scheme (`prefers-color-scheme`) on initial visit.

### 6. 📱 Mobile-First & Touch-Optimized
* Mobile filter drawer slide-over with touch-friendly 44px+ tap targets.
* Floating "Refine Selection" action trigger with live badge counter on smaller viewports.
* Responsive top bar and touch-accessible quick view modals.

### 7. 🛍️ Boutique Vault & Cart Experience
* **Shopping Bag Drawer**: Add items with selected size and quantity, modify item counts, and calculate subtotal in real time.
* **Wishlist Drawer**: Save pieces with heart icons and view them in a dedicated drawer.
* **Global Currency Switcher**: Real-time conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, and **JPY (¥)**.
* **Toast Notification System**: Instant feedback toasts for bag updates, wishlist actions, and filter resets.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) (`^19.2.8`) |
| **Bundler & Tooling** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Google Fonts (*Cormorant Garamond* & *Plus Jakarta Sans*) |

---

## 📂 Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CartDrawer.jsx         # Slide-over shopping bag drawer
│   │   ├── Header.jsx             # Boutique header, currency, theme & search
│   │   ├── HeroBanner.jsx         # Vault statistics & active filter chips
│   │   ├── ProductCard.jsx        # Responsive thumbnail card with hover actions
│   │   ├── ProductGrid.jsx        # Advanced CSS Grid & Masonry container
│   │   ├── QuickViewModal.jsx     # Frosted-glass modal with image gallery
│   │   ├── SidebarFilter.jsx      # Custom checkboxes, price slider & filters
│   │   ├── Toast.jsx              # Floating feedback notification alerts
│   │   └── WishlistDrawer.jsx     # Saved favorites slide-over drawer
│   ├── data/
│   │   └── products.js            # Curated boutique inventory & currencies
│   ├── hooks/
│   │   └── useDarkMode.js         # Persistent localStorage dark mode hook
│   ├── utils/
│   │   └── formatters.js          # Currency and numerical formatters
│   ├── App.jsx                    # Root state & real-time client filter engine
│   ├── index.css                  # Tailwind v4, custom checkboxes, frosted glass
│   └── main.jsx                   # React 19 entrypoint
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized, tree-shaken static bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📄 License
MIT License. Crafted for boutique storefronts & atelier showcases.
