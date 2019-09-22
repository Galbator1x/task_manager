import React, { Component } from 'react'

export default class LaneHeader extends Component {
  render () {
    return <div>
      <b>{this.props.id}</b> ({this.props.cards.length}/{this.props.total_count})
    </div>
  }
}
