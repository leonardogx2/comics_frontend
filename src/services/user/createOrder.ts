import { CreateOrderControllerDTO } from "@/interfaces";
import { api } from "..";

export async function createOrder(data: CreateOrderControllerDTO) {
  await api.post("/order", data);
}
