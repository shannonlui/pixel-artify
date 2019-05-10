import React, { Component } from 'react';

import testImg from '../../../assets/images/car.png';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  componentDidMount() {    
    let img = this.props.img;
    img.onload = () => {
      this.pixelate(img, +this.props.pixelSize);
    }
  }

  componentDidUpdate() {
    let img = this.props.img;
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
    
    // Get the image data of the original image
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    // Pixelate the image and draw each pixel
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const pos = (y * width + x) * 4;
        const red = imgData[pos];
        const green = imgData[pos + 1];
        const blue = imgData[pos + 2];
        let alpha = imgData[pos + 3];
        if (alpha > 0) alpha = 255;
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    } 
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