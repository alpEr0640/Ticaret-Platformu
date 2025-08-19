import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Product } from "@/services/products/types";
import ProductDetailClient from "./productDetail";

type PageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale, id } = params;

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

  const product: Product = await res.json();

  return {
    title: `${product.title}`,
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

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <h1>Ürün bulunamadı</h1>;
  }

  const product: Product = await res.json();

  return <ProductDetailClient product={product} />;
}
