import React , {Component} from 'react';
import {Input} from 'antd';
import Size from '../style/Size';

export default class MyInput extends Component{

	render(){
		return(
			<Input
        type={this.props.type}
        id={this.props.id}
				defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
				style={{width:Size.InputWidth}}/>
		);
	}
}
