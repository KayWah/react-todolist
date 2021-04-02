import React from "react";

import {Layout, Menu, Breadcrumb} from "antd";

import {NavLink} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const {SubMenu} = Menu;
const {Sider} = Layout;

function PermissionMenu(props) {
  const {menu} = props
  console.log(menu);
  menu.map(item => {
    console.log(item);
  })
  return (
    <SubMenu key="sub11" icon={<UserOutlined/>} title="分类">
      {
        menu.map(item => {
          console.log(item);
          return (
            <Menu.Item key="sub11-1">
              <NavLink to="/app/all" activeClassName="selected">
                <span>{item.name}1-</span>
              </NavLink>
            </Menu.Item>
          )
        })
      }
    </SubMenu>
  )
}

export default React.memo(PermissionMenu)