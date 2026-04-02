import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FireDataMap = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [error, setError] = useState(null);
  //a function to customize the style of each feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.title) {
      layer.bindPopup(feature.properties.title);
    }
  };

  const fireStyle = {
    color: '#FF0000',
    weight: 5,
    fillOpacity: 0.7
  }
  
  useEffect(() => {
    // Define an async function to fetch your data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/majorincidents"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs once when the component mounts
  // 
  return (
    <MapContainer
      center={[-33.8688, 151.2093]}
      zoom={10}
      style={{ height: "60vh", width: "60%" }} //
      scrollWheelZoom={true}
    >
      {/*  TileLayer and GeoJSON  */}
          <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

     
      {geojsonData && (
        <GeoJSON
          key='my-geojson-layer'
          data={geojsonData}
          style={fireStyle}
          onEachFeature={onEachFeature} //callback function that Leaflet calls for every single feature
        />
      )}
    </MapContainer>
  );
};

export default FireDataMap;
