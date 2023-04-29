import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Mazemap from "mazemap-api";
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import points from '../data/pointIds.json';
import info from '../data/infos.json';
import {makeVar } from '@apollo/client';


const iconP = L.icon({
  iconUrl: require('../static/icons/Point2.png'),
  iconSize: 40
})

export const poiId = makeVar("");
export const poiName = makeVar("");
function Markers() {

  const myList = points.filter((element) => info[element] != undefined);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  function Click(point,name) {
    poiId(point)
    poiName(name)
    navigate("/addplace")
  }
  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  return (
    <div>
      {
        myList.map((point)=>{
          const coord = [info[point].coordinates[1], info[point].coordinates[0]]
          const floor = info[point].floorname
          const name = info[point].maptext
          const building = info[point].buildingName
          return (
            <Marker position={coord} icon={iconP} onClick={()=> setReload(true)}>
              <Popup>
                <p><b>{name}</b></p>
                <p>{building}</p>
                <p>{floor}</p>
                <button onClick={() => Click(point,name)}>Legg til info</button>
              </Popup>
            </Marker>)
        })
      }
    </div>
  )
  ;
}

export default Markers;
