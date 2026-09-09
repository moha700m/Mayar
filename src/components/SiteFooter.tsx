export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-lg font-bold text-[var(--text)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ترندكس
        </p>
        <p className="text-sm text-[var(--muted)]">
          نون وعروض السعودية وأمازون وعلي إكسبريس وعلي بابا. الأسعار بالريال
          السعودي. أداة اكتشاف مستقلة وليست تابعة رسميًا لأي منصة.
        </p>
      </div>
    </footer>
  );
}
