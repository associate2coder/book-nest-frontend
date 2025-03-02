import { useEffect, useState } from "react";
import styles from './PrivacyPolicy.module.scss';

export const PrivacyPolicy: React.FC = () => {

  const [policy, setPolicy] = useState<string[]>([]);

  useEffect(() => {
    fetch('privacy.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setPolicy(data.text || []))
  }, [])

  return (
    <div className={styles.container}>
      {policy.map((paragraph, i) => (
        <p key={`${i}.${i}`} className={styles.paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
        