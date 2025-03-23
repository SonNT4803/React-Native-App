import { Category } from "@/models/category.models";
import { Food } from "@/models/food.models";
import axiosInstance from "@/utils/axiosIntance";

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await axiosInstance.get("/categories");
      if (response.data && response.data.statusCode === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  getFoodsByCategory: async (categoryId: number): Promise<Food[]> => {
    try {
      const response = await axiosInstance.get(
        `/categories/${categoryId}/foods`
      );
      if (response.data && response.data.statusCode === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching foods by category:", error);
      return [];
    }
  },
};
