import { createContext, useContext, ReactNode } from "react";
import Cookie from "js-cookie";
import React from "react";

export interface IMultiCookiesObj {
  cookieName: string;
  value: string;
}

interface ICookiesContext {
  setCookie: (cookieName: string, value: string) => void;
  setMultiCookies: (arrayCookie: IMultiCookiesObj[]) => void;
  getCookie: (cookieName: string) => string | undefined;
  removeCookie: (cookieName: string) => void;
  removeMultiCookies: (cookieName: string[]) => void;
}

interface IProps {
  children: ReactNode;
}

const CookieContext = createContext<ICookiesContext>({} as ICookiesContext);

const CookieProvider = ({ children }: IProps) => {
  const setCookie = (cookieName: string, value: string) => {
    Cookie.set(cookieName, value, {
      expires: 30,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  };

  const setMultiCookies = (arrayCookie: IMultiCookiesObj[]) => {
    arrayCookie.forEach(({ cookieName, value }) => {
      setCookie(cookieName, value);
    });
  };

  const getCookie = (cookieName: string) => {
    return Cookie.get(cookieName);
  };

  const removeCookie = (cookieName: string) => {
    Cookie.remove(cookieName);
  };

  const removeMultiCookies = (cookieNames: string[]) => {
    cookieNames.forEach((cookieName) => {
      removeCookie(cookieName);
    });
  };

  return (
    <CookieContext.Provider
      value={{
        setCookie,
        setMultiCookies,
        getCookie,
        removeCookie,
        removeMultiCookies,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

const useCookie = () => {
  const context = useContext(CookieContext);
  return context;
};

export { CookieProvider, useCookie };
