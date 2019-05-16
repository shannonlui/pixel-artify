import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

const sidebar = (props) => (
  <div className={styles.sidebar}>
    <Link to="/" className={styles.logo}>pixel artify</Link>
    <div className={styles.controls}>
      <div className={styles.control}>
        <div className={styles.label}>Original</div>
        <img src={props.img.src} />
      </div>
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
          <label>Contrast</label>
          <div>{props.contrast}</div>
        </div>
        <input 
          className={styles.slider}
          type="range" 
          min="-100"
          max="100"
          value={props.contrast}
          onChange={props.onChangeContrast} /> 
      </div>
      <div className={styles.control}>
        <div className={styles.label}>
          <label>Brightness</label>
          <div>{props.brightness}</div>
        </div>
        <input 
          className={styles.slider}
          type="range" 
          min="-100"
          max="100"
          value={props.brightness}
          onChange={props.onChangeBrightness} /> 
      </div>
      <div className={styles.control}>
        <div className={styles.label}>
          <label>Saturation</label>
          <div>{props.saturation}</div>
        </div>
        <input 
          className={styles.slider}
          type="range" 
          min="-100"
          max="100"
          value={props.saturation}
          onChange={props.onChangeSaturation} /> 
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
      <button
        className={styles.export}
        onClick={props.exportImage}>Export</button>    
    </div>
  </div>
);

export default sidebar;