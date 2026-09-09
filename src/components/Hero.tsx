export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="ambient-shift h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,15,14,0.92)_8%,rgba(7,22,20,0.78)_48%,rgba(7,22,20,0.45)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,90,60,0.28),transparent_45%)]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <p
          className="rise-in mb-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--lime)] sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ترندكس
        </p>
        <h1
          className="rise-in-delay max-w-3xl text-balance text-2xl font-bold leading-relaxed text-[var(--text)] sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          المنتجات الأكثر رواجًا على علي إكسبريس — في مكان واحد
        </h1>
        <p className="rise-in-delay-2 mt-4 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          تابع الترندات اليومية، قارن الأسعار، وانتقل مباشرة لصفحات الشراء على
          علي إكسبريس.
        </p>
        <div className="rise-in-delay-2 mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#products"
            className="rounded-full bg-[var(--ember)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_40px_var(--glow)] transition hover:bg-[var(--ember-soft)]"
          >
            تصفح الترند الآن
          </a>
          <a
            href="https://www.aliexpress.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--line)] bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--text)] backdrop-blur transition hover:bg-white/10"
          >
            موقع علي إكسبريس
          </a>
        </div>
      </div>
    </section>
  );
}
