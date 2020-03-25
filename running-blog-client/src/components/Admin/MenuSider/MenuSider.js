import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={[location.pathname]}
        defaultSelectedKeys={["/admin/users"]}
      >
        {/* <Menu.Item key="/admin">
          <Link to="/admin">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/admin/users">
          <Link to="/admin/users">
            <Icon type="user" />
            <span className="nac-text">Users</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu">
          <Link to="/admin/menu">
            <Icon type="menu" />
            <span className="nac-text">Menu</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/blog">
          <Link to="/admin/blog">
            <Icon type="message" />
            <span className="nac-text">Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
