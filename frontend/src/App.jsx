import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FireDataMap from "./components/FireDataMap";
import KanbanBoard from "./components/KanbanBoard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';
// import { faTrello } from '@fortawesome/free-brands-svg-icons';


const App = () => {
  return (
    <>
    
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
       {/* Header */}
       <div style={{padding: "7px", border:"2px solid black", background:"#020617", color:"#e5e7eb"}}>
      <FontAwesomeIcon icon={faFire} style={{color: "#ef4444", fontSize:"18px"}}/>
    <span>Incident Dashboard</span>

    </div>

      <div style={{ flex: 2, minHeight: "300px" }}>
        {/* <FontAwesomeIcon icon={faTrello} style={{color:"#ef4444", fontSize:"18px", padding:"10px"}}/> */}
        <FireDataMap />
      </div>

      <div
        style={{
          flex: 2,
          overflow: "hidden",
          padding: "16px",
          background: "#0f172a"
        }}
      >
        <KanbanBoard />
      </div>
    </div>
    </>
  );
};

export default App;
