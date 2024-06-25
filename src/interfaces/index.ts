export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  deleted: boolean;
  Balance?: Balance;
  Cart?: Cart;
  BooksAsOwner?: Book[];
  BooksAsBuyer?: Book[];
  Orders: Order[];
  isAdmin: boolean;
  isSeller: boolean;
}

export interface RefreshToken {
  id: string;
  expiresIn: number;
  isAdmin: boolean;
  isSeller: boolean;
  userId: string;
  oldRefreshTokenId?: string;
  keepSession: boolean;
}

export interface Book {
  id: string;
  stock: number;
  Image?: Image;
  category: BookCategory;
  title: string;
  priceInBRL: number;
  offerInBRL?: number;
  releaseYear: number;
  pencillerName: string;
  writerName: string;
  coverArtistName: string;
  description: string;
  Owner?: User;
  Buyers: User[];
  Order?: Order;
  ownerId: string;
  Cart?: Cart;
  cartId: string;
}

export interface Image {
  id: string;
  name: string;
  url?: string;
  local: boolean;
}

export interface Cart {
  id: string;
  User?: User;
  userId: string;
  Books: Book[];
}

export type UserProfile = "SELLER" | "BUYER" | "ADMIN";

export interface Balance {
  id: string;
  User?: User;
  valueInBRL: number;
  userId: string;
  Payments?: Payment;
}

export type TOrderBy = "bigPrice" | "lowPrice" | "mostSelled" | "az" | "za";

export interface Payment {
  id: string;
  Order?: Order;
  Balance?: Balance;
  valueInBRL: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: Date;
  orderId: string;
  balanceId: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  Books?: Book[];
  User?: User;
  userId: string;
  address: string;
  Payment?: Payment | null;
}

export type PaymentMethod = "DEBITCARD" | "CREDITCARD" | "PIX";

export type PaymentStatus = "PENDING" | "REALIZED";

export type OrderStatus = "PENDING" | "DISPATCHED" | "DELIVERED";

export type BookCategory =
  | "ACTION"
  | "HORROR"
  | "DRAMA"
  | "FANTASY"
  | "COMEDY"
  | "SUSPENSE"
  | "ROMANTIC"
  | "ADVENTURE"
  | "FICTION"
  | "SUPERHERO";

export type TBookProperty =
  | "title"
  | "releaseYear"
  | "priceInBRL"
  | "writerName"
  | "pencillerName"
  | "coverArtistName"
  | "stock";

export interface CreateOrderControllerDTO {
  method: string;
  name: string;
  cpf?: string;
  cardCode?: string;
  expirationDate?: string;
  cvv?: string;
  plots?: number;
  state: string;
  cep: string;
  city: string;
  neighborhood: string;
  streetName: string;
  streetNumber: string;
}
