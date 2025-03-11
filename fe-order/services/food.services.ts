import axiosInstance from "@/utils/axiosIntance";
import { Food } from "@/models/food.models";
import { Response } from "@/models/response.modes";

export const FoodService = {
  // Get all foods
  getAllFoods: async (): Promise<Food[]> => {
    try {
      const response = await axiosInstance.get("/food");
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching foods:", error);
      return [];
    }
  },

  // Get food by ID
  getFoodById: async (id: number): Promise<Food | null> => {
    try {
      const response = await axiosInstance.get(`/food/${id}`);
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching food with id ${id}:`, error);
      return null;
    }
  },

  getFoodByCategory: async (category: number): Promise<Food[]> => {
    try {
      const response = await axiosInstance.get(`/food/category/${category}`);
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching food with category ${category}:`, error);
      return [];
    }
  },
};
