import {Form, Input} from 'antd';
import React from 'react';
import './place-component.css';

const PlaceComponent = () => {
  return (
    <Form.Item name="place" label="Place">
      <Input name="place" style={{width: '100%'}} placeholder="Please enter place" />
    </Form.Item>
  );
};

export default PlaceComponent;
