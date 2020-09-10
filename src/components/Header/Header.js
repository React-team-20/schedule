import React from 'react';
import {
  EllipsisOutlined,
  UserOutlined,
  EyeOutlined,
  LogoutOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  Button,
  Dropdown,
  Menu
} from 'antd';
import NewEventButton from '../NewEventButton';
import ScheduleViewSelect from '../ScheduleViewSelect';
import Avatar from 'antd/lib/avatar/avatar';
import './header.css';
import logoImage from './logo-rsschool3.png';

const Header = () => {
  const myProfileMenu = (
    <Menu>
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
  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={myProfileMenu}>
        <Button
          style={{
            border: 'none',
            padding: 0,
          }}
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: 'top',
            }}
          />
        </Button>
      </Dropdown>
    );
  };


  return (
    <PageHeader
      className="site-page-header"
      title="Schedule"
      subTitle="RS 2020 Q1"
      ghost
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">Primary</Button>,
        <DropdownMenu key="more" />,
        <Dropdown overlay={myProfileMenu} placement="bottomLeft">
          <Button key="4" type="dashed" size="large" icon={<Avatar src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" />} >
            My Profile
          </Button>
        </Dropdown >
      ]}
      avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    >
      <ScheduleViewSelect />

      <NewEventButton />
    </PageHeader >
  );
};

export default Header;
