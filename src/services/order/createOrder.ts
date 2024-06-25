import { CreateOrderControllerDTO, Order } from "@/interfaces";
import { api } from "..";

export async function createOrder(
  data: CreateOrderControllerDTO,
): Promise<Order> {
  const req = await api.post("/order", data);
  return req.data;
}
