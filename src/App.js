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


function App() {  
  return (
    <Map></Map>
  );
}
export default App;