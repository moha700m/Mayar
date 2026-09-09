import { Hero } from "@/components/Hero";
import { ProductExplorer } from "@/components/ProductExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fetchTrendingProducts } from "@/lib/aliexpress";

export const revalidate = 3600;

export default async function Home() {
  const { products, source } = await fetchTrendingProducts("all");

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProductExplorer initialProducts={products} source={source} />
      </main>
      <SiteFooter />
    </>
  );
}
