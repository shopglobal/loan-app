import React, {Component} from 'react';
import {Table} from 'antd';
import MyIcon from '../Tools/MyIcon';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class AdListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ads: [],
      loading: true,
      selectedRowKeys: [],
    };
  }

  componentWillMount() {
    io.socket.get('/ad/select/title,location', {}, (ads, res) => {
      this.setState({
        ads: ads,
        loading: false,
      });
    });
  }

  deleteOne(adId) {
    io.socket.delete('/ad/' + adId);
    let ads = this.state.ads;
    let len = ads.length;
    for (let i = 0; i < len; i++) {
      if (ads[i].id === adId) {
        ads.splice(i, 1);
        this.setState({
          ads:ads,
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
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '显示位置',
        dataIndex: 'location',
        key: 'location',
        render: location => {
          switch (location) {
            case 0:
              return "未使用";
            case 1:
              return "首页";
            case 2:
              return "攻略指南";
          }
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, ad) => (
          <div style={{display: 'flex'}}>
            <MyButton link={"/admin/ad/" + ad.id}>编辑</MyButton>
            <MyButton onClick={() => this.deleteOne(ad.id)}>删除</MyButton>
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
        <MyButton link='/admin/ad/0'>添加</MyButton>
      </div>
    );

    return (
      <Table
        scroll={{x: true}}
        title={() => title}
        rowSelection={rowSelection}
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.ads}
        loading={this.state.loading}
      />
    );
  }

}
