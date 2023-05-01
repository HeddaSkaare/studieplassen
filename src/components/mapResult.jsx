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
import MarkersResult from './markersResult'
import L from 'leaflet'


const iconYou = L.icon({
    iconUrl: require('../static/icons/Pointer.png'),
    iconSize: 40
})

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })
  
    return null
}


function MapResult(){

  
    const animateRef = useRef(false)
    return(
    <MapContainer id = 'mapR' center={[63.416877, 10.405647]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkersResult></MarkersResult>
        <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
    )
};
export default MapResult;
