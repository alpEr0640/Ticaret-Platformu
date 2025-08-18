import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardContent } from "@/components/layout/content";
import { Product } from "@/services/products/types";
import ProductCard from "@/components/productCard";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metaData");

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

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 10 },
  });
  const products: Product[] = await res.json();
  const firstFour = products.slice(0, 4);

  const t = await getTranslations({
    locale: params.locale,
    namespace: "products",
  });
  const s = await getTranslations({
    locale: params.locale,
    namespace: "homePage",
  });

  return (
    <DashboardContent>
      <div className="relative w-full h-[50vh] my-12 rounded-lg">
        <Image
          src="/landing.jpg"
          alt="Hero banner"
          fill
          className="object-cover rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center">
            {s("title")}
          </h1>
        </div>
      </div>
      <div className="mb-12">
        <div className="text-4xl font-bold py-4 my-4 text-primary">
          {t("featuredProducts")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {firstFour.map((p) => (
            <Link key={p.id} href={`/${params.locale}/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardContent>
  );
}
