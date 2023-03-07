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
import StudyCard from "./studyCard";

function loadResults(event) {
      event.preventDefault();
    }



function Results(){
    
    return(
        <div id='sideBar'>
            <h2 className='Title'>
                Dine beste studieplasser
            </h2>
            <div className='results'>
            
            </div>
        </div>  
    )
};
export default Results;
