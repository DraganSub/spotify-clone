import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebauncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebauncedValue(value)
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue;
}

export default useDebounce;