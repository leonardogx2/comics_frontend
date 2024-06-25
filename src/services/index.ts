import axios, { isAxiosError } from "axios";
import { refreshToken } from "./user/refreshToken";

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseURL,
});

const setAuthorizationHeader = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

let tokenRefreshMutex: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (isAxiosError(error)) {
      if (error.response?.status === 403 && !originalRequest._retry) {
        if (!tokenRefreshMutex) {
          tokenRefreshMutex = (async () => {
            console.log("REFRESHING TOKEN...");

            try {
              const tokens = await refreshToken();
              if (!tokens) {
                console.log("SEM TOKENS");
                return window.location.assign("/login");
              }

              sessionStorage.setItem(
                "refreshToken",
                JSON.stringify(tokens.refreshToken),
              );
              sessionStorage.setItem("accessToken", tokens.accessToken);

              console.log(tokens);
              setAuthorizationHeader(tokens.accessToken);

              originalRequest.headers["Authorization"] =
                `Bearer ${tokens.accessToken}`;
              await api(originalRequest);
            } finally {
              tokenRefreshMutex = null;
            }
          })();
        }

        return tokenRefreshMutex!.then(() => api(originalRequest));
      } else if (error.response?.status === 403 && originalRequest._retry) {
        originalRequest._retry = false;
        console.log("FIZ RETRY E NAO DEU");
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

const initialAccessToken = sessionStorage.getItem("accessToken");
if (initialAccessToken) {
  setAuthorizationHeader(initialAccessToken);
}
