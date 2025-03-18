export interface Order {
  id?: string | number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  note?: string;
}

export interface OrderItem {
  foodId: number;
  quantity: number;
  price: number;
}

// New interfaces for order history
export interface OrderHistory {
  id: number;
  orderDate: string;
  totalAmount: string | number;
  status: string;
  deliveryAddress: string | null;
  note: string | null;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  quantity: number;
  price: string | number;
  food: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export interface OrderHistoryResponse {
  statusCode: number;
  message: string;
  data: OrderHistory[];
}
