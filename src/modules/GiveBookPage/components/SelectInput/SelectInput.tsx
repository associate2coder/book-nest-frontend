import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SelectInput.module.scss';
import { selectConfig } from './config';
import { Category } from '../../../../shared/types/Category';
import { Dropdown } from '../Dropdown';
import expand from '@assets/icons/expand_inverted.svg';
import cn from 'classnames';

interface Props {
  configKey: string;
  options: Category[];
  value: string;
  error: string;
  onSelect: (key: string, value: string, index?: number) => void;
  // indices: number;
  index?: number;
}

export const SelectInput: React.FC<Props> = React.memo(
  ({ configKey, options, value = '', onSelect, error, index }) => {
    const [expanded, setExpanded] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const closeDropdown = useCallback(() => {
      if (expanded) {
        console.log('expanded is', expanded);
        
        setExpanded(false);

        console.log('expanded is', expanded);
      }
    }, [expanded])


    // CLOSE dropdown on click outside
    useEffect(() => {

      const handleClick = (e: MouseEvent) => {      
        const dropdown = dropdownRef.current;

        if (!dropdown || !expanded) {
          document.removeEventListener('mouseup', handleClick, true);

          return;
        }

        const button = closeRef.current;

        if (button && button.contains(e.target as Node)) {
          return;
        }

        const { clientX, clientY } = e;
        const { left, right, top, bottom } = dropdown.getBoundingClientRect();

        const insideDropdown = (clientX > left && clientX < right) &&
          (clientY > top && clientY < bottom);

        if (insideDropdown) {
          return;
        }

        closeDropdown();
      };

      document.addEventListener('mouseup', handleClick, true);

      return () => {
        removeEventListener('mouseup', handleClick, true);
      };
    }, [closeDropdown, expanded]);

    const toggleExpand = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded]);
    

    const handleSelection = useCallback((value: string | number) => {
      onSelect(configKey, `${value}`, index);
      setExpanded(false);
    }, [configKey, index, onSelect]);

    const config = selectConfig[configKey as keyof typeof selectConfig];
    const inputId = `${config.id}-${index}`;

    return (
      <div className={styles.select}>
        <label htmlFor={inputId}>{config.label}</label>

        <input
          id={inputId}
          name={config.id}
          type={config.type} 
          value={value} 
          readOnly
          className={cn(styles.selectInput, {
            [styles.error]: error,
          })}
        />

        <button 
          className={styles.expand}
          type='button' 
          onClick={e => {
            e.stopPropagation();

            toggleExpand();
          }} 
          ref={closeRef}
          >
          <img 
            src={expand} 
            alt="arrow icon" 
            className={cn(styles.icon, {
              [styles.iconExpanded]: expanded,
            })} 
          />
        </button>

        {expanded && (
          <Dropdown 
            options={options} 
            expanded={expanded} 
            onSelect={handleSelection} 
            dropdownRef={dropdownRef} 
          />
        )}

        <p className={cn(styles.message, {
          [styles.errorMessage]: error,
        })}>
          {error}
        </p> 
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';