import { FC, InputHTMLAttributes } from 'react';

import styles from './themedInput.module.css';

const ThemedInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...inputProps }) => {
  return (
    <input
      className={styles['themed-input']}
      type='range'
      min={0}
      max={0.999999}
      step='0.0001'
      {...inputProps}
    />
  );
};

export default ThemedInput;
