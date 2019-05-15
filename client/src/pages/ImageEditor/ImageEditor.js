import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ImageEditor.module.css';
import Canvas from './Canvas/Canvas';
import Controls from './Controls/Controls';

class ImageEditor extends Component {
  state = {
    pixelSize: 4,
    editPalette: false,
    maxColors: 0
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
          // maxPixelSize={Math.floor(Math.min(this.props.img.width, this.props.img.height) * 0.6)}
          maxPixelSize="100"
          onChangePixelSize={this.pixelSizeChangedHandler}
          editPalette={this.state.editPalette}
          onChangeEditPalette={this.editPaletteChangedHandler}
          onChangeMaxColors={this.maxColorsChangedHandler} />
        <Canvas 
          pixelSize={this.state.pixelSize}
          img={this.props.img}
          maxColors={this.state.maxColors} />
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