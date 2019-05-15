import React, { Component } from 'react';

import testImg from '../../../assets/images/car.png';
import ColorThief from '../../../utils/color-thief/color-thief';
import { getColorDifference } from '../../../utils/colorDifference';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.colorThief = new ColorThief();
    this.state = {
      palette: []
    }
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
    if (prevProps.maxColors !== this.props.maxColors) {
      let palette = [];
      if (this.props.maxColors > 0 && this.props.maxColors < 101) {
        palette = this.colorThief.getPalette(img, this.props.maxColors);
      }
      this.setState({palette: palette});
    }

    this.pixelate(img, +this.props.pixelSize);
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

  render() {
    return(
      <div>
        <img ref="image" src={testImg} className="hidden" />
        <canvas ref={this.canvas} width={300} height={300} />
      </div>
    )
  }
}
    
export default Canvas;