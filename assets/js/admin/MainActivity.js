import React, {Component} from 'react';
import MyMenu from './component/MyMenu';
import Size from './style/Size';


export default class MainActivity extends Component {


	render() {

		return (
			<div>
				<div style={{height: Size.HeaderHeight}}><h1>Header</h1></div>
				<div style={{
					display: 'flex',
				}}>
					<MyMenu />
					<div style={{
						overflow:'scroll',
						width: Size.ContentWidth,
						height:Size.ContentHeight,
					}}>{this.props.children}</div>

				</div>
			</div>);
	}
}
