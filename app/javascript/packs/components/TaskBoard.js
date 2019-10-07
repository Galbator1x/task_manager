import React, { Component } from 'react';
import Board from 'react-trello';
import { Button } from 'react-bootstrap';
import Routes from 'Routes';

import { decamelize } from 'utils/keysConverter';
import Fetch from './Fetch';
import LaneHeader from './LaneHeader';
import AddPopup from './AddPopup';
import EditPopup from './EditPopup';

export default class TasksBoard extends Component {
  state = {
    board: {
      newTask: null,
      inDevelopment: null,
      inQa: null,
      inCodeReview: null,
      readyForRelease: null,
      released: null,
      archived: null,
    },
    addPopupShow: false,
    editCardId: null,
  };

  lanesMapping() {
    return {
      'newTask': { state: 'new_task', name: 'New', state_event: '' },
      'inDevelopment': { state: 'in_development', name: 'In Dev', state_event: 'to_development' },
      'inQa': { state: 'in_qa', name: 'In QA', state_event: 'to_qa' },
      'inCodeReview': { state: 'in_code_review', name: 'in CR', state_event: 'to_code_review' },
      'readyForRelease': { state: 'ready_for_release', name: 'Ready for release', state_event: 'to_ready_for_release' },
      'released': { state: 'released', name: 'Released', state_event: 'release' },
      'archived': { state: 'archived', name: 'Archived', state_event: 'archive' },
    }
  }

  generateLane(id, title) {
    const tasks = this.state[id];

    return {
      id,
      title,
      totalCount: tasks ? tasks.meta.totalCount : 'None',
      cards: tasks ? tasks.items.map((task) => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      }) : []
    }
  }

  getBoard() {
    const lanesMap = this.lanesMapping();
    const lanes = Object.keys(lanesMap).map(key =>
      this.generateLane(lanesMap[key].state, lanesMap[key].name),
    );
    return { lanes };
  }

  loadLines() {
    const lanesMap = this.lanesMapping();
    const lanes = Object.keys(lanesMap).map(key =>
      this.loadLine(lanesMap[key].state),
    );
  }

  componentDidMount() {
    this.loadLines();
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then(data => {
      this.setState({ [state]: data });
    });
  }

  fetchLine(state, page = 1) {
    return Fetch.get(
      Routes.apiV1TasksPath(
        decamelize({
          q: { stateEq: state },
          page: page,
          perPage: 10,
          format: 'json',
        }),
      ),
    ).then(({ data }) => {
      return data;
    });
  }

  onLaneScroll(requestedPage, state) {
    return this.fetchLine(state, requestedPage).then(({ items }) => {
      return items.map(task => {
        return {
          ...task,
          label: task.state,
          title: task.name,
        };
      });
    });
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const stateEvent = this.lanesMapping()[targetLaneId].stateEvent;
    Fetch.put(Routes.apiV1TaskPath(cardId, { task: { stateEvent } })).then(
      () => {
        this.loadLine(sourceLaneId);
        this.loadLine(targetLaneId);
      },
    );
  };

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  };

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added == true) {
      this.loadLine(this.lanesMapping()['newTask'].state);
    }
  };

  onCardClick = cardId => {
    this.setState({ editCardId: cardId });
  };

  handleEditClose = (edited = '') => {
    this.setState({ editCardId: null });
    const lanesMap = this.lanesMapping();
    const states = Object.keys(lanesMap).map(key => lanesMap[key].state);
    if (states.includes(edited)) {
      this.loadLine(edited);
    }
  };

  render() {
    const { addPopupShow, editCardId } = this.state;
    const editPopupShow = editCardId !== null;
    const components = {
      LaneHeader: LaneHeader,
    };

    return (
      <div>
        <h1>Your tasks</h1>
        <Button bsStyle="primary" onClick={this.handleAddShow}>
          Create new task
        </Button>
        <Board
          data={this.getBoard()}
          onLaneScroll={this.onLaneScroll}
          components={components}
          cardsMeta={this.state}
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
        />
        {addPopupShow && (
          <AddPopup show={addPopupShow} onClose={this.handleAddClose} />
        )}
        {editPopupShow && (
          <EditPopup
            show={editPopupShow}
            onClose={this.handleEditClose}
            cardId={editCardId}
          />
        )}
      </div>
    );
  }
}
