"use client";

import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/product/slice";
import { TrashIcon } from "../icons/icons";
import { useTranslations } from "next-intl";

export default function MyCart() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const t = useTranslations("cart");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 ">
      <h1 className="text-3xl font-extrabold mb-6 text-primary">
        🛒 {t("mycart")}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-lg">
          {t("emptyCart")}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="w-24 h-24 relative bg-gray-100 rounded">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.price}$ / {t("quantity")}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image,
                          })
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-2">
                  <div className="font-bold text-xl text-primary">
                    {(item.quantity * item.price).toFixed(2)}$
                  </div>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-lg shadow-md bg-white p-6 h-fit">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {t("summary")}
            </h3>
            <div className="flex justify-between text-lg mb-2">
              <span>{t("subtotal")}:</span>
              <span>{totalPrice.toFixed(2)} $</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>{t("total")}:</span>
              <span>{totalPrice.toFixed(2)} $</span>
            </div>

            <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 "
              disabled
            >
              Ödeme Yap
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
