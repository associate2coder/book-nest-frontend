import { useEffect, useState } from "react";
import styles from './DataDeletion.module.scss';

export const DataDeletion: React.FC = () => {

  const [instruction, setInstruction] = useState<string[]>([]);

  useEffect(() => {
    fetch('instruction.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setInstruction(data.text || []))
  }, [])

  return (
    <div className={styles.container}>
      {instruction.map((paragraph, i) => (
        <p key={`${i}.${i}`} className={styles.paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
