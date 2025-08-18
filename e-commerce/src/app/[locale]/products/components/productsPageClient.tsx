"use client";

import { useEffect, useState } from "react";
import { DashboardContent } from "@/components/layout/content";
import ProductCard from "@/components/productCard";
import Link from "next/link";
import { Product } from "@/services/products/types";
import { useTranslations } from "next-intl";

export default function ProductsPageClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(initialProducts.map((p) => p.category)));
    setCategories(uniqueCategories);
  }, [initialProducts]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts =
    sortOrder === "none"
      ? filteredProducts
      : [...filteredProducts].sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

  const t = useTranslations("products");
  const s = useTranslations("sort");

  return (
    <DashboardContent>
      <div className="mb-12">
        <div className="flex flex-wrap justify-between items-center gap-4 py-4 my-4">
          <div className="text-4xl font-bold text-yellow-400">
            {t("allProducts")}
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "none" | "asc" | "desc")
              }
              className="border rounded px-3 py-2"
            >
              <option value="none">{s("sort")}</option>
              <option value="asc">
                {s("price")}: {s("ascent")}
              </option>
              <option value="desc">
                {s("price")}: {s("descent")}
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {sortedProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardContent>
  );
}
