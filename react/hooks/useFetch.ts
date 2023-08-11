import { useState, useEffect } from "react";

export const useFetch = (url:string, defaultOptions?:RequestInit) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (newUrl: string | null, options?:RequestInit) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    try {
      const res = await fetch((newUrl || url), { signal, ...options });

      if (!res.ok) {
        let err = new Error("Error en la petición Fetch");
        throw err;
      }

      const json = await res.json();

      if (!signal.aborted) {
        setData(json);
        setError(null);
      }
    } catch (error) {
      if (!signal.aborted) {
        setData(null);
        setError(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(null, defaultOptions);
    return;
  }, [url]);

  const refetch = (newUrl: string | null, newOptions?: RequestInit) => fetchData(newUrl, newOptions)

  return { data, error, refetch, loading };
};
