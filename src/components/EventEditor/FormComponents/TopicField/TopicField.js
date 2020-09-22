import {Form, Input} from 'antd';
import React from 'react';
import './topic-field.css';

const TopicField = () => {
  return (
    <Form.Item
      name="topic"
      label="Topic"
      value="asd"
      rules={[{required: true, message: 'Please enter event topic'}]}
    >
      <Input name="topic" placeholder="Please enter event topic" />
    </Form.Item>
  );
};

export default TopicField;
