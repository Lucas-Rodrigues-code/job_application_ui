import api from "./api";

type PromiseSignIn = {
  access_Token: string;
  user: {
    name: string;
    email: string;
  };
};

type PromiseSignUp = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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

export async function AuthRegister(
  name: string,
  email: string,
  password: string
): Promise<PromiseSignUp> {
  const response = await api.post<PromiseSignUp>("/user", {
    name,
    email,
    password,
  });
  return response.data;
}
