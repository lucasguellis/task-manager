import React from 'react';
import styles from './styles';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: (e: React.FormEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  isLoading,
  className = '',
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${className}`}
        disabled={isLoading}
      >
        {label}
        {isLoading && (
          <img
            src="/spinner.svg"
            alt="Loading..."
            className="ml-2 size-5 animate-spin"
          />
        )}
      </button>
    </>
  );
};

export default Button;
