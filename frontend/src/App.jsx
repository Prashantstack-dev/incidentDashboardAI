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
  const [fetchedData, setFetchedData] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    // Define an async function to fetch your data
    const fetchData = async () => {
      if(document.visibilityState === "hidden") return 
      try {
        const response = await fetch(
          "https://corsproxy.io/?https://www.rfs.nsw.gov.au/feeds/majorIncidents.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setGeojsonData(data);
        setFetchedData(new Date()); // capture time of last successful fetch
      
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    //then repeat the fetch 
    const interval = setInterval(fetchData, 30000);
    
    //cleanup
    return () => clearInterval(interval);


  }, []); // The empty dependency array ensures this runs once when the component mounts
  //countdown
  useEffect(()=>{
    const count = setInterval(()=> {
     setCountdown(prev => prev === 0 ? 30 : prev - 1);
    },1000)
    return () => clearInterval(count)
    
  },[])
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
          <h3>Last Fetched :</h3>
          <p>Current Time : {fetchedData ? fetchedData.toLocaleTimeString() : ''}</p>
          {fetchedData && <p>Refreshes in {countdown} seconds</p>}
        </div>

        {/* <div style={{ display:"flex", flex: 2, minHeight: "300px" }}> */}
         <div style={{ height: "70vh", margin:"25px", padding:"18px"}}>
          {/* <FontAwesomeIcon icon={faTrello} style={{color:"#ef4444", fontSize:"18px", padding:"10px"}}/> */}
          <FireDataMap geojsonData={geojsonData}/>
        </div>

        {/* <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "16px",
            background: "#0f172a"
          }}
        > */}
        <div style={{ height: "40vh", overflowY: "auto", background: "#0f172a", padding: "16px" }}>
          {/* <KanbanBoard geojsonData={geojsonData}/> */}
          <Button setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <GeoCards geojsonData={geojsonData} selectedCategory={selectedCategory}/>
          
        </div>
      </div>
    </>
  );
};

export default App;
