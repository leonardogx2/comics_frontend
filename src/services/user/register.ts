import { User } from "@/interfaces";
import { api } from "..";

interface RegisterUserProps {
  name: string;
  email: string;
  isSeller: boolean;
  password: string;
}

export async function registerUser(
  payload: RegisterUserProps,
): Promise<{ user: User; accessToken: string }> {
  const req = await api.post("/user/register", payload);
  return req.data;
}
