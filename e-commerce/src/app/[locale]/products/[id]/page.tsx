"use client";

import { Button } from "@/components/ui/button";
import { useProductById } from "@/services/products/hooks/useProducts";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/counter/slice";
import { RootState } from "@/store";
import toast from "react-hot-toast";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = React.use(params);
  const { data: product, isLoading, error } = useProductById(id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Bir hata oluştu</p>;
  if (!product) return notFound();
  const cartItem = cartItems.find((item) => item.id === product.id);
  return (
    <div className="p-6 grid grid-cols-6 gap-4 my-12">
      <div className="border rounded-lg shadow col-span-2 col-start-2 flex justify-center py-4">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
        />
      </div>
      <div className="text-3xl font-bold col-span-2 m-12 flex flex-col">
        <span>{product.title}</span>
        <span className="text-xl font-medium">{product.description}</span>

        {/* <Button
          onClick={() => {
            dispatch(
              addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
              })
            );
            toast.success(`ürün sepete eklendi!`);
          }}
        >
          Sepete Ekle
        </Button> */}
        {!cartItem ? (
          <Button
            onClick={() => {
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  quantity: 1,
                })
              );
              toast.success(`Ürün sepete eklendi!`);
            }}
          >
            Sepete Ekle
          </Button>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {/* Adet artır/azalt butonları */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => dispatch(decreaseQuantity(Number(product.id)))}
              >
                -
              </Button>
              <span className="text-xl">{cartItem.quantity}</span>
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      quantity: 1,
                    })
                  )
                }
              >
                +
              </Button>
            </div>

         
            <Button
              variant="destructive"
              onClick={() => dispatch(removeFromCart(Number(product.id)))}
            >
              Sepetten Kaldır
            </Button>
          </div>
        )}

        
      </div>
    </div>
  );
}
