import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
import './App.css';
import React from 'react';
import Markers from './components/markers';
import Map from './components/map';
import SideBar from "./components/sideBar";


function App() {  
  return (
    <div id='app'>
    <SideBar></SideBar>
    <Map></Map>
    </div>
  );
}
export default App;