import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './topic-field.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const TopicField = () => {
  return (
    <Form.Item
      name="topic"
      label="Topic"
      rules={[
        {
          required: true,
          type: 'string',
          transform(value) {
            if (value !== undefined) return value.trim();
          },
          max: 80,
          message: 'Please enter event topic. Max length of string 80 characters.',
        },
      ]}
    >
      <InputDeb name="topic" allowClear placeholder="Please enter event topic" maxLength={80} />
    </Form.Item>
  );
};

export default TopicField;
