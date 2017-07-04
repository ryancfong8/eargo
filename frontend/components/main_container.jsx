import { connect } from 'react-redux';
import Main from './main';
import { fetchGizmodo } from '../actions/wiki_actions';

const mapStateToProps = (state) => {
  return ({
    pages: Object.values(state.pages)
  });
};

const mapDispatchToProps = dispatch => ({
  fetchGizmodo: ()=> dispatch(fetchGizmodo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
