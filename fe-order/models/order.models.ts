export interface Order {
  id?: string;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  deliveryAddress: string;
}

export interface OrderItem {
  foodId: number;
  quantity: number;
  price: number;
}
