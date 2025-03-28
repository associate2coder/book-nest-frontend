import React, { useCallback, useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import expand from '@assets/icons/expand_inverted.svg';
import cn from 'classnames';
import { getSearchWith } from '../../helpers/getSearchWith';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';

interface Props {
  type: string;
}

export const Filter: React.FC<Props> = ({ 
  type, 
  // availableValues,
}) => {
  const [expanded, setExpanded] = useState(false);  
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters } = useAppSelector(state => state.filters); 

  const key = type as keyof typeof filters;
  const filter = filters[key];

  // expand filter on load
  // if search params contain such filter
  useEffect(() => {
    const filterParam = searchParams.get(type);

    if (filterParam) {
      setExpanded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const toggleSelection = (value: string) => {
    const currentParams = searchParams.getAll(filter.id);

    const paramsToUpdate = currentParams.includes(value) 
      ? currentParams.filter(param => param !== value)
      : [...currentParams, value];

    setSearchParams(prevParams => getSearchWith(prevParams, { [filter.id]: paramsToUpdate }));
  }

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

      <div className={cn(styles.filterItems, {
        [styles.valuesExpanded]: expanded })}
      >
        {expanded && filter.values.map(value => {
          const params = searchParams.getAll(key);

          console.log({params, key, searchParams });

          const checked = params?.includes(value.name) || false;

          // const filterDisabled = !availableValues.includes(value)
          const filterDisabled = false;

          return (
            <div 
              className={styles.filterItem} 
              key={`${filter.id}-${value.name}`} 
              onClick={() => {
                if (!filterDisabled) {
                  toggleSelection(value.name)
                }
              }}
            >
              <input
                type="checkbox"
                id={`${filter.id}-${value.name}`}
                checked={checked}
                className={cn(styles.box, {
                  [styles.filterDisabled]: filterDisabled, 
                })}
                onChange={handleCheck}
                disabled={filterDisabled}
              />

              <label
                htmlFor={`${filter.id}-${value.name}`}
                className={cn(styles.label, {
                  [styles.filterDisabled]: filterDisabled,
                })}
              >
                {value.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
