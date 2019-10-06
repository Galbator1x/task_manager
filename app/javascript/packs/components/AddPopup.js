import React, { Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Routes from 'Routes';

import Fetch from './Fetch';

export default class AddPopup extends Component {
  state = {
    name: '',
    description: '',
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleDecriptionChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  handleCardAdd = () => {
    const { name, description } = this.state;
    const { onClose } = this.props;

    Fetch.post(Routes.apiV1TasksPath(), {
      task: {
        name: name,
        description: description,
      },
    }).then(response => {
      if (response.statusText == 'Created') {
        onClose(true);
      } else {
        alert(`${response.status} - ${response.statusText}`);
      }
    });
  };

  render() {
    const { name, description } = this.state;
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
