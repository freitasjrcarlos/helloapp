import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

const Reducers = combineReducers({
  auth: AuthReducer
});

export default Reducers;