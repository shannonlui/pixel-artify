import React, { Component } from 'react';
import testImg from '../../assets/images/car.png';

class Canvas extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = testImg;
    
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      this.pixelate(ctx, 4, width, height);
    }
  }

  pixelate = (ctx, sampleSize, width, height) => {
    const imgData = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);
    for (let y = 0; y < height; y += sampleSize) {
      for (let x = 0; x < width; x += sampleSize) {
        const pos = (y * width + x) * 4;
        const red = imgData[pos];
        const green = imgData[pos + 1];
        const blue = imgData[pos + 2];
        let alpha = imgData[pos + 3];
        if (alpha > 0) alpha = 255;
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(x, y, sampleSize, sampleSize);
      }
    }  
  }

  render() {
    return(
      <div>
        <img ref="image" src={testImg} className="hidden" />
        <canvas ref="canvas" width={300} height={300} />
      </div>
    )
  }
}
    
export default Canvas;