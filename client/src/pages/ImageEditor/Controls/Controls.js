import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './Controls.module.css';
import * as actions from '../../../store/actions';
import SliderControl from '../../../components/SliderControl/SliderControl';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import FormControl from '../../../components/FormControl/FormControl';
import ColorPalette from '../../../components/ColorPalette/ColorPalette';

const Controls = (props) => {
  const [editPalette, setEditPalette] = useState(false);

  const onChangeEditPalette = () => {
    if (editPalette) {
      props.onChangeColorCount('', props.img);
    }
    setEditPalette(!editPalette);
  };

  const colorToggle = (            
    <ToggleSwitch 
      isChecked={editPalette} 
      onChangeValue={onChangeEditPalette} />
  );
  let colorInput = null;
  if (props.pixelSize > 0 && editPalette) {
    colorInput = (
      <React.Fragment>
        <input type="number" 
            value={props.colorCount}
            onChange={(e) => props.onChangeColorCount(e.target.value, props.img)}
            placeholder="Max number of colors" />   
        {(props.colorCount > 1 && props.colorCount < 51) ? 
            null : <p className={styles.error}>Value must be between 2 and 50</p>}
        <ColorPalette 
          palette={props.palette} 
          contrast={props.contrast} 
          saturation={props.saturation} 
          brightness={props.brightness} />
      </React.Fragment>
    );
  }

  return (
    <div className={styles.controls}>
      <FormControl label="Original">
        <img src={props.img.src} alt="original" />
      </FormControl>
      <SliderControl 
        label="Pixel Size"
        minValue="0"
        maxValue="50"
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
      {
        props.pixelSize > 0 ?
          <FormControl
          label="Limit Color Palette"
          inlineInput={colorToggle}
          >
            {colorInput}
          </FormControl>
          : null
      }
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
    colorCount: state.colorCount,
    palette: state.colorPalette
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePixelSize: (pixelSize) => dispatch(actions.updatePixelSize(pixelSize)),
    onChangeContrast: (contrast) => dispatch(actions.updateContrast(contrast)),
    onChangeBrightness: (brightness) => dispatch(actions.updateBrightness(brightness)),
    onChangeSaturation: (saturation) => dispatch(actions.updateSaturation(saturation)),
    onChangeColorCount: (colorCount, image) => dispatch(actions.updateColorCount(colorCount, image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);