import axiosInstance from "../utils/axiosIntance";
import { Order } from "../models/order.models";

export const orderService = {
  checkout: async (orderData: Order) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await axiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
