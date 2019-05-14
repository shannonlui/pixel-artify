import React, { Component } from 'react';

import styles from './ImageEditor.module.css';
import Canvas from './Canvas/Canvas';
import Controls from './Controls/Controls';
import testImg from '../../assets/images/car.png';

class ImageEditor extends Component {
  state = {
    pixelSize: 4,
    img: this.createTestImage(),
    editPalette: false,
    maxColors: 0
  }

  createTestImage() {
    const img = new Image();
    img.src = testImg;
    return img;
  }

  pixelSizeChangedHandler = (event) => {
    this.setState({pixelSize: event.target.value});
  }

  editPaletteChangedHandler = () => {
    this.setState(prevState => ({
      editPalette: !prevState.editPalette
    }));
  }

  maxColorsChangedHandler = (event) => {
    this.setState({maxColors: event.target.value});
  }

  render() {
    return(
      <div className={styles.editor}>
        <Controls 
          pixelSize={this.state.pixelSize}
          maxPixelSize={Math.floor(Math.min(this.state.img.width, this.state.img.height) * 0.6)}
          onChangePixelSize={this.pixelSizeChangedHandler}
          editPalette={this.state.editPalette}
          onChangeEditPalette={this.editPaletteChangedHandler}
          onChangeMaxColors={this.maxColorsChangedHandler} />
        <Canvas 
          pixelSize={this.state.pixelSize}
          img={this.state.img}
          maxColors={this.state.maxColors} />
      </div>
    )
  }
}
    
export default ImageEditor;