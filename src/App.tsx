import { useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const position:LatLngExpression = [51.505, -0.09]

function App() {
  return (
    <MapContainer center={position} zoom={13} style={{height:'1080px', width:'763px'}}>
      <TileLayer

        ImageOverley
        url="https://preview.redd.it/kq8mzkvpkjy51.png?width=1080&crop=smart&auto=webp&s=9f3bd3011d59531de4cf1fd480384cfd4f1e64b4"
      />
     
    </MapContainer>
  )  



}
export default App
