import React from 'react';
import MainIndexItem from './main_index_item';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGizmodo();
  }

  render() {
    return(
      <div className = "main">
        <div className = "eargo-title">
          <img src = {"//logo.clearbit.com/eargo.com"} />
          <text className ="eargo-mentions">Eargo Mentions</text>
        </div>
        <div className = "publication-list">
          {this.props.pages.map((page, i) => (
              <MainIndexItem key = {i} page = {page} />
          ))}
        </div>
      </div>
    );
  }
}

export default Main;
