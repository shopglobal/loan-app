import React, {Component} from 'react';
import {Table} from 'antd';
import MyIcon from '../Tools/MyIcon';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class StrategyListTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			strategies: [],
			loading: true,
			selectedRowKeys:[],
		};
	}

	componentWillMount() {
		io.socket.get('/strategy/sort/updatedAt/desc', {}, (strategies, res) => {
			this.setState({
        strategies: strategies,
				loading: false,
			});
		});
	}

	deleteOne(strategyId){
		io.socket.delete('/platform/'+strategyId);
		let strategies = this.state.strategies;
		let len = strategies.length;
		for(let i = 0 ; i<len ; i++){
			if(strategies[i].id === strategyId){
        strategies.splice(i,1);
				this.setState({
          strategies:strategies,
        });
				return;
			}
		}
	}

	deleteSome(){

	}

	render() {
		const columns = [
			{
				title: 'icon',
				dataIndex: 'icon',
				key: 'icon',
				render: url => <MyIcon src={url}/>
			}, {
				title: '标题',
				dataIndex: 'title',
				key: 'title',
			}, {
				title: '阅读量',
				dataIndex: 'readQuantity',
				key: 'readQuantity',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, strategy) => (
					<div style={{display:'flex'}}>
						<MyButton link={"/admin/strategy/"+strategy.id}>编辑</MyButton>
						<MyButton onClick={()=>this.deleteOne(strategy.id)}>删除</MyButton>
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
				<MyButton link='/admin/strategy/0'>添加</MyButton>
			</div>
		);

		return (
			<Table
				scroll={{x: true}}
				title={() => title}
				rowSelection={rowSelection}
				columns={columns}
				rowKey={record => record.id}
				dataSource={this.state.strategies}
				loading={this.state.loading}
			/>
		);
	}

}
