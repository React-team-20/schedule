import React from 'react';
import {Button, Input} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';

import './InputGoogleMap.css';

const GOOGLE_MAPS_API_KEY = '';

const AddonAfterButton = () => (
  <Button
    className="button-center-icon button-no-border"
    size="small"
    // onClick={handlerShowMap}
  >
    <EnvironmentOutlined />
  </Button>
);

const InputGoogleMap = () => {
  return (
    <div>
      <Input placeholder="input address" addonAfter={<AddonAfterButton />} />
    </div>
  );
};

export default InputGoogleMap;
