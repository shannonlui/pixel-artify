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
    pixelSize: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE:
      return updateObject(state, {image: action.image});
    case actionTypes.UPDATE_PIXEL_SIZE:
      return updateObject(state, {image: action.pixelSize});
  }
  return state;
};

export default reducer;