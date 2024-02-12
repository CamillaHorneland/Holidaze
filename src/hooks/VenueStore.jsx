import create from 'zustand';

const useVenueStore = create((set) => ({
  venueData: null,
  setVenueData: (data) => set({ venueData: data }),
}));

export default useVenueStore;