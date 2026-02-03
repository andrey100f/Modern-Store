import axios from "axios";
import type {Product} from "./types/product.ts";

const baseUrl = "http://localhost:8080/api/products";

const publicApi = axios.create({ baseURL: '/api' });
const privateApi = axios.create({ baseURL: '/api' });

privateApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await publicApi.get(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetch products failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function addProduct(product: Partial<Product>): Promise<Product> {
  try {
    const response = await privateApi.post(baseUrl, product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Add product failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function updateProduct(productId: string, product: Partial<Product>): Promise<Product> {
  try {
    const response = await privateApi.put(`${baseUrl}/${productId}`, product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Update product failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await privateApi.delete(`${baseUrl}/${productId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Delete product failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

