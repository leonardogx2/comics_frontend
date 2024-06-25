import { api } from "..";
import { RefreshToken, User } from "../../interfaces";

interface AuthProps {
  email: string;
  password: string;
  keepSession: boolean;
}

export async function auth(
  payload: AuthProps,
): Promise<{ user: User; accessToken: string; refreshToken: RefreshToken }> {
  const req = await api.post("/auth/signIn", payload);
  return req.data;
}
