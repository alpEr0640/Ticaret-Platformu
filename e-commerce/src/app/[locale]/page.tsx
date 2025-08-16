"use client";
/* import { useTranslations } from "next-intl"; */
import { Link } from "@/i18n/navigation";
/* import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { useState } from "react"; */
import { DashboardContent } from "@/components/layout/content";
import { GetProducts } from "@/services/products/hooks/useProducts";
import { Product } from "@/services/products/types";
import ProductCard from "@/components/productCard";

export default function HomePage() {

  const { data: products, isLoading, error } = GetProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Bir hata oluştu</p>;
  const firstFour = products?.slice(0, 4);

  return (
    <DashboardContent>
      <div className="mb-12">
        {/*  <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}> decrement</button>
        <input
          type="text"
          name="title"
          placeholder="başlık girin"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="title" onClick={() => dispatch(setTitle(inputValue))}>
          Set Title
        </button>
        <span> {inputValue}</span>
        <span> {title}</span>
 */}
        <div className="text-4xl py-4 my-4">Öne Çıkan Ürünler</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {firstFour?.map((p: Product) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardContent>
  );
}
