import {Form, Input} from 'antd';
import React from 'react';
import './screen-url-field.css';

const ScreenUrlField = () => {
  return (
    <Form.Item name="screen" label="Screen">
      <Input name="screen" style={{width: '100%'}} placeholder="Please enter screen url" />
    </Form.Item>
  );
};

export default ScreenUrlField;
