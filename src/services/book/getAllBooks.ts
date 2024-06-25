import { api } from "..";
import { Book, BookCategory } from "../../interfaces";

interface GetAllBooksFilters {
  page: number;
  size: number;
  id?: string;
  releaseYear?: number;
  author?: string;
  startPrice?: number;
  endPrice?: number;
  ownerId?: string;
  title?: string;
  exactlyTitle?: string;
  category?: BookCategory;
  inCart?: boolean;
  userId?: string;
  orderBy?: "bigPrice" | "lowPrice" | "mostSelled" | "az" | "za";
  inStock?: boolean;
  inOffer?: boolean;
  deleted?: boolean;
}

export async function getAllBooks(
  params: GetAllBooksFilters,
): Promise<{ books: Book[]; total: number; totalCartInBRL?: number }> {
  const res = await api.get("/book", { params });
  return res.data;
}
