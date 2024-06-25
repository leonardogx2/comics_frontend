import { OrderStatus } from "@/interfaces";
import { api } from "..";

export interface IGetDashboard {
  sellsToday: number;
  balance: number;
  booksInMarket: number;
  orders: { title: string; status: OrderStatus; valueInBRL: number }[];
}

export async function getDashboard(): Promise<IGetDashboard> {
  const res = await api.get("/user/dashboard");
  return res.data;
}
