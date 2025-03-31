// import cn from 'classnames'
import styles from './GiveBookPage.module.scss';
import { GiveBookForm } from '../GiveBookForm';
import { faq } from '../ParticulartFAQ/config';
import { ParticularFAQ } from '../ParticulartFAQ';
import { Slider } from '../../../../shared/components/Slider';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';

export const GiveBookPage: React.FC = () => {
  const { recommended } = useAppSelector(state => state.books);

  return (
    <div className={styles.giveBookPage}>
      <header className={styles.pageHeader}>
        <h2 className={styles.title}>Give a Book</h2>

        <p className={styles.pageDescription}>
          {`Declutter your shelves and share the joy of reading! ` +
          `Donate your books to earn points, which you can use ` +
          `to discover new stories and enrich someone else's library.`}
        </p>
      </header>

      <GiveBookForm />

      <div className={styles.faq}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>

        {faq.map(item => (
          <ParticularFAQ item={item} key={item.id}/>
        ))}
      </div>

      <Slider title="Explore books" books={recommended}/>

    </div>
  );
}