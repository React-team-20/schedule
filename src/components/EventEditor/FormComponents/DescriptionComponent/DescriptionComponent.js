import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './description-component.css';

const {TextArea} = Input;
const TextAreaDeb = reactComponentDebounce(150, 200)(TextArea);

const DescriptionComponent = () => {
  return (
    <Form.Item
      name="description"
      label="Description"
      rules={[
        {
          type: 'string',
        },
      ]}
    >
      <TextAreaDeb name="description" rows={4} placeholder="Please add description" />
    </Form.Item>
  );
};

export default DescriptionComponent;
