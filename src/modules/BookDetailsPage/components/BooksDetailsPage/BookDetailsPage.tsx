import cn from 'classnames'
import styles from './BookDetailsPage.module.scss';
import { Book } from '../../../../shared/types/Book';
import { useEffect, useMemo, useState } from 'react';
import { CategoryBlock } from '../CategoryBlock';
import { useParams } from 'react-router-dom';
import { getBook } from '../../../../services/bookService';
import { API_BASE_URL, TESTING } from '../../../../config/constants';
import { Loader } from '../../../../shared/components/Loader';
import { BookInfo } from '../BookInfo';


const testBook: Book = {
  id: 11,
  slug: 'dante-alighieri-the-divine-comedy-11',
  author: 'Dante Alighieri',
  title: 'The Divine Comedy',
  image: 'images/book11.png',
  genre: [
    'Poetry',
    'Fictions',
  ],
  description: 'Description paragraph 1.\nDescription paragraph 2.\nDescription paragraph 3.',
  format: 'Hardcover',
  condition: 'Very Good',
  releaseYear: 2003
};

export const BookDetailsPage: React.FC = () => {
  const { slug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState('');

  useEffect(() => {
    console.log(slug);
    
    setLoaded(false);

    const id = Number((slug as string).split('-').pop());

    getBook(id)
      .then(book => {
        setBook(book);
        console.log(book);
        
      })
      .catch(err => {
        console.log(err);

        if (TESTING) {
          setBook(testBook);
        }
      })
      .finally(() => {
        setLoaded(true);
      })
  }, []);

  const bookDescription = useMemo(() => {
    return book?.description.split('\n') || '';
  }, [book?.description]);

  const image = useMemo(() => {
    return API_BASE_URL + `/books/image/${book?.id}`
  }, [book]);

  return (
    <div className={styles.bookDetailsPage}>
      {!loaded && <Loader />}

      {book && (
        <>
          <div className={cn(styles.pageSection, styles.topSection)}>

            <BookInfo book={book} />

            <div className={styles.imageWrapper}>
              <img src={image} alt={`${book.title} image`} className={styles.image} />
            </div>
          </div>

          <div className={cn(styles.pageSection, styles.descriptionSection)}>
            <h3 className={styles.sectionTitle}>Description</h3>
            
            {bookDescription && bookDescription.map((paragraph, i) => (
              <p className={styles.paragraph} key={`paragraph-${i}`}>{paragraph}</p>
            ))}
          </div>

          <div className={cn(styles.pageSection, styles.categiesSection)}>
            <h3 className={styles.sectionTitle}>Categories</h3>

            {book && book.genres.map(category => (
              <CategoryBlock name={category} key={category} />
            ))}
          </div>
        </>
      )
      
      }



      <div>
        Carousel to be added
      </div>


    </div>
  );
}
