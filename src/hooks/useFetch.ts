import { useEffect, useState } from "react";

interface ErrorBody {
  status: number;
  statusText: string;
}

export function useFetch<TResponse>(
  url: string,
  requestBody?: RequestInit,
): { data: null | TResponse; isLoading: boolean; error: null | unknown } {
  const [data, setData] = useState<null | TResponse>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorBody | null>(null);

  useEffect(() => {
    async function makeRequest(): Promise<void> {
      setIsLoading(true);

      const response: Response = await fetch(url, requestBody);

      // Set an error if the request ins't successful
      if (response.status < 200 || response.status > 299) {
        setError({ status: response.status, statusText: response.statusText });
        setIsLoading(false);
        return;
      }

      const jsonResponseBody: TResponse = await response.json();

      setData(jsonResponseBody);
      setIsLoading(false);
    }

    url && makeRequest();
  }, [url, requestBody]);

  return { data, isLoading, error } as const;
}
