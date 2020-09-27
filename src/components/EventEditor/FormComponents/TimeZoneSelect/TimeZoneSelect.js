import {Form, Select} from 'antd';
import React from 'react';
import {DEFAULT_TIMEZONE, TIMEZONES} from '../../../../constants/timezones';
import './time-zone-select.css';

const {Option} = Select;

const TimeZoneSelect = () => {
  const selectOptions = TIMEZONES.map(timezone => (
    <Option value={timezone} key={timezone}>
      {timezone}
    </Option>
  ));

  return (
    <Form.Item
      initialValue={DEFAULT_TIMEZONE}
      name="timezone"
      label="Timezone"
      rules={[
        {
          required: true,
          message: 'Please input timezone.',
        },
      ]}
    >
      <Select bordered style={{width: '100%'}}>
        {selectOptions}
      </Select>
    </Form.Item>
  );
};

export default TimeZoneSelect;
