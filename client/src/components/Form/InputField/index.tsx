import React from 'react';
import styles from './styles.ts';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  required,
  onChange,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={styles.input}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
