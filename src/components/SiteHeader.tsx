import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ember)] text-sm font-bold text-white shadow-[0_0_24px_var(--glow)] transition group-hover:scale-105"
          >
            ت
          </span>
          <span
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ترندكس
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <a href="#products" className="transition hover:text-[var(--text)]">
            المنتجات
          </a>
          <a
            href="#products"
            className="rounded-full bg-[var(--lime)] px-4 py-2 font-semibold text-[#102018] transition hover:bg-[var(--lime-deep)] hover:text-white"
          >
            اكتشف الترند
          </a>
        </nav>
      </div>
    </header>
  );
}
