import React, {Component} from 'react';
import Size from '../style/Size';
import MyNavBar from "./MyNavBar";

export default class MyIframe extends Component {

	render() {


		return (
			<div>
				<MyNavBar/>
				<iframe
					src={this.props.url}
					frameborder="0"
				/>
			</div>
		);
	}

}
