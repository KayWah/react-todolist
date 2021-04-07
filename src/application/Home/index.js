import React, { useState, useEffect } from "react";

import { renderRoutes } from "react-router-config";
// import { NavLink, } from "react-router-dom"; // 利用 NavLink 组件进行路由跳转

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

import Todolist from "../../application/Todolist";

import { HeaderWrapper, Title } from './style'

import PermissionMenu from "../../components/PermissionMenu";

import { Layout, Menu, Breadcrumb } from "antd";

import logo from './../../logo.svg';

import {indexDBSuccess, readAll} from '../../api/indexDB'


import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";


const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function Home(props) {
  const { route } = props;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const MenuArray = [{
    name: '1231231'
  }]

  // useEffect(() => {
  //   setTimeout(() => {
  //     readAll()      
  //   }, 1000);
  // },[])

  function add(db) {
    try {
      const time = new Date().getTime()
      var todolistDB = db.transaction(['todolist'], 'readwrite')
        .objectStore('todolist')
        .add({ title: '今天学习了吗', status: false, create_time_format: time });

      todolistDB.onsuccess = function (event) {
        console.log('数据写入成功');
      };

      todolistDB.onerror = function (event) {
        console.log('数据写入失败');
      }
    } catch (error) {
      console.log(error);
    }

  }
  // indexDBSuccess(add)

  // add();


  return (
    <Layout className="todolist-wrapper">
      <Header className="header">
        <HeaderWrapper>
          {/* <logo/> */}
          <img src={logo} className="logo" />

          <Title>HeaderWrapper</Title>
        </HeaderWrapper>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="分类">
              <Menu.Item key="sub1-1">
                <NavLink
                  replace={true}
                  to={{ pathname: "/app/all" }}
                  activeClassName="selected">
                  <span>所有</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub1-2">
                <NavLink
                  replace={true}
                  to={{ pathname: "/app/today" }}
                  activeClassName="selected">
                  <span>今天</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub1-3">
                <NavLink
                  replace={true}
                  to={{ pathname: "/app/history" }}
                  activeClassName="selected">
                  <span>历史</span>
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="标签">
              <Menu.Item key="5">公司</Menu.Item>
              <Menu.Item key="6">家庭</Menu.Item>
              <Menu.Item key="7">休闲</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="四象限"
            >
              <Menu.Item key="9">重要且紧急</Menu.Item>
              <Menu.Item key="10">重要不紧急</Menu.Item>
              <Menu.Item key="11">不重要紧急</Menu.Item>
              <Menu.Item key="12">不重要不紧急</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              height: "100%",
              overflowY: 'auto'
            }}
          >
            {/*{renderRoutes(route.routes)}*/}
            <Switch>
              <Route path="/app/:id" component={Todolist} />
              {/*<Route path="/app/today" component={Todolist}/>*/}
              <Redirect to="/home" />
            </Switch>
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
