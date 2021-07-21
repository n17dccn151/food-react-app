import {
  IMAGE_ADD_IMAGE_REQUEST,
  IMAGE_ADD_IMAGE_SUCCESS,
  IMAGE_ADD_IMAGE_FAIL,
  IMAGE_ADD_IMAGE_RESET,
} from '../constants/imageConstants.js';

export const imageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_ADD_IMAGE_REQUEST:
      console.log('requsr');
      return {
        loading: true,
      };
    case IMAGE_ADD_IMAGE_SUCCESS:
      console.log('success');
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case IMAGE_ADD_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
