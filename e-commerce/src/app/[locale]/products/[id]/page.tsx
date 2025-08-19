import { getTranslations } from "next-intl/server";
import { Product } from "@/services/products/types";
import ProductDetailClient from "./productDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { locale, id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const t = await getTranslations({ locale, namespace: "meta" });
    return {
      title: t("product.notFoundTitle"),
      description: t("product.notFoundDesc"),
    };
  }

  const product: Product | null = await res.json().catch(() => null);
  if (!product) {
    return {
      title: "Ürün bulunamadı",
      description: "Ürün bilgisi alınamadı",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return <h1>Ürün bulunamadı</h1>;

  let product: Product | null = null;
  try {
    product = await res.json();
  } catch {
    return <h1>Ürün bilgisi okunamadı</h1>;
  }

  if (!product) return <h1>Ürün bulunamadı</h1>;

  return <ProductDetailClient product={product} />;
}
