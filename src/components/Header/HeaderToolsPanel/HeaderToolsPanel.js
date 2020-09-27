import {
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {Button, Dropdown, Menu, Space, Tooltip} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {switchVisibilityHiddenEvents} from '../../../actions';
import NewEventButton from '../../NewEventButton';
import TimeZoneSelect from '../../TimeZoneSelect';
import ScheduleViewSelect from '../ScheduleViewSelect';
import ExportToGoogle from '../ExportToGoogle';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import './headerToolsPanel.css';

const HeaderToolsPanel = () => {
  const {userRole, isShowPreview} = useSelector(state => state.app);
  const dispatch = useDispatch();
  const {visibilityHiddenEvents} = useSelector(state => state.app);
  const handlerVisibilityOfHiddenEvents = () => {
    dispatch(switchVisibilityHiddenEvents());
    localStorage.setItem('visibilityHiddenEvents', visibilityHiddenEvents);
  };
  const screen = {
    height: 10,
    width: (10 * window.innerWidth) / window.innerHeight,
  }
  const exportSchedule = () => {
    const input = document.getElementById('export-container');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [screen.width, screen.height],
      });
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('schedule.pdf');
    });
  };

  const moreMenu = (
    <Menu className="moreMenu">
      <Menu.Item icon={<ExportOutlined />}>
        <span onClick={exportSchedule}> Export </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<QuestionCircleOutlined />}>
        <a href="https://github.com/React-team-20/schedule/tree/documentation#%D0%B4%D0%B5%D0%BC%D0%BE">
          Help
        </a>
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
      <Space className="header-tools_panel-left">
        {userRole !== 'student' && !isShowPreview && <NewEventButton />}
        <Tooltip title="time zone">
          <TimeZoneSelect />
        </Tooltip>
      </Space>

      <Space className="header-tools_panel-right">
        <ScheduleViewSelect />
        <Tooltip title="visibility control of hidden events">
          <Button
            className="button-center-icon button-no-border"
            onClick={handlerVisibilityOfHiddenEvents}
          >
            {visibilityHiddenEvents ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </Button>
        </Tooltip>
        <ExportToGoogle />
        <DropdownMenu />
      </Space>
    </div>
  );
};

export default HeaderToolsPanel;
