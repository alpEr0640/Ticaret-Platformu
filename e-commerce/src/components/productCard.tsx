"use client";

import { Product } from "@/services/products/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative border rounded-lg flex flex-col items-center shadow hover:shadow-lg transition cursor-pointer">
      <div className="absolute top-0 right-0 bg-[rgba(255,255,255,0.8)] text-black p-2 m-2 text-sm rounded-md shadow-md">
        {" "}
        ⭐{product.rating.rate}{" "}
      </div>
      <div className="w-full h-[200px] relative  bg-[linear-gradient(to_right,rgb(255,255,255),rgb(230,245,255))]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain py-4 "
        />
      </div>
      <div className="flex flex-col justify-between  px-4 pb-4 gap-y-2 h-[150px] text-wrap w-full text-left bg-gray-50">
        <p className="text-lg font-medium line-clamp-2 ">
          {/* <span className="!text-xl !font-semibold pr-2">
            {product.category}
          </span> */}
          {product.title}
        </p>

        <p className="font-bold text-3xl text-left text-yellow-300">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
