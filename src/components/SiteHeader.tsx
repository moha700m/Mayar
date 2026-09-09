import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(4,15,14,0.88)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ember)] text-sm font-bold text-white shadow-[0_0_24px_var(--glow)] transition group-hover:scale-105"
          >
            ت
          </span>
          <span
            className="text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ترندكس
          </span>
        </Link>
        <p className="hidden text-sm text-[var(--muted)] sm:block">
          نون · عروض السعودية · بالريال
        </p>
      </div>
    </header>
  );
}
