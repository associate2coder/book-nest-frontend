import cn from 'classnames'
import styles from './MyBooksPage.module.scss';
import { Slider } from '../../../../shared/components/Slider';
import { useCallback, useState } from 'react';
import { Book } from '../../../../shared/types/Book';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';

import booksImage1 from '@assets/images/lying_books.svg';
import booksImage2 from '@assets/images/standing_books.svg';

export const MyBooksPage: React.FC = () => {
  const [details, setDetails] = useState<Book[] | null>(null);

  const toggleDetails = useCallback(
    (books: Book[] | null) => {
      setDetails(books)
    }, []);

  const { items: favourites } = useAppSelector(state => state.fav);
  const givenBooks: Book[] = [];
  const takenBooks: Book[] = [];

  return (
    <div className={styles.myBooksPage}>
      {!details ? (
        <>
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

                  <SecondaryButton text="Show all  →" onClick={() => toggleDetails(givenBooks)} />
                </div>
              </div>

              <Slider title="" books={givenBooks} />
            </div>

            <div className={cn(styles.section, styles.taken)}>
              <div className={styles.sectionHeader}>
                <div className={styles.count}>{takenBooks.length}</div>

                <div className={styles.block}>
                <p className={styles.blockTitle}>Taken Books</p>

                  <SecondaryButton text="Show all  →" onClick={() => toggleDetails(takenBooks)} />
                </div>
              </div>

              <Slider title="" books={takenBooks} />
            </div>

            <div className={cn(styles.section, styles.favourites)}>
              <div className={styles.sectionHeader}>
                <div className={styles.count}>{favourites.length}</div>

                <div className={styles.block}>
                  <p className={styles.blockTitle}>Favourites</p>

                  <SecondaryButton text="Show all  →" onClick={() => toggleDetails(favourites)} />
                </div>
              </div>

              <Slider title="" books={favourites} />
            </div>

          </div>
        </>
      ) : (
        <SecondaryButton text="Back" onClick={() => toggleDetails(null)} />
      )}
    </div>
  );
}