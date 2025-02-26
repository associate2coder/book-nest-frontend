import { Pagination } from '../Pagination';
import { RefinementFilters } from '../RefinementFilters';
import styles from './BookList.module.scss';

interface Props {

}

export const BookList: React.FC<Props> = () => {
  return (
    <div className={styles.listCntainer}>
      <RefinementFilters />

      <div className={styles.list}>

      </div>

      <Pagination />
    </div>
  );
}

