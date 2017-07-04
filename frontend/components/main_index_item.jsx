import React from 'react';
import { hashHistory } from 'react-router';

class MainIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  website() {
    if (this.props.page.url[0] !== "h") {
      return "http://" + this.props.page.url;
    }
    else {
      return this.props.page.url;
    }
  }

  owner() {
    if (this.props.page.owner !== "None") {
      return <span><text className = "attribute">Owner:</text> <text>{this.props.page.owner}</text></span>;
    }
    else {
      return <span><text className = "attribute">Publisher:</text> <text>{this.props.page.publisher}</text></span>;
    }
  }

  handleClick () {
    window.location = this.website();
  }

  render() {
    return (
      <div className = "publication" onClick = { this.handleClick }>
        <img src = {`//logo.clearbit.com/${this.props.page.title.toLowerCase().split(" ").join("")}.com`} />
        <div className = "publication-info">
          <text className = "title">{this.props.page.title}</text>
          <span><text className = "attribute">Type of Site:</text> <text>{this.props.page.type}</text></span>
          <span><text className = "attribute">Editor:</text> <text>{this.props.page.editor}</text></span>
          {this.owner()}
          <span><text className = "attribute">Created By:</text> <text>{this.props.page.creator}</text></span>
          <span><text className = "attribute">Year Founded:</text> <text>{this.props.page.year}</text></span>
          <span><text className = "attribute">Website: <a href={this.website()}>{this.website()}</a></text></span>
        </div>
      </div>
    );
  }
}

export default MainIndexItem;
