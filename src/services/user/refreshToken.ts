import { RefreshToken } from "@/interfaces";
const baseURL = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function refreshToken(): Promise<
  { accessToken: string; refreshToken: RefreshToken } | undefined
> {
  const refreshToken = JSON.parse(
    sessionStorage.getItem("refreshToken") || "{}",
  ) as RefreshToken;
  if (!refreshToken || !refreshToken.id) {
    console.log("Sem refresh token");
    return;
  }

  try {
    const req = await axios.post(baseURL + "/auth/refresh", {
      refreshTokenId: refreshToken.id,
    });
    return req.data;
  } catch (err) {
    console.log("Erro ao atualizar token");
    return;
  }
}
