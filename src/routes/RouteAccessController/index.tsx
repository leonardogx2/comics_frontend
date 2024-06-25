import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../index.css";
import { IRoute, routes } from "../routes";
import { User } from "../../interfaces";
import { useAuthContext } from "../../context/userContext";
import { Toaster } from "@/components/ui/toaster";
import AccessDenied from "@/molecules/AccessDenied";

interface RouteAccessController {
  route: IRoute;
  user?: User;
  loading: boolean;
}

const RouteAccessController = ({
  route,
  user,
  loading,
}: RouteAccessController) => {
  if (loading) return <p className="text-black">Carregando...</p>;
  const userProfiles = user
    ? [user.isAdmin && "ADMIN", user.isSeller && "SELLER", "BUYER"].filter(
        Boolean,
      )
    : [];

  let element;

  if (
    !route.private ||
    route.accessType.some((profile) => userProfiles.includes(profile))
  ) {
    element = route.element;
  } else {
    element = <AccessDenied />;
  }

  return (
    <div>
      {element}
      <Toaster />
    </div>
  );
};

export const MainRoutes = () => {
  const { user, loading } = useAuthContext();

  return (
    <Suspense fallback={<p className="text-black">Carregando...</p>}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteAccessController
                  loading={loading}
                  route={route}
                  user={user}
                />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
