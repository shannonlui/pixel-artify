import React from 'react';

import styles from './Button.module.css';

function Button(props) {
  const { children, className, primary, secondary, small, ...otherProps } = props;
  const classNames = [styles.button, className, primary && styles.primary, 
    secondary && styles.secondary, small && styles.small];

  return (
    <button type="button" {...otherProps} className={classNames.join(' ')}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

export default Button;