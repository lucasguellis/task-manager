import styles from './styles.ts';
import React from 'react';

export const Column = function (props: ColumnProps) {
  const { title, children } = props;

  return (
    <div className={styles.column}>
      <div className={styles.columnTitle}>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};

interface ColumnProps {
  id: string | number;
  title: string;
  children: React.ReactNode;
}
