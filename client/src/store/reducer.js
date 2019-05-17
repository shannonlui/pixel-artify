import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

import testImg from '../assets/images/car.png';

const createTestImage = () => {
  const img = new Image();
  img.src = testImg;
  return img;
}

const initialState = {
  image: createTestImage(),
  pixelSize: 4,
  contrast: 0,
  brightness: 0,
  saturation: 0,
  colorCount: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE:
      return updateObject(state, {image: action.image});
    case actionTypes.UPDATE_PIXEL_SIZE:
      return updateObject(state, {pixelSize: action.pixelSize});
    case actionTypes.UPDATE_CONTRAST:
      return updateObject(state, {contrast: action.contrast});
    case actionTypes.UPDATE_BRIGHTNESS:
      return updateObject(state, {brightness: action.brightness});
    case actionTypes.UPDATE_SATURATION:
      return updateObject(state, {saturation: action.saturation});
    case actionTypes.UPDATE_COLOR_COUNT:
      return updateObject(state, {colorCount: action.colorCount});
  }
  return state;
};

export default reducer;