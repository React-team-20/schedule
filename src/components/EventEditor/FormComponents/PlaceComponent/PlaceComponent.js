import React from 'react';
import GoogleMapPlaceInput from '../../../GoogleMapPlaceInput';

import './place-component.css';

const PlaceComponent = ({setPlace}) => {
  return <GoogleMapPlaceInput setPlace={setPlace} />;
};

export default PlaceComponent;
