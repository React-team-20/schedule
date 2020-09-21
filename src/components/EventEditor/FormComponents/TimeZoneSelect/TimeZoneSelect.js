import {Form, Select} from 'antd';
import React from 'react';
import {DEFAULT_TIMEZONE, TIMEZONES} from '../../../../constants/timezones';
import './time-zone-select.css';

const {Option} = Select;

const TimeZoneSelect = ({onChangeTimezone}) => {
  const selectOptions = TIMEZONES.map(timezone => (
    <Option value={timezone} key={timezone}>
      {timezone}
    </Option>
  ));

  return (
    <Form.Item name="timezone" label="Timezone">
      <Select
        defaultValue={DEFAULT_TIMEZONE}
        bordered
        style={{width: '100%'}}
        onChange={onChangeTimezone}
      >
        {selectOptions}
      </Select>
    </Form.Item>
  );
};

export default TimeZoneSelect;
