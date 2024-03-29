import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import Pica from 'pica';

import styles from './Canvas.module.css';
import * as actions from '../../../store/actions';
import { getClosestColor, convertRgbToHex, adjustImageColors } from '../../../utils/colorDifference';
import { TOOL_TYPES } from '../../../constants/constants';
import { isDevEnv } from '../../../utils/utility';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: null,
      isPainting: false
    };
    this.grid = React.createRef();
    this.canvas = React.createRef();
    this.mouseLayer = React.createRef();
  }

  componentDidMount() {
    this.props.setExportImage(this.saveCanvas);
    this.props.setResetCanvas(this.resetCanvas);
    
    this.props.origImg.onload = () => {
      this.resizeImage(this.props.origImg);
      this.drawGrid();
    }

    // Add listeners for painting on the canvas using a mouse (from user input)
    this.mouseLayer.current.addEventListener('mousedown', this.handeStartPainting);
    this.mouseLayer.current.addEventListener('mouseup', this.handleStopPainting);
    this.mouseLayer.current.addEventListener('mousemove', this.handleContinuePainting);
    this.mouseLayer.current.addEventListener("mouseout", this.handleMouseOut);

    // Trigger a confirmation dialog to ask user if they really want to leave the page
    if (!isDevEnv())
      window.onbeforeunload = () => true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.pixelSize !== prevProps.pixelSize || this.props.contrast !== prevProps.contrast
      || this.props.brightness !== prevProps.brightness || this.props.saturation !== prevProps.saturation
      || this.props.colorCount !== prevProps.colorCount) 
    {
      this.resetCanvas();
    }
  }

  componentWillUnmount() { 
    // Remove the trigger for confirming if user really want to leave the page
    window.onbeforeunload = null; 
  }

  resetCanvas = () => {
    // Redraw the pixelated image. This will clear any painting done by the user!
    this.pixelate(this.state.img, this.props.pixelSize);
    this.applyColorAdjustments();
  }

  handeStartPainting = (event) => {
    if (!this.props.isPaintEnabled)
      return;
    if (this.props.toolType === TOOL_TYPES.COLOR_PICK) {
      // Get the color from the pixel that was touched
      const ctx = this.canvas.current.getContext('2d');
      const coord = this.getPosition(event);
      const imgData = ctx.getImageData(coord.x, coord.y, 1, 1).data;
      const hex = convertRgbToHex(imgData[0], imgData[1], imgData[2]);
      this.props.onChangeColor(hex);
    } else {
      // Start painting
      this.setState({isPainting: true});
      this.paintOnCanvas(event);
    }
  }

  handleStopPainting = (event) => {
    this.setState({isPainting: false});
  }

  handleContinuePainting = (event) => {
    if (!this.props.isPaintEnabled)
      return;
    if (this.state.isPainting) {
      this.paintOnCanvas(event);
    }
    if (this.props.toolType !== TOOL_TYPES.COLOR_PICK) {
      // Clear the canvas for the mouse layer
      const mouseCanvas = this.mouseLayer.current;
      const mouseCtx = mouseCanvas.getContext('2d');
      mouseCtx.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
      // Draw a transparent rectangle to preview where the mouse will paint
      this.drawSquare(event, mouseCtx, "rgba(0, 0, 0, 0.3)");
    }
  }

  handleMouseOut = (event) => {
    // TODO: add helper function for clearing canvas
    const mouseCanvas = this.mouseLayer.current;
    const mouseCtx = mouseCanvas.getContext('2d');
    mouseCtx.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
  }

  getPosition = (event) => {
    var rect = this.canvas.current.getBoundingClientRect();
    return { 
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  paintOnCanvas = (event) => {
    const ctx = this.canvas.current.getContext('2d');
    const color = this.props.toolType === TOOL_TYPES.PAINT ? this.props.paintColor : null;
    this.drawSquare(event, ctx, color);
  }

  drawSquare = (event, ctx, color) => {
    let { pixelSize, brushSize } = this.props;
    const length = brushSize * pixelSize;
    const coord = this.getPosition(event);
    const offset = Math.floor(brushSize / 2) * pixelSize;
    const x = Math.floor(coord.x / pixelSize) * pixelSize - offset;
    const y = Math.floor(coord.y / pixelSize) * pixelSize - offset;
    if (color == null) {
      ctx.clearRect(x, y, length, length);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, length, length);
    }
  }

  resizeImage = (img) => {
    const canvas = this.canvas.current;
    // TODO: do not hardcode these numbers here
    const isMobile = window.innerWidth <= 700;
    const maxWidth = isMobile ? (window.innerWidth - 20) : (window.innerWidth - 340);
    const maxHeight = isMobile ? 280 : (window.innerHeight - 20);
    if (img.width > maxWidth || img.height > maxHeight) {
      const ratio = Math.max(img.width / maxWidth, img.height / maxHeight);
      this.setCanvasSize(Math.round(img.width / ratio), Math.round(img.height / ratio));
      Pica().resize(img, canvas)
        .then(result => this.setResizedImage(result.toDataURL()));
    } else {
      this.setCanvasSize(img.width, img.height);
      this.setResizedImage(img.src);
    }
  }

  setCanvasSize = (width, height) => {
    const canvases = [this.canvas.current, this.mouseLayer.current, this.grid.current];
    for (var c of canvases) {
      c.width = width;
      c.height = height;
    }
  }

  setResizedImage = (imgSrc) => {
    const resizedImg = new Image();
    resizedImg.src = imgSrc;
    resizedImg.onload = () => {
      this.setState({img: resizedImg});
      this.pixelate(resizedImg, this.props.pixelSize);
      this.props.onLoadImageSuccess();
    }
  }

  drawGrid = () => {
    const { pixelSize } = this.props;
    const canvas = this.grid.current;
    const ctx = canvas.getContext('2d');
    const cols = Math.floor(canvas.width, pixelSize);
    const rows = Math.floor(canvas.height, pixelSize);
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw a checkerboard pattern to be the background of the main canvas
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = ["#888", "#666"][(x + y) % 2]; // Alternate the fill color
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
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
          [red, green, blue] = getClosestColor(this.props.palette, [red, green, blue]);
        }
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    } 
  }

  saveCanvas = () => {
    const canvasURL = this.canvas.current.toDataURL('image/png');
    saveAs(canvasURL, 'pixelartify.png');
  }

  applyColorAdjustments = () => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    adjustImageColors(imgData.data, this.props.saturation, this.props.brightness, this.props.contrast);
    ctx.putImageData(imgData, 0, 0);
  }

  render() {
    return(
      <React.Fragment>
        <canvas ref={this.grid} className={styles.canvas} />
        <canvas ref={this.canvas} className={styles.canvas} />
        <canvas ref={this.mouseLayer} className={`${styles.canvas} ${styles.hideOnSmallScreen}`} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    origImg: state.image,
    isPaintEnabled: state.isPaintEnabled,
    paintColor: state.paintColor,
    pixelSize: state.pixelSize,
    brushSize: state.brushSize,
    contrast: state.contrast,
    brightness: state.brightness,
    saturation: state.saturation,
    colorCount: state.colorCount,
    palette: state.colorPalette,
    toolType: state.toolType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadImageSuccess: () => dispatch(actions.loadImageSuccess()),
    onChangeColor: (color) => dispatch(actions.updatePaintColor(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);