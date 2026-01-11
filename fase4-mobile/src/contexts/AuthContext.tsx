import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { setAuthToken } from '../services/api';


export type User = {
  email?: string;
  role?: 'teacher' | 'student';
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  signIn: (email: string, senha: string) => Promise<User>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

    async function signIn(email: string, senha: string) {
        const res = await api.post('/auth/login', { email, senha });

        setToken(res.data.token);
        setAuthToken(res.data.token);
        setUser(res.data.user);

        return res.data.user; // 🔴 ESSENCIAL
    }


  function signOut() {
    setUser(null);
    setToken(null);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
