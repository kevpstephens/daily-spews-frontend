import { useState } from "react";

export default function useError() {
  const [error, setErrorState] = useState(null);

  function setError(err) {
    return setErrorState(err.message);
  }

  function clearError() {
    return setErrorState(null);
  }

  return { error, setError, clearError };
}
