import {Form, Input} from 'antd';
import React from 'react';
import './place-component.css';

const PlaceComponent = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="place" label="Place">
      <Input name="place" style={{width: '100%'}} placeholder="Please enter place" />
    </Form.Item>
  );
};

export default PlaceComponent;
