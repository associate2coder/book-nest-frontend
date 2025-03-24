import { useEffect, useState } from "react";
import styles from './PrivacyPolicy.module.scss';
import { Link } from "react-router-dom";
import { Loader } from "../../shared/components/Loader";

export const PrivacyPolicy: React.FC = () => {

  const [policy, setPolicy] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    fetch('privacy.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setPolicy(data.text || []))
      .finally(() => setLoaded(true));
  }, [])

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Privacy Policy and Cookies</h1>

      <Link 
        to="/data-deletion"
        className={styles.link}
        >
          Please click here for more information for data deletion instruction
      </Link>

      {!loaded && <Loader />}

      {loaded && policy.map((paragraph, i) => (
        <p key={`${i}.${i}`} className={styles.paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
        