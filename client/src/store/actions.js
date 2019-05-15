import * as actionTypes from './actionTypes';

export const uploadImage = (image) => {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    image: image
  };
};

export const updatePixelSize = (pixelSize) => {
  return {
    type: actionTypes.UPDATE_PIXEL_SIZE,
    pixelSize: pixelSize
  };
};