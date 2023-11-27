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

      <div className=" max-w-[400px] max-h-[400px] top-20 mx-auto fixed z-50 inset-0 overflow-hidden bg-opacity-75 bg-gray-500 flex justify-center items-center">
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
      <button className='btn' onClick={closeModal}>Close Map</button>
    </div>

  );
};

export default MapViewModal;
