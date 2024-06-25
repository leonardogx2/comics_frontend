import { api } from "..";

export async function addToCart(bookId: string): Promise<void> {
  await api.post(`/user/cart/${bookId}`);
}
