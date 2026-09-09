export type CategoryId =
  | "all"
  | "gadgets"
  | "home"
  | "beauty"
  | "fashion"
  | "sports"
  | "auto";

export type Product = {
  id: string;
  title: string;
  titleAr: string;
  category: Exclude<CategoryId, "all">;
  price: number;
  originalPrice: number;
  currency: "USD";
  rating: number;
  orders: number;
  image: string;
  imageAlt: string;
  badge?: "ساخن" | "جديد" | "خصم قوي";
  searchQuery: string;
  affiliateUrl?: string;
};

export type Category = {
  id: CategoryId;
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
];

export const trendingProducts: Product[] = [
  {
    id: "g1",
    title: "Magnetic Wireless Power Bank 10000mAh",
    titleAr: "باور بانك لاسلكي مغناطيسي 10000 مللي أمبير",
    category: "gadgets",
    price: 18.9,
    originalPrice: 39.9,
    currency: "USD",
    rating: 4.8,
    orders: 48200,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80",
    imageAlt: "شاحن محمول لاسلكي",
    badge: "ساخن",
    searchQuery: "magnetic wireless power bank 10000mah",
  },
  {
    id: "g2",
    title: "Mini Portable Projector HD",
    titleAr: "بروجكتر محمول صغير بدقة عالية",
    category: "gadgets",
    price: 42.5,
    originalPrice: 89.0,
    currency: "USD",
    rating: 4.6,
    orders: 22140,
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
    imageAlt: "بروجكتر منزلي",
    badge: "خصم قوي",
    searchQuery: "mini portable projector hd",
  },
  {
    id: "g3",
    title: "Noise Cancelling Earbuds",
    titleAr: "سماعات أذن بخاصية عزل الضوضاء",
    category: "gadgets",
    price: 24.3,
    originalPrice: 59.9,
    currency: "USD",
    rating: 4.7,
    orders: 91300,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سماعات لاسلكية",
    badge: "ساخن",
    searchQuery: "noise cancelling earbuds wireless",
  },
  {
    id: "g4",
    title: "Smart Watch Ultra Sport",
    titleAr: "ساعة ذكية رياضية الترا",
    category: "gadgets",
    price: 31.2,
    originalPrice: 74.0,
    currency: "USD",
    rating: 4.5,
    orders: 35680,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "ساعة ذكية",
    badge: "جديد",
    searchQuery: "smart watch ultra sport",
  },
  {
    id: "h1",
    title: "LED Strip Lights RGB App Control",
    titleAr: "شريط إضاءة LED RGB بالتحكم عبر التطبيق",
    category: "home",
    price: 9.8,
    originalPrice: 24.9,
    currency: "USD",
    rating: 4.7,
    orders: 128400,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    imageAlt: "إضاءة LED ملونة",
    badge: "ساخن",
    searchQuery: "led strip lights rgb app control",
  },
  {
    id: "h2",
    title: "Robot Vacuum Compact",
    titleAr: "مكنسة روبوت مدمجة",
    category: "home",
    price: 79.0,
    originalPrice: 159.0,
    currency: "USD",
    rating: 4.4,
    orders: 18750,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكنسة روبوت",
    badge: "خصم قوي",
    searchQuery: "robot vacuum cleaner compact",
  },
  {
    id: "h3",
    title: "Electric Milk Frother Whisk",
    titleAr: "خفاقة حليب كهربائية",
    category: "home",
    price: 6.4,
    originalPrice: 14.9,
    currency: "USD",
    rating: 4.6,
    orders: 64210,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "خفاقة قهوة",
    searchQuery: "electric milk frother handheld",
  },
  {
    id: "h4",
    title: "Folding Storage Organizer",
    titleAr: "منظم تخزين قابل للطي",
    category: "home",
    price: 11.5,
    originalPrice: 27.0,
    currency: "USD",
    rating: 4.5,
    orders: 40320,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    imageAlt: "منظم تخزين منزلي",
    badge: "جديد",
    searchQuery: "folding storage organizer closet",
  },
  {
    id: "b1",
    title: "LED Face Mask Therapy",
    titleAr: "قناع وجه علاجي بتقنية LED",
    category: "beauty",
    price: 28.7,
    originalPrice: 69.0,
    currency: "USD",
    rating: 4.3,
    orders: 15490,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    imageAlt: "عناية بالبشرة",
    badge: "ساخن",
    searchQuery: "led face mask light therapy",
  },
  {
    id: "b2",
    title: "Hair Dryer Diffuser Ionic",
    titleAr: "مجفف شعر أيوني مع موزع",
    category: "beauty",
    price: 22.1,
    originalPrice: 49.9,
    currency: "USD",
    rating: 4.6,
    orders: 27880,
    image:
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مجفف شعر",
    badge: "خصم قوي",
    searchQuery: "ionic hair dryer diffuser",
  },
  {
    id: "b3",
    title: "Makeup Brush Set Soft",
    titleAr: "طقم فرش مكياج ناعمة",
    category: "beauty",
    price: 8.9,
    originalPrice: 19.9,
    currency: "USD",
    rating: 4.8,
    orders: 76200,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
    imageAlt: "فرش مكياج",
    searchQuery: "makeup brush set professional soft",
  },
  {
    id: "f1",
    title: "Oversized Vintage Sunglasses",
    titleAr: "نظارات شمسية كلاسيكية كبيرة",
    category: "fashion",
    price: 7.2,
    originalPrice: 18.5,
    currency: "USD",
    rating: 4.5,
    orders: 53410,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نظارات شمسية",
    badge: "ساخن",
    searchQuery: "oversized vintage sunglasses women",
  },
  {
    id: "f2",
    title: "Crossbody Mini Bag",
    titleAr: "حقيبة كروس صغيرة",
    category: "fashion",
    price: 13.4,
    originalPrice: 29.9,
    currency: "USD",
    rating: 4.4,
    orders: 31900,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حقيبة يد",
    badge: "جديد",
    searchQuery: "crossbody mini bag women",
  },
  {
    id: "f3",
    title: "Thermal Running Jacket",
    titleAr: "جاكيت جري حراري",
    category: "fashion",
    price: 26.8,
    originalPrice: 55.0,
    currency: "USD",
    rating: 4.6,
    orders: 19870,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "جاكيت رياضي",
    searchQuery: "thermal running jacket men",
  },
  {
    id: "s1",
    title: "Resistance Bands Set",
    titleAr: "طقم أحزمة مقاومة للتمارين",
    category: "sports",
    price: 10.5,
    originalPrice: 24.0,
    currency: "USD",
    rating: 4.7,
    orders: 88450,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "أحزمة مقاومة",
    badge: "ساخن",
    searchQuery: "resistance bands set workout",
  },
  {
    id: "s2",
    title: "Yoga Mat Non Slip",
    titleAr: "سجادة يوغا مانعة للانزلاق",
    category: "sports",
    price: 14.9,
    originalPrice: 32.0,
    currency: "USD",
    rating: 4.6,
    orders: 45120,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سجادة يوغا",
    searchQuery: "yoga mat non slip thick",
  },
  {
    id: "s3",
    title: "Adjustable Dumbbell Pair",
    titleAr: "دامبل قابل للتعديل",
    category: "sports",
    price: 36.0,
    originalPrice: 79.0,
    currency: "USD",
    rating: 4.5,
    orders: 14230,
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "أوزان رياضية",
    badge: "خصم قوي",
    searchQuery: "adjustable dumbbell pair home gym",
  },
  {
    id: "a1",
    title: "Car Phone Holder Magnetic",
    titleAr: "حامل جوال مغناطيسي للسيارة",
    category: "auto",
    price: 5.9,
    originalPrice: 14.9,
    currency: "USD",
    rating: 4.6,
    orders: 112800,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حامل هاتف سيارة",
    badge: "ساخن",
    searchQuery: "car phone holder magnetic mount",
  },
  {
    id: "a2",
    title: "Dash Cam Dual Lens",
    titleAr: "كاميرا سيارة بعدستين",
    category: "auto",
    price: 34.5,
    originalPrice: 79.0,
    currency: "USD",
    rating: 4.4,
    orders: 26740,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "كاميرا لوحة القيادة",
    badge: "جديد",
    searchQuery: "dash cam dual lens 1080p",
  },
  {
    id: "a3",
    title: "Portable Car Vacuum",
    titleAr: "مكنسة سيارة محمولة",
    category: "auto",
    price: 16.8,
    originalPrice: 35.0,
    currency: "USD",
    rating: 4.5,
    orders: 38960,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكنسة سيارة",
    searchQuery: "portable car vacuum cleaner wireless",
  },
];

export function aliexpressSearchUrl(query: string): string {
  const slug = encodeURIComponent(query.trim().replace(/\s+/g, "-"));
  return `https://www.aliexpress.com/w/wholesale-${slug}.html`;
}

export function productUrl(product: Product): string {
  return product.affiliateUrl ?? aliexpressSearchUrl(product.searchQuery);
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

export function getProducts(category: CategoryId = "all"): Product[] {
  const list =
    category === "all"
      ? trendingProducts
      : trendingProducts.filter((p) => p.category === category);
  return [...list].sort((a, b) => b.orders - a.orders);
}
