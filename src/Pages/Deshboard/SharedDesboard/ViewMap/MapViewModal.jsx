/* eslint-disable react/prop-types */
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MapViewModal = ({ latitude, longitude, closeModal }) => {
     console.log(latitude, longitude);
  const [viewport, setViewport] = React.useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 12,
  });

  return (
    <div className="map-container relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken="pk.eyJ1Ijoic2FiYmlyOTkiLCJhIjoiY2xwZmlndXpqMW0wMDJrbzZtdHNmaGMxbSJ9.kzgleqUmdWQMi2tVS76gTw"
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        <Marker latitude={latitude} longitude={longitude}>
          <div>Delivery Location</div>
        </Marker>
      </ReactMapGL>
      <button onClick={closeModal}>Close Map</button>
    </div>
  );
};

export default MapViewModal;
