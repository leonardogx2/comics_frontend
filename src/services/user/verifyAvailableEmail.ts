import { api } from "..";

export async function verifyAvailableEmail(
  email: string,
): Promise<{ available: boolean }> {
  const req = await api.get("/user/available/email", { params: { email } });
  return req.data;
}
