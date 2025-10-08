import { api } from "./api";
import type { LoginResponse } from "../types/auth";

export async function loginRequest(email: string, senha: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, senha });
  return data;
}
