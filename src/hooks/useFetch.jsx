import { useQuery } from '@tanstack/react-query';

export const useFetch = (url, options = {}, dependencies = [], staleTime = 1000 * 60 * 5) => {
  const queryKey = [url, ...dependencies];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Error fetching data", error);
      }

      return response.json();
    },
    staleTime,
  });

  return { data, isLoading, error };
};






