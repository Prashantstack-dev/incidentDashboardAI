import "leaflet/dist/leaflet.css"
import './App.css'
import Map from "./components/Map";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import FireDataMap from "./components/FireDataMap";
import KanbanBoard from "./components/KanbanBoard";

const App = () => {
  return (
    <div id='app'>
       <h1>My Interactive Map</h1>
      <FireDataMap style={{height:'50px'}}/>
      <KanbanBoard />
    </div>
  )
}

export default App
