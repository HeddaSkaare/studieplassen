import "leaflet/dist/leaflet.css";
import data from "../data/vurdering.json";
import points from "../data/pointInfo.json";
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
import { json } from "react-router-dom";

function loadResults(event) {
      event.preventDefault();
    }

function Results(){
    //console.log(data.vurderinger[0].kapasitet)
    /* fetch("../data/vurdering.json")
    .then((res)=>res.json())
    .then((json)=>console.log(json)) */


    return(
        <div id='sideBar'>
            <h2 className='Title'>
                Dine beste studieplasser
            </h2>

           
            {data.data.map((item)=>(
            <div className='results'>
                <p>{item.Korttilgang}</p>
                <p>{item.Vurdering}</p>
                <p>{item.kapasitet}</p>
                <p>{item.poiId}</p>
            </div>      
            ))}
        </div>  
    )
};
export default Results;
