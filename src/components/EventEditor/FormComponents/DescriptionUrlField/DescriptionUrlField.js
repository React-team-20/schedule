import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './description-url-field.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const DescriptionUrlField = () => {
  return (
    <Form.Item
      name="description-url"
      label="Link"
      rules={[
        {
          type: 'url',
          message: `It doesn't look like a link! Please input url!`,
        },
      ]}
    >
      <InputDeb
        name="description-url"
        allowClear
        style={{width: '100%'}}
        placeholder="Please enter url"
      />
    </Form.Item>
  );
};

export default DescriptionUrlField;
