import React from 'react';
import {
  ExportOutlined,
  EyeOutlined,
  LeftOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {Button, Dropdown, Menu, Space, Tooltip, Typography} from 'antd';
import NewEventButton from '../../NewEventButton';

import TimeZoneSelect from '../../TimeZoneSelect';
import ScheduleViewSelect from '../ScheduleViewSelect';

import './headerToolsPanel.css';

const {Text} = Typography;

const HeaderToolsPanel = () => {
  const moreMenu = (
    <Menu className="moreMenu">
      <Menu.Item icon={<ExportOutlined />}>
        <a href="/"> Export </a>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        <a href="/"> Settings </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<QuestionCircleOutlined />}>
        <a href="/"> Help </a>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={moreMenu}>
        <Button
          style={{
            border: 'none',
            padding: 0,
          }}
        >
          <MoreOutlined
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
    <div className="header-tools_panel">
      <Space>
        <NewEventButton />
        <Tooltip title="previous">
          <Button className="button-center-icon button-no-border" icon={<LeftOutlined />} />
        </Tooltip>

        <Tooltip title="next">
          <Button className="button-center-icon button-no-border" icon={<RightOutlined />} />
        </Tooltip>

        <Text strong>september 2020</Text>

        <Tooltip title="time zone">
          <TimeZoneSelect />
        </Tooltip>
      </Space>

      <Space>
        <ScheduleViewSelect />
        <Tooltip title="for the visually impaired">
          <Button className="button-center-icon button-no-border">
            <EyeOutlined
              style={{
                fontSize: 20,
                verticalAlign: 'top',
              }}
            />
          </Button>
        </Tooltip>
        <DropdownMenu />
      </Space>
    </div>
  );
};

export default HeaderToolsPanel;