# ترندكس — منتجات علي إكسبريس الترند

موقع عربي لاكتشاف المنتجات الأكثر رواجًا على علي إكسبريس: تصفح حسب الفئة، ابحث بسرعة، وانتقل مباشرة لصفحة المنتج على علي إكسبريس.

## التشغيل المحلي

```bash
npm ci
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## البيانات

بدون مفاتيح API يعرض الموقع مجموعة منتجات ترند جاهزة مع روابط بحث علي إكسبريس.

لربط بيانات حية من AliExpress Affiliate API، انسخ `.env.example` إلى `.env.local` وأضف:

```bash
ALIEXPRESS_APP_KEY=...
ALIEXPRESS_APP_SECRET=...
ALIEXPRESS_TRACKING_ID=...
```

ثم أعد تشغيل الخادم. الواجهة التجريبية: `GET /api/trending?category=gadgets`.

## الأوامر

```bash
npm run typecheck
npm run lint
npm run build
```

## الهيكل

- `src/app`: صفحات App Router وواجهة `/api/trending`
- `src/components`: الهيرو، الفلاتر، وبطاقات المنتجات
- `src/data/products.ts`: المنتجات التجريبية والفئات
- `src/lib/aliexpress.ts`: جلب اختياري من Affiliate API مع رجوع تلقائي للبيانات المحلية
