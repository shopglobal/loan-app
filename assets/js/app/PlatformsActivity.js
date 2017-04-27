import React, {Component} from "react";
import MyPicker from "./component/MyPicker";
import {ListView} from "antd-mobile";
import PlatformListItem from "./component/PlatformListItem";
import MyNavBar from "./component/MyNavBar";
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');
import Size from './style/Size';

export default class PlatformsActivity extends Component {

	constructor(props) {
		super(props);

		this.state = {
			labelsAndMoneyFilter: oldFilter,
			platforms: [],
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}).cloneWithRows([]),
		}
	}

	initParams() {
		//进入平台列表可能带参数，初始化参数
		//label是筛选标签id，默认是0，代表全部
		//min和max表示筛选金额
		let label = parseInt(this.props.params.arg1);
		let min = parseInt(this.props.params.arg1);
		let max = parseInt(this.props.params.arg2);
		let mode = this.props.params.mode;
		if (mode === undefined) {
			label = 0;
			min = 0;
			max = MAX;
		} else if (mode === 'label') {
			min = 0;
			max = MAX;
		} else if (mode === 'money') {
			label = 0;
		}
		return [label, min, max];
	}

	formatLabel(labels, res) {
		let formatLabels = oldFilter[0];
		labels.map((label) => {
			formatLabels.push({
				label: label.name,
				value: label.id,
			});
		});

		oldFilter[0] = formatLabels;

		this.setState({
			labelsAndMoneyFilter: oldFilter,
		});
	}

	componentWillMount() {
		let params = this.initParams();
		let savePlatforms = (platforms, res) => {
			this.setState({
				platforms: this.state.platforms.concat(platforms),
			});
			this.filter(params[0], params[1], params[2]);
		};
		io.socket.get('/platform', {}, (platforms, res) => savePlatforms(platforms, res));
		io.socket.get('/label/noPlatforms', {}, (labels, res) => this.formatLabel(labels, res));
	}

	//筛选函数
	filter(labelId, min, max) {

		let filterLabel = (platform, labelId) => {
			let labels = platform.labels;
			let len = labels.length;
			for (var i = 0; i < len; i++) {
				if (labels[i].id === labelId) {
					return true;
				}
			}

			return false;
		}

		let tempPlatforms = [];

		//let labelId = this.state.label;
		//let min = this.state.min;
		//let max = this.state.max;

		var myFilter = undefined;

		//labelID=0 代表所有标签，不用筛选标签，只筛选钱
		if (labelId === 0 && min === 0 && max === MAX) {
			//如果也不筛选钱,就是所有平台
		} else if (labelId === 0) {
			myFilter = (platform) => {
				return !(platform.minLimit > max || platform.maxLimit < min)
			};
		} else if (min === 0 && max === MAX) {
			//只筛标签
			myFilter = (platform) => {
				return filterLabel(platform, labelId)
			};
		} else {
			myFilter = (platform) => {
				return (filterLabel(platform, labelId)) && (!(platform.minLimit > max || platform.maxLimit < min))
			};
		}

		if (myFilter === undefined) {
			tempPlatforms = this.state.platforms;
		} else {
			this.state.platforms.map((platform) => {
				if (myFilter(platform)) {
					tempPlatforms.push(platform);
				}
			});
		}

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(tempPlatforms)
		});
	}

	initRowView(platform) {
		let link = "/loan/"+platform.id;
		return <PlatformListItem key={platform.id} data={platform} link={link}/>
	}


	pickerChanged(value) {
		if (value.length === 0) {
			this.filter(0, 0, MAX);
			return;
		}
		let money = value[1].split('-').map((v) => {
			return parseInt(v);
		});
		this.setState({
			label: value[0],
			min: money[0],
			max: money[1],
		});
		this.filter(value[0], money[0], money[1]);
	}

	render() {

		return (
			<div>
				<MyNavBar onLeftClick={() => alert('leftClick')} rightIcon='filter'
				          onRightClick={() => alert('rightClick')}>贷款平台</MyNavBar>
				<MyPicker
					data={this.state.labelsAndMoneyFilter}
					cols='2'
					onChange={v => this.pickerChanged(v)}
				>筛选</MyPicker>
				<ListView
					style={styleListView}
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this.initRowView(rowData)}/>

			</div>);
	}
}

//如要修改这个最大值，一定去MyPicker中修改
const MAX = 1000000;
const oldFilter = [
	[
		{
			label: '所有平台',
			value: 0,
		},
	], [
		{
			label: '金额不限',
			value: '0-' + MAX,
		},
		{
			label: '1千以下',
			value: '0-1000',
		},
		{
			label: '1千-1万',
			value: '1000-10000',
		},
		{
			label: '1万-5万',
			value: '10000-50000',
		},
		{
			label: '5万以上',
			value: '50000-' + MAX,
		}
	],
];

let styleListView = {
	height: Size.ScreenHeight - Size.NavHeight - Size.NormalListItemHeight,
	overflow: 'scroll'
}

