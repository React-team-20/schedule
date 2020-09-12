import { EditOutlined, EyeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';

import './headerTitle.css';
import logoImage from './logo-rsschool3.png';

const avatarUrl = 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4';

const HeaderTitle = () => {
  const myProfileMenu = (
    <Menu className="profile-menu">
      <Menu.Item icon={<EyeOutlined />}>
        <a href="/"> View </a>
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        <a href="/"> Edit </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />}>
        <a href="/"> Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-title">
      <a href="/" className="logo">
        <img src={logoImage} alt="Rolling Scopes School Logo" />
      </a>
      <div className="container-title">
        <h2 className="title">Schedule</h2>
        <span className="subtitle"> RSS React 2020 Q3 </span>
      </div>

      <Dropdown overlay={myProfileMenu} placement="bottomLeft">
        <Button type="dashed" size="large" icon={<Avatar src={avatarUrl} />}>
          My Profile
        </Button>
      </Dropdown>
    </div>
  );
};

export default HeaderTitle;
