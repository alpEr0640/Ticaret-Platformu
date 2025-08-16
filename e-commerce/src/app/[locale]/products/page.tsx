"use client";

import { DashboardContent } from "@/components/layout/content";
import ProductCard from "@/components/productCard";
import { GetProducts } from "@/services/products/hooks/useProducts";
import { Product } from "@/services/products/types";
import Link from "next/link";
import React from "react";

export default function products() {
  const { data: products, isLoading, error } = GetProducts();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Bir hata oluştu</p>;
  return (
    <DashboardContent>
      <div className="mb-12">
        <div className="text-4xl font-bold text-yellow-400 py-4 my-4 "> Ürünler</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {products?.map((p: Product) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardContent>
  );
}
