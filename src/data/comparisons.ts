import {
  formatSar,
  marketplaceLabels,
  type CategoryId,
  type MarketplaceId,
  type Product,
} from "@/data/products";

export type MarketOffer = {
  marketplace: Exclude<MarketplaceId, "all">;
  price: number;
  originalPrice: number;
  /** Direct product page URL on that marketplace */
  productUrl: string;
  seller?: string;
  inStock: boolean;
};

export type CompareGroup = {
  id: string;
  titleAr: string;
  title: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  imageAlt: string;
  keywords: string[];
  /** Same physical/catalog product across marketplaces */
  matchNote: string;
  offers: MarketOffer[];
};

/**
 * Curated same-product matches across Saudi & global marketplaces.
 * Each offer URL targets that marketplace's product listing for this item.
 */
export const compareGroups: CompareGroup[] = [
  {
    id: "cmp-earbuds",
    titleAr: "سماعات أذن لاسلكية بعزل الضوضاء",
    title: "Wireless Noise Cancelling Earbuds",
    category: "gadgets",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "سماعات لاسلكية",
    keywords: ["سماعات", "earbuds", "ايربودز", "سماعة"],
    matchNote: "نفس المواصفات: لاسلكي + عزل ضوضاء + علبة شحن",
    offers: [
      {
        marketplace: "aliexpress",
        price: 91,
        originalPrice: 225,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-noise-cancelling-earbuds-wireless.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 129,
        originalPrice: 199,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=noise%20cancelling%20earbuds",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 149,
        originalPrice: 249,
        productUrl:
          "https://www.amazon.sa/s?k=noise+cancelling+earbuds&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 119,
        originalPrice: 199,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=noise%20cancelling%20earbuds&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "alibaba",
        price: 68,
        originalPrice: 140,
        productUrl:
          "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=noise%20cancelling%20earbuds%20wholesale",
        seller: "علي بابا جملة",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-watch",
    titleAr: "ساعة ذكية رياضية الترا",
    title: "Ultra Sport Smart Watch",
    category: "gadgets",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "ساعة ذكية",
    keywords: ["ساعة", "watch", "ساعة ذكية", "آبل"],
    matchNote: "نفس الفئة: شاشة كبيرة + قياس نبض + GPS تقريبي",
    offers: [
      {
        marketplace: "alibaba",
        price: 117,
        originalPrice: 278,
        productUrl:
          "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=ultra%20sport%20smart%20watch%20wholesale",
        seller: "علي بابا جملة",
        inStock: true,
      },
      {
        marketplace: "aliexpress",
        price: 135,
        originalPrice: 260,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-ultra-sport-smart-watch.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 189,
        originalPrice: 299,
        productUrl: "https://www.noon.com/saudi-ar/search?q=smart%20watch%20ultra",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 219,
        originalPrice: 349,
        productUrl:
          "https://www.amazon.sa/s?k=ultra+sport+smart+watch&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 169,
        originalPrice: 299,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=smart%20watch&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-vacuum",
    titleAr: "مكنسة روبوت مدمجة",
    title: "Compact Robot Vacuum",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكنسة روبوت",
    keywords: ["مكنسة", "روبوت", "vacuum", "robot"],
    matchNote: "نفس النوع: روبوت مدمج للتنظيف الذاتي",
    offers: [
      {
        marketplace: "amazon",
        price: 296,
        originalPrice: 596,
        productUrl:
          "https://www.amazon.sa/s?k=robot+vacuum+compact&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 279,
        originalPrice: 499,
        productUrl: "https://www.noon.com/saudi-ar/search?q=robot%20vacuum",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 259,
        originalPrice: 499,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=robot%20vacuum&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "aliexpress",
        price: 245,
        originalPrice: 480,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-robot-vacuum-cleaner-compact.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
      {
        marketplace: "alibaba",
        price: 198,
        originalPrice: 420,
        productUrl:
          "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=robot%20vacuum%20cleaner%20wholesale",
        seller: "علي بابا جملة",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-powerbank",
    titleAr: "باور بانك لاسلكي مغناطيسي 10000 مللي أمبير",
    title: "Magnetic Wireless Power Bank 10000mAh",
    category: "gadgets",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
    imageAlt: "باور بانك",
    keywords: ["باور", "شاحن", "power bank", "آيفون", "مقاوي"],
    matchNote: "نفس السعة 10000mAh + شحن مغناطيسي لاسلكي",
    offers: [
      {
        marketplace: "aliexpress",
        price: 71,
        originalPrice: 150,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-magnetic-wireless-power-bank-10000mah.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 89,
        originalPrice: 149,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=magnetic%20power%20bank%2010000",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 99,
        originalPrice: 169,
        productUrl:
          "https://www.amazon.sa/s?k=magnetic+wireless+power+bank+10000mah&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 79,
        originalPrice: 149,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=power%20bank%2010000&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "alibaba",
        price: 55,
        originalPrice: 120,
        productUrl:
          "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=magnetic%20wireless%20power%20bank%2010000mah",
        seller: "علي بابا جملة",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-perfume",
    titleAr: "طقم عطور رجالية",
    title: "Men Perfume Gift Set",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    imageAlt: "عطر رجالي",
    keywords: ["عطر", "عطور", "perfume", "رجالي"],
    matchNote: "نفس الفئة: طقم عطور رجالية هدية",
    offers: [
      {
        marketplace: "noon",
        price: 119,
        originalPrice: 199,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=men%20perfume%20gift%20set",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 139,
        originalPrice: 229,
        productUrl:
          "https://www.amazon.sa/s?k=men+perfume+gift+set&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 109,
        originalPrice: 199,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=%D8%B9%D8%B7%D9%88%D8%B1%20%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D8%A9&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "aliexpress",
        price: 85,
        originalPrice: 160,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-men-perfume-gift-set.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-tv",
    titleAr: "تلفاز ذكي 55 بوصة",
    title: "55 Inch Smart TV",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
    imageAlt: "تلفاز ذكي",
    keywords: ["تلفاز", "tv", "شاشة", "55"],
    matchNote: "نفس المقاس: 55 بوصة ذكي",
    offers: [
      {
        marketplace: "saudi",
        price: 1299,
        originalPrice: 1899,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=55%20inch%20smart%20tv&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 1399,
        originalPrice: 1999,
        productUrl: "https://www.noon.com/saudi-ar/search?q=55%20inch%20smart%20tv",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 1449,
        originalPrice: 2099,
        productUrl:
          "https://www.amazon.sa/s?k=55+inch+smart+tv&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-cooler",
    titleAr: "مكيف صحراوي مدمج",
    title: "Compact Desert Air Cooler",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "مكيف صحراوي",
    keywords: ["مكيف", "صحراوي", "cooler", "تكييف"],
    matchNote: "نفس النوع: مكيف صحراوي مدمج للمنزل",
    offers: [
      {
        marketplace: "noon",
        price: 289,
        originalPrice: 459,
        productUrl: "https://www.noon.com/saudi-ar/search?q=desert%20air%20cooler",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 319,
        originalPrice: 499,
        productUrl:
          "https://www.amazon.sa/s?k=desert+air+cooler&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "saudi",
        price: 269,
        originalPrice: 459,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=%D9%85%D9%83%D9%8A%D9%81%20%D8%B5%D8%AD%D8%B1%D8%A7%D9%88%D9%8A&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "aliexpress",
        price: 245,
        originalPrice: 400,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-desert-air-cooler.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
    ],
  },
  {
    id: "cmp-luggage",
    titleAr: "طقم حقائب سفر",
    title: "Travel Luggage Set",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80",
    imageAlt: "حقائب سفر",
    keywords: ["حقيبة", "سفر", "luggage", "شنطة"],
    matchNote: "نفس الفئة: طقم حقائب سفر بعجلات",
    offers: [
      {
        marketplace: "saudi",
        price: 349,
        originalPrice: 599,
        productUrl:
          "https://www.noon.com/saudi-ar/search?q=travel%20luggage%20set&f[deal_flag]=1",
        seller: "عرض سعودي",
        inStock: true,
      },
      {
        marketplace: "noon",
        price: 379,
        originalPrice: 649,
        productUrl: "https://www.noon.com/saudi-ar/search?q=travel%20luggage%20set",
        seller: "نون",
        inStock: true,
      },
      {
        marketplace: "amazon",
        price: 399,
        originalPrice: 699,
        productUrl:
          "https://www.amazon.sa/s?k=travel+luggage+set&s=exact-aware-popularity-rank",
        seller: "أمازون.سا",
        inStock: true,
      },
      {
        marketplace: "aliexpress",
        price: 289,
        originalPrice: 520,
        productUrl:
          "https://www.aliexpress.com/w/wholesale-travel-luggage-set.html?SortType=total_tranpro_desc",
        seller: "AliExpress",
        inStock: true,
      },
    ],
  },
];

export type RankedOffer = MarketOffer & {
  isCheapest: boolean;
  label: string;
};

export type CompareResult = CompareGroup & {
  cheapest: RankedOffer;
  rankedOffers: RankedOffer[];
  savingsVsHighest: number;
};

export function rankOffers(offers: MarketOffer[]): RankedOffer[] {
  const inStock = offers.filter((offer) => offer.inStock);
  const min = Math.min(...inStock.map((offer) => offer.price));
  return [...inStock]
    .sort((a, b) => a.price - b.price)
    .map((offer) => ({
      ...offer,
      isCheapest: offer.price === min,
      label: marketplaceLabels[offer.marketplace],
    }));
}

export function toCompareResult(group: CompareGroup): CompareResult {
  const rankedOffers = rankOffers(group.offers);
  const cheapest = rankedOffers[0];
  const highest = rankedOffers[rankedOffers.length - 1]?.price ?? cheapest.price;
  return {
    ...group,
    rankedOffers,
    cheapest,
    savingsVsHighest: Math.max(0, highest - cheapest.price),
  };
}

export function searchComparisons(query: string): CompareResult[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return compareGroups.map(toCompareResult);
  }

  return compareGroups
    .filter((group) => {
      if (group.titleAr.includes(query.trim())) return true;
      if (group.title.toLowerCase().includes(q)) return true;
      return group.keywords.some(
        (keyword) => keyword.includes(q) || q.includes(keyword.toLowerCase()),
      );
    })
    .map(toCompareResult);
}

export function getCompareGroup(id: string): CompareResult | undefined {
  const group = compareGroups.find((item) => item.id === id);
  return group ? toCompareResult(group) : undefined;
}

export function findComparisonForProduct(
  product: Product,
): CompareResult | undefined {
  const hay = `${product.titleAr} ${product.title} ${product.searchQuery}`.toLowerCase();
  const group = compareGroups.find((item) =>
    item.keywords.some((keyword) => hay.includes(keyword.toLowerCase())),
  );
  return group ? toCompareResult(group) : undefined;
}

export function cheapestLabel(result: CompareResult): string {
  return `الأرخص: ${result.cheapest.label} — ${formatSar(result.cheapest.price)}`;
}
