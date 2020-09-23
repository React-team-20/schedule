import React, {useCallback, useEffect, useRef} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {AutoComplete, Input} from 'antd';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';

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

const GoogleMapPlaceInput = () => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const [marker, setMarker] = React.useState(null);
  const [address, setAddress] = React.useState('');

  const sendPlace = () => {
    console.log('address - ', address, 'geocode: ', marker);
    // todo despatch data
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

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const optionMap = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const onMapClick = event => {
    setMarker(() => ({lat: event.latLng.lat(), lng: event.latLng.lng()}));
  };

  return (
    <>
      <InputMap panTo={panTo} />

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

const InputMap = ({panTo}) => {
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

  const onSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      panTo({addressText: address, geocode: {lat, lng}});
    } catch (error) {
      // todo set massage
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
          width: '100%',
          marginBottom: '1rem',
        }}
        className="input-map"
        options={status === 'OK' && data.map(({description}) => ({value: description}))}
        onSelect={onSelect}
        disabled={!ready}
        // onSearch={handleSearch}
      >
        <Input value={value} onChange={onChange} placeholder="Enter a address" />
      </AutoComplete>
    </>
  );
};

export default GoogleMapPlaceInput;
