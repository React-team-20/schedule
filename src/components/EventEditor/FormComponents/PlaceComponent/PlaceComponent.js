import React from 'react';
import {Form} from 'antd';
import GoogleMapPlaceInput from '../../../GoogleMapPlaceInput';

import './place-component.css';

const PlaceComponent = () => {
  return (
    <Form.Item name="place" label="Place">
      <GoogleMapPlaceInput />
    </Form.Item>
  );
};

export default PlaceComponent;
