import React from 'react';
import { Modal, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { fetch } from './Fetch';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    },
    isLoading: true,
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(({data}) => {
      this.setState({ task: data});
      this.setState({ isLoading: false });
    });
  }

  componentDidUpdate (prevProps) {
    const { cardId } = this.props;
    if (cardId != null && cardId !== prevProps.cardId) {
      this.loadCard(cardId);
    };
  }

  handleNameChange = (e) => {
    const { task } = this.state;
    this.setState({ task: { ...task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    const { task } = this.state;
    this.setState({ task: { ...task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const {
      task: {
        name,
        description,
        author,
        assignee,
        state
      }
    } = this.state;
    const { cardId, onClose } = this.props;

    fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}), {
      name,
      description,
      author_id: author.id,
      assignee_id: null,
      state,
    }).then( response => {
      if (response.statusText == 'OK') {
        onClose(state);
      }
      else {
        alert('Update failed! ' + response.status + ' - ' + response.statusText);
      }
    });
  }

  handleCardDelete = () => {
    const { task: { state } } = this.state
    const { cardId, onClose } = this.props;

    fetch('DELETE', window.Routes.api_v1_task_path(cardId, { format: 'json' }))
      .then( response => {
        console.log(response)
        if (response.statusText == 'OK') {
          onClose(state);
        }
        else {
          alert('DELETE failed! ' + response.status + ' - ' + response.statusText);
        }
      });
  }

  render () {
    const { onClose, show } = this.props;
    const {
      isLoading,
      task,
      task: {
        state,
        description,
        name,
        author: {
          first_name,
          last_name,
        },
      },
    } = this.state;

    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal show={show} onHide={onClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {task.id} [{state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId='formTaskName'>
                <FormLabel>Task name:</FormLabel>
                <FormControl
                  type='text'
                  value={name}
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId='formDescriptionName'>
                <FormLabel>Task description:</FormLabel>
                <FormControl
                  type='textarea'
                  value={description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
            </form>
            Author: {first_name} {last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='danger' onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle='primary' onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
