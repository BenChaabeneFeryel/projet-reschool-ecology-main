import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '77vh'
};
const infowindow = {
  background: `white`,
  padding: 2,
  fontsize : 2
}

const center = {
  lat: 36.79707659935575,
  lng:  10.198563045367104
};

const position = [
  {
    lat: 36.78715936119019, 
    lng: 10.174843247665212
  },
  {
    lat: 36.85539524807951, 
    lng: 10.12539542972278
  },
  {
    lat: 36.81539524807951, 
    lng: 10.14539542972278
  },
]

const onLoad = marker => {
  console.log('marker: ', marker)
}

export default function MapGestionnaire() {
  return (
    <>
       <h2>Map</h2>
       <LoadScript
       googleMapsApiKey="AIzaSyCM_y_hH1jw8ucuvhzfmGdKMloxPwBjbAo"
     >
       <GoogleMap
         mapContainerStyle={containerStyle}
         center={center}
         zoom={10}
       >
       <InfoWindow
          onLoad={onLoad}
          position={position[0]}
        >
          <div style={infowindow}>
            <p>ESSECT</p>
          </div>
        </InfoWindow>
        <Marker
          icon={{ 
            path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
            fillColor: "red",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "red",
            strokeWeight: 2,
          }}
          onLoad={onLoad}
          position={position[0]}
        />

        <Marker
          icon={{ 
            path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
            fillColor: "green",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "green",
            strokeWeight: 2,
          }}
          onLoad={onLoad}
          position={position[1]}
        />
        <Marker
          icon={{ 
            path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
            fillColor: "orange",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "orange",
            strokeWeight: 2,
          }}
          onLoad={onLoad}
          position={position[2]}
        />
       </GoogleMap>
     </LoadScript>
    </>
  )
}
