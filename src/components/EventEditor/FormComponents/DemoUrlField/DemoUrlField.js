import {Form, Input} from 'antd';
import React from 'react';
import './demo-url-field.css';

const DemoUrlField = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="demo-url" label="Demo Url">
      <Input name="demo-url" style={{width: '100%'}} placeholder="Please enter url" />
    </Form.Item>
  );
};

export default DemoUrlField;
