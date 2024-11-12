import api from "./api";

export async function AuthLogin(
  email: string,
  password: string
): Promise<{ access_Token: string }> {
  const response = await api.post<{ access_Token: string }>("/auth/sign-in", {
    email,
    password,
  });
  return response.data;
}
