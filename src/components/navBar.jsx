import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import React, {useRef,useState} from 'react';
import Markers from './markers'
import L from 'leaflet'



function NavBar(){
    return(
        <div class ="navBar">
            <a id="home" href="#home">Studieplassen</a>
            <a id="logIn"href="#logIn">Logg inn</a> 
        </div>
    )
};
export default NavBar;