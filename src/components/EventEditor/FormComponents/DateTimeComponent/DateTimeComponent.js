import {DatePicker, Form} from 'antd';
import React from 'react';
import './date-time-component.css';

const DateTimeComponent = ({onChangeTimeAndDate, deadline}) => {
  return (
    <Form.Item
      name={`${deadline ? 'deadline-' : ''}date`}
      label={`Date and time${deadline ? ' deadline' : ''}`}
      rules={[
        {
          required: true,
          message: `Please choose the Date and Time${deadline ? ' for deadline' : ''}`,
        },
      ]}
    >
      <DatePicker
        name={`${deadline ? 'deadline-' : ''}date`}
        style={{width: '100%'}}
        showTime={{format: 'HH:mm'}}
        format="YYYY-MM-DD HH:mm"
        onChange={onChangeTimeAndDate}
      />
    </Form.Item>
  );
};

export default DateTimeComponent;
