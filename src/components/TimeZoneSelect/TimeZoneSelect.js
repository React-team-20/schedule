import React from 'react';
import {Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {changeTimezone} from '../../actions';
import {TIMEZONES} from '../../constants/timezones';

import './time-zone-select.css';

const {Option} = Select;

const TimeZoneSelect = () => {
  const selectOptions = TIMEZONES.map(timezone => (
    <Option value={timezone} key={timezone}>
      {timezone}
    </Option>
  ));
  const dispatch = useDispatch();
  const timezone = useSelector(state => state.app.timezone);
  function handleChange(value) {
    localStorage.setItem('timezone', value);
    dispatch(changeTimezone(value));
  }

  return (
    <Select defaultValue={timezone} style={{width: 150}} bordered={false} onChange={handleChange}>
      {selectOptions}
    </Select>
  );
};

export default TimeZoneSelect;
