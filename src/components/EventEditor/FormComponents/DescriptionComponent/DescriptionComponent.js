import {Form, Input} from 'antd';
import React from 'react';
import './description-component.css';

const DescriptionComponent = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="description" label="Description">
      <Input.TextArea name="description" rows={4} placeholder="Please add description" />
    </Form.Item>
  );
};

export default DescriptionComponent;
