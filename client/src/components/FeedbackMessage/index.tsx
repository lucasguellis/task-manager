import React from 'react';
import styles from './styles';

interface FeedbackMessageProps {
  message: string;
  type: 'success' | 'error';
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, type }) => {
  return (
    <>
      <span
        className={`${styles.default} ${type === 'success' ? styles.primary : styles.danger}`}
      >
        {message}
      </span>
    </>
  );
};

export default FeedbackMessage;
