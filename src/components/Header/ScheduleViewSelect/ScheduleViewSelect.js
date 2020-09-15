import {CalendarOutlined, TableOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Radio, Tooltip} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeScheduleView} from '../../../actions';
import './schedule-view-select.css';

const ScheduleViewSelect = () => {
  const dispatch = useDispatch();
  const view = useSelector(state => state.app.scheduleView);
  function handleChange(event) {
    const value = event.target.value;
    localStorage.setItem('scheduleView', value);
    dispatch(changeScheduleView(value));
  }

  return (
    <Radio.Group value={view} onChange={handleChange}>
      <Tooltip title="table view">
        <Radio.Button className="button-icon-edit" value="table">
          <TableOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="list view">
        <Radio.Button className="button-icon-edit" value="list">
          <UnorderedListOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="list calendar">
        <Radio.Button className="button-icon-edit" value="calendar">
          <CalendarOutlined />
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  );
};

export default ScheduleViewSelect;
