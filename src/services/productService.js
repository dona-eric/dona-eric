import { request } from "../api/apiClient";

export const ProductService = {
  getAll: async () => {
    try {
      const data = await request("products");
      return data.products || [];
    } catch (error) {
      console.error("[ProductService] Error fetching products:", error);
      return [];
    }
  }
};
