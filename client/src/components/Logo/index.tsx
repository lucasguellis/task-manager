import icon from '../../assets/icon.png';
import styles from './styles.ts';
import React from 'react';

interface LogoProps {
  size: string;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <img
      src={icon}
      style={{
        height: `calc(var(--spacing) * ${size})`,
        width: `calc(var(--spacing) * ${size})`,
      }}
      className={`${styles.logo}`}
      alt="logo"
    />
  );
};

export default Logo;
