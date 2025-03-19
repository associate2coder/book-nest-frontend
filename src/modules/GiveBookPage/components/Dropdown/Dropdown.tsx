import cn from 'classnames';
import styles from './Dropdown.module.scss';
import { Category } from '../../../../shared/types/Category';
import dropdownItem from '@assets/icons/dropdown_item.svg';

interface Props {
  options: Category[];
  expanded: boolean;
  onSelect: (value: string | number) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const Dropdown: React.FC<Props> = ({ options, expanded, onSelect, dropdownRef }) => {

  return (
    <div 
    className={cn(styles.dropdown, {
      [styles.dropdownExpanded]: expanded,
    })}        
    ref={dropdownRef}
  >
    <div className={styles.dropdownContent}>
      {options.map(category => (
        <div
          key={category.id}
          className={styles.dropdownItem}
          onClick={() => onSelect(category.name)}
        >
          <img src={dropdownItem} alt="list item icon" className={styles.icon}/>

          <span className="button-text">{category.name}</span>
        </div>
      ))}
    </div>
  </div>  );
}