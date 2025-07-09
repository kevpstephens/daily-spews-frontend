import { useState, useEffect } from "react";

import useError from "./useError";
import useLoading from "./useLoading";

export default function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { error, setError, clearError } = useError();

  useEffect(() => {
    startLoading();
    clearError();

    fetchFunction()
      .then((result) => {
        setData(result);
        stopLoading();
      })
      .catch((err) => {
        setError(err);
        stopLoading();
      });
    // Dependencies are passed as parameter - internal functions are stable utilities
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, isLoading, error };
}
