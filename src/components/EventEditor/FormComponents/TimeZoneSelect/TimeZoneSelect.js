import {Form, Select} from 'antd';
import React from 'react';
import {TIMEZONES} from '../../../../constants/timezones';
import './time-zone-select.css';

const {Option} = Select;

const TimeZoneSelect = ({tz}) => {
  const selectOptions = TIMEZONES.map(timezone => (
    <Option value={timezone} key={timezone}>
      {timezone}
    </Option>
  ));

  return (
    <Form.Item initialValue={tz} name="timezone" label="Timezone">
      <Select bordered style={{width: '100%'}}>
        {selectOptions}
      </Select>
    </Form.Item>
  );
};

export default TimeZoneSelect;
