import React from 'react';

import styles from './FormControl.module.css';

const formControl = (props) => (
  <div className={styles.control}>
    <div className={styles.label}>
      <label>{props.label}</label>
      <div>{props.inlineInput}</div>
    </div>
    {props.children}
  </div>
);

export default formControl;