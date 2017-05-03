import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import MyLink from '../../Tools/MyLink';
import Size from '../style/Size';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class AdTab extends Component {


	render() {
		return (
			<Menu
				style={{
					width: Size.MenuWidth,
					height: Size.MenuHeight
				}}
				defaultOpenKeys={['1','2','5']}
				mode="inline"
			>
				<SubMenu key="1" title={<span><Icon type="mail"/><span>贷款平台</span></span>}>
					<Menu.Item key="1-1"><MyLink to="/admin/platforms">平台管理</MyLink></Menu.Item>
					<Menu.Item key="1-2"><MyLink to="/admin/hotplatform">热门贷款平台</MyLink></Menu.Item>
				</SubMenu>
				<SubMenu key="2" title={<span><Icon type="appstore"/><span>轮播广告</span></span>}>
					<Menu.Item key="2-1">广告管理</Menu.Item>
					<Menu.Item key="2-2">首页</Menu.Item>
					<Menu.Item key="2-3">攻略指导</Menu.Item>
				</SubMenu>
				<Menu.Item key="3">标签</Menu.Item>
				<Menu.Item key="4">系统设置</Menu.Item>
				<SubMenu key="5" title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
					<Menu.Item key="9">Option 9</Menu.Item>
					<Menu.Item key="10">Option 10</Menu.Item>
					<Menu.Item key="11">Option 11</Menu.Item>
					<Menu.Item key="12">Option 12</Menu.Item>
				</SubMenu>
			</Menu>);
	}
}
