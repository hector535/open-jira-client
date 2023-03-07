import { StateCreator } from "zustand";

export interface IUIState {
  isAddingEntry: boolean;
  isDragging: boolean;
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
  setIsAddingEntry: (flag: boolean) => void;
  setIsDragging: (flag: boolean) => void;
}

export const createUISlice: StateCreator<IUIState> = (set) => ({
  isAddingEntry: false,
  isDragging: false,
  navbarHeight: 0,
  setNavbarHeight: (height: number) => set({ navbarHeight: height }),
  setIsAddingEntry: (flag) => set({ isAddingEntry: flag }),
  setIsDragging: (flag) => set({ isDragging: flag }),
});
