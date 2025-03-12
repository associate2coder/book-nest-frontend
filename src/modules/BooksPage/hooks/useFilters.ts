import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const prepareSearch = useCallback((params: URLSearchParams) => {
    const pageSliceState: Record<string, string> = { 
      sort: 'releaseYear:desc',
      page: '0', 
    };

    params.forEach((value, key) => {      
      if (key === 'genre') {
        const values = params.getAll(key);
  
        if (values.length > 0) {
          pageSliceState[key] = values.join(',');
        }
      } else {  
        pageSliceState[key] = key === 'page'
        ? `${Math.max(0, +value - 1)}`
        : value;
      }
    })
  
    return Object.entries(pageSliceState).reduce((acc, [key, value], i) => {
      const separator = i === 0 ? '?' : '&';
  
      return `${acc}${separator}${key}=${value}`
    }, '');  
  }, []);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(prepareSearch(searchParams));

  useEffect(() => {
    setSearch(prepareSearch(searchParams))
  }, [prepareSearch, searchParams]);

  return search;
}