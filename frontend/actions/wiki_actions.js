import * as WikiApiUtil from '../util/wiki_api_util';

export const RECEIVE_GIZMODO = 'RECEIVE_GIZMODO';

export const receiveGizmodo = (wiki) => ({
  type: RECEIVE_GIZMODO,
  wiki
});

export const fetchGizmodo = () => dispatch => {
  return WikiApiUtil.fetchGizmodo().then(wiki => dispatch(receiveGizmodo(wiki)));
};
