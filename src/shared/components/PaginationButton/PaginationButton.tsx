import React, { useCallback } from 'react';
import styles from './PaginationButton.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../modules/BooksPage/helpers/getSearchWith';

type PaginationButtonType = 'page' | 'page-break';

interface Props {
  type: PaginationButtonType;
  value?: number;
}

export const PaginationButton: React.FC<Props> = React.memo(
  ({ 
    type, 
    value = 1,
  }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') || '1')
    const isNumberedButton = type === 'page';
    const isCurrent = isNumberedButton && value === currentPage;

    const handlePageSelection = useCallback(() => {
      setSearchParams(getSearchWith(searchParams, { page: `${value}` }))
    }, [searchParams, setSearchParams, value]);

    const handleClick = () => {
      if (!isCurrent) {
        handlePageSelection();
      }
    }

    return (
      <div 
        className={cn(styles.button, {
          [styles.pageButton]: isNumberedButton,
          [styles.pageBreak]: type === 'page-break',
          [styles.currentPage]: isCurrent,
        })}
        onClick={handleClick}
      >
        {isNumberedButton ? (
          <span>{value}</span>
        ) : (
          <div className={styles.pageBreakLine} />
        )}
      </div>
    );
}
);