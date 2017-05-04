import React, {Component} from 'react';
import {Checkbox} from 'antd';
import Size from '../style/Size';

export default class MyCheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('receive props');
    let defaultValue = nextProps.defaultValue;
    if (defaultValue !== undefined && defaultValue.length !== 0) {
      this.setState({
        value: defaultValue,
      });
    }
  }

  render() {

    return (
      <Checkbox.Group
        options={this.props.options}
        value={this.state.value}
        onChange={(selectedValues) => {
          this.setState({
            value: selectedValues,
          });
          return this.props.onChange(selectedValues);
        }}/>
    );
  }
}
