import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import {NavLink} from "react-router-dom"; // 利用 NavLink 组件进行路由跳转

import {HeaderWrapper} from './style'

import {Layout, Menu, Breadcrumb} from "antd";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";


const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

function Home(props) {
  const {route} = props;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="todolist-wrapper">
      <Header className="header">
        <HeaderWrapper>
          HeaderWrapper
        </HeaderWrapper>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{height: "100%", borderRight: 0}}
          >
            <SubMenu key="sub1" icon={<UserOutlined/>} title="分类">
              {/*分类*/}
              <Menu.Item key="sub1-1">
                <NavLink to="/app/all" activeClassName="selected">
                  <span>所有</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub1-2">
                <NavLink to="/app/today" activeClassName="selected">
                  <span>今天</span>
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="标签">
              <Menu.Item key="5">公司</Menu.Item>
              <Menu.Item key="6">家庭</Menu.Item>
              <Menu.Item key="7">休闲</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined/>}
              title="四象限"
            >
              <Menu.Item key="9">重要且紧急</Menu.Item>
              <Menu.Item key="10">重要不紧急</Menu.Item>
              <Menu.Item key="11">不重要紧急</Menu.Item>
              <Menu.Item key="12">不重要不紧急</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{padding: "0 24px 24px"}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              height: "100%",
              overflow: "hidden",
            }}
          >
            {renderRoutes(route.routes)}
          </Content>
        </Layout>
      </Layout>
      <Footer>
        footer
      </Footer>
    </Layout>
  );
}

export default React.memo(Home);
