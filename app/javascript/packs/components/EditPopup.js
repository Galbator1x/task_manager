import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Routes from 'Routes';

import TaskRepository from 'repositories/TaskRepository';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
      },
    },
    isLoading: true,
  };

  loadCard = cardId => {
    this.setState({ isLoading: true });
    TaskRepository.getTask(cardId).then(({ data }) => {
      this.setState({ task: data, isLoading: false });
    });
  };

  componentDidMount() {
    const { cardId } = this.props;
    if (cardId != null) {
      this.loadCard(cardId);
    }
  }

  handleNameChange = ({ target: { value } }) => {
    const { task } = this.state;
    this.setState({ task: { ...task, name: value } });
  };

  handleDecriptionChange = ({ target: { value } }) => {
    const { task } = this.state;
    this.setState({ task: { ...task, description: value } });
  };

  handleCardEdit = () => {
    const {
      task: { name, description, author, state },
    } = this.state;
    const { cardId, onClose } = this.props;

    TaskRepository.updateTask(cardId, {
      name,
      description,
      authorId: author.id,
      state,
    })
      .then(response => {
        onClose(state);
      })
      .catch(error => {
        alert(`Update failed! ${error}`);
      });
  };

  handleCardDelete = () => {
    const {
      task: { state },
    } = this.state;
    const { cardId, onClose } = this.props;

    TaskRepository.deleteTask(cardId)
      .then(response => {
        onClose(state);
      })
      .catch(error => {
        alert(`DELETE failed! ${error}`);
      });
  };

  render() {
    const { onClose, show } = this.props;
    const {
      isLoading,
      task,
      task: {
        state,
        description,
        name,
        author: { firstName, lastName },
      },
    } = this.state;

    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
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
            Author: {firstName} {lastName}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='danger' onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle='primary' onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
