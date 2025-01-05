import axios from "axios";
import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = axios.get(
      "https://real-estate-backend-livid.vercel.app/api/V1/users/notification",
      { withCredentials: true }
    );
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
