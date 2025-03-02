import styles from './Pagination.module.scss';
import React, { useMemo } from 'react';
import { PaginationButton } from '../../../../shared/components/PaginationButton';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { BOOKS_PER_PAGE } from '../../../../config/constants';



export const Pagination: React.FC = () => {

  const { items: books } = useAppSelector(state => state.books);

  const totalPages = useMemo(() => {
    return Math.ceil(books.length / BOOKS_PER_PAGE);
  }, [books.length]);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log(JSON.stringify(pages));
  
  const isFirst = totalPages > 1 && currentPage === 1;
  const isLast = totalPages > 1 && currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      {pages.map(pageNum => (
        <>
          {pageNum === currentPage && !isFirst && (
            <PaginationButton type="page-break" />
          )}

          <PaginationButton type="page" value={pageNum} />

          {pageNum === currentPage && !isLast && (
            <PaginationButton type="page-break" />
          )}
        </>
      ))}
    </div>
  );
};
