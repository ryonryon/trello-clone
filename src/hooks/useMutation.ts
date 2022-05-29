import { useCallback, useState } from "react";

interface Options {
  variables: Record<string, string | number | boolean>;
}

interface ErrorBody {
  status: number;
  statusText: string;
  message: string;
}

export function useMutation<TResponse>(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
): {
  call: (options?: Options) => Promise<TResponse | null>;
  data: null | TResponse;
  isLoading: boolean;
  error: null | unknown;
} {
  const [data, setData] = useState<null | TResponse>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorBody | null>(null);

  const call = useCallback(
    async (options?: Options) => {
      setIsLoading(true);

      const headers = {
        "Content-Type": "application/json",
      };
      const body = options?.variables ? JSON.stringify(options.variables) : null;

      const response: Response = await fetch(url, {
        method,
        headers,
        body,
      });

      // Set an error if the request ins't successful
      if (response.status < 200 || response.status > 299) {
        const res = await response.blob();
        const message = await res.text();

        setError({ status: response.status, statusText: response.statusText, message });
        setIsLoading(false);

        return null;
      }

      const jsonResponseBody: TResponse = await response.json();

      setData(jsonResponseBody);

      setIsLoading(false);

      return jsonResponseBody;
    },
    [url, method],
  );

  return { call, data, isLoading, error } as const;
}
