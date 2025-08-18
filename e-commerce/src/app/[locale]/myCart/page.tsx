import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MyCart from "./components/mycart";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cart");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function CartPage() {
  return <MyCart />;
}
