import React, {Component} from 'react';
import Size from '../app/style/Size';
import MyLink from "./MyLink";

export default class MyIcon extends Component {

	render() {
		//switch (this.props.type)
		let src = "/images/icon/icon.png";
		let visibility = undefined;
		let display = undefined;

		switch (this.props.type) {

			case 'icon':
				src='/images/icon/icon.png';
				break;
			case 'again':
				src='/images/icon/again.png';
				break;

			case 'clean':
				src='/images/icon/clean.png';
				break;

			case 'close':
				src='/images/icon/close.png';
				break;

			case 'about':
				src='/images/icon/about.png';
				break;

			case 'discovery_selected':
				src='/images/icon/discovery_selected.png';
				break;

			case 'home':
				src='/images/icon/home.png';
				break;

			case 'home_selected':
				src='/images/icon/home_selected.png';
				break;

			case 'discovery':
				src='/images/icon/discovery.png';
				break;

			case 'kefu':
				src = "/images/icon/kefu.png";
				break;
			case 'daikuandaquan':
				src = "/images/icon/daikuandaquan.png";
				break;
			case 'order':
				src = "/images/icon/right.png";
				break;
			case 'strategy':
				src = "/images/icon/strategy.png";
				break;
			case 'worth':
				src = "/images/icon/worth.png";
				break;
			case 'user':
				src = "/images/icon/user.png";
				break;

			case 'right':
				src = "/images/icon/right.png";
				break;

			case 'filter':
				src = "/images/icon/filter.png";
				break;
			case 'back':
				src = "/images/icon/back.png";
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
