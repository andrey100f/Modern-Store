import axios from "axios";
import type {Product} from "./types/product.ts";

const baseUrl = "http://localhost:8080/api/products";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
