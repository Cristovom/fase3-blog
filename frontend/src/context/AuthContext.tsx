import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loginRequest } from "../services/auth";

type User = { name?: string; role?: string; email?: string } | null;

type AuthCtx = {
  user: User;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  async function login(email: string, senha: string) {
    const data = await loginRequest(email, senha);
    localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user ?? { name: "Professor(a)" });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return <Ctx.Provider value={{ user, token, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
