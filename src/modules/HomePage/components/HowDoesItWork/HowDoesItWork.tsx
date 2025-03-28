import { steps } from '../../config/steps';
import { Step } from '../Step';
import styles from './HowDoesItWork.module.scss';

export const HowDoesItWork: React.FC = () => {
  return (
    <div className={styles.howDoesItWork}>
      <h2>{`How does it work?`}</h2>

      {steps.map((step, index) => {
        const number = index + 1;
        
        return (
          <Step key={`step-${number}`} number={number} step={step}/>
        );
      })}
    </div>
  );
}