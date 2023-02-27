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


function SideBar(){
    
    return(
        <div id='sideBar'>
            <h2 className='Title'>
                Resturanter
            </h2>
            <div className='inline'>
                <button id="sortRating"> Vurdering</button>
                <button id="sortPris">Støy</button>
                <button id="sortBelastning">Tilgjengelighet</button>
                <button id="sortBelastning">Nerhet</button>
            </div>
            <StudyCard></StudyCard>
        </div>  
    )
};
export default SideBar;
