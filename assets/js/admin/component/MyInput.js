import React , {Component} from 'react';
import {Input} from 'antd';
import Size from '../style/Size';

export default class MyInput extends Component{

	render(){
		return(
			<Input
				defaultValue={this.props.defaultValue}
				style={{width:Size.InputWidth}}/>
		);
	}
}
