import React from 'react';
import {Modal, Button, Input} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';

import './InputGoogleMap.css';

const GOOGLE_MAPS_API_KEY = '';
const libraries = ['places'];

const InputGoogleMap = () => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapContainerStyle = {
    width: '90%',
    height: '90%',
  };

  const center = {
    lat: 53.904541,
    lng: 27.561523,
  };

  const AddonAfterButton = () => (
    <Button
      className="button-center-icon button-no-border"
      size="small"
      onClick={() =>
        Modal.info({
          width: '80%',
          title: 'Google maps',
          content: (
            <>
              <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}></GoogleMap>
            </>
          ),
          centered: true,
        })
      }
    >
      <EnvironmentOutlined />
    </Button>
  );

  return (
    <div>
      <Input placeholder="input address" addonAfter={<AddonAfterButton />} />
    </div>
  );
};

export default InputGoogleMap;
