import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  function startLoading() {
    return setIsLoading(true);
  }

  function stopLoading() {
    return setIsLoading(false);
  }

  return { isLoading, startLoading, stopLoading };
}
