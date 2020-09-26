import React from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhhdGNoZXIiLCJhIjoiY2s2NmM1ZmxnMDVlcDNrbTgyZGJ1MHlvcyJ9.8wM1j84kDuFiTNkZIkMlHQ';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    const {lat, lng} = this.props;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 16,
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      const {lat, lng} = this.props;
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(this.map);
      this.map.setCenter([lng, lat]);
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <div ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

export default Map;
