import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FireDataMap from "./components/FireDataMap";
import KanbanBoard from "./components/KanbanBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
// import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { useEffect,useState } from "react";
import GeoCards from "./components/GeoCards";
import Button from "./components/Button";

const App = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    // Define an async function to fetch your data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://corsproxy.io/?https://www.rfs.nsw.gov.au/feeds/majorIncidents.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeojsonData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs once when the component mounts
  //
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* Header */}
        <div style={{
            padding: "7px",
            border: "2px solid black",
            background: "#020617",
            color: "#e5e7eb"
          }}>
          <FontAwesomeIcon className="fire"
            icon={faFire}
            style={{ color: "#ef4444", fontSize: "18px" }}
          />
          <span>Incident Dashboard</span>
        </div>

        <div style={{ flex: 2, minHeight: "300px" }}>
          {/* <FontAwesomeIcon icon={faTrello} style={{color:"#ef4444", fontSize:"18px", padding:"10px"}}/> */}
          <FireDataMap geojsonData={geojsonData}/>
        </div>

        <div
          style={{
            flex: 2,
            overflow: "hidden",
            padding: "16px",
            background: "#0f172a"
          }}
        >
          {/* <KanbanBoard geojsonData={geojsonData}/> */}
          <Button setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <GeoCards geojsonData={geojsonData} selectedCategory={selectedCategory}/>
          
        </div>
      </div>
    </>
  );
};

export default App;
