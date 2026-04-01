import "leaflet/dist/leaflet.css"
import './App.css'
import Map from "./components/Map";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import FireDataMap from "./components/FireData";

const App = () => {
  return (
    <div id='map'>
       <h1>My Interactive Map</h1>
      <FireDataMap style={{height:'50px'}}/>
    </div>
  )
}

export default App
