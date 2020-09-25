import {Form, Input} from 'antd';
import React from 'react';
import './topic-field.css';

const TopicField = () => {
  return (
    <Form.Item
      name="topic"
      label="Topic"
      rules={[
        {
          required: true,
          type: 'string',
          max: 80,
          transform(value) {
            return value.trim();
          },
          message: 'Please enter event topic. Max length of string 80 characters.',
        },
      ]}
    >
      <Input name="topic" allowClear placeholder="Please enter event topic" />
    </Form.Item>
  );
};

export default TopicField;
