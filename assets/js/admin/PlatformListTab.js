import React, {Component} from 'react';
import {Table} from 'antd';
import MyIcon from '../Tools/MyIcon';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class PlatformListTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			platforms: [],
			loading: true,
			selectedRowKeys:[],
		};
	}

	componentWillMount() {
		io.socket.get('/platform', {}, (platforms, res) => {
			this.setState({
				platforms: platforms,
				loading: false,
			});
		});
	}

	deleteOne(platformId){
		io.socket.delete('/platform/'+platformId);
		let platforms = this.state.platforms;
		let len = platforms.length;
		for(let i = 0 ; i<len ; i++){
			if(platforms[i].id === platformId){
				this.state.platforms.splice(i,1);
				return;
			}
		}
	}

	deleteSome(){
		let selectedKeys = this.state.selectedRowKeys;

	}

	render() {
		const columns = [
			{
				title: 'logo',
				dataIndex: 'logo',
				key: 'logo',
				render: url => <MyIcon src={url}/>
			}, {
				title: '名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '宣传语',
				dataIndex: 'slogan',
				key: 'slogan',
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, platform) => (
					<div style={{display:'flex'}}>
						<MyButton link={"/admin/platform/"+platform.id}>编辑</MyButton>
						<MyButton onClick={()=>this.deleteOne(platform.id)}>删除</MyButton>
					</div>),
			}
		];

		// rowSelection object indicates the need for row selection
		const rowSelection = {
			//仅包括选中的项
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys:selectedRowKeys,
				});
				console.log('onChange');
				console.log(selectedRowKeys, selectedRows);
			},
			//selected指是选中还是取消,record指操作的那条数据
			onSelect: (record, selected, selectedRows) => {
				console.log('onSelect');
				console.log(record, selected, selectedRows);
			},
			onSelectAll: (selected, selectedRows, changeRows) => {
				console.log('onSelectAll');
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User',    // Column configuration not to be checked
			}),
		};

		const title = (
			<div style={{display: 'flex',}}>
				<MyButton onClick={()=>this.deleteSome()}>删除</MyButton>
				<MyButton link='/admin/platform/0'>添加</MyButton>
			</div>
		);

		return (
			<Table
				scroll={{x: true}}
				title={() => title}
				rowSelection={rowSelection}
				columns={columns}
				rowKey={record => record.id}
				dataSource={this.state.platforms}
				loading={this.state.loading}
			/>
		);
	}

}
