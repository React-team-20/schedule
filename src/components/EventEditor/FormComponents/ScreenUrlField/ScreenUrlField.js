import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import {isImageLinkRegExp} from '../../../../utils';
import './screen-url-field.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const ScreenUrlField = () => {
  return (
    <Form.Item
      name="screen"
      label="Screen"
      rules={[
        {
          pattern: isImageLinkRegExp,
          message: `It doesn't look like a link! Please input url!`,
        },
      ]}
    >
      <InputDeb
        name="screen"
        allowClear
        style={{width: '100%'}}
        placeholder="Please enter screen url"
      />
    </Form.Item>
  );
};

export default ScreenUrlField;
