import { ProductExplorer } from "@/components/ProductExplorer";
import { fetchTrendingProducts } from "@/lib/aliexpress";

export const revalidate = 3600;

export default async function Home() {
  const { products, source } = await fetchTrendingProducts();

  return (
    <main>
      <ProductExplorer initialProducts={products} source={source} />
    </main>
  );
}
