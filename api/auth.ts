import api from "./api";

type PromiseSignIn = {
  access_Token: string;
  user: {
    name: string;
    email: string;
  };
};
export async function AuthLogin(
  email: string,
  password: string
): Promise<PromiseSignIn> {
  const response = await api.post<PromiseSignIn>("/auth/sign-in", {
    email,
    password,
  });
  return response.data;
}
