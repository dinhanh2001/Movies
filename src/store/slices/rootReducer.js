import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as homepage } from './homepage';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './homepage';
const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  homepage
});

export default rootReducer;
