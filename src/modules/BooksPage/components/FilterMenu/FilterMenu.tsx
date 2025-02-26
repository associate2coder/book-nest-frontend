import { filters } from '../../config/filters';
import { Filter } from '../Filter/Filter';
import styles from './FilterMenu.module.scss';

export const FilterMenu: React.FC = () => {
  return (
    <aside className={styles.filterMenu}>
      {Object.entries(filters).map(([key, value]) => (
        <Filter type={key} key={value.id}/>
      ))}
    </aside>
  );
}

