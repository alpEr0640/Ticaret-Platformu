import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductsPageClient from "./components/productsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/landing.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/landing.jpg"],
    },
  };
}

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });
  const products = await res.json();

  return <ProductsPageClient initialProducts={products} />;
}
