import {SET_PRODUCT} from '../Actions/Type';

const initialState = {
  data: null,
};

// eslint-disable-next-line no-undef
export default product = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PRODUCT:
      const {product} = action;
      return {
        data: product.data,
      };
    default:
      return state;
  }
};
