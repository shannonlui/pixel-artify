import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';

import styles from './Canvas.module.css';
import * as actions from '../../../store/actions';
import { getColorDifference } from '../../../utils/colorDifference';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPainting: false
    };
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.props.setExportImage(this.saveCanvas);
    this.props.setResetCanvas(this.resetCanvas);
    
    let img = this.props.img;
    img.onload = () => {
      this.props.onLoadImageSuccess();
      this.pixelate(img, +this.props.pixelSize);
    }

    // Add listeners for painting on the canvas using a mouse (from user input)
    this.canvas.current.addEventListener('mousedown', this.handeStartPainting);
    this.canvas.current.addEventListener('mouseup', this.handleStopPainting);
    this.canvas.current.addEventListener('mousemove', this.handleContinuePainting);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pixelSize !== prevProps.pixelSize || this.props.contrast !== prevProps.contrast
      || this.props.brightness !== prevProps.brightness || this.props.saturation !== prevProps.saturation
      || this.props.colorCount !== prevProps.colorCount) 
    {
      this.resetCanvas();
    }
  }

  resetCanvas = () => {
    this.pixelate(this.props.img, +this.props.pixelSize);
    this.adjustColors();
  }

  handeStartPainting = (event) => {
    if (!this.props.isPaintEnabled)
      return;
    this.setState({isPainting: true});
    this.drawSquare(event);
  }

  handleStopPainting = (event) => {
    this.setState({isPainting: false});
  }

  handleContinuePainting = (event) => {
    if (this.props.isPaintEnabled && this.state.isPainting)
      this.drawSquare(event);
  }

  getPosition = (event) => {
    var rect = this.canvas.current.getBoundingClientRect();
    return { 
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  drawSquare = (event) => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const pixelSize = +this.props.pixelSize;
    const coord = this.getPosition(event);
    const x = Math.floor(coord.x / pixelSize) * pixelSize;
    const y = Math.floor(coord.y / pixelSize) * pixelSize;
    ctx.fillStyle = this.props.paintColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);
  }

  pixelate = (img, pixelSize) => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    
    // Draw the original image to get the image data
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, width, height).data;

    // Do not pixelate the image if pixel size is 0
    if (pixelSize === 0) return;

    // Clear the canvas and draw the pixelated image
    ctx.clearRect(0, 0, width, height);
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const pos = (y * width + x) * 4;
        let red = imgData[pos];
        let green = imgData[pos + 1];
        let blue = imgData[pos + 2];
        let alpha = imgData[pos + 3];
        if (alpha > 0) alpha = 255;
        if (this.props.palette && this.props.palette.length > 0) {
          [red, green, blue] = this.getClosestColor(this.props.palette, [red, green, blue]);
        }
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    } 
  }

  saveCanvas = () => {
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
    const canvasURL = this.canvas.current.toDataURL('image/png');
    if (iOSSafari) {
      window.open(canvasURL, '_blank');
    } else {
      saveAs(canvasURL, 'pixelartify.png');
    }
  }

  getClosestColor(colors, target) {
    let minDiff = Number.MAX_SAFE_INTEGER;
    let closest = null;
    const length = colors.length;
    for (let i = 0; i < length; i++) {
      let diff = getColorDifference(target, colors[i]);
      if (diff <= minDiff) {
        minDiff = diff;
        closest = colors[i];
      }
    }
    return closest;
  }

  adjustColors = () => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imgData.data;

    const saturation = (this.props.saturation / 100) + 1;
    const brightness = this.props.brightness * 0.75;
    const contrast = (this.props.contrast / 100) + 1;
    const con = 128 * (1 - contrast);

    // Adjust the saturation, brightness, and contrast of each pixel
    for (let i = 0; i < d.length; i += 4) {
      const gray = d[i] * 0.3086 + d[i + 1] * 0.6094 + d[i + 2] * 0.0820;
      const sat = gray * (1 - saturation);

      d[i] = (d[i] * saturation + sat + brightness) * contrast + con;
      d[i + 1] = (d[i + 1] * saturation + sat + brightness) * contrast + con;
      d[i + 2] = (d[i + 2] * saturation + sat + brightness) * contrast + con;
    }

    ctx.putImageData(imgData, 0, 0);
  }

  render() {
    return(
      <canvas ref={this.canvas} className={styles.canvas} />
    );
  }
}

const mapStateToProps = state => {
  return {
    img: state.image,
    isPaintEnabled: state.isPaintEnabled,
    paintColor: state.paintColor,
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
    onLoadImageSuccess: () => dispatch(actions.loadImageSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);