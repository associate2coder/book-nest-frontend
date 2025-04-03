import { useCallback, useState } from 'react';
import { FormInput } from '../../../../shared/components/FormInput';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import styles from './DeliveryForm.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderServce } from '../../../../services/orderService';
import { useAppDispatch } from '../../../../shared/hooks/storeHooks';
import { clearCart } from '../../../../store/cartSlice';

interface DeliveryInfoType {
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  zip: string;
}

interface DeliveryFormErrors {
  firstNameError: string;
  lastNameError: string;
  cityError: string;
  addressError: string;
  zipError: string;
}

interface DeliveryFormType extends DeliveryInfoType, DeliveryFormErrors {};

const initialFormData: DeliveryFormType = {
  firstName: '',
  lastName: '',
  city: '',
  address: '',
  zip: '',
  firstNameError: '',
  lastNameError: '',
  cityError: '',
  addressError: '',
  zipError: '',
}

interface Props {
  complete: () => void;
}

export const DeliveryForm: React.FC<Props> = ({ complete }) => {
  const [formData, setFormData] = useState(initialFormData);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Update Form helper
  const updateForm = useCallback((newFields: Partial<DeliveryFormType>) => {    
    setFormData(prevData => {
      return {
        ...prevData,
        ...newFields,
      };
    })
  }, []);

  // Update text input helper
  const updateInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;

    if (input) {
      const key = input.name as keyof DeliveryFormType;

      updateForm({ [key]: input.value });
    }
  }, [updateForm]);

  const cancel = () => {
    const from = location.state
      ? location.state?.from
      : 'mybooks';
    
      const search = location.state?.search || '';
    
      const path = `${from}?${search}`;

    navigate(path); 
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    orderServce.postOrder()
      .then(res => {
        console.log(res);
        
        dispatch(clearCart());

        complete();
      })
      .catch(err => {
        console.log(err);
      });


  }, [complete, dispatch]);

  return (
    <form className={styles.deliveryForm} onSubmit={handleSubmit} >
      <header className={styles.formHeader}>
        <h2 className={styles.formTitle}>Delivery Information</h2>

        <p className={styles.deliveryNote}>* Estimate delivery time 5-10 bussiness days</p>
      </header>

      <div className={styles.line}>
        <FormInput 
          configKey="firstName"
          value={formData.firstName}
          error={formData.firstNameError}
          onChange={updateInput}
        />

        <FormInput 
          configKey="lastName"
          value={formData.lastName}
          error={formData.lastNameError}
          onChange={updateInput}
        />
      </div>

      <div className={styles.line}>
      <FormInput 
          configKey="city"
          value={formData.city}
          error={formData.cityError}
          onChange={updateInput}
        />

        <FormInput 
          configKey="address"
          value={formData.address}
          error={formData.addressError}
          onChange={updateInput}
        />
      </div>

      <div className={styles.line}>
      <FormInput 
          configKey="zip"
          value={formData.zip}
          error={formData.zipError}
          onChange={updateInput}
        />
      </div>

      <div className={styles.buttons}>
        <PrimaryButton text="Complete Order" type='submit' />
          
        <SecondaryButton text="Cancel" onClick={cancel}/>
      </div>

    </form>
  );
};