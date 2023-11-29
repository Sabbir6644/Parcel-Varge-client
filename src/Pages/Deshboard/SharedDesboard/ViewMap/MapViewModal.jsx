/* eslint-disable react/prop-types */
import  { Map, Marker } from 'react-map-gl';

const MapViewModal = ({ latitude, longitude, closeModal }) => {
     console.log(latitude, longitude);


  return (

    <div className=" max-w-[400px] max-h-[400px] top-20 mx-auto fixed z-50 inset-0 overflow-hidden bg-opacity-75 bg-white flex justify-center items-center">

    <Map
      mapboxAccessToken={import.meta.env.VITE_MAP_PK}
      initialViewState={{
        longitude: longitude || 90.399452,
        latitude: latitude || 23.777176,
        zoom: 14
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {latitude && longitude && (
        <Marker
          longitude={longitude || 90.399452}
          latitude={latitude || 23.777176}
        >
          <div>Your Marker Content</div>
        </Marker>
      )}
    </Map>
  
    <button className='btn absolute bottom-5' onClick={closeModal}>Close Map</button>
  </div>
  
  

  );
};

export default MapViewModal;
