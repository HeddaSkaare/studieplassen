import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Mazemap from "mazemap-api";
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';

//const position= [63.418277, 10.403647];

const iconP = L.icon({
  iconUrl: require('../static/icons/Point2.png'),
  iconSize: 40
})

function Markers() {
  const [points, setPoints] = useState([]);
  const find = useEffect(() => {
    console.log(Mazemap.getPOI(1));
    fetch('https://api.mazemap.com/api/campus/1/poitypes/4232/pois/')
    .then((response)=> response.json())

    //.then((data)=> console.log(data))
    .then((data)=>
    //console.log(data.pois.map((poi)=> poi.point.coordinates), "wæ"),
    //data.pois.map((poi)=>console.log(poi.point.coordinates))
    setPoints(data.pois.map((poi)=> poi.point.coordinates))
    )
  },[]);
  //console.log(points[0][0], "ye")

  const navigate = useNavigate();

  function Click() {
    navigate("/addplace")
  }

  return (
    <div>
      {
        points.map((point)=>{
          const coord = [point[1],point[0]]
          return (
          <Marker position={coord} icon={iconP}>
            <Popup>
              <button onClick={() => Click()}>Legg til info</button>
            </Popup>
          </Marker>)
        })
      }
    </div>
  )
  ;
}

export default Markers;
