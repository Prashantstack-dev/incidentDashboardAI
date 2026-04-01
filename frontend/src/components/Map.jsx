import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const Map = () => {
  return (
    <MapContainer center={[-33.8688, 151.2093]} zoom={10} scrollWheelZoom={false} style={{ height: "400px", width: "80%" }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  )
}

export default Map
