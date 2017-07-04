import { combineReducers } from 'redux';

import GizmodoReducer from './gizmodo_reducer';

const rootReducer = combineReducers({
  pages: GizmodoReducer
});

export default rootReducer;
