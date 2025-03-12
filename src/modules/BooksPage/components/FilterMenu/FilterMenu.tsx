import React from 'react';
import { filters } from '../../config/filters';
import { Filter } from '../Filter/Filter';
import styles from './FilterMenu.module.scss';

interface Props {
  availableFilters?: Record<string, string[]>;
}

export const FilterMenu: React.FC<Props> = React.memo(
  // ({ availableFilters }) => {
  () => {
    return (
      <aside className={styles.filterMenu}>
        {Object.entries(filters).map(([key, value]) => (
          // <Filter type={key} availableValues={availableFilters[key]} key={value.id}/>
          <Filter type={key} key={value.id}/>
        ))}
      </aside>
    );
  }
);

FilterMenu.displayName = 'FilterMenu';


