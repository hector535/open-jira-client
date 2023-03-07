import { StateCreator } from "zustand";

export interface IAuthState {
  isLoggedIn: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<IAuthState> = (set) => ({
  isLoggedIn: false,
  email: "",
  login: (email: string) => set({ isLoggedIn: true, email }),
  logout: () => set({ isLoggedIn: false, email: "" }),
});
