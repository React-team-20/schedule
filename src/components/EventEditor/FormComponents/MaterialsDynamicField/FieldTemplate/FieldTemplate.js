import {MinusCircleOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './field-template.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const FieldTemplate = ({field, remove}) => {
  const [IsRowView, setIsRowView] = useState('');

  useEffect(() => {
    if (window.innerWidth < 576) setIsRowView(false);
    else setIsRowView(true);
  }, []);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 576) setIsRowView(false);
    else setIsRowView(true);
  });

  return (
    <Row gutter={16}>
      <Col span={24} sm={11}>
        <Form.Item
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          name={[field.name, 'materialName']}
          fieldKey={[field.fieldKey, 'materials-name']}
          rules={[
            {
              required: true,
              type: 'string',
              max: 80,
              message: 'Please input link name. Max length of string 80 characters.',
            },
          ]}
        >
          <InputDeb allowClear placeholder="Link name" maxLength={80} />
        </Form.Item>
      </Col>
      <Col span={24} sm={12}>
        <Form.Item
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          name={[field.name, 'materialLink']}
          fieldKey={[field.fieldKey, 'materials-link']}
          rules={[
            {
              required: true,
              type: 'url',
              message: `It doesn't look like a link! Please input url!`,
            },
          ]}
        >
          <InputDeb allowClear placeholder="Link" />
        </Form.Item>
      </Col>
      {IsRowView ? (
        <Col span={1}>
          <Button
            onClick={() => {
              remove(field.name);
            }}
            icon={<MinusCircleOutlined />}
            danger
            type="text"
          />
        </Col>
      ) : (
        <Col span={24} style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
          <Button
            onClick={() => {
              remove(field.name);
            }}
            danger
            type="default"
          >
            Delete field
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default FieldTemplate;
