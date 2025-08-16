import axios from "axios";
import { idProductSchema } from "./schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsFunction() {
  const { data } = await axios.get(`${apiUrl}/products`);
  console.log("data:", data);
  return data;
}
export async function getProdurctById(id: string) {
  const { data } = await axios.get(`${apiUrl}/products/${id}`);
  
  console.log(data)
  return idProductSchema.parse(data);
}
