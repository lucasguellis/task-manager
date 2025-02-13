// useApi.ts
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

interface UseApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

export const useApi = <T>(
  api: (args?: any) => Promise<AxiosResponse>,
  args?: any,
): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api(args);

        if (response.data.data) {
          setData(response.data.data || null);
        } else if (response.data) {
          setData(response.data || null);
        }
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api, args]);

  return { data, isLoading, error };
};
