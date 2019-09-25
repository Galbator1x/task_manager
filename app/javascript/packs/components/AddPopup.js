import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

import { fetch } from './Fetch';

export default class AddPopup extends Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name:  null,
      email: null
    }
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleDecriptionChange = e => {
    this.setState({ description: e.target.value });
  }

  handleCardAdd = () => {
    const { name, description, assignee } = this.state;
    const { onClose } = this.props;

    fetch('POST', window.Routes.api_v1_tasks_path(), {
      task: {
        name: name,
        description: description,
        assignee_id: assignee.id
      }
    }).then(response => {
    if (response.statusText == 'Created') {
        onClose(true);
      } else {
        alert(response.status + ' - ' + response.statusText);
      }
    });
  }

  render () {
    const { name, description, assignee } = this.state;
    const { show, onClose } = this.props;

    return <div>
      <Modal show={show} onHide={onClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            New task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formTaskName">
              <FormLabel>Task name:</FormLabel>
              <FormControl
                type="text"
                value={name}
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="formDescriptionName">
              <FormLabel>Task description:</FormLabel>
              <FormControl
                type="textarea"
                value={description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleCardAdd}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}
