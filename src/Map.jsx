import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import "./Map.css"

const containerStyle = {
  // width: '1000px',
   height: "100%"
};

const center = {
  lat: 28.64,
  lng: 77.2
};

const markers = [
    {
        id: 1,
        name: "mark1",
        position: { lat: 28.52 , lng: 77.1}
    },
    {
        id: 2,
        name: "mark2",
        position: { lat: 28.54 , lng: 77.1}
    },    {
        id: 3,
        name: "mark3",
        position: { lat: 28.56 , lng: 77.1}
    },
]

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: '2f79f89f41688475',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    
    
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])        

  return isLoaded ? (
    <div id="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            streetViewControl: false,
            mapTypeControl: false
        }}   
      >
        {
            markers.map(({id, name, position})=> (
                <MarkerF key={id} position={position}>
                    <div>{name}</div>
                </MarkerF> 
            ))
        }
         
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>

  ) : <>Map couldn't be loaded</>
}

export default React.memo(MyComponent)