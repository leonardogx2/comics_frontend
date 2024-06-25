import { Order } from "@/interfaces";
import { api } from "..";

interface GetAllOrdersFilters {
  page: number;
  size: number;
  sellerId?: string;
  buyerId?: string;
}

export async function getAllOrders(
  params: GetAllOrdersFilters,
): Promise<{ orders: Order[]; total: number }> {
  const res = await api.get("/order", { params });
  return res.data;
}
