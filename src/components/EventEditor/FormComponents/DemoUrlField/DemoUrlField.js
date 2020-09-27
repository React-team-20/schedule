import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './demo-url-field.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const DemoUrlField = () => {
  return (
    <Form.Item
      name="demo-url"
      label="Demo Url"
      rules={[
        {
          type: 'url',
          message: `It doesn't look like a link! Please input url!`,
        },
      ]}
    >
      <InputDeb name="demo-url" allowClear style={{width: '100%'}} placeholder="Please enter url" />
    </Form.Item>
  );
};

export default DemoUrlField;
