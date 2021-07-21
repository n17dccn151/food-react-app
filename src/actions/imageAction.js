import {
  IMAGE_ADD_IMAGE_REQUEST,
  IMAGE_ADD_IMAGE_SUCCESS,
  IMAGE_ADD_IMAGE_FAIL,
  IMAGE_ADD_IMAGE_RESET,
} from '../constants/imageConstants.js';
import API from '../api';

export const createImage = (image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_ADD_IMAGE_REQUEST,
    });

    console.log('áhdjashdjashdjasdhj', image);

    
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await API.post(`uploads`, image, config);

    dispatch({
      type: IMAGE_ADD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_ADD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
