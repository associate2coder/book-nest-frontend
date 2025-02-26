import { useCallback, useState } from 'react';
import { filters } from '../../config/filters';
import styles from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import expand from '@assets/icons/expand.svg';
import cn from 'classnames';

interface Props {
  type: string;
}

export const Filter: React.FC<Props> = ({ type }) => {
  const [expanded, setExpanded] = useState(false);  
  const [searchParams] = useSearchParams();

  const key = type as keyof typeof filters;
  const filter = filters[key];

  const handleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  // TODO
  const handleCheck = () => {};

  return (
    <div className={styles.filter}>
      <div className={styles.header}>
        <h4 className={styles.title}>{filter.title}</h4>

        <button className={styles.expand} onClick={handleExpand}>
          <img 
            src={expand} 
            alt="arrow icon" 
            className={cn(styles.icon, {
              [styles.iconExpanded]: expanded,
            })} 
          />
        </button>
      </div>

      <div className={cn(styles.values, {
        [styles.valuesExpanded]: expanded })}
      >
        {expanded && filter.values.map(value => {
          const params = searchParams.get(key);
          const checked = params?.includes(value) || false;
          return (
            <label htmlFor={`${filter.id}-${value}`} key={`${filter.id}-${value}`}>
              <input type="checkbox" id={`${filter.id}-${value}`} checked={checked} className={styles.box} onChange={handleCheck} />
              {value}
            </label>
          );
        })}
      </div>
    </div>
  );
};

