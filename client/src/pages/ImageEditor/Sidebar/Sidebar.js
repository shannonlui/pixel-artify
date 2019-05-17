import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';
import SliderControl from '../../../components/SliderControl/SliderControl';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import FormControl from '../../../components/FormControl/FormControl';

const sidebar = (props) => {
  const colorToggle = (            
    <ToggleSwitch 
      isChecked={props.editPalette} 
      onChangeValue={props.onChangeEditPalette} />
  );
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logo}>pixel artify</Link>
      <div className={styles.controls}>
        <FormControl
          label="Original"
        >
          <img src={props.img.src} />
        </FormControl>
        <SliderControl 
          label="Pixel Size"
          minValue="0"
          maxValue={props.maxPixelSize}
          inputValue={props.pixelSize}
          onChangeValue={props.onChangePixelSize} />
        <SliderControl 
          label="Contrast"
          minValue="-100"
          maxValue="100"
          inputValue={props.contrast}
          onChangeValue={props.onChangeContrast} />
        <SliderControl 
          label="Brightness"
          minValue="-100"
          maxValue="100"
          inputValue={props.brightness}
          onChangeValue={props.onChangeBrightness} />
        <SliderControl 
          label="Saturation"
          minValue="-100"
          maxValue="100"
          inputValue={props.saturation}
          onChangeValue={props.onChangeSaturation} />
        <FormControl
          label="Limit Color Palette"
          inlineInput={colorToggle}
        >
          {props.editPalette ? 
            <input type="number" 
              value={props.maxColors}
              onChange={props.onChangeMaxColors}
              placeholder="Max number of colors"/> : null}
        </FormControl>
        <button
          className={styles.export}
          onClick={props.exportImage}>Export</button>    
      </div>
    </div>
  );
}

export default sidebar;