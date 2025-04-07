import cn from 'classnames'
import styles from './MyBooksPage.module.scss';
import { Slider } from '../../../../shared/components/Slider';
import { useCallback, useMemo } from 'react';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';

import booksImage1 from '@assets/images/lying_books.svg';
import booksImage2 from '@assets/images/standing_books.svg';
import { useNavigate } from 'react-router-dom';

export const MyBooksPage: React.FC = () => {
  const navigate = useNavigate();

  const showDetails = useCallback((path: string) => {
    navigate(`${path}`, {
      state: { from: location.pathname, search: location.search },
    })
  }, [navigate]);

  // const { items: allBooks } = useAppSelector(state => state.books);
  // const givenBooks: Book[] = allBooks;
  // const takenBooks: Book[] = allBooks;

  const { items: favourites } = useAppSelector(state => state.fav);
  const { 
    donated: givenBooks,
    taken: takenBooks,
  } = useAppSelector(state => state.profile);

  const hasGiven = useMemo(() => givenBooks.length > 0, [givenBooks]);
  const hasTaken = useMemo(() => takenBooks.length > 0, [takenBooks]);
  const hasFavs = useMemo(() => favourites.length > 0, [favourites]);

  const navigateToGive = useCallback(() => {
    navigate('/give');
  }, [navigate]);

  const navigateToBooks = useCallback(() => {
    navigate('/books');
  }, [navigate]);

  return (
    <div className={styles.myBooksPage}>
      <header className={styles.pageHeader}>
        <div className={styles.quoteWrapper}>
          <p className={styles.quote}>
            {`A room without books is like a body without a soul.`}
          </p>

          <p className={styles.quotee}>
            {`– Marcus Tullius Cicero`}
          </p>
        </div>

        <div className={styles.images}>
          <div className={styles.imageWrapper}>
            <img src={booksImage1} alt="books image 1" className={styles.image} />
          </div>

          <div className={styles.imageWrapper}>
            <img src={booksImage2} alt="books image 2" className={styles.image} />
          </div>
        </div>
      </header>

      <div className={styles.pageContent}>
        <div className={cn(styles.section, styles.given)}>
          <div className={styles.sectionHeader}>
            <div className={styles.count}>{givenBooks.length}</div>

            <div className={styles.block}>
              <p className={styles.blockTitle}>Given Books</p>

              <SecondaryButton 
                text={hasGiven ? 'Show all  →' : 'Give a book'}
                onClick={hasGiven 
                  ? () => showDetails('given') 
                  : () => navigateToGive
                } 
              />
            </div>
          </div>

          <Slider title="" books={givenBooks} />
        </div>

        <div className={cn(styles.section, styles.taken)}>
          <div className={styles.sectionHeader}>
            <div className={styles.count}>{takenBooks.length}</div>

            <div className={styles.block}>
            <p className={styles.blockTitle}>Taken Books</p>

              <SecondaryButton 
                text={hasTaken ? 'Show all  →' : 'Explore books'}
                onClick={hasTaken 
                  ? () => showDetails('given') 
                  : () => navigateToBooks
                } 
              />
            </div>
          </div>

          <Slider title="" books={takenBooks} />
        </div>

        <div className={cn(styles.section, styles.favourites)}>
          <div className={styles.sectionHeader}>
            <div className={styles.count}>{favourites.length}</div>

            <div className={styles.block}>
              <p className={styles.blockTitle}>Favourites</p>

              <SecondaryButton 
                text={hasFavs ? 'Show all  →' : 'Explore books'}
                onClick={hasFavs 
                  ? () => showDetails('favourites') 
                  : () => navigateToBooks
                } 
              />
            </div>
          </div>

          <Slider title="" books={favourites} />
        </div>

      </div>
    </div>
  );
}