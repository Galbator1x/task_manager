import React, { Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Routes from 'Routes';

import UserSelect from './UserSelect';
import TaskRepository from 'repositories/TaskRepository';

export default class AddPopup extends Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
    },
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleDecriptionChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  handleAssigneeChange = value => {
    this.setState({ assignee: value });
  };

  handleCardAdd = () => {
    const { name, description, assignee } = this.state;
    const { onClose } = this.props;

    TaskRepository.createTask({
      task: {
        name: name,
        description: description,
        assigneeId: assignee.id,
      },
    })
      .then(response => {
        onClose(true);
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    const { name, description, assignee } = this.state;
    const { show, onClose } = this.props;

    return (
      <div>
        <Modal show={show} onHide={onClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <FormLabel>Task name:</FormLabel>
                <FormControl
                  type="text"
                  value={name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <FormLabel>Task description:</FormLabel>
                <FormControl
                  type="textarea"
                  value={description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="formAssignee">
                <FormLabel>Assignee</FormLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={assignee}
                />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
