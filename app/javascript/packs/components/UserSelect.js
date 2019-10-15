import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';

import UserRepository from 'repositories/UserRepository';

export default class UserSelect extends Component {
  state = {
    inputValue: '',
  };

  getOptionLabel = option => {
    return `${option.firstName} ${option.lastName}`;
  };

  getOptionValue = option => {
    return option.id;
  };

  loadOptions = inputValue => {
    return UserRepository.getUsers({
      q: { firstNameOrLastNameCont: inputValue },
      format: 'json',
    }).then(({ data }) => {
      return data.items;
    });
  };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  componentDidMount() {
    this.loadOptions();
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          defaultValue={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
