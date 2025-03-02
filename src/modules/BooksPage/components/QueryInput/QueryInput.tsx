import cn from 'classnames'
import styles from './QueryInput.module.scss';
import searchIcon from '@assets/icons/search.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const debounce = (callback: Function, delay: number = 300) => {
  const timerIdRef = { current: 0 };

  return (...args: unknown[]) => {
    window.clearTimeout(timerIdRef.current);
    timerIdRef.current = window.setTimeout(() => callback(...args), delay);
  };
};

export const QueryInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef(query);

  // update queryRef for the purpose of further hiding empty input
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const applySearch = useCallback(
    (value: string) => {
      setSearchParams(
        prevParams =>
          getSearchWith(prevParams, {
            query: value || null,
          }),
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(applySearch), [searchParams]);

  // changing input value with debounce for URLSearchParams
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    applyQuery(value);
  };
  

  return (
    <div className={styles.container}>
      <img src={searchIcon} alt="search icon" className={styles.icon} />
      <input 
        type="text"
        ref={inputRef}
        className={cn(styles.queryInput)}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};
