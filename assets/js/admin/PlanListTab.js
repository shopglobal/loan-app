import React, {Component} from 'react';
import {Table} from 'antd';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class PlanListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      loading: true,
      selectedRowKeys: [],
    };
  }

  componentWillMount() {
    io.socket.get('/plan/select/rate,time', {}, (plans, res) => {
      this.setState({
        plans: plans,
        loading: false,
      });
    });
  }

  deleteOne(questionId) {
    io.socket.delete('/paln/' + questionId);
    let plans = this.state.plans;
    let len = plans.length;
    for (let i = 0; i < len; i++) {
      if (plans[i].id === questionId) {
        plans.splice(i, 1);
        this.setState({
          plans:plans,
        });
        return;
      }
    }
  }

  deleteSome() {

  }

  render() {
    const columns = [
      {
        title: '分期时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '利率',
        dataIndex: 'rate',
        key: 'order',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, plan) => (
          <div style={{display: 'flex'}}>
            <MyButton link={"/admin/plan/" + plan.id}>编辑</MyButton>
            <MyButton onClick={() => this.deleteOne(plan.id)}>删除</MyButton>
          </div>),
      }
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      //仅包括选中的项
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
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
        <MyButton onClick={() => this.deleteSome()}>删除</MyButton>
        <MyButton link='/admin/plan/0'>添加</MyButton>
      </div>
    );

    return (
      <Table
        scroll={{x: true}}
        title={() => title}
        rowSelection={rowSelection}
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.plans}
        loading={this.state.loading}
      />
    );
  }

}
