import { useEffect, useState } from 'react';

function useDebounce(search, delay, other) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (other) {
        other();
      }

      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  return debouncedSearch;
}

export default useDebounce;
