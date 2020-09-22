import React, {useState} from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Modal, Button, Input, AutoComplete} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import ContentGoogleMap from './ContentGoogleMap';

import './InputGoogleMap.css';

// Center maps PlacesAutocomplete Minsk, radius 4000km
const centerMap = {
  lat: 53.904541,
  lng: 27.561523,
};
const radius = 400 * 1000;

const AddonAfterButton = ({place}) => {
  return (
    <Button
      className="button-center-icon button-no-border"
      size="small"
      disabled={!place}
      onClick={() =>
        Modal.info({
          width: '80%',
          title: place.address,
          content: <ContentGoogleMap centerMap={place.geocode} />,
          centered: true,
        })
      }
    >
      <EnvironmentOutlined />
    </Button>
  );
};

const InputGoogleMap = () => {
  const [place, setPlace] = useState(null);

  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => centerMap.lat,
        lng: () => centerMap.lat,
      },
      radius: radius,
      callbackName: 'initMap',
    },
  });

  console.log('ready = ', ready);

  const onSelect = async address => {
    console.log('onSelect', address);
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      console.log(lat, lng);
      setPlace({
        address: address,
        geocode: {
          lat,
          lng,
        },
      });
    } catch (error) {
      console.log('error!');
    }
  };

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <>
      <AutoComplete
        style={{
          width: 300,
        }}
        options={status === 'OK' && data.map(({description}) => ({value: description}))}
        onSelect={onSelect}
        disabled={!ready}
        // onSearch={handleSearch}
      >
        <Input
          value={value}
          onChange={onChange}
          placeholder="Enter a address"
          addonAfter={<AddonAfterButton place={place} />}
        />
      </AutoComplete>
    </>
  );
};

export default InputGoogleMap;
