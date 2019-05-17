import React from 'react';

import styles from './ToggleSwitch.module.css';

const toggleSwitch = (props) => (
  <label className={styles.switch}>
    <input 
      type="checkbox"
      checked={props.isChecked}
      onChange={props.onChangeValue} />
    <span className={styles.slider}></span>
  </label>
);

export default toggleSwitch;