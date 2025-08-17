// app/products/[id]/page.tsx
import { Product } from "@/services/products/types";
import ProductDetailClient from "./productDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
    {
      next: { revalidate: 60 }, // ISR -> 60 saniyede bir güncellenir
    }
  );

  if (!res.ok) {
    return <h1>Ürün bulunamadı</h1>;
  }

  const product: Product = await res.json();

  return <ProductDetailClient product={product} />;
}
