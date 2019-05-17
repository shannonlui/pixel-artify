import * as actionTypes from './actionTypes';

export const loadImage = (image) => {
  return {
    type: actionTypes.LOAD_IMAGE,
    image: image
  };
};

export const loadImageSuccess = () => {
  return {
    type: actionTypes.LOAD_IMAGE_SUCCESS
  };
};

export const updatePixelSize = (pixelSize) => {
  return {
    type: actionTypes.UPDATE_PIXEL_SIZE,
    pixelSize: pixelSize
  };
};

export const updateContrast = (contrast) => {
  return {
    type: actionTypes.UPDATE_CONTRAST,
    contrast: contrast
  };
};

export const updateBrightness = (brightness) => {
  return {
    type: actionTypes.UPDATE_BRIGHTNESS,
    brightness: brightness
  };
};


export const updateSaturation = (saturation) => {
  return {
    type: actionTypes.UPDATE_SATURATION,
    saturation: saturation
  };
};


export const updateColorCount = (colorCount) => {
  return {
    type: actionTypes.UPDATE_COLOR_COUNT,
    colorCount: colorCount
  };
};
