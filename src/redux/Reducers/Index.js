import {combineReducers} from 'redux';
import product from './productReducer';
import global from './globalReducer';

export default combineReducers({
  product,
  global,
});
