import styles from './FormSeparator.module.scss';

export const FormSeparator: React.FC = () => {
  return (
    <div className={styles.separator}>
      <span className="divider"></span> 
      <span>OR</span> 
      <span className="divider"></span> 
    </div>
  );
}
