import { QueryInput } from '../Search';
import { SortBy } from '../SortBy';
import styles from './RefinementFilters.module.scss';

export const RefinementFilters: React.FC = () => {
  return (
    <div className={styles.container}>
      <QueryInput />

      <SortBy />
    </div>
  );
};
