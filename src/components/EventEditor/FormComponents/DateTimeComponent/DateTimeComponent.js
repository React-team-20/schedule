import {DatePicker, Form} from 'antd';
import React from 'react';
import './date-time-component.css';

const DateTimeComponent = ({deadline}) => {
  return (
    <Form.Item
      name={`date${deadline ? 'Deadline' : ''}`}
      label={`Date and time${deadline ? ' deadline' : ''}`}
      rules={[
        {
          required: true,
          message: `Please choose the Date and Time${deadline ? ' for deadline' : ''}`,
        },
      ]}
    >
      <DatePicker
        allowClear={false}
        name={`date${deadline ? 'Deadline' : ''}`}
        style={{width: '100%'}}
        showTime={{format: 'HH:mm'}}
        format="YYYY-MM-DD HH:mm"
      />
    </Form.Item>
  );
};

export default DateTimeComponent;
