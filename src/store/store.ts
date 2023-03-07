import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createAuthSlice,
  createUISlice,
  IAuthState,
  IUIState,
} from "./slices/";

export const useStore = create<IUIState & IAuthState>()(
  persist((...a) => ({ ...createAuthSlice(...a), ...createUISlice(...a) }), {
    name: "auth",
    partialize: (state) => ({
      isLoggedIn: state.isLoggedIn,
      email: state.email,
    }),
  })
);
