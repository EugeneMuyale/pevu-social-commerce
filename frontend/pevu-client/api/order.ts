import api from './axios';

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type OrderItemRequest = {
  productId: number;
  quantity: number;
  price: number;
};

export type OrderRequest = {
  userId?: number;
  guestEmail?: string;
  guestName?: string;
  items: OrderItemRequest[];
  shippingAddress: string;
  total: number;
  paymentMethod: string;
};

export type OrderItemDto = {
  productId: number;
  quantity: number;
  price: number;
};

export type OrderResponse = {
  id: number;
  userId?: number;
  guestEmail?: string;
  guestName?: string;
  items: OrderItemDto[];
  shippingAddress: string;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
};

export async function placeOrder(userId: number, data: OrderRequest): Promise<OrderResponse> {
  const res = await api.post<OrderResponse>(`/order/${userId}`, data);
  return res.data;
}

export async function placeGuestOrder(data: OrderRequest): Promise<OrderResponse> {
  const res = await api.post<OrderResponse>(`/order/checkout/guest`, data);
  return res.data;
}

export async function getOrders(userId: number): Promise<OrderResponse[]> {
  const res = await api.get<OrderResponse[]>(`/order/${userId}`);
  return res.data;
}

export async function getOrder(orderId: number): Promise<OrderResponse> {
  const res = await api.get<OrderResponse>(`/order/details/${orderId}`);
  return res.data;
}

export async function cancelOrder(orderId: number, userId: number): Promise<OrderResponse> {
  const res = await api.put<OrderResponse>(`/order/${orderId}/cancel`, undefined, { params: { userId } });
  return res.data;
} 