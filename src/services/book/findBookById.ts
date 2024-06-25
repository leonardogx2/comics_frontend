import { api } from "..";
import { Book } from "../../interfaces";

export async function findBookById(bookId: string): Promise<Book> {
  const res = await api.get(`/book/${bookId}`);
  return res.data;
}
