import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import "./Map.css"
import SubstationData from "../SubstationData.json";

SubstationData.records.map((rec)=>{
  let latLngArr = rec[5].split(", ");
  let position = {
    lat: Number(latLngArr[0]),
    lng: Number(latLngArr[1])
  }  
  console.log(position);
  rec.push(position);  
})

console.log(SubstationData.records);


const containerStyle = {
  // width: '1000px',
   height: "100%"
};

const center = {
  lat: 28.64,
  lng: 77.2
};

// const markers = [
//     {
//         id: 1,
//         name: "mark1",
//         position: { lat: 28.52 , lng: 77.1}
//     },
//     {
//         id: 2,
//         name: "mark2",
//         position: { lat: 28.54 , lng: 77.1}
//     },    {
//         id: 3,
//         name: "mark3",
//         position: { lat: 28.56 , lng: 77.1}
//     },
// ]

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: '2f79f89f41688475',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    
    
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if(marker === activeMarker){
      return;
    }
    setActiveMarker(marker);
  };  

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
        onClick={()=> setActiveMarker(null)}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            streetViewControl: false,
            mapTypeControl: false
        }}   
      >
        {
            // markers.map(({id, name, position})=> (
            //     <MarkerF key={id} position={position}>
            //         <div>{name}</div>
            //     </MarkerF> 
            // ))

            SubstationData.records.map((rec)=> (
              rec[4] === "400 kV" ?
              <MarkerF 
                key={rec[0]} 
                position={rec[6]} 
                onClick={()=> handleActiveMarker(rec[0])}
                icon={{
                  url: "https://www.freeiconspng.com/uploads/red-triangle-png-20.png" ,
                  scaledSize: {width: 30, height: 30}
                }}
              >
                  {
                    activeMarker === rec[0] ? <InfoWindowF onCloseClick={()=> setActiveMarker(null)}>
                      <div>{rec[1]}</div>
                    </InfoWindowF> : null
                  }
              </MarkerF> 
              : 
              <MarkerF 
                key={rec[0]} 
                position={rec[6]} 
                onClick={()=> handleActiveMarker(rec[0])}
                icon={{
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/1024px-Location_dot_blue.svg.png" ,
                  scaledSize: {width: 20, height: 20}
                }}
              >
                  {
                    activeMarker === rec[0] ? <InfoWindowF onCloseClick={()=> setActiveMarker(null)}>
                      <div>{rec[1]}</div>
                    </InfoWindowF> : null
                  }
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