import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ترندكس | منتجات علي إكسبريس الترند",
  description:
    "اكتشف المنتجات الأكثر رواجًا على علي إكسبريس: إلكترونيات، منزل، جمال، أزياء والمزيد.",
  openGraph: {
    title: "ترندكس | منتجات علي إكسبريس الترند",
    description:
      "تابع الترندات اليومية وانتقل مباشرة لصفحات الشراء على علي إكسبريس.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
