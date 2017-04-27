import React, {Component} from 'react';
import Size from '../style/Size';

export default class MyIcon extends Component {

	render() {
		//switch (this.props.type)
		let src = "/images/icon/icon.png";
		let visibility = undefined;
		let display = undefined;

		switch (this.props.type) {
			case 'right':
				src = "/images/icon/" + this.props.type + ".png";
				break;

			case 'filter':
				src = "/images/icon/" + this.props.type + ".png";
				break;
			case 'back':
				src = "/images/icon/" + this.props.type + ".png";
				break;

			case 'hidden':
				visibility='hidden';
				break;

			case 'none':
				display='none';
				break;


			default:
				src = this.props.src;
				break;
		}

		let styleSize;
		switch (this.props.size) {
			case 'big':
				styleSize = styleSizeBig;
				break;

			case 'small':
				styleSize = styleSizeSmall;
				break;

			default:
				styleSize = styleSizeNormal;
				break;

		}


		return (
			<div style={{visibility: visibility , display:display}} onClick={this.props.onClick}>
				<img src={src} alt="" style={styleSize}/>
			</div>
		);
	}

}

let styleSizeBig = {
	width: Size.IconSizeBig,
	height: Size.IconSizeBig,
	margin: 'auto 0',//垂直居中
};
let styleSizeNormal = {
	width: Size.IconSizeNormal,
	height: Size.IconSizeNormal,
	margin: 'auto 0',
};
let styleSizeSmall = {
	width: Size.IconSizeSmall,
	height: Size.IconSizeSmall,
	margin: 'auto 0',
};
