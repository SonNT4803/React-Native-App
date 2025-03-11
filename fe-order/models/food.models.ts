import { Category } from "./category.models";

export interface Food {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isAvailable: boolean;
  category?: Category;
  categoryId?: number;
  totalQuantity: number;
}
