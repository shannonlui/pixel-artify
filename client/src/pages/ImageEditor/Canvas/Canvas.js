import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColorThief from '../../../utils/color-thief/color-thief';
import { getColorDifference } from '../../../utils/colorDifference';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.colorThief = new ColorThief();
    this.state = {
      palette: []
    };
  }

  componentDidMount() {
    this.props.setExportImage(this.saveCanvas);
    
    let img = this.props.img;
    img.onload = () => {
      this.pixelate(img, +this.props.pixelSize);
    }
  }

  componentDidUpdate(prevProps) {
    let img = this.props.img;

    // Update colors in palette
    if (prevProps.colorCount !== this.props.colorCount) {
      let palette = [];
      if (this.props.colorCount > 0 && this.props.colorCount < 101) {
        palette = this.colorThief.getPalette(img, this.props.colorCount);
      }
      this.setState({palette: palette});
    }

    this.pixelate(img, +this.props.pixelSize);
    this.adjustColors(this.props.contrast, this.props.brightness, this.props.saturation);
  }

  setCanvasDimensions(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
  }

  pixelate = (img, pixelSize) => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const width = img.width;
    const height = img.height;
    this.setCanvasDimensions(canvas, width, height);
    
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
        if (this.state.palette && this.state.palette.length > 0) {
          [red, green, blue] = this.getClosestColor(this.state.palette, [red, green, blue]);
        }
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    } 
  }

  saveCanvas = () => {
    const canvas = this.canvas.current;
    if (canvas.msToBlob) {
      // Save canvas as an image in IE
      const blob = canvas.msToBlob();
      window.navigator.msSaveBlob(blob, 'canvas.png');
    } else { 
      // Save canvas as an image in Chrome/Firefox
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      window.location.href = image;
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

  adjustColors = (contrast, brightness, saturation) => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (contrast !== 0 || brightness !== 0) {
      this.adjustContrastAndBrightness(imgData.data, contrast, brightness);
    }
    if (saturation !== 0) {
      this.adjustSaturation(imgData.data, saturation);
    }
    ctx.putImageData(imgData, 0, 0);
  }

  adjustContrastAndBrightness(imgData, contrast, brightness) {
    brightness = brightness * 0.75;
    contrast = (contrast / 100) + 1;
    const intercept = 128 * (1 - contrast);
    for (let i = 0; i < imgData.length; i += 4) {
      imgData[i] = imgData[i] * contrast + intercept + brightness;
      imgData[i + 1] = imgData[i + 1] * contrast + intercept + brightness;
      imgData[i + 2] = imgData[i + 2] * contrast + intercept + brightness;
    }
  }

  adjustSaturation(imgData, saturation) {
    saturation = (saturation / 100) + 1;
    for (let i = 0; i < imgData.length; i += 4) {
      const gray = imgData[i] * 0.3086 + imgData[i + 1] * 0.6094 + imgData[i + 2] * 0.0820;
      const intercept = gray * (1 - saturation);
      imgData[i] = imgData[i] * saturation + intercept;
      imgData[i + 1] = imgData[i + 1] * saturation + intercept;
      imgData[i + 2] = imgData[i + 2] * saturation + intercept;
    }
  }

  render() {
    return(
      <canvas ref={this.canvas} width={300} height={300} />
    );
  }
}

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

export default connect(mapStateToProps)(Canvas);