import React from "react";

import { UserProfile } from "../interfaces";
import DashboardPage from "../pages/Dashboard";
import HubBooksPage from "../pages/HubBooks";
import RegisterBookPage from "../pages/RegisterBook";
import DetailedBookPage from "../pages/DetailedBook";
import UpdateBookPage from "@/pages/UpdateBook";
import BooksPage from "@/pages/Books";
import CheckoutPage from "@/pages/Checkout";
import LoginUserPage from "@/pages/LoginUser";
import RegisterUserPage from "@/pages/RegisterUser";
import OrdersPage from "@/pages/Orders";
const HomePage = React.lazy(() => import("../pages/Home"));

export interface IRoute {
  path: string;
  element: JSX.Element;
  accessType: UserProfile[];
  private: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    accessType: ["ADMIN", "SELLER", "BUYER"],
    private: true,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    accessType: ["ADMIN", "SELLER"],
    private: true,
  },
  {
    path: "/hub/comics",
    element: <HubBooksPage />,
    accessType: ["ADMIN", "SELLER"],
    private: true,
  },
  {
    path: "/hub/comics/register",
    element: <RegisterBookPage />,
    accessType: ["ADMIN", "SELLER"],
    private: true,
  },
  {
    path: "/hub/comics/edit/:id",
    element: <UpdateBookPage />,
    accessType: ["ADMIN", "SELLER"],
    private: true,
  },
  {
    path: "/comic/:id",
    element: <DetailedBookPage />,
    private: true,
    accessType: ["ADMIN", "SELLER", "BUYER"],
  },
  {
    path: "/comics",
    element: <BooksPage />,
    accessType: ["ADMIN", "SELLER", "BUYER"],
    private: true,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    private: true,
    accessType: ["ADMIN", "SELLER", "BUYER"],
  },
  {
    path: "/register",
    element: <RegisterUserPage />,
    accessType: [],
    private: false,
  },
  {
    path: "/login",
    element: <LoginUserPage />,
    accessType: [],
    private: false,
  },
  {
    path: "/me/orders",
    element: <OrdersPage />,
    accessType: ["ADMIN", "SELLER", "BUYER"],
    private: true,
  },
];
