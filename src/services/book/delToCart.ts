import { api } from "..";

export async function delToCart(bookId: string): Promise<void> {
  await api.delete(`/user/cart/${bookId}`);
}
