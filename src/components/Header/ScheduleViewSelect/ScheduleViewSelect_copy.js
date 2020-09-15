import {Select} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeScheduleView} from '../../../actions';
import './schedule-view-select.css';

const {Option} = Select;

const ScheduleViewSelect = () => {
  const dispatch = useDispatch();
  const view = useSelector(state => state.app.scheduleView);
  function handleChange(value) {
    localStorage.setItem('scheduleView', value);
    dispatch(changeScheduleView(value));
  }

  return (
    <Select defaultValue={view} style={{width: 80}} onChange={handleChange}>
      <Option value="table">Table</Option>
      <Option value="list">List</Option>
      <Option value="calendar">Сalendar</Option>
    </Select>
  );
};

export default ScheduleViewSelect;
