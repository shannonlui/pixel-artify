import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ImageEditor.module.css';
import Canvas from './Canvas/Canvas';
import Sidebar from './Sidebar/Sidebar';

class ImageEditor extends Component {
  state = {
    pixelSize: 4,
    editPalette: false,
    maxColors: 0,
    contrast: 0,
    brightness: 0,
    saturation: 0
  }

  pixelSizeChangedHandler = (event) => {
    this.setState({pixelSize: event.target.value});
  }

  contrastChangedHandler = (event) => {
    this.setState({contrast: event.target.value});
  }

  brightnessChangedHandler = (event) => {
    this.setState({brightness: event.target.value});
  }

  saturationChangedHandler = (event) => {
    this.setState({saturation: event.target.value});
  }

  editPaletteChangedHandler = () => {
    this.setState(prevState => ({
      editPalette: !prevState.editPalette,
      maxColors: !prevState.editPalette ? prevState.maxColors : 0
    }));
  }

  maxColorsChangedHandler = (event) => {
    this.setState({maxColors: event.target.value});
  }

  render() {
    return(
      <div>
        <Sidebar 
          img={this.props.img}
          pixelSize={this.state.pixelSize}
          // maxPixelSize={Math.floor(Math.min(this.props.img.width, this.props.img.height) * 0.6)}
          maxPixelSize="100"
          onChangePixelSize={this.pixelSizeChangedHandler}
          editPalette={this.state.editPalette}
          onChangeEditPalette={this.editPaletteChangedHandler}
          onChangeMaxColors={this.maxColorsChangedHandler}
          exportImage={() => this.exportImage()}
          contrast={this.state.contrast}
          onChangeContrast={this.contrastChangedHandler}
          brightness={this.state.brightness}
          onChangeBrightness={this.brightnessChangedHandler}
          saturation={this.state.saturation}
          onChangeSaturation={this.saturationChangedHandler} />
        <div className={styles.content}>
          <Canvas 
            pixelSize={this.state.pixelSize}
            img={this.props.img}
            maxColors={this.state.maxColors}
            setExportImage={click => this.exportImage = click}
            contrast={this.state.contrast}
            brightness={this.state.brightness}
            saturation={this.state.saturation} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    img: state.image
  };
};
    
export default connect(mapStateToProps)(ImageEditor);