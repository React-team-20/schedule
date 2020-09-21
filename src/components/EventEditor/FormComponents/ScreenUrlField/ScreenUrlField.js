import {Form, Input} from 'antd';
import React from 'react';
import './screen-url-field.css';

const ScreenUrlField = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="screen" label="Screen">
      <Input name="screen" style={{width: '100%'}} placeholder="Please enter screen url" />
    </Form.Item>
  );
};

export default ScreenUrlField;
