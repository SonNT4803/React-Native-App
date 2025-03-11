import { Food } from "./food.models";

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  foods?: Food[];
}
