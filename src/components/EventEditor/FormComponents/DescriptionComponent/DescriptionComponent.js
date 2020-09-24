import {Form, Input} from 'antd';
import React from 'react';
import './description-component.css';

const DescriptionComponent = () => {
  return (
    <Form.Item
      name="description"
      label="Description"
      rules={[
        {
          type: 'string',
          transform(value) {
            return value.trim();
          },
        },
      ]}
    >
      <Input.TextArea name="description" rows={4} placeholder="Please add description" />
    </Form.Item>
  );
};

export default DescriptionComponent;
