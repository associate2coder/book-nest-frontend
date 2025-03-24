import { useEffect, useMemo, useRef, useState } from 'react';
import { Book } from '../../types/Book';
import { BookCard } from '../BookCard';
import styles from './Slider.module.scss';
import { bookService } from '../../../services/bookService';
import { SLIDER_VISIBLE_BOOKS_DESKTOP } from '../../../config/constants';
import { ArrowButton } from '../ArrowButton';

interface Props {
  title: string;
  books: Book[];
}

export const Slider: React.FC<Props> = ({ title, books }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const tmpBooks: Book[] = books ? books : [];
  const [visibleBooks, setVisibleBooks] = useState(tmpBooks);
  const [visibleIndices, setVisibleIndices] = useState(
    Array.from({ length: SLIDER_VISIBLE_BOOKS_DESKTOP }).map((_, i) => i)
  );
  // const [curScroll, setCurScroll] = useState(0);

  const updateNextIndex = (nextIndex: number) => {
    const indices = [...visibleIndices, nextIndex];

    indices.shift();
    setVisibleIndices(indices);
  }

  const updatePrevIndex = (prevIndex: number) => {
    const indices = [prevIndex, ...visibleIndices];

    indices.pop();
    setVisibleIndices(indices);
  }

  useEffect(() => {
    console.log(visibleIndices);
  })

  const handlePrev = () => {
    // define slider
    const slider = sliderRef.current;

    // 'no slider' case handled
    if (!slider) {
      return;
    }

    // define children
    const children = slider.children;

    // no children (all children visible) case handled
    if (!children || children.length <= SLIDER_VISIBLE_BOOKS_DESKTOP) {
      return;
    }

    // "slider in the beginning" case handled
    if (visibleIndices[0] <= 0) {
      return;
    }

    // identify target
    const targetIndex =  visibleIndices[0] - 1;

    // show target
    children[targetIndex].scrollIntoView({ inline: 'start', behavior: 'smooth' });

    // update visible indices
    updatePrevIndex(targetIndex);
  }

  const handleNext = () => {
    // define slider
    const slider = sliderRef.current;

    // 'no slider' case handled
    if (!slider) {
      return;
    }

    // define children
    const children = slider.children;

    // no children (all children visible) case handled
    if (!children || children.length <= SLIDER_VISIBLE_BOOKS_DESKTOP) {
      return;
    }

    // "slider in the end" case handled
    if (visibleIndices[2] >= visibleBooks.length - 1) {
      return;
    }

    // identify target
    const targetIndex =  visibleIndices[2] + 1;

    // show target
    children[targetIndex].scrollIntoView({ inline: 'end', behavior: 'smooth' });

    // update visible indices
    updateNextIndex(targetIndex);
  }

  useEffect(() => {
    bookService.getBooks()
      .then(response => {
        setVisibleBooks(response.content);
      })
  }, []);

  const prevDisabled = useMemo(() => visibleIndices[0] <= 0, [visibleIndices]);
  const lastIndex = useMemo(() => visibleIndices.length - 1, [visibleIndices.length]);
  const nextDisabled = useMemo(
    () => visibleIndices[lastIndex] >= visibleBooks.length - 1, 
    [visibleIndices, lastIndex, visibleBooks.length]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <div 
        ref={sliderRef}
        className={styles.slider}
      >
        {visibleBooks.map(book => (
          <BookCard 
            key={`slider-${book.id}`}
            book={book}
          />
        ))}
      </div>

      <div className={styles.navigation}>
        <ArrowButton configKey="arrowLeft" action={handlePrev} disabled={prevDisabled} />
        <ArrowButton configKey="arrowRight" action={handleNext} disabled={nextDisabled} />
      </div>
      

    </div>
  );
}