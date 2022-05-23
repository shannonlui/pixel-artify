import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';
import testImg from '../assets/images/car.png';

const createTestImage = () => {
  const img = new Image();
  img.src = testImg;
  return img;
};

const initialState = {
  loading: false,
  image: createTestImage(),
  isPaintEnabled: false,
  pixelSize: 4,
  contrast: 0,
  brightness: 0,
  saturation: 0,
  colorCount: '',
  colorPalette: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_IMAGE:
      return updateObject(initialState, {image: action.image, loading: true});
    case actionTypes.LOAD_IMAGE_SUCCESS:
      return updateObject(state, {loading: false});
    case actionTypes.UPDATE_PIXEL_SIZE:
      return updateObject(state, {pixelSize: action.pixelSize});
    case actionTypes.UPDATE_CONTRAST:
      return updateObject(state, {contrast: action.contrast});
    case actionTypes.UPDATE_BRIGHTNESS:
      return updateObject(state, {brightness: action.brightness});
    case actionTypes.UPDATE_SATURATION:
      return updateObject(state, {saturation: action.saturation});
    case actionTypes.UPDATE_COLOR_COUNT:
      return updateObject(state, {
        colorCount: action.colorCount, 
        colorPalette: action.colorPalette
      });
    case actionTypes.ENABLE_PAINT:
      return updateObject(state, {isPaintEnabled: true});
    default:
      return state;
  }
};

export default reducer;