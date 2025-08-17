"use client";

import { Product } from "@/services/products/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg flex flex-col items-center shadow hover:shadow-lg mb-12 transition cursor-pointer">
      <div className="w-full h-[200px] relative  bg-[linear-gradient(to_right,rgb(255,255,255),rgb(230,245,255))]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         25vw"
          className="object-contain py-4 "
        />
      </div>
      <div className="flex flex-col justify-between  px-4 pb-4 gap-y-2 h-[150px] text-wrap w-full text-left bg-gray-50">
        <p className="text-lg font-medium line-clamp-2 pt-4 ">
          
          {product.title}
        </p>

        <span className="flex justify-between font-bold text-2xl text-left text-black">
          <p>
            {" "}
            <span className="text-yellow-300" >$ </span> {product.price}
          </p>
          <p >⭐{product.rating.rate} </p>
        </span>
      </div>
    </div>
  );
}
