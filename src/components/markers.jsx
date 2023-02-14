import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
import React, {useEffect}  from 'react';
import  Mazemap  from "mazemap-api";
 

const position= [63.418277, 10.403647]; 

function Markers() {
useEffect(() => {
    console.log(Mazemap.getPOI(1));
  fetch('https://api.mazemap.com/api/campus/1/poitypes/4232/pois/')
.then((response)=> response.json())

//.then((data)=> console.log(data))
.then((data)=> console.log(data.pois[0].point.coordinates[0]))

},[])
  return (
  <></>
  );
}

export default Markers;
