import { DashboardContent } from "@/components/layout/content";
import { Product } from "@/services/products/types";
import ProductCard from "@/components/productCard";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 10 },
  });
  const products: Product[] = await res.json();

  const firstFour = products.slice(0, 4);

  const t = await getTranslations("Products");

  return (
    <DashboardContent>
      <div className="mb-12">
        <div className="text-4xl font-bold py-4 my-4 text-primary">
          {t("Featured Products")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {firstFour.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardContent>
  );
}
