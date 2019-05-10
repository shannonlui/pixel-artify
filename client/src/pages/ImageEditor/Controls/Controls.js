import React from 'react';

import styles from './Controls.module.css';

const controls = (props) => (
  <div className={styles.controls}>
    <div className={styles.control}>
      <label>Pixel Size</label>
      <input 
        className={styles.slider}
        type="range" 
        min="1"
        max={props.maxPixelSize}
        value={props.pixelSize}
        onChange={(e) => props.onChangePixelSize(e)} />      
    </div>

  </div>
);

export default controls;