 import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: { role: 'guest', isVenueManager: false, isLoggedIn: false },
      setUser: (user) => set(() => ({ user: { ...user, isLoggedIn: true } })), // Oppdater setUser for å inkludere isLoggedIn
      clearUser: () => set({ user: { role: 'guest', isVenueManager: false, isLoggedIn: false } }),
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
}

