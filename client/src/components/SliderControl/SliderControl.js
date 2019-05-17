import React from 'react';

import styles from './SliderControl.module.css';
import FormControl from '../FormControl/FormControl';

const sliderControl = (props) => (
  <FormControl
    label={props.label}
    inlineInput={props.inputValue}
  >
    <input 
      className={styles.slider}
      type="range" 
      min={props.minValue}
      max={props.maxValue}
      value={props.inputValue}
      onChange={e => props.onChangeValue(e.target.value)} /> 
  </FormControl>
);

export default sliderControl;