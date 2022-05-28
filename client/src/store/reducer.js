import * as actionTypes from './actionTypes';
import { updateObject, createReducer, isDevEnv } from '../utils/utility';
import testImg from '../assets/images/car.png';
import { TOOL_TYPES } from '../constants/constants';

const createTestImage = () => {
  const img = new Image();
  if (isDevEnv()) {
    img.src = testImg;
  }
  return img;
};

const initialState = {
  loading: false,
  image: createTestImage(),
  isPaintEnabled: false,
  paintColor: '#000',
  pixelSize: 4,
  contrast: 0,
  brightness: 0,
  saturation: 0,
  colorCount: '',
  colorPalette: [],
  toolType: TOOL_TYPES.PAINT,
};

function loadImage(state, action) {
  return updateObject(initialState, {image: action.image, loading: true});
}

function loadImageSuccess(state, action) {
  return updateObject(state, {loading: false});
}

function enablePaint(state, action) {
  return updateObject(state, {isPaintEnabled: true});
}

function updatePixelSize(state, action) {
  return updateObject(state, {pixelSize: action.pixelSize});
}

function updateContrast(state, action) {
  return updateObject(state, {contrast: action.contrast});
}

function updateBrightness(state, action) {
  return updateObject(state, {brightness: action.brightness});
}

function updateSaturation(state, action) {
  return updateObject(state, {saturation: action.saturation});
}

function updateColorCount(state, action) {
  return updateObject(state, {
    colorCount: action.colorCount, 
    colorPalette: action.colorPalette
  });
}

function updatePaintColor(state, action) {
  return updateObject(state, {paintColor: action.paintColor});
}

function updateToolType(state, action) {
  return updateObject(state, {toolType: action.toolType});
}
  
const reducer = createReducer(initialState, {
  [actionTypes.LOAD_IMAGE]: loadImage,
  [actionTypes.LOAD_IMAGE_SUCCESS]: loadImageSuccess,
  [actionTypes.ENABLE_PAINT]: enablePaint,
  [actionTypes.UPDATE_PIXEL_SIZE]: updatePixelSize,
  [actionTypes.UPDATE_CONTRAST]: updateContrast,
  [actionTypes.UPDATE_BRIGHTNESS]: updateBrightness,
  [actionTypes.UPDATE_SATURATION]: updateSaturation,
  [actionTypes.UPDATE_COLOR_COUNT]: updateColorCount,
  [actionTypes.UPDATE_PAINT_COLOR]: updatePaintColor,
  [actionTypes.UPDATE_TOOL_TYPE]: updateToolType,
});

export default reducer;