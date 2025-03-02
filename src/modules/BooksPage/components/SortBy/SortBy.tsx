import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SortBy.module.scss';
import expand from '@assets/icons/expand_primary.svg';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import dropdownItem from '@assets/icons/dropdown_item.svg';

export const SortBy: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const options = {
    'age-desc': 'Newest First',
    'age-asc': 'Oldest First',
    'title-asc': 'Alphabetical (A-Z)',
    'title-desc': 'Alphabetical (Z-A)',
  };

  const handleSelection = useCallback(
    (value: string) => {
      setSearchParams(getSearchWith(searchParams, { 'sortby': value }));
      setExpanded(false);
    },
    [searchParams, setSearchParams],
  );

  // SortBy closes on click
  useEffect(() => {
    const dropdown = dropdownRef.current;

    if (!dropdown) {
      return;
    }

    const handleOutsideClick = () => {
      setExpanded(false);
    }

    if (!expanded) {
      document.removeEventListener('mouseup', handleOutsideClick);
    }

    document.addEventListener('mouseup', handleOutsideClick);
  }, [expanded])

  return (
    <div className={styles.sortbyContainer}>
      <button className={styles.sortbyButton} onClick={() => setExpanded(!expanded)}
      >
        <span>Sort By</span>
        <img 
          src={expand} 
          alt="expand icon" 
          className={cn(styles.icon, {
            [styles.iconExpanded]: expanded,
          })} 
        />
      </button>

      <div 
        ref={dropdownRef}
        className={cn(styles.dropdown, {
          [styles.dropdownExpanded]: expanded,
        })}        
      >
        <div className={styles.dropdownContent}>
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className={styles.dropdownItem}
              hidden={!expanded}
              onClick={() => handleSelection(key)}
            >
              <img src={dropdownItem} alt="list item icon" className={styles.icon} />
              <span className="button-text">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

