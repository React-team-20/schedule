import React, {useCallback, useEffect, useRef} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {AutoComplete, Input, message} from 'antd';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import Axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC00kwnr-ibsDwmaOK4PRFv7hhOWzzXFOo';
const libraries = ['places'];

// Center maps PlacesAutocomplete Minsk, radius 4000km
const centerMap = {
  lat: 53.904541,
  lng: 27.561523,
};
const radius = 400 * 1000;

const mapContainerStyle = {
  width: '100%',
  height: '250px',
};

const GoogleMapPlaceInput = ({setPlace}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const [marker, setMarker] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  const sendPlace = () => {
    if (marker) {
      const sendObject = {address, geocode: marker};
      // todo send data
      console.log('is setPlace ', !!setPlace);
      console.log('sendObject ', sendObject);
      // setPlace(sendObject);
    }
  };

  useEffect(() => {
    sendPlace();
  }, [marker, address]);

  const panTo = useCallback(({addressText, geocode: {lat, lng}}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
    setMarker({lat, lng});
    setAddress(addressText);
  }, []);

  if (loadError) {
    message.error('Error loading maps');
    return <span>Error loading maps</span>;
  }
  if (!isLoaded) return <span>Loading Maps...</span>;

  const optionMap = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const getAddress = async ({lat, lng}) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const result = await Axios.get(url);
      if (result.data.status === 'OK') {
        const newAddress = result.data.results[0].formatted_address;
        setAddress(() => newAddress);
      }
    } catch (error) {
      message.error('Error getting addres by geocode');
      console.log('error', error);
    }
  };

  const onMapClick = event => {
    const geocodeObject = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    setMarker(() => geocodeObject);
    getAddress(geocodeObject);
  };

  return (
    <>
      <InputMap panTo={panTo} propsAddress={address} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={centerMap}
        options={optionMap}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <Marker position={marker} draggable onDragEnd={onMapClick} />
      </GoogleMap>
    </>
  );
};

const InputMap = ({panTo, propsAddress}) => {
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

  // ! Error not rendering
  // useEffect(() => {
  //   console.log('useCallback');

  //   if (propsAddress) {
  //     setValue(propsAddress, false);
  //     console.log('setValue propsAddress = ', value);
  //   }
  // }, [propsAddress]);

  const onSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      panTo({addressText: address, geocode: {lat, lng}});
    } catch (error) {
      message.error('Error getting geocode');
    }
  };

  const onChange = event => {
    setValue(event.target.value);
  };

  // ! Error not rendering
  const modValue = propsAddress || value;
  console.log('propsAddress || value = ', modValue);

  return (
    <AutoComplete
      style={{
        width: '100%',
        marginBottom: '1rem',
      }}
      className="input-map"
      options={status === 'OK' && data.map(({description}) => ({value: description}))}
      onSelect={onSelect}
      disabled={!ready}
    >
      <Input value={modValue} onChange={onChange} placeholder="Search by address" />
    </AutoComplete>
  );
};

export default GoogleMapPlaceInput;
