import { useEffect, useState } from "react";
import styles from './DataDeletion.module.scss';
import { Link } from "react-router-dom";
import { Loader } from "../../shared/components/Loader";

export const DataDeletion: React.FC = () => {

  const [instruction, setInstruction] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    
    fetch('instruction.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setInstruction(data.text || []))
      .finally(() => setLoaded(true));
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Data Deletion Instructions</h1>

      <Link 
        to="/privacy-policy"
        className={styles.link}
        >
          Back to Privacy Policy and Cookies
      </Link>

      {!loaded && <Loader />}

      {loaded && instruction.map((paragraph, i) => (
        <p key={`${i}.${i}`} className={styles.paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
