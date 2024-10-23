import { atom } from "recoil";

// Navbar 전역 State
export const globalNavState = atom<boolean>({
  key: "@GlobalNavState",
  default: true,
});
