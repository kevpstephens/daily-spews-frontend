import { useState, useEffect } from "react";
import useLoading from "./useLoading";
import useError from "./useError";

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
  }, dependencies);

  return { data, isLoading, error };
}
