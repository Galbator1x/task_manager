import React, { Component } from 'react';
import Board from 'react-trello';
import { Button } from 'react-bootstrap';

import { fetch } from './Fetch';
import LaneHeader from './LaneHeader';
import AddPopup from './AddPopup';

export default class TasksBoard extends Component {
  state = {
    board: {
      new_task: null,
      in_development: null,
      in_qa: null,
      in_code_review: null,
      ready_for_release: null,
      released: null,
      archived: null,
    },
    addPopupShow: false
  }

  lanesMapping() {
    return {
      'new_task': { name: 'New', state_event: '' },
      'in_development': { name: 'In Dev', state_event: 'to_development' },
      'in_qa': { name: 'In QA', state_event: 'to_qa' },
      'in_code_review': { name: 'in CR', state_event: 'to_code_review' },
      'ready_for_release': { name: 'Ready for release', state_event: 'to_ready_for_release' },
      'released': { name: 'Released', state_event: 'release' },
      'archived': { name: 'Archived', state_event: 'archive' },
    }
  }

  generateLane(id, title) {
    const tasks = this.state[id];

    return {
      id,
      title,
      total_count: (tasks) ? tasks.meta.total_count : 'None',
      cards: (tasks) ? tasks.items.map((task) => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      }) : []
    }
  }

  getBoard() {
    const { lanesMapping } = this;
    const lanes = Object.keys(lanesMapping()).map(key =>
      this.generateLane(key, lanesMapping()[key].name)
    );
    return { lanes };
  }

  loadLines() {
    const { lanesMapping } = this;
    const lanes = Object.keys(lanesMapping()).map(key =>
      this.loadLine(key)
    );
  }

  componentDidMount() {
    this.loadLines();
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then(( data ) => {
      this.setState({
        [state]: data
      });
    });
  }

  fetchLine(state, page = 1) {
    return fetch('GET', window.Routes.api_v1_tasks_path({
      q: { state_eq: state },
      page: page,
      per_page: 10,
      format: 'json'
    })).then(({ data }) => {
      return data;
    })
  }

  onLaneScroll(requestedPage, state) {
    return this.fetchLine(state, requestedPage).then(({items}) => {
      return items.map(task => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      });
    });
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const state_event = this.lanesMapping()[targetLaneId].state_event;
    fetch(
      'PUT',
      Routes.api_v1_task_path(cardId, { task: { state_event } }),
    ).then(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  }

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added == true) {
      this.loadLine('new_task');
    };
  }

  render() {
    const components = {
      LaneHeader: LaneHeader
    }
    return <div>
      <h1>Your tasks</h1>
      <Button bsStyle="primary" onClick={this.handleAddShow}>Create new task</Button>
      <Board
        data={this.getBoard()}
        onLaneScroll={this.onLaneScroll}
        components={components}
        cardsMeta={this.state}
        draggable
        laneDraggable={false}
        handleDragEnd={this.handleDragEnd}
      />
      <AddPopup
        show={this.state.addPopupShow}
        onClose={this.handleAddClose}
      />
    </div>;
  }
}
