import { useState } from 'react'
import './App.css'
import { ImageOverlay, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { LatLng, LatLngBounds, LatLngBoundsExpression, LatLngExpression, Map, Point } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
const position:LatLngExpression = [382, 540];

const sizeMap:Point = new Point(1080,763);

const crs = L.CRS.Simple;
const sizeBounds0:LatLng = new LatLng(0,0);
const sizeBounds1:LatLng = new LatLng(763, 1080);

const ej0:LatLngExpression = sizeBounds0;
const ej1:LatLngExpression = sizeBounds1;

const ej2:LatLngBounds = new LatLngBounds(ej0, ej1);

const bounds:LatLngBoundsExpression = ej2;

const urlMap:string = "https://preview.redd.it/kq8mzkvpkjy51.png?width=1080&crop=smart&auto=webp&s=9f3bd3011d59531de4cf1fd480384cfd4f1e64b4";

function App() {
  return (
    <MapContainer crs={crs} center={position} zoom={0} style={{height:'763px', width:'1080px'}} bounds={bounds}>
      <ImageOverlay
      url={urlMap}
      bounds={bounds}
      >
       
      
     </ImageOverlay>
    </MapContainer>
    
  )  



}
export default App
