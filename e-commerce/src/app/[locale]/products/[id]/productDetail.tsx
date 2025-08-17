"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/services/products/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/product/slice";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProductDetailClient({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
       
        <div className="border rounded-lg shadow bg-white flex justify-center items-center p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            priority
            className="object-contain max-h-[400px]"
          />
        </div>

        
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">
            ${product.price}
          </p>

        
          {!cartItem ? (
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                  })
                );
                toast.success("Ürün sepete eklendi!");
              }}
            >
              Sepete Ekle
            </Button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10"
                  onClick={() => dispatch(decreaseQuantity(Number(product.id)))}
                >
                  -
                </Button>
                <span className="text-xl font-semibold">
                  {cartItem.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                      })
                    )
                  }
                  
                >
                  +
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {dispatch(removeFromCart(Number(product.id))) 
                    toast.success("Ürün Sepetten Kaldırıldı")}}
                  className="cursor-pointer"
                >
                  Sepetten Kaldır
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
