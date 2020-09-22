import React, {useCallback, useRef} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC00kwnr-ibsDwmaOK4PRFv7hhOWzzXFOo';
const libraries = ['places'];

const ContentGoogleMap = props => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const mapContainerStyle = {
    width: '100%',
    height: '250px',
  };

  const {centerMap} = props;

  const optionMap = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={centerMap}
      options={optionMap}
      // onLoad={onMapLoad}
    >
      <Marker position={centerMap} />
    </GoogleMap>
  );
};

export default ContentGoogleMap;
