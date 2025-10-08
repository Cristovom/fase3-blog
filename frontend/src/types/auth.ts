export type LoginResponse = {
  token: string;
  user?: { name?: string; role?: string; email?: string };
};
