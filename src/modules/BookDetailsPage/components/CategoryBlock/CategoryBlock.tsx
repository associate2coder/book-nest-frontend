import { Link } from 'react-router-dom';
import styles from './CategoryBlock.module.scss';

interface Props {
  name: string;
}

export const CategoryBlock: React.FC<Props> = ({ name }) => {
  return (
    <Link to={`/books?genre=${name}`} className={styles.container} >
      <p className={styles.name}>{name}</p>
    </Link>
  );
}