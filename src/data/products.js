export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 155, label: 'JPY (¥)' }
};

export const COLOR_PALETTE = [
  { name: 'Noir', hex: '#1c1917', bgClass: 'bg-stone-900', borderClass: 'border-stone-800' },
  { name: 'Ivory', hex: '#fdfbf7', bgClass: 'bg-amber-50', borderClass: 'border-stone-300' },
  { name: 'Cognac', hex: '#854d0e', bgClass: 'bg-amber-800', borderClass: 'border-amber-900' },
  { name: 'Emerald', hex: '#065f46', bgClass: 'bg-emerald-800', borderClass: 'border-emerald-900' },
  { name: 'Sapphire', hex: '#1e3a8a', bgClass: 'bg-blue-900', borderClass: 'border-blue-950' },
  { name: 'Rose Gold', hex: '#fb7185', bgClass: 'bg-rose-400', borderClass: 'border-rose-500' },
  { name: 'Burgundy', hex: '#831843', bgClass: 'bg-pink-900', borderClass: 'border-pink-950' },
  { name: 'Champagne', hex: '#d97706', bgClass: 'bg-amber-600', borderClass: 'border-amber-700' },
  { name: 'Olive', hex: '#3f6212', bgClass: 'bg-lime-900', borderClass: 'border-lime-950' }
];

export const CATEGORIES = [
  'Leather Goods',
  'Fine Jewelry',
  'Haute Horlogerie',
  'Cashmere & Knitwear',
  'Artisanal Footwear',
  'Signature Fragrance',
  'Silk & Eveningwear'
];

export const PRODUCTS = [
  {
    id: 'prod-01',
    sku: 'AT-LG-104',
    name: 'Siena Structured Calfskin Tote',
    category: 'Leather Goods',
    designer: 'Atelier Florence',
    price: 890,
    originalPrice: 1050,
    colour: 'Cognac',
    colourHex: '#854d0e',
    aspectRatio: 'aspect-[3/4]',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 42,
    stock: 6,
    isNew: true,
    isBestseller: true,
    isExclusive: false,
    origin: 'Tuscany, Italy',
    materials: 'Vegetable-tanned full-grain Tuscan calfskin, solid brushed brass hardware',
    sizes: ['Medium', 'Large'],
    description: 'An architectural silhouette meticulously sculpted by master artisans in Florence. Features dual hand-stitched rolled handles, protective base studs, and an unlined raw suede interior with a removable zipped pouch.',
    details: [
      'Dimensions: 34cm H x 42cm W x 16cm D',
      'Hand-painted raw edges with beeswax sealant',
      'Magnetic bridge closure with gold-foil stamped insignia',
      'Comes with archival dustbag & certificate of authenticity'
    ]
  },
  {
    id: 'prod-02',
    sku: 'FJ-SL-209',
    name: '18K Aurelia Serpent Wrap Ring',
    category: 'Fine Jewelry',
    designer: 'Kallista Fine Jewels',
    price: 1450,
    originalPrice: null,
    colour: 'Rose Gold',
    colourHex: '#fb7185',
    aspectRatio: 'aspect-[4/5]',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewCount: 29,
    stock: 3,
    isNew: false,
    isBestseller: true,
    isExclusive: true,
    origin: 'Athens, Greece',
    materials: '18K Recycled Rose Gold, VS1 Conflict-Free Brilliant Cut Diamonds (0.42 ctw)',
    sizes: ['5 US', '6 US', '7 US', '8 US'],
    description: 'Inspired by ancient Hellenic mythologies of eternal renewal. This coiled serpent gracefully contours the finger, accented with micro-pavé diamonds along the spine and two natural emerald cabochons for eyes.',
    details: [
      '0.42 carats total weight conflict-free diamonds',
      'Solid 18K hallmarked rose gold band',
      'Comfort-fit inner band with custom engraved serial number',
      'Includes gemological certification card'
    ]
  },
  {
    id: 'prod-03',
    sku: 'HH-MN-301',
    name: 'Monolith Calibre 28 Moonphase Watch',
    category: 'Haute Horlogerie',
    designer: 'Caelum Horology',
    price: 3850,
    originalPrice: 4200,
    colour: 'Noir',
    colourHex: '#1c1917',
    aspectRatio: 'aspect-[1/1]',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfa63096aa?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 18,
    stock: 2,
    isNew: true,
    isBestseller: false,
    isExclusive: true,
    origin: 'Geneva, Switzerland',
    materials: '316L Sandblasted PVD Steel, Anti-reflective Sapphire Crystal, Horween Leather strap',
    sizes: ['39mm Case', '42mm Case'],
    description: 'A contemporary masterwork of Swiss mechanical complication. Driven by an in-house automatic calibre with 68 hours power reserve, featuring an authentic lapis lazuli dial with hand-chased moonphase disc.',
    details: [
      'Swiss Made Automatic Calibre 28.4',
      '68-hour power reserve with bi-directional tungsten rotor',
      'Water resistant to 50 meters (5 ATM)',
      'Double exhibition caseback revealing Côtes de Genève finishing'
    ]
  },
  {
    id: 'prod-04',
    sku: 'CK-MG-412',
    name: 'Mongolian Ribbed Cashmere Trench',
    category: 'Cashmere & Knitwear',
    designer: 'Maison Valmont',
    price: 1280,
    originalPrice: null,
    colour: 'Ivory',
    colourHex: '#fdfbf7',
    aspectRatio: 'aspect-[3/4]',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 35,
    stock: 8,
    isNew: false,
    isBestseller: true,
    isExclusive: false,
    origin: 'Ulaanbaatar & Biella',
    materials: '100% Grade-A Mongolian Cashmere (4-ply, 12-gauge knit)',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Spun from the ultra-fine underfleece of sustainably raised Mongolian mountain goats. Unrivaled featherlight softness paired with a sculptural wrap silhouette and matching cashmere tie belt.',
    details: [
      'Length: 122cm from shoulder to hem',
      'Horn button cuff tabs and storm flap accents',
      'Naturally thermoregulating and hypoallergenic',
      'Includes cedar garment bag and cashmere comb'
    ]
  },
  {
    id: 'prod-05',
    sku: 'AF-BL-505',
    name: 'Venetian Hand-Burnished Penny Loafers',
    category: 'Artisanal Footwear',
    designer: 'Studio Verona',
    price: 640,
    originalPrice: 720,
    colour: 'Emerald',
    colourHex: '#065f46',
    aspectRatio: 'aspect-[4/5]',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewCount: 22,
    stock: 5,
    isNew: true,
    isBestseller: false,
    isExclusive: false,
    origin: 'Veneto, Italy',
    materials: 'French Box Calf leather, oak-bark tanned leather sole, stacked heel',
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU'],
    description: 'Constructed using a traditional Blake Rapid stitch for flexibility and longevity. Each pair is hand-patinated by Venetian colourists using natural alcohol dyes to create a singular, deep emerald finish.',
    details: [
      'Blake-Rapid stitched construction, fully resolable',
      'Channeled leather sole with brass toe plates installed',
      'Full glove-leather lining for all-day breathability',
      'Custom wooden shoe trees included'
    ]
  },
  {
    id: 'prod-06',
    sku: 'SF-NO-601',
    name: 'Santal Mystique Extrait de Parfum',
    category: 'Signature Fragrance',
    designer: 'Parfums d’Or',
    price: 320,
    originalPrice: null,
    colour: 'Champagne',
    colourHex: '#d97706',
    aspectRatio: 'aspect-[3/4]',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewCount: 51,
    stock: 12,
    isNew: false,
    isBestseller: true,
    isExclusive: true,
    origin: 'Grasse, France',
    materials: 'Concentration: 32% Pure Extrait. Aged Mysore Sandalwood, Cardamom, Papyrus, Iris Butter',
    sizes: ['50ml', '100ml'],
    description: 'A mesmerizing olfactory symphony created in Grasse. Opens with smoked cardamom and Italian violet leaves before surrendering to a voluptuous heart of Australian sandalwood, orris root, and warm bourbon amber.',
    details: [
      '32% pure perfume concentration with 14+ hour longevity',
      'Hand-blown crystal flacon with magnetic obsidian stopper',
      'Crafted in small numbered batches of 500 bottles',
      'Sustainably harvested and vegan-certified'
    ]
  },
  {
    id: 'prod-07',
    sku: 'SE-SL-708',
    name: 'Bias-Cut Mulberry Silk Evening Gown',
    category: 'Silk & Eveningwear',
    designer: 'Atelier Vivienne',
    price: 980,
    originalPrice: 1150,
    colour: 'Sapphire',
    colourHex: '#1e3a8a',
    aspectRatio: 'aspect-[3/5]',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 16,
    stock: 4,
    isNew: true,
    isBestseller: false,
    isExclusive: true,
    origin: 'Lyon, France',
    materials: '100% 22-Momme Grade 6A Organic Mulberry Silk',
    sizes: ['FR 34 (US 2)', 'FR 36 (US 4)', 'FR 38 (US 6)', 'FR 40 (US 8)'],
    description: 'A poetic liquid silhouette cut on the 45-degree true bias to hug feminine contours seamlessly. Features delicate cowl neckline, adjustable spaghetti straps, and a dramatic low-draped open back.',
    details: [
      'French seam construction throughout',
      'Self-lined upper bodice for complete opacity',
      'Floor-sweeping puddle train',
      'Dry clean only; includes silk care hanger'
    ]
  },
  {
    id: 'prod-08',
    sku: 'AT-LG-115',
    name: 'Montmartre Flap Saddle Bag',
    category: 'Leather Goods',
    designer: 'Atelier Florence',
    price: 760,
    originalPrice: null,
    colour: 'Noir',
    colourHex: '#1c1917',
    aspectRatio: 'aspect-[1/1]',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 31,
    stock: 9,
    isNew: false,
    isBestseller: true,
    isExclusive: false,
    origin: 'Florence, Italy',
    materials: 'Smooth box calfskin, brushed nickel twist clasp, microfiber lining',
    sizes: ['One Size'],
    description: 'A timeless silhouette inspired by equestrian saddle heritage. Styled with an ergonomic curved base, custom sculpted twist clasp, and an adjustable wide leather crossbody strap.',
    details: [
      'Dimensions: 21cm W x 17cm H x 7cm D',
      'Adjustable drop: 45cm to 56cm',
      'Interior zip compartment and rear quick-access slip pocket',
      'Gold foil embossed series number'
    ]
  },
  {
    id: 'prod-09',
    sku: 'FJ-PR-218',
    name: 'Baroque Keshi Pearl Choker & Pendant',
    category: 'Fine Jewelry',
    designer: 'Kallista Fine Jewels',
    price: 890,
    originalPrice: 990,
    colour: 'Ivory',
    colourHex: '#fdfbf7',
    aspectRatio: 'aspect-[4/5]',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 24,
    stock: 3,
    isNew: true,
    isBestseller: false,
    isExclusive: true,
    origin: 'Kyoto, Japan',
    materials: 'Natural Australian South Sea Keshi Pearls, 14K Solid Yellow Gold',
    sizes: ['38cm Choker', '42cm Classic'],
    description: 'Each organic pearl is uniquely shaped by nature, selected for its iridescent peacock overtone and mirror-like lustre. Strung on knotted silk cord with a handmade toggle closure.',
    details: [
      'Average pearl size: 9-11mm organic baroque form',
      '14K solid gold toggle clasp with micro-hammered texture',
      'Individually hand-knotted on Japanese pure silk cord',
      'No two pieces are alike due to natural pearl formations'
    ]
  },
  {
    id: 'prod-10',
    sku: 'CK-CS-425',
    name: 'Loro Piana Weave Relaxed Cardigan',
    category: 'Cashmere & Knitwear',
    designer: 'Maison Valmont',
    price: 1100,
    originalPrice: null,
    colour: 'Olive',
    colourHex: '#3f6212',
    aspectRatio: 'aspect-[3/4]',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 19,
    stock: 5,
    isNew: false,
    isBestseller: true,
    isExclusive: false,
    origin: 'Piedmont, Italy',
    materials: '70% Fine Merino Wool, 30% Cashmere blend, carved corozo nut buttons',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A relaxed drop-shoulder cardigan with a textured waffle-stitch knit. Designed for effortless layering over crisp shirting or direct to skin comfort during cool evening promenades.',
    details: [
      'Natural corozo nut buttons sourced in Ecuador',
      'Deep patch pockets reinforced at stress points',
      'Ribbed cuffs and hem with shape-memory elastane thread',
      'OEKO-TEX Standard 100 non-toxic dyes'
    ]
  },
  {
    id: 'prod-11',
    sku: 'HH-SL-308',
    name: 'Elysium Chrono Titanium Diver',
    category: 'Haute Horlogerie',
    designer: 'Caelum Horology',
    price: 4600,
    originalPrice: 5100,
    colour: 'Sapphire',
    colourHex: '#1e3a8a',
    aspectRatio: 'aspect-[1/1]',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfa63096aa?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewCount: 14,
    stock: 1,
    isNew: true,
    isBestseller: false,
    isExclusive: true,
    origin: 'La Chaux-de-Fonds, Switzerland',
    materials: 'Grade 5 Brushed Titanium, Sunburst Ceramic Bezel, Integrated FKM Rubber strap',
    sizes: ['41mm Case'],
    description: 'Engineered for extreme performance and effortless luxury. Ultra-lightweight aerospace-grade titanium case housing a chronometer-certified automatic movement with 300m depth rating.',
    details: [
      'COSC Certified Swiss Chronometer',
      '300 meters / 1000 feet depth capability',
      'Super-LumiNova Grade X1 on hands and indices',
      'Helium escape valve at 9 o’clock'
    ]
  },
  {
    id: 'prod-12',
    sku: 'SE-BL-715',
    name: 'Napoli Double-Breasted Silk Velvet Blazer',
    category: 'Silk & Eveningwear',
    designer: 'Atelier Vivienne',
    price: 1350,
    originalPrice: null,
    colour: 'Burgundy',
    colourHex: '#831843',
    aspectRatio: 'aspect-[3/4]',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 27,
    stock: 4,
    isNew: false,
    isBestseller: true,
    isExclusive: true,
    origin: 'Naples, Italy',
    materials: 'Italian Silk Velvet with Cupro Jacquard lining, genuine Mother-of-Pearl buttons',
    sizes: ['38R', '40R', '42R', '44R'],
    description: 'Impeccable Neapolitan tailoring with soft spalla camicia shoulders and generous peak lapels. The deep burgundy silk velvet catches ambient candlelight with subtle luminescence.',
    details: [
      'Full floating canvas chest piece for personalized drape',
      'Double back vents and functional surgeon cuffs',
      'Hand-stitched pick stitch detailing along lapel',
      'Complimentary custom monogram embroidery upon request'
    ]
  }
];
