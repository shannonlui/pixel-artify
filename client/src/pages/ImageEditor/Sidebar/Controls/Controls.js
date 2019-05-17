import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './Controls.module.css';
import * as actions from '../../../../store/actions';
import SliderControl from '../../../../components/SliderControl/SliderControl';
import ToggleSwitch from '../../../../components/ToggleSwitch/ToggleSwitch';
import FormControl from '../../../../components/FormControl/FormControl';

const Controls = (props) => {
  const [editPalette, setEditPalette] = useState(false);

  const onChangeEditPalette = () => {
    if (editPalette) {
      props.onChangeColorCount(0);
    }
    setEditPalette(!editPalette);
  } 

  const colorToggle = (            
    <ToggleSwitch 
      isChecked={editPalette} 
      onChangeValue={onChangeEditPalette} />
  );
  return (
    <div className={styles.controls}>
      <FormControl label="Original">
        <img src={props.img.src} />
      </FormControl>
      <SliderControl 
        label="Pixel Size"
        minValue="0"
        maxValue="100"
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
        {editPalette ? 
          <input type="number" 
            value={props.colorCount}
            onChange={(e) => props.onChangeColorCount(e.target.value)}
            placeholder="Max number of colors"/> : null}
      </FormControl>
      <button
        className={styles.export}
        onClick={props.exportImage}>Export</button>    
    </div>
  );
};

const mapStateToProps = state => {
  return {
    img: state.image,
    pixelSize: state.pixelSize,
    contrast: state.contrast,
    brightness: state.brightness,
    saturation: state.saturation,
    colorCount: state.colorCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePixelSize: (pixelSize) => dispatch(actions.updatePixelSize(pixelSize)),
    onChangeContrast: (contrast) => dispatch(actions.updateContrast(contrast)),
    onChangeBrightness: (brightness) => dispatch(actions.updateBrightness(brightness)),
    onChangeSaturation: (saturation) => dispatch(actions.updateSaturation(saturation)),
    onChangeColorCount: (colorCount) => dispatch(actions.updateColorCount(colorCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);