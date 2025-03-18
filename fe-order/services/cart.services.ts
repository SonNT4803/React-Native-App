import { Food } from "@/models/food.models";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (food: Food, onSuccess?: (name: string) => void) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (food: Food, onSuccess?: (name: string) => void) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === food.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === food.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image || "https://placeholder.com/150",
                quantity: 1,
              },
            ],
          });
        }

        // Call the success callback if provided
        if (onSuccess) {
          onSuccess(food.name);
        }
      },

      removeFromCart: (id: number) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id: number, change: number) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
