import { useState } from 'react'
import './App.css'
import { ImageOverlay, MapContainer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Icon, LatLngBoundsExpression, LatLngExpression, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

let map: Map | null;
const position:LatLngExpression = [382, 540];

let popup!:L.Popup;

const crs = L.CRS.Simple;

const bounds:LatLngBoundsExpression = [[0,0],[763,1080]];

const pokeballIcon:Icon = new Icon({
  iconUrl:"/public/pokeball.svg",
  iconSize: [30,30]
});

const urlMap:string = "https://preview.redd.it/kq8mzkvpkjy51.png?width=1080&crop=smart&auto=webp&s=9f3bd3011d59531de4cf1fd480384cfd4f1e64b4";

function App() {
  
  const Zoomer = () =>{
    const [isZoom, setZoom] = useState<boolean>(false);

  const mapEvents = useMapEvents({
  
    zoomend: () => {
      if (mapEvents.getZoom() > 0){
        mapEvents.dragging.enable();
        console.log("No zoom")
      }
      else {
        mapEvents.dragging.disable();
        mapEvents.setView(position);
        console.log("zoom")
      }
    },
  });

  return null;
  }
  


  return (
    <MapContainer  ref={(ref) => {map = ref}} id="mapContainer" crs={crs} center={position} zoom={0} style={{height:'763px', width:'1080px'}} bounds={bounds} dragging={false}>
      <Marker key={0} position={[519, 518]} icon={pokeballIcon}>
        <Popup key={0} ref={(ref) => {popup = ref}}>Celurean City</Popup>
      </Marker>
      <ImageOverlay url={urlMap} bounds={bounds}>
     </ImageOverlay>
     <Zoomer/>
    </MapContainer>    
  )  

}
export default App
