import React, {Component} from 'react';
import {Table} from 'antd';
import MyIcon from '../Tools/MyIcon';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class LabelListTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			labels: [],
			loading: true,
			selectedRowKeys:[],
		};
	}

	componentWillMount() {
		io.socket.get('/label/select/name,icon', {}, (labels, res) => {
			this.setState({
        labels: labels,
				loading: false,
			});
		});
	}

	deleteOne(labelId){
		io.socket.delete('/label/'+labelId);
		let labels = this.state.labels;
		let len = labels.length;
		for(let i = 0 ; i<len ; i++){
			if(labels[i].id === labelId){
				labels.splice(i,1);
				this.setState({
          labels:labels,
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
				title: '名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, label) => (
					<div style={{display:'flex'}}>
						<MyButton link={"/admin/label/"+label.id}>编辑</MyButton>
						<MyButton onClick={()=>this.deleteOne(label.id)} disabled={label.name == "新上平台"||label.name=="热门"}>删除</MyButton>
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
				<MyButton link='/admin/label/0'>添加</MyButton>
			</div>
		);

		return (
			<Table
				scroll={{x: true}}
				title={() => title}
				rowSelection={rowSelection}
				columns={columns}
				rowKey={record => record.id}
				dataSource={this.state.labels}
				loading={this.state.loading}
			/>
		);
	}

}
