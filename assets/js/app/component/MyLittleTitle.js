import React ,{Component} from 'react';
import {Flex} from 'antd-mobile';
import Color from '../style/Color';

export default class MyLittleTitle extends Component{


	render(){
		let textColor = this.props.color;
		if (textColor ===undefined){
			textColor = Color.NormalText;
		}

		return(
			<Flex style={{backgroundColor:Color.White , padding:5}}>
				<div style={{paddingLeft:10,paddingRight:10}}>|</div>
				<div style={{color:textColor}}>{this.props.children || this.props.title}</div>
			</Flex>
		);
	}
}