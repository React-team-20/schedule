import React from 'react';
import {Modal, Button, Input} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import ContentGoogleMap from './ContentGoogleMap';

import './InputGoogleMap.css';

const GOOGLE_MAPS_API_KEY = '';
const libraries = ['places'];

const AddonAfterButton = () => (
  <Button
    className="button-center-icon button-no-border"
    size="small"
    onClick={() =>
      Modal.info({
        width: '80%',
        title: 'Google maps',
        content: <ContentGoogleMap />,
        centered: true,
      })
    }
  >
    <EnvironmentOutlined />
  </Button>
);

const InputGoogleMap = () => {
  // const {} = usePlacesAutocomplete();

  return (
    <div>
      <Input placeholder="input address" addonAfter={<AddonAfterButton />} />
    </div>
  );
};

export default InputGoogleMap;
