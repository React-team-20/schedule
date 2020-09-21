import {Form, Input} from 'antd';
import React from 'react';
import './description-url-field.css';

const DescriptionUrlField = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="description-url" label="Link">
      <Input name="description-url" style={{width: '100%'}} placeholder="Please enter url" />
    </Form.Item>
  );
};

export default DescriptionUrlField;
