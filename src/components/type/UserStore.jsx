import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: { role: 'guest', isVenueManager: false },
      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      clearUser: () => set({ user: { role: 'guest', isVenueManager: false } }),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;

export const useToken = () => useUserStore((state) => state.user?.accessToken);

export const useUserActions = () => {
  const { setUser, clearUser } = useUserStore();
  return { setUser, clearUser };
};

