import React from 'react';

import styles from './Controls.module.css';

const controls = (props) => (
  <div className={styles.controls}>
    <div className={styles.control}>
      <div className={styles.label}>
        <label>Pixel Size</label>
        <div>{props.pixelSize}</div>
      </div>
      <input 
        className={styles.slider}
        type="range" 
        min="0"
        max={props.maxPixelSize}
        value={props.pixelSize}
        onChange={props.onChangePixelSize} /> 
    </div>
    <div className={styles.control}>
      <div className={styles.label}>
        <label>Limit Color Palette</label>
        <label className={styles.switch}>
          <input 
            type="checkbox"
            checked={props.editPalette}
            onChange={props.onChangeEditPalette} />
          <span className={styles.toggle}></span>
        </label>  
      </div>
      {props.editPalette ? 
        <input type="number" 
          value={props.maxColors}
          onChange={props.onChangeMaxColors}
          placeholder="Max number of colors"/> : null}
    </div>
  </div>
);

export default controls;