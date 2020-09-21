import {MinusCircleOutlined} from '@ant-design/icons';
import {Form, Input, Space} from 'antd';
import React from 'react';
import './field-template.css';

const FieldTemplate = ({field, remove}) => {
  return (
    <Space key={field.key} style={{display: 'flex', marginBottom: 8}} align="start">
      <Form.Item
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        name={[field.name, 'materialName']}
        fieldKey={[field.fieldKey, 'materials-name']}
        rules={[{required: true, message: 'Missing materials link name'}]}
      >
        <Input placeholder="Link name" />
      </Form.Item>
      <Form.Item
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        name={[field.name, 'materialLink']}
        fieldKey={[field.fieldKey, 'materials-link']}
        rules={[{required: true, message: 'Missing materials link'}]}
      >
        <Input placeholder="Link" />
      </Form.Item>

      <MinusCircleOutlined
        onClick={() => {
          remove(field.name);
        }}
      />
    </Space>
  );
};

export default FieldTemplate;
