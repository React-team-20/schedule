import React from 'react';
import {Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {changeUserRole} from '../../../actions';
import {USER_ROLES_ARRAY} from '../../../constants/user-role';

import './role-select.css';

const {Option} = Select;

const TimeZoneSelect = () => {
  const selectOptions = USER_ROLES_ARRAY.map(role => (
    <Option value={role} key={role}>
      {role}
    </Option>
  ));
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.app.userRole);
  function handleChange(value) {
    localStorage.setItem('userRole', value);
    dispatch(changeUserRole(value));
  }

  return (
    <Select defaultValue={userRole} style={{width: 100}} bordered={false} onChange={handleChange}>
      {selectOptions}
    </Select>
  );
};

export default TimeZoneSelect;
