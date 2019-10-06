import React, { Component } from 'react';

export default class LaneHeader extends Component {
  render() {
    return (
      <div>
        <b>{this.props.title}</b> ({this.props.cards.length}/
        {this.props.totalCount})
      </div>
    );
  }
}
