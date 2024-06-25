import { BookCategory } from "..";
import { Image } from "..";

export interface UpdateBookDTO {
  id: string;
  title: string;
  releaseYear: number;
  writerName: string;
  pencillerName: string;
  coverArtistName: string;
  category: BookCategory;
  priceInBRL: number;
  offerInBRL?: number;
  description: string;
  Image: Image;
}
