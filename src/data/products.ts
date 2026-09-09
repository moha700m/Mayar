export type CategoryId =
  | "all"
  | "gadgets"
  | "home"
  | "beauty"
  | "fashion"
  | "sports"
  | "auto"
  | "arts";

export type MarketplaceId =
  | "all"
  | "alibaba"
  | "aliexpress"
  | "amazon"
  | "noon"
  | "saudi"
  | "funoon";

export type TrendingSearch = {
  id: string;
  label: string;
  query: string;
  heat: number;
};

export type Product = {
  id: string;
  title: string;
  titleAr: string;
  category: Exclude<CategoryId, "all">;
  marketplace: Exclude<MarketplaceId, "all">;
  /** Price in Saudi Riyal */
  price: number;
  /** Original price in Saudi Riyal */
  originalPrice: number;
  currency: "SAR";
  rating: number;
  orders: number;
  image: string;
  imageAlt: string;
  badge?: "ساخن" | "جديد" | "خصم قوي";
  searchQuery: string;
  /** Direct marketplace product URL */
  productUrl: string;
};

export type Category = {
  id: CategoryId;
  label: string;
};

export type Marketplace = {
  id: MarketplaceId;
  label: string;
};

export const categories: Category[] = [
  { id: "all", label: "الكل" },
  { id: "gadgets", label: "إلكترونيات" },
  { id: "home", label: "منزل" },
  { id: "beauty", label: "جمال" },
  { id: "fashion", label: "أزياء" },
  { id: "sports", label: "رياضة" },
  { id: "auto", label: "سيارات" },
  { id: "arts", label: "فنون" },
];

export const marketplaces: Marketplace[] = [
  { id: "all", label: "كل المنصات" },
  { id: "saudi", label: "عروض السعودية" },
  { id: "noon", label: "نون" },
  { id: "amazon", label: "أمازون" },
  { id: "aliexpress", label: "علي إكسبريس" },
  { id: "alibaba", label: "علي بابا" },
  { id: "funoon", label: "عروض فنون" },
];

export const marketplaceLabels: Record<Exclude<MarketplaceId, "all">, string> =
  {
    alibaba: "علي بابا",
    aliexpress: "علي إكسبريس",
    amazon: "أمازون",
    noon: "نون",
    saudi: "عروض السعودية",
    funoon: "عروض فنون",
  };

/** What shoppers in Saudi Arabia are searching right now. */
export const trendingSearches: TrendingSearch[] = [
  { id: "ts1", label: "سماعات لاسلكية", query: "سماعات", heat: 98 },
  { id: "ts2", label: "ساعة ذكية", query: "ساعة", heat: 94 },
  { id: "ts3", label: "مكنسة روبوت", query: "مكنسة", heat: 90 },
  { id: "ts4", label: "باور بانك", query: "باور", heat: 86 },
  { id: "ts5", label: "عطور رجالية", query: "عطر", heat: 82 },
  { id: "ts6", label: "تلفاز 55", query: "تلفاز", heat: 78 },
  { id: "ts7", label: "مكيف صحراوي", query: "مكيف", heat: 75 },
  { id: "ts8", label: "حقائب سفر", query: "حقيبة", heat: 71 },
];

/** Marketplace buy destination — opens the product/offer on that platform. */
export function buildProductUrl(
  marketplace: Exclude<MarketplaceId, "all">,
  query: string,
): string {
  const q = encodeURIComponent(query.trim());
  const slug = encodeURIComponent(query.trim().replace(/\s+/g, "-"));
  switch (marketplace) {
    case "amazon":
      return `https://www.amazon.sa/s?k=${q}&s=exact-aware-popularity-rank`;
    case "noon":
      return `https://www.noon.com/saudi-ar/search?q=${q}`;
    case "saudi":
      return `https://www.noon.com/saudi-ar/search?q=${q}&f[deal_flag]=1`;
    case "aliexpress":
      return `https://www.aliexpress.com/w/wholesale-${slug}.html?SortType=total_tranpro_desc`;
    case "alibaba":
      return `https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=${q}`;
    case "funoon":
      return `https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=${q}`;
    default:
      return `https://www.noon.com/saudi-ar/search?q=${q}`;
  }
}

function p(
  partial: Omit<Product, "currency" | "productUrl"> & {
    productUrl?: string;
  },
): Product {
  return {
    ...partial,
    currency: "SAR",
    productUrl:
      partial.productUrl ??
      buildProductUrl(partial.marketplace, partial.searchQuery),
  };
}

export const trendingProducts: Product[] = [
  p({
    id: "ae-g1",
    title: "Magnetic Wireless Power Bank 10000mAh",
    titleAr: "باور بانك لاسلكي مغناطيسي 10000 مللي أمبير",
    category: "gadgets",
    marketplace: "aliexpress",
    price: 71,
    originalPrice: 150,
    rating: 4.8,
    orders: 48200,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
    imageAlt: "شاحن محمول لاسلكي",
    badge: "ساخن",
    searchQuery: "magnetic wireless power bank 10000mah",
  }),
  p({
    id: "am-g2",
    title: "Mini Portable Projector HD",
    titleAr: "بروجكتر محمول صغير بدقة عالية",
    category: "gadgets",
    marketplace: "amazon",
    price: 159,
    originalPrice: 334,
    rating: 4.6,
    orders: 22140,
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
    imageAlt: "بروجكتر منزلي",
    badge: "خصم قوي",
    searchQuery: "mini portable projector hd",
  }),
  p({
    id: "ae-g3",
    title: "Noise Cancelling Earbuds",
    titleAr: "سماعات أذن بخاصية عزل الضوضاء",
    category: "gadgets",
    marketplace: "aliexpress",
    price: 91,
    originalPrice: 225,
    rating: 4.7,
    orders: 91300,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سماعات لاسلكية",
    badge: "ساخن",
    searchQuery: "noise cancelling earbuds wireless",
  }),
  p({
    id: "ab-g4",
    title: "Smart Watch Ultra Sport Bulk",
    titleAr: "ساعة ذكية رياضية — طلب جملة",
    category: "gadgets",
    marketplace: "alibaba",
    price: 117,
    originalPrice: 278,
    rating: 4.5,
    orders: 35680,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "ساعة ذكية",
    badge: "جديد",
    searchQuery: "smart watch ultra sport wholesale",
  }),
  p({
    id: "ae-h1",
    title: "LED Strip Lights RGB App Control",
    titleAr: "شريط إضاءة LED RGB بالتحكم عبر التطبيق",
    category: "home",
    marketplace: "aliexpress",
    price: 37,
    originalPrice: 93,
    rating: 4.7,
    orders: 128400,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    imageAlt: "إضاءة LED ملونة",
    badge: "ساخن",
    searchQuery: "led strip lights rgb app control",
  }),
  p({
    id: "am-h2",
    title: "Robot Vacuum Compact",
    titleAr: "مكنسة روبوت مدمجة",
    category: "home",
    marketplace: "amazon",
    price: 296,
    originalPrice: 596,
    rating: 4.4,
    orders: 18750,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكنسة روبوت",
    badge: "خصم قوي",
    searchQuery: "robot vacuum cleaner compact",
  }),
  p({
    id: "ab-h3",
    title: "Electric Milk Frother Wholesale",
    titleAr: "خفاقة حليب كهربائية — جملة",
    category: "home",
    marketplace: "alibaba",
    price: 24,
    originalPrice: 56,
    rating: 4.6,
    orders: 64210,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "خفاقة قهوة",
    searchQuery: "electric milk frother wholesale",
  }),
  p({
    id: "fn-h4",
    title: "Folding Storage Organizer Art Display",
    titleAr: "منظم تخزين وعرض قطع فنية",
    category: "arts",
    marketplace: "funoon",
    price: 43,
    originalPrice: 101,
    rating: 4.5,
    orders: 40320,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    imageAlt: "منظم تخزين منزلي",
    badge: "جديد",
    searchQuery: "folding storage organizer display",
  }),
  p({
    id: "am-b1",
    title: "LED Face Mask Therapy",
    titleAr: "قناع وجه علاجي بتقنية LED",
    category: "beauty",
    marketplace: "amazon",
    price: 108,
    originalPrice: 259,
    rating: 4.3,
    orders: 15490,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    imageAlt: "عناية بالبشرة",
    badge: "ساخن",
    searchQuery: "led face mask light therapy",
  }),
  p({
    id: "ae-b2",
    title: "Hair Dryer Diffuser Ionic",
    titleAr: "مجفف شعر أيوني مع موزع",
    category: "beauty",
    marketplace: "aliexpress",
    price: 83,
    originalPrice: 187,
    rating: 4.6,
    orders: 27880,
    image:
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مجفف شعر",
    badge: "خصم قوي",
    searchQuery: "ionic hair dryer diffuser",
  }),
  p({
    id: "fn-b3",
    title: "Makeup Brush Set Soft Art Edition",
    titleAr: "طقم فرش مكياج ناعمة — إصدار فني",
    category: "beauty",
    marketplace: "funoon",
    price: 33,
    originalPrice: 75,
    rating: 4.8,
    orders: 76200,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
    imageAlt: "فرش مكياج",
    searchQuery: "makeup brush set professional soft",
  }),
  p({
    id: "ae-f1",
    title: "Oversized Vintage Sunglasses",
    titleAr: "نظارات شمسية كلاسيكية كبيرة",
    category: "fashion",
    marketplace: "aliexpress",
    price: 27,
    originalPrice: 69,
    rating: 4.5,
    orders: 53410,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نظارات شمسية",
    badge: "ساخن",
    searchQuery: "oversized vintage sunglasses women",
  }),
  p({
    id: "am-f2",
    title: "Crossbody Mini Bag",
    titleAr: "حقيبة كروس صغيرة",
    category: "fashion",
    marketplace: "amazon",
    price: 50,
    originalPrice: 112,
    rating: 4.4,
    orders: 31900,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حقيبة يد",
    badge: "جديد",
    searchQuery: "crossbody mini bag women",
  }),
  p({
    id: "ab-f3",
    title: "Thermal Running Jacket Wholesale",
    titleAr: "جاكيت جري حراري — جملة",
    category: "fashion",
    marketplace: "alibaba",
    price: 101,
    originalPrice: 206,
    rating: 4.6,
    orders: 19870,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "جاكيت رياضي",
    searchQuery: "thermal running jacket wholesale",
  }),
  p({
    id: "ae-s1",
    title: "Resistance Bands Set",
    titleAr: "طقم أحزمة مقاومة للتمارين",
    category: "sports",
    marketplace: "aliexpress",
    price: 39,
    originalPrice: 90,
    rating: 4.7,
    orders: 88450,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "أحزمة مقاومة",
    badge: "ساخن",
    searchQuery: "resistance bands set workout",
  }),
  p({
    id: "am-s2",
    title: "Yoga Mat Non Slip",
    titleAr: "سجادة يوغا مانعة للانزلاق",
    category: "sports",
    marketplace: "amazon",
    price: 56,
    originalPrice: 120,
    rating: 4.6,
    orders: 45120,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سجادة يوغا",
    searchQuery: "yoga mat non slip thick",
  }),
  p({
    id: "ab-s3",
    title: "Adjustable Dumbbell Pair Wholesale",
    titleAr: "دامبل قابل للتعديل — جملة",
    category: "sports",
    marketplace: "alibaba",
    price: 135,
    originalPrice: 296,
    rating: 4.5,
    orders: 14230,
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "أوزان رياضية",
    badge: "خصم قوي",
    searchQuery: "adjustable dumbbell pair wholesale",
  }),
  p({
    id: "ae-a1",
    title: "Car Phone Holder Magnetic",
    titleAr: "حامل جوال مغناطيسي للسيارة",
    category: "auto",
    marketplace: "aliexpress",
    price: 22,
    originalPrice: 56,
    rating: 4.6,
    orders: 112800,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حامل هاتف سيارة",
    badge: "ساخن",
    searchQuery: "car phone holder magnetic mount",
  }),
  p({
    id: "am-a2",
    title: "Dash Cam Dual Lens",
    titleAr: "كاميرا سيارة بعدستين",
    category: "auto",
    marketplace: "amazon",
    price: 129,
    originalPrice: 296,
    rating: 4.4,
    orders: 26740,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "كاميرا لوحة القيادة",
    badge: "جديد",
    searchQuery: "dash cam dual lens 1080p",
  }),
  p({
    id: "fn-art1",
    title: "Abstract Wall Art Canvas Set",
    titleAr: "طقم لوحات حائط فنية مجردة",
    category: "arts",
    marketplace: "funoon",
    price: 89,
    originalPrice: 189,
    rating: 4.7,
    orders: 22100,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "لوحات فنية",
    badge: "ساخن",
    searchQuery: "abstract wall art canvas set",
  }),
  p({
    id: "fn-art2",
    title: "Handmade Ceramic Vase Decor",
    titleAr: "مزهرية خزف يدوية للديكور",
    category: "arts",
    marketplace: "funoon",
    price: 64,
    originalPrice: 140,
    rating: 4.6,
    orders: 9800,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مزهرية ديكور",
    badge: "جديد",
    searchQuery: "handmade ceramic vase decor",
  }),
  p({
    id: "ab-a3",
    title: "Portable Car Vacuum Wholesale",
    titleAr: "مكنسة سيارة محمولة — جملة",
    category: "auto",
    marketplace: "alibaba",
    price: 63,
    originalPrice: 131,
    rating: 4.5,
    orders: 38960,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكنسة سيارة",
    searchQuery: "portable car vacuum cleaner wholesale",
  }),
  p({
    id: "nn-g1",
    title: "iPhone Case MagSafe Clear",
    titleAr: "كفر آيفون شفاف MagSafe",
    category: "gadgets",
    marketplace: "noon",
    price: 49,
    originalPrice: 89,
    rating: 4.6,
    orders: 51200,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
    imageAlt: "كفر جوال",
    badge: "ساخن",
    searchQuery: "iphone magsafe case",
  }),
  p({
    id: "nn-h1",
    title: "Desert Air Cooler Compact",
    titleAr: "مكيف صحراوي مدمج",
    category: "home",
    marketplace: "noon",
    price: 289,
    originalPrice: 459,
    rating: 4.4,
    orders: 18400,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكيف منزلي",
    badge: "خصم قوي",
    searchQuery: "desert air cooler",
  }),
  p({
    id: "nn-b1",
    title: "Men Perfume Gift Set",
    titleAr: "طقم عطور رجالية",
    category: "beauty",
    marketplace: "noon",
    price: 119,
    originalPrice: 199,
    rating: 4.7,
    orders: 27600,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    imageAlt: "عطر رجالي",
    badge: "جديد",
    searchQuery: "men perfume gift set",
  }),
  p({
    id: "sa-g1",
    title: "Samsung Galaxy Buds Deal",
    titleAr: "سماعات سامسونج — عرض سعودي",
    category: "gadgets",
    marketplace: "saudi",
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    orders: 42100,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سماعات لاسلكية",
    badge: "خصم قوي",
    searchQuery: "samsung galaxy buds",
  }),
  p({
    id: "sa-h1",
    title: "55 Inch Smart TV Offer",
    titleAr: "تلفاز ذكي 55 بوصة — عرض اليوم",
    category: "home",
    marketplace: "saudi",
    price: 1299,
    originalPrice: 1899,
    rating: 4.5,
    orders: 9800,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
    imageAlt: "تلفاز ذكي",
    badge: "ساخن",
    searchQuery: "55 inch smart tv",
  }),
  p({
    id: "sa-f1",
    title: "Travel Luggage Set Saudi Deal",
    titleAr: "طقم حقائب سفر — عرض السوق",
    category: "fashion",
    marketplace: "saudi",
    price: 349,
    originalPrice: 599,
    rating: 4.6,
    orders: 15300,
    image:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حقائب سفر",
    badge: "خصم قوي",
    searchQuery: "travel luggage set",
  }),
  p({
    id: "nn-s1",
    title: "Kids Outdoor Play Tent",
    titleAr: "خيمة ألعاب خارجية للأطفال",
    category: "sports",
    marketplace: "noon",
    price: 79,
    originalPrice: 149,
    rating: 4.5,
    orders: 22100,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "ألعاب أطفال",
    badge: "ساخن",
    searchQuery: "kids outdoor play tent",
  }),
];

export function productHref(product: Product): string {
  return `/product/${product.id}`;
}

export function externalBuyUrl(product: Product): string {
  return product.productUrl;
}

export function discountPercent(product: Product): number {
  if (product.originalPrice <= product.price) return 0;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

export function formatOrders(orders: number): string {
  if (orders >= 1000) {
    return `${(orders / 1000).toFixed(orders >= 10000 ? 0 : 1)} ألف`;
  }
  return String(orders);
}

export function formatSar(amount: number): string {
  return `${amount.toLocaleString("ar-SA")} ر.س`;
}

export function getProductById(id: string): Product | undefined {
  return trendingProducts.find((product) => product.id === id);
}

export function getProducts(options?: {
  category?: CategoryId;
  marketplace?: MarketplaceId;
}): Product[] {
  const category = options?.category ?? "all";
  const marketplace = options?.marketplace ?? "all";
  const list = trendingProducts.filter((product) => {
    const categoryOk = category === "all" || product.category === category;
    const marketOk =
      marketplace === "all" || product.marketplace === marketplace;
    return categoryOk && marketOk;
  });
  return [...list].sort((a, b) => b.orders - a.orders);
}
