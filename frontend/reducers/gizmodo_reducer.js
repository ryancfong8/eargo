import { RECEIVE_GIZMODO } from '../actions/wiki_actions';
import merge from 'lodash/merge';


const GizmodoReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_GIZMODO:
      return merge({}, action.wiki);
    default:
      return oldState;
  }
};

export default GizmodoReducer;
