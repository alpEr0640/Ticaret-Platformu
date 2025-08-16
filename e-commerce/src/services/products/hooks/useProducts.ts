"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductsFunction, getProdurctById } from "../index";


export function GetProducts() {
  return useQuery({
    queryKey: ["Products"],
    queryFn: getProductsFunction,
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProdurctById(id),
    enabled: !!id,
  });
}
