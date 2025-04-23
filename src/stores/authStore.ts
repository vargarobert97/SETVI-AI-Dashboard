import { create } from "zustand";

type UserRole = "admin" | "viewer";

interface AuthStore {
  user: {
    role: UserRole;
    name: string;
  } | null;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (role, name) => set({ user: { role, name } }),
  logout: () => set({ user: null }),
}));
