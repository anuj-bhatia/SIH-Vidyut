import Sidebar from './Sidebar';
import Map from "./Map";
import "./App.css"
import { useState } from 'react';

function App() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if(marker === activeMarker){
      return;
    }
    setActiveMarker(marker);
  };  
  
  return (    
    <div id="main">
      <Sidebar activeMarker={activeMarker}/>
      <Map activeMarker={activeMarker} handleActiveMarker={handleActiveMarker}/>
    </div>
  )
}

export default App
