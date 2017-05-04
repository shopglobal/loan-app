import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import MyLink from '../../Tools/MyLink';
import Size from '../style/Size';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MyMenu extends Component {

  componentWillMount(){

  }

	render() {
		return (
			<Menu
				style={{
					width: Size.MenuWidth,
					height: Size.MenuHeight
				}}
				defaultOpenKeys={['1']}
				mode="inline"
			>
				<SubMenu key="1" title={<span><Icon type="mail"/><span>贷款平台</span></span>}>
					<Menu.Item key="1-1"><MyLink to="/admin/platforms">平台管理</MyLink></Menu.Item>
					<Menu.Item key="1-2"><MyLink to="/admin/hotplatform">热门贷款平台</MyLink></Menu.Item>
				</SubMenu>

        <Menu.Item key="2"><MyLink to="/admin/ads">广告管理</MyLink></Menu.Item>
        <Menu.Item key="3"><MyLink to="/admin/labels">标签管理</MyLink></Menu.Item>


				<Menu.Item key="4"><MyLink to="/admin/setting">系统设置</MyLink></Menu.Item>
				<Menu.Item key="5"><MyLink to="/admin/strategies">借款攻略</MyLink></Menu.Item>
				<Menu.Item key="6"><MyLink to="/admin/commonquestions">常见问题</MyLink></Menu.Item>
			</Menu>);
	}
}
