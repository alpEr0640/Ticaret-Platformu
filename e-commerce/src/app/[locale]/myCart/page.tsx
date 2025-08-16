"use client";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyCart() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <div>
      <div className="col-span-6 mt-12">
        <h2 className="text-2xl font-bold mb-4">Sepetim</h2>
        {cartItems.length === 0 ? (
          <p>Sepetiniz boş</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="border p-4 rounded">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x {item.price}₺ ={" "}
                    {item.quantity * item.price}₺
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
