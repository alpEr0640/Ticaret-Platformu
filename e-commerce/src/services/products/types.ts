import z from "zod";
import { idProductSchema, productSchema } from "./schema";

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;

export type Products = z.infer<typeof productsSchema>;

export type idProductType = z.infer<typeof idProductSchema>;
