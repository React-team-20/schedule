import {Form, Input} from 'antd';
import React from 'react';
import './description-url-field.css';

const DescriptionUrlField = () => {
  return (
    <Form.Item
      name="description-url"
      label="Link"
      rules={[
        {
          type: 'url',
          message: `It doesn't look like a link! Please input url!`,
          transform(value) {
            return value.trim();
          },
        },
      ]}
    >
      <Input
        name="description-url"
        allowClear
        style={{width: '100%'}}
        placeholder="Please enter url"
      />
    </Form.Item>
  );
};

export default DescriptionUrlField;
