import React from 'react';
import {Form, Input} from 'antd';
import GoogleMapPlaceInput from '../../../GoogleMapPlaceInput';

import './place-component.css';

const PlaceComponent = () => {
  return (
    <Form.Item name="place" label="Place">
      {/* <Input name="place" style={{width: '100%'}} placeholder="Please enter place" /> */}
      <GoogleMapPlaceInput />
    </Form.Item>
  );
};

export default PlaceComponent;
