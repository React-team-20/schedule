import {MinusCircleOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, Row} from 'antd';
import React, {useState, useEffect} from 'react';
import './field-template.css';

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
          rules={[{required: true, message: 'Missing materials link name'}]}
        >
          <Input placeholder="Link name" />
        </Form.Item>
      </Col>
      <Col span={24} sm={12}>
        <Form.Item
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          name={[field.name, 'materialLink']}
          fieldKey={[field.fieldKey, 'materials-link']}
          rules={[{required: true, message: 'Missing materials link'}]}
        >
          <Input placeholder="Link" />
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
